import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PROPERTY_TYPES, ROOM_OPTIONS, ZURICH_AREA_POSTAL_CODES } from '../services/config';

const SearchForm = ({ onSearch, loading = false }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      property_type: '',
      min_rooms: '',
      max_rooms: '',
      min_size: '',
      max_size: '',
      min_price: '',
      max_price: '',
      postal_codes: '',
      availability_date: '',
    }
  });

  const onSubmit = (data) => {
    // Clean up empty fields
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== '' && v !== null)
    );
    onSearch(cleanData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Wohnungssuche</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Immobilientyp
          </label>
          <select
            {...register('property_type')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Alle Typen</option>
            {PROPERTY_TYPES.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Rooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zimmer
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              {...register('min_rooms')}
              placeholder="Min"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              {...register('max_rooms')}
              placeholder="Max"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Size in m² */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Größe (m²)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              {...register('min_size')}
              placeholder="Min"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              {...register('max_size')}
              placeholder="Max"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Price in CHF */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Miete CHF/Monat
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              {...register('min_price')}
              placeholder="Min"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              {...register('max_price')}
              placeholder="Max"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Postal Codes */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Postleitzahlen (komma-getrennt)
          </label>
          <input
            type="text"
            {...register('postal_codes')}
            placeholder="z.B. 8000, 8001, 8002"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Availability Date */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Verfügbar ab
          </label>
          <input
            type="date"
            {...register('availability_date')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition"
      >
        {loading ? 'Suche läuft...' : 'Wohnungen suchen'}
      </button>
    </form>
  );
};

export default SearchForm;
