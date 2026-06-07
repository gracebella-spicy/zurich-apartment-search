import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🏠</span>
            <span className="text-xl font-bold text-gray-900">Zurich Apartments</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition">
              Startseite
            </Link>
            <Link to="/search" className="text-gray-600 hover:text-gray-900 transition">
              Suchen
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition">
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
