import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext.tsx';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  cover_image: string;
  google_books_id: string;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  cover_image,
  isFavorite,
  onFavoriteToggle
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/book/${id}`);
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
      onClick={handleClick}
    >
      <img
        src={cover_image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{author}</p>
        {isAuthenticated && (
          <button
            onClick={onFavoriteToggle}
            className="mt-2 text-red-500 hover:text-red-600"
          >
            {isFavorite ? (
              <HeartSolidIcon className="h-6 w-6" />
            ) : (
              <HeartIcon className="h-6 w-6" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}; 