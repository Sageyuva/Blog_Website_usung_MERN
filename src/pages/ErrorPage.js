import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-orange-700 mb-6 md:text-5xl">404</h1>
      <p className="text-lg text-gray-600 md:text-xl">Oops! The page you're looking for could not be found.</p>
      <Link to="/" className="inline-flex items-center px-4 py-2 mt-6 text-base font-medium rounded-md text-gray-700 bg-orange-300 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        Go to Home Page
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 -mr-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7 7 7-7" />
        </svg>
      </Link>
    </div>
  );
};

export default ErrorPage;
