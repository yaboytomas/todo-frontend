import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-4 border-secondary-200 dark:border-secondary-700 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin`}
        ></div>
        <div
          className={`absolute top-0 left-0 ${sizeClasses[size]} border-4 border-transparent border-t-primary-400 dark:border-t-primary-300 rounded-full animate-spin`}
          style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
        ></div>
      </div>
      {text && (
        <p className="mt-4 text-secondary-600 dark:text-secondary-400 font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner; 