import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';
import PropertyMap from '../components/PropertyMap';
import { propertyAPI, savedAPI } from '../services/api';
import useStore from '../store';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const { savedProperties } = useStore();

  const handleSearch = async (criteria) => {
    setLoading(true);
    setError(null);
    try {
      const response = await propertyAPI.search(criteria);
      setProperties(response.data.properties || []);
    } catch (err) {
      setError('Fehler beim Durchsuchen von Immobilien');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (propertyId) => {
    try {
      // In a real app, you'd need user context
      // await savedAPI.save(userId, propertyId);
      console.log('Property saved:', propertyId);
    } catch (err) {
      console.error('Error saving property:', err);
    }
  };

  const isSaved = (propertyId) => {
    return savedProperties.some(p => p.property_id === propertyId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Wohnungssuche</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Search Form Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <SearchForm onSearch={handleSearch} loading={loading} />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {/* View Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Gitteransicht
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === 'map'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Kartenansicht
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Results Count */}
          {properties.length > 0 && (
            <p className="text-gray-600 mb-4">
              {properties.length} Wohnungen gefunden
            </p>
          )}

          {/* View Mode */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSave={handleSave}
                  isSaved={isSaved(property.id)}
                />
              ))}
            </div>
          ) : (
            <PropertyMap properties={properties} />
          )}

          {/* No Results */}
          {!loading && properties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Keine Wohnungen gefunden. Versuchen Sie, Ihre Suchkriterien zu ändern.</p>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Suche läuft...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
