"""
Database models for the apartment search application
"""
from datetime import datetime
from app import db
from sqlalchemy.dialects.postgresql import JSON

class User(db.Model):
    """User model for storing user profiles and preferences"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    name = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    searches = db.relationship('Search', backref='user', lazy=True, cascade='all, delete-orphan')
    saved_properties = db.relationship('SavedProperty', backref='user', lazy=True, cascade='all, delete-orphan')
    inquiries = db.relationship('Inquiry', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'phone': self.phone,
            'created_at': self.created_at.isoformat(),
        }


class Search(db.Model):
    """Saved search criteria"""
    __tablename__ = 'searches'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    
    # Search criteria
    property_type = db.Column(db.String(50))  # Wohnung, Haus, Studio
    min_rooms = db.Column(db.Integer)
    max_rooms = db.Column(db.Integer)
    min_size = db.Column(db.Integer)  # in m²
    max_size = db.Column(db.Integer)
    min_price = db.Column(db.Integer)  # in CHF
    max_price = db.Column(db.Integer)
    postal_codes = db.Column(db.String(500))  # Comma-separated
    availability_date = db.Column(db.Date)
    
    # Preferences
    preferences = db.Column(JSON)  # parking, garden, balcony, furnished, etc.
    alert_enabled = db.Column(db.Boolean, default=True)
    alert_frequency = db.Column(db.String(20), default='daily')  # daily, weekly, immediate
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_alert_sent = db.Column(db.DateTime)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'property_type': self.property_type,
            'min_rooms': self.min_rooms,
            'max_rooms': self.max_rooms,
            'min_size': self.min_size,
            'max_size': self.max_size,
            'min_price': self.min_price,
            'max_price': self.max_price,
            'postal_codes': self.postal_codes,
            'availability_date': self.availability_date.isoformat() if self.availability_date else None,
            'alert_enabled': self.alert_enabled,
            'alert_frequency': self.alert_frequency,
            'created_at': self.created_at.isoformat(),
        }


class Property(db.Model):
    """Scraped property listings"""
    __tablename__ = 'properties'
    
    id = db.Column(db.Integer, primary_key=True)
    external_id = db.Column(db.String(255), unique=True, index=True)  # ID from source website
    source = db.Column(db.String(50), index=True)  # immobilien.ch, homegate.ch, etc.
    source_url = db.Column(db.String(500))
    
    # Property details
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    property_type = db.Column(db.String(50))  # Wohnung, Haus, Studio
    rooms = db.Column(db.Integer)
    size = db.Column(db.Integer)  # in m²
    price = db.Column(db.Integer)  # Monthly rent in CHF
    
    # Location
    address = db.Column(db.String(200), nullable=False)
    postal_code = db.Column(db.String(10), index=True)
    city = db.Column(db.String(100), index=True)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    
    # Amenities
    amenities = db.Column(JSON)  # parking, garden, balcony, furnished, etc.
    
    # Contact info
    contact_name = db.Column(db.String(200))
    contact_email = db.Column(db.String(120))
    contact_phone = db.Column(db.String(20))
    
    # Images
    images = db.Column(JSON)  # List of image URLs
    
    # Availability
    availability_date = db.Column(db.Date)
    
    # Metadata
    scraped_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    last_checked = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True, index=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'external_id': self.external_id,
            'source': self.source,
            'title': self.title,
            'description': self.description,
            'property_type': self.property_type,
            'rooms': self.rooms,
            'size': self.size,
            'price': self.price,
            'address': self.address,
            'postal_code': self.postal_code,
            'city': self.city,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'amenities': self.amenities,
            'contact_name': self.contact_name,
            'contact_email': self.contact_email,
            'contact_phone': self.contact_phone,
            'images': self.images,
            'availability_date': self.availability_date.isoformat() if self.availability_date else None,
            'source_url': self.source_url,
            'scraped_at': self.scraped_at.isoformat(),
        }


class SavedProperty(db.Model):
    """User's saved/favorited properties"""
    __tablename__ = 'saved_properties'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False)
    
    notes = db.Column(db.Text)
    saved_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    property = db.relationship('Property', backref='saved_by_users')


class Inquiry(db.Model):
    """Track inquiries sent to property managers"""
    __tablename__ = 'inquiries'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False)
    
    subject = db.Column(db.String(200))
    message = db.Column(db.Text, nullable=False)
    recipient_email = db.Column(db.String(120), nullable=False)
    
    sent_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='sent')  # sent, bounced, replied
    
    property = db.relationship('Property')


class Alert(db.Model):
    """Email alerts sent to users"""
    __tablename__ = 'alerts'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    search_id = db.Column(db.Integer, db.ForeignKey('searches.id'), nullable=False)
    
    properties_found = db.Column(db.Integer, default=0)
    email_sent = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='sent')  # sent, bounced, failed
    
    user = db.relationship('User', backref='alerts')
    search = db.relationship('Search', backref='alerts')
