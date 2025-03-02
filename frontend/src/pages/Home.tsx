import React, { useState } from 'react';
import { SearchBar } from '../components/SearchBar.tsx';
import { BookCard } from '../components/BookCard.tsx';
import { BookGridSkeleton } from '../components/Skeleton.tsx';
import { books, favorites } from '../services/api.ts';
import { useAuth } from '../context/AuthContext.tsx';
import toast from 'react-hot-toast';

interface Book {
  id: string;
  title: string;
  author: string;
  cover_image: string;
}

export const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [favoriteBooks, setFavoriteBooks] = useState<string[]>([]);
  const { isAuthenticated } = useAuth();

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const results = await books.search(query);
      setSearchResults(results);
    } catch (error) {
      toast.error('Failed to search books');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (bookId: string,e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    try {
      if (favoriteBooks.includes(bookId)) {
        await favorites.remove(bookId);
        setFavoriteBooks(prev => prev.filter(id => id !== bookId));
        toast.success('Removed from favorites');
      } else {
        await favorites.add(bookId);
        setFavoriteBooks(prev => [...prev, bookId]);
        toast.success('Added to favorites');
      }
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  };

  return (
    <>
    {isAuthenticated ?
    <div className="container mx-auto px-4 py-8">
      <SearchBar onSearch={handleSearch} />
      
      <div className="mt-8">
        {loading ? (
          <BookGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map(book => (
              <BookCard
                key={book.id}
                {...book}
                isFavorite={favoriteBooks.includes(book.id)}
                onFavoriteToggle={(e) => toggleFavorite(book.id,e)}
              />
            ))}
          </div>
        )}
      </div>
    </div>:
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold dark:text-white text-center">Please login to continue</h1>
    </div>}
    </>
  );
}; 