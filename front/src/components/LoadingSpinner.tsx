import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-16 h-16">
        <div className="absolute w-full h-full border-4 border-solid border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute w-10 h-10 top-3 left-3 border-4 border-solid border-gray-200 border-t-blue-300 rounded-full animate-spin-reverse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
