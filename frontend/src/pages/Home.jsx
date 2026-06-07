import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            🏠 Finde dein Traumzuhause in Zürich
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Durchsuche tausende Wohnungen und Häuser in der Gegend um Zürich mit intelligenten Suchfiltern und automatischen Benachrichtigungen.
          </p>
          <a
            href="/search"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition text-lg"
          >
            Jetzt suchen
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">Intelligente Suche</h3>
            <p className="text-gray-600">
              Filtere nach Zimmer, Größe, Preis, Standort und mehr
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-xl font-bold mb-2">Automatische Warnungen</h3>
            <p className="text-gray-600">
              Erhalte Email-Benachrichtigungen für neue Angebote
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2">Direkte Kontaktaufnahme</h3>
            <p className="text-gray-600">
              Sende Anfragen direkt an Vermieter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
