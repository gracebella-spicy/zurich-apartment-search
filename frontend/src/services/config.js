// Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const PROPERTY_TYPES = [
  { value: 'Wohnung', label: 'Wohnung (Apartment)' },
  { value: 'Haus', label: 'Haus (House)' },
  { value: 'Studio', label: 'Studio' },
  { value: 'Maisonette', label: 'Maisonette' },
];

export const ROOM_OPTIONS = [
  { value: 1, label: '1 Zimmer' },
  { value: 2, label: '2 Zimmer' },
  { value: 3, label: '3 Zimmer' },
  { value: 4, label: '4 Zimmer' },
  { value: 5, label: '5+ Zimmer' },
];

export const ALERT_FREQUENCIES = [
  { value: 'immediate', label: 'Sofort' },
  { value: 'daily', label: 'Täglich' },
  { value: 'weekly', label: 'Wöchentlich' },
];

export const ZURICH_AREA_POSTAL_CODES = [
  '8000', '8001', '8002', '8003', '8004', '8005', '8006', '8007', '8008', '8009',
  '8010', '8011', '8012', '8013', '8014', '8015', '8016', '8017', '8018', '8019',
  '8020', '8021', '8022', '8023', '8024', '8025', '8026', '8027', '8028', '8029',
  '8030', '8031', '8032', '8033', '8034', '8035', '8036', '8037', '8038', '8039',
  '8040', '8041', '8042', '8043', '8044', '8045', '8046', '8047', '8048', '8049',
  '8050', '8051', '8052', '8053', '8054', '8055', '8056', '8057', '8058', '8059',
];

export const ZURICH_CENTER = {
  lat: 47.3769,
  lng: 8.5472,
};
