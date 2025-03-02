from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
import httpx
from ..db.session import get_db
from ..core.config import settings
from ..db.models import Book

router = APIRouter()

async def fetch_google_books(query: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://www.googleapis.com/books/v1/volumes?",
            params={
                "q": query,
                "maxResults": 20
            }
        )
        return response.json()

@router.get("/search/{query}")
async def search_books(query: str, db: Session = Depends(get_db)):
    try:
        books_data = await fetch_google_books(query)
        if "items" not in books_data:
            return []
            
        books = []
        for item in books_data["items"]:
            volume_info = item.get("volumeInfo", {})
            book = {
                "id": item["id"],
                "title": volume_info.get("title", "Unknown"),
                "author": ", ".join(volume_info.get("authors", ["Unknown"])),
                "cover_image": volume_info.get("imageLinks", {}).get("thumbnail", "")
            }
            books.append(book)
            
        return books
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/{book_id}")
async def get_book(book_id: str, db: Session = Depends(get_db)):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://www.googleapis.com/books/v1/volumes/{book_id}")
        
        if response.status_code == 404:
            raise HTTPException(status_code=404, detail="Book not found")
        
        book_data = response.json()
        
        return {
            "id": book_data["id"],
            "title": book_data["volumeInfo"].get("title", "Unknown"),
            "author": ", ".join(book_data["volumeInfo"].get("authors", ["Unknown"])),
            "cover_image": book_data["volumeInfo"].get("imageLinks", {}).get("thumbnail", ""),
        }
