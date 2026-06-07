import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Seite nicht gefunden</h1>
      <p className="text-gray-600 mb-8">Die gesuchte Seite existiert nicht.</p>
      <Link to="/" className="text-blue-600 hover:underline text-lg">
        Zurück zur Startseite
      </Link>
    </div>
  );
};

export default NotFound;
