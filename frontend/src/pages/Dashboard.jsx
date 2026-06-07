import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchAPI, savedAPI, inquiryAPI } from '../services/api';
import useStore from '../store';

const Dashboard = () => {
  const { user, searches, savedProperties, inquiries } = useStore();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('searches'); // 'searches', 'saved', 'inquiries'

  useEffect(() => {
    // In a real app, fetch data for current user
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-600">Laden...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Mein Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('searches')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'searches'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Meine Suchen ({searches.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'saved'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Gespeicherte Wohnungen ({savedProperties.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'inquiries'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Anfragen ({inquiries.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === 'searches' && (
        <div className="space-y-4">
          {searches.length === 0 ? (
            <p className="text-gray-600">Keine gespeicherten Suchen. <Link to="/search" className="text-blue-600 hover:underline">Neue Suche erstellen</Link></p>
          ) : (
            searches.map((search) => (
              <div key={search.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold">{search.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {search.property_type || 'Alle Typen'} • 
                      {search.min_price && search.max_price
                        ? ` CHF ${search.min_price}-${search.max_price}/Monat`
                        : ' Beliebiger Preis'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:underline text-sm">Bearbeiten</button>
                    <button className="text-red-600 hover:underline text-sm">Löschen</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedProperties.length === 0 ? (
            <p className="text-gray-600">Keine gespeicherten Wohnungen. <Link to="/search" className="text-blue-600 hover:underline">Nach Wohnungen suchen</Link></p>
          ) : (
            savedProperties.map((saved) => (
              <div key={saved.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold">{saved.property?.title}</h3>
                    <p className="text-blue-600 font-bold">CHF {saved.property?.price}/Monat</p>
                    <p className="text-gray-600 text-sm">{saved.property?.address}, {saved.property?.postal_code} {saved.property?.city}</p>
                    {saved.notes && <p className="text-gray-600 text-sm mt-2">Notizen: {saved.notes}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/property/${saved.property?.id}`} className="text-blue-600 hover:underline text-sm">Details</Link>
                    <button className="text-red-600 hover:underline text-sm">Löschen</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          {inquiries.length === 0 ? (
            <p className="text-gray-600">Keine Anfragen gesendet.</p>
          ) : (
            inquiries.map((inquiry) => (
              <div key={inquiry.id} className="bg-white rounded-lg shadow-md p-4">
                <div>
                  <h3 className="text-lg font-bold">{inquiry.subject}</h3>
                  <p className="text-gray-600 text-sm">Gesendet an: {inquiry.recipient_email}</p>
                  <p className="text-gray-600 text-sm">Status: <span className="capitalize">{inquiry.status}</span></p>
                  <p className="text-gray-600 text-sm mt-2">{inquiry.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
