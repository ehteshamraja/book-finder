import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { books, favorites } from '../services/api.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

interface BookDetails {
  id: string;
  title: string;
  author: string;
  cover_image: string;
  description: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
}

export const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadBookDetails(id);
    }
  }, [id]);

  const loadBookDetails = async (bookId: string) => {
    try {
      setLoading(true);
      const data = await books.getById(bookId);
      setBook(data);
      
      // Check if book is in favorites
      if (isAuthenticated) {
        const userFavorites = await favorites.getAll();
        setIsFavorite(userFavorites.some(fav => fav.id === bookId));
      }
    } catch (error) {
      toast.error('Failed to load book details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    if (!book) return;
    console.log(book.id)
    
    try {
      if (isFavorite) {
        await favorites.remove(book.id);
        setIsFavorite(false);
        toast.success('Removed from favorites');
      } else {
        await favorites.add(book.id);
        setIsFavorite(true);
        toast.success('Added to favorites');
      }
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <img
              src={book.cover_image}
              alt={book.title}
              className="w-full rounded-lg shadow-lg"
            />
            {isAuthenticated && (
              <button
                onClick={toggleFavorite}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {isFavorite ? (
                  <>
                    <HeartSolidIcon className="h-5 w-5" />
                    Remove from Favorites
                  </>
                ) : (
                  <>
                    <HeartIcon className="h-5 w-5" />
                    Add to Favorites
                  </>
                )}
              </button>
            )}
          </div>
          
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              by {book.author}
            </p>
            
            {book.publishedDate && (
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Published: {book.publishedDate}
              </p>
            )}
            
            {book.pageCount && (
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Pages: {book.pageCount}
              </p>
            )}
            
            {book.categories && book.categories.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-400">Categories:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {book.categories.map(category => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                {book.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 