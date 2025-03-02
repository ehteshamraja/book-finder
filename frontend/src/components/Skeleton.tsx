import React from 'react';

export const BookSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg p-4 w-full">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  );
};

export const BookGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <BookSkeleton key={i} />
      ))}
    </div>
  );
}; 