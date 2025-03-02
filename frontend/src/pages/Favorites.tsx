import React, { useEffect, useState } from 'react';
import { BookCard } from '../components/BookCard.tsx';
import { BookGridSkeleton } from '../components/Skeleton.tsx';
import { favorites } from '../services/api.ts';
import toast from 'react-hot-toast';
import { Book } from '../types/index.ts';

export const Favorites: React.FC = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await favorites.getAll();
      setFavoriteBooks(data);
    } catch (error) {
      toast.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (bookId: string,e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    try {
      await favorites.remove(bookId);
      setFavoriteBooks(books => books.filter(book => book.google_books_id !== bookId));
      toast.success('Removed from favorites');
    } catch (error) {
      toast.error('Failed to remove from favorites');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        My Favorite Books
      </h1>
      
      {loading ? (
        <BookGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteBooks.map(book => (
            <BookCard
              key={book.id}
              {...book}
              isFavorite={true}
              onFavoriteToggle={(e) => handleRemoveFavorite(book.google_books_id,e)}
            />
          ))}
        </div>
      )}
    </div>
  );
}; 