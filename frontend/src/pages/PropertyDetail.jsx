import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertyAPI, inquiryAPI } from '../services/api';
import ContactForm from '../components/ContactForm';
import PropertyMap from '../components/PropertyMap';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await propertyAPI.getProperty(id);
        setProperty(response.data);
      } catch (err) {
        setError('Fehler beim Laden der Immobilie');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleSubmitInquiry = async (formData) => {
    if (!property) return;

    setSubmitting(true);
    try {
      // In a real app, you'd need user context
      // await inquiryAPI.send(userId, {
      //   property_id: property.id,
      //   message: formData.message,
      //   subject: formData.subject,
      //   recipient_email: property.contact_email,
      // });
      alert('Anfrage wurde versendet!');
    } catch (err) {
      alert('Fehler beim Senden der Anfrage');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-600">Laden...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-red-600">{error}</p>
        <Link to="/search" className="text-blue-600 hover:underline">
          Zurück zur Suche
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/search" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Zurück zur Suche
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Images */}
          {property.images && property.images.length > 0 ? (
            <div className="mb-8">
              <img
                src={property.images[imageIndex]}
                alt={property.title}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
              {property.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        idx === imageIndex ? 'border-blue-600' : 'border-gray-300'
                      }`}
                    >
                      <img src={img} alt={`${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {/* Title and Price */}
          <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
          <p className="text-4xl font-bold text-blue-600 mb-6">
            CHF {property.price?.toLocaleString()}/Monat
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-gray-600 text-sm">Zimmer</p>
              <p className="text-2xl font-bold">{property.rooms}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Größe</p>
              <p className="text-2xl font-bold">{property.size} m²</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Typ</p>
              <p className="text-2xl font-bold">{property.property_type}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Verfügbar ab</p>
              <p className="text-2xl font-bold">{property.availability_date || 'Sofort'}</p>
            </div>
          </div>

          {/* Address */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Adresse</h2>
            <p className="text-gray-600">
              {property.address}<br />
              {property.postal_code} {property.city}
            </p>
          </div>

          {/* Description */}
          {property.description && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Beschreibung</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{property.description}</p>
            </div>
          )}

          {/* Amenities */}
          {property.amenities && Object.keys(property.amenities).length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Ausstattung</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {Object.entries(property.amenities).map(([key, value]) => (
                  value && <li key={key}>{key}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Map */}
          {property.latitude && property.longitude && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Lage</h2>
              <PropertyMap properties={[property]} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">
            {/* Contact Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold mb-2">Kontakt</h3>
              {property.contact_name && <p className="text-gray-600">{property.contact_name}</p>}
              {property.contact_email && (
                <p className="text-gray-600">
                  <a href={`mailto:${property.contact_email}`} className="text-blue-600 hover:underline">
                    {property.contact_email}
                  </a>
                </p>
              )}
              {property.contact_phone && <p className="text-gray-600">{property.contact_phone}</p>}
            </div>

            {/* Contact Form */}
            <ContactForm property={property} onSubmit={handleSubmitInquiry} loading={submitting} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
