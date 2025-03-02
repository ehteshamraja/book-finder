from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..db.session import get_db
from ..db.models import User, Book
from ..db.schemas import BookSearch
from .books import get_book
from ..core.security import get_current_user

router = APIRouter()

@router.get("")
async def get_favorites(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return current_user.favorites

@router.post("")
async def add_favorite(
    book: BookSearch,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    exis_book = db.query(Book).filter(Book.google_books_id == book.id).first()
    if not exis_book:
        book_data = await get_book(book.id,db)
        book = Book(
            google_books_id=book.id,
            title=book_data["title"],
            author=book_data["author"],
            cover_image=book_data["cover_image"]
        )
        db.add(book)
        
    current_user.favorites.append(book)
    db.commit()
    return {"message": "Book added to favorites"}

@router.delete("/{book_id}")
async def remove_favorite(  
    book_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    book = db.query(Book).filter(Book.google_books_id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
        
    current_user.favorites.remove(book)
    db.commit()
    return {"message": "Book removed from favorites"} 