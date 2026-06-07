import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { ZURICH_CENTER } from '../services/config';

// Fix Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PropertyMap = ({ properties = [] }) => {
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={[ZURICH_CENTER.lat, ZURICH_CENTER.lng]}
        zoom={12}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {properties.map((property) => (
          property.latitude && property.longitude && (
            <Marker
              key={property.id}
              position={[property.latitude, property.longitude]}
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-gray-600">CHF {property.price}/Monat</p>
                  <p className="text-gray-600">{property.address}</p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
