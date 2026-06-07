import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const PropertyCard = ({ property, onSave, isSaved = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-200">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-4xl">🏠</span>
          </div>
        )}
        <button
          onClick={() => onSave(property.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition ${
            isSaved ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:text-red-500'
          }`}
        >
          <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
          {property.title}
        </h3>

        {/* Price */}
        <p className="text-2xl font-bold text-blue-600 mb-3">
          CHF {property.price?.toLocaleString()}/Monat
        </p>

        {/* Details */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <span className="text-lg">📍</span>
            <span>{property.rooms} Zi.</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-lg">📐</span>
            <span>{property.size} m²</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-lg">📍</span>
            <span>{property.postal_code}</span>
          </div>
        </div>

        {/* Address */}
        <p className="text-sm text-gray-600 mb-4 truncate">
          {property.address}, {property.city}
        </p>

        {/* View Details Link */}
        <Link
          to={`/property/${property.id}`}
          className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Details ansehen
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
