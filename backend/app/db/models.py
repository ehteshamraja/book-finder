from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from .base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    favorites = relationship("Book", secondary="user_favorites")

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    google_books_id = Column(String, unique=True, index=True)
    title = Column(String)
    author = Column(String)
    cover_image = Column(String)
    users = relationship("User", secondary="user_favorites")

user_favorites = Table(
    "user_favorites",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("book_id", Integer, ForeignKey("books.id")),
) 