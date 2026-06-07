"""
API routes for the apartment search application
"""
from flask import Blueprint, request, jsonify
from app import db
from app.models import User, Search, Property, SavedProperty, Inquiry
from datetime import datetime
from sqlalchemy import and_, or_

api_bp = Blueprint('api', __name__)
health_bp = Blueprint('health', __name__)


# Health Check
@health_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.utcnow().isoformat()}), 200


# Users
@api_bp.route('/users', methods=['POST'])
def create_user():
    """Create a new user"""
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('name'):
        return jsonify({'error': 'Email and name are required'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'User already exists'}), 409
    
    user = User(
        email=data['email'],
        name=data['name'],
        phone=data.get('phone')
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify(user.to_dict()), 201


@api_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get user details"""
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict()), 200


@api_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """Update user details"""
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    if 'name' in data:
        user.name = data['name']
    if 'phone' in data:
        user.phone = data['phone']
    
    user.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(user.to_dict()), 200


# Searches (Saved Searches)
@api_bp.route('/users/<int:user_id>/searches', methods=['POST'])
def create_search(user_id):
    """Create a new saved search"""
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    search = Search(
        user_id=user_id,
        name=data.get('name', 'New Search'),
        property_type=data.get('property_type'),
        min_rooms=data.get('min_rooms'),
        max_rooms=data.get('max_rooms'),
        min_size=data.get('min_size'),
        max_size=data.get('max_size'),
        min_price=data.get('min_price'),
        max_price=data.get('max_price'),
        postal_codes=data.get('postal_codes'),
        availability_date=datetime.fromisoformat(data['availability_date']) if data.get('availability_date') else None,
        preferences=data.get('preferences', {}),
        alert_enabled=data.get('alert_enabled', True),
        alert_frequency=data.get('alert_frequency', 'daily')
    )
    
    db.session.add(search)
    db.session.commit()
    
    return jsonify(search.to_dict()), 201


@api_bp.route('/users/<int:user_id>/searches', methods=['GET'])
def get_searches(user_id):
    """Get all searches for a user"""
    User.query.get_or_404(user_id)
    searches = Search.query.filter_by(user_id=user_id).all()
    return jsonify([s.to_dict() for s in searches]), 200


@api_bp.route('/searches/<int:search_id>', methods=['PUT'])
def update_search(search_id):
    """Update a saved search"""
    search = Search.query.get_or_404(search_id)
    data = request.get_json()
    
    for key in ['name', 'property_type', 'min_rooms', 'max_rooms', 'min_size', 'max_size', 'min_price', 'max_price', 'postal_codes', 'alert_enabled', 'alert_frequency']:
        if key in data:
            setattr(search, key, data[key])
    
    if 'availability_date' in data:
        search.availability_date = datetime.fromisoformat(data['availability_date']) if data['availability_date'] else None
    
    search.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(search.to_dict()), 200


@api_bp.route('/searches/<int:search_id>', methods=['DELETE'])
def delete_search(search_id):
    """Delete a saved search"""
    search = Search.query.get_or_404(search_id)
    db.session.delete(search)
    db.session.commit()
    return '', 204


# Properties Search
@api_bp.route('/properties/search', methods=['POST'])
def search_properties():
    """Search for properties matching criteria"""
    data = request.get_json()
    
    query = Property.query.filter_by(is_active=True)
    
    # Apply filters
    if data.get('property_type'):
        query = query.filter_by(property_type=data['property_type'])
    
    if data.get('min_rooms'):
        query = query.filter(Property.rooms >= data['min_rooms'])
    
    if data.get('max_rooms'):
        query = query.filter(Property.rooms <= data['max_rooms'])
    
    if data.get('min_size'):
        query = query.filter(Property.size >= data['min_size'])
    
    if data.get('max_size'):
        query = query.filter(Property.size <= data['max_size'])
    
    if data.get('min_price'):
        query = query.filter(Property.price >= data['min_price'])
    
    if data.get('max_price'):
        query = query.filter(Property.price <= data['max_price'])
    
    # Postal code filter
    if data.get('postal_codes'):
        postal_codes = [pc.strip() for pc in data['postal_codes'].split(',')]
        query = query.filter(Property.postal_code.in_(postal_codes))
    
    # Availability date filter
    if data.get('availability_date'):
        availability = datetime.fromisoformat(data['availability_date']).date()
        query = query.filter(Property.availability_date <= availability)
    
    # Pagination
    page = data.get('page', 1)
    per_page = data.get('per_page', 20)
    
    paginated = query.paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        'total': paginated.total,
        'pages': paginated.pages,
        'current_page': page,
        'properties': [p.to_dict() for p in paginated.items]
    }), 200


@api_bp.route('/properties/<int:property_id>', methods=['GET'])
def get_property(property_id):
    """Get property details"""
    property_obj = Property.query.get_or_404(property_id)
    return jsonify(property_obj.to_dict()), 200


# Saved Properties
@api_bp.route('/users/<int:user_id>/saved-properties', methods=['POST'])
def save_property(user_id):
    """Save a property"""
    User.query.get_or_404(user_id)
    data = request.get_json()
    
    saved = SavedProperty(
        user_id=user_id,
        property_id=data['property_id'],
        notes=data.get('notes')
    )
    
    db.session.add(saved)
    db.session.commit()
    
    return jsonify({'message': 'Property saved'}), 201


@api_bp.route('/users/<int:user_id>/saved-properties', methods=['GET'])
def get_saved_properties(user_id):
    """Get user's saved properties"""
    User.query.get_or_404(user_id)
    saved = SavedProperty.query.filter_by(user_id=user_id).all()
    return jsonify([
        {
            'id': s.id,
            'property': s.property.to_dict(),
            'notes': s.notes,
            'saved_at': s.saved_at.isoformat()
        } for s in saved
    ]), 200


@api_bp.route('/saved-properties/<int:saved_id>', methods=['DELETE'])
def remove_saved_property(saved_id):
    """Remove a saved property"""
    saved = SavedProperty.query.get_or_404(saved_id)
    db.session.delete(saved)
    db.session.commit()
    return '', 204


# Inquiries
@api_bp.route('/users/<int:user_id>/inquiries', methods=['POST'])
def send_inquiry(user_id):
    """Send an inquiry to property manager"""
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    property_obj = Property.query.get_or_404(data['property_id'])
    
    inquiry = Inquiry(
        user_id=user_id,
        property_id=data['property_id'],
        subject=data.get('subject', f"Anfrage zu: {property_obj.title}"),
        message=data['message'],
        recipient_email=data.get('recipient_email', property_obj.contact_email)
    )
    
    db.session.add(inquiry)
    db.session.commit()
    
    # TODO: Send actual email here
    # from app.email_service import send_inquiry_email
    # send_inquiry_email(user, property_obj, inquiry)
    
    return jsonify({'message': 'Inquiry sent', 'inquiry_id': inquiry.id}), 201


@api_bp.route('/users/<int:user_id>/inquiries', methods=['GET'])
def get_inquiries(user_id):
    """Get user's sent inquiries"""
    User.query.get_or_404(user_id)
    inquiries = Inquiry.query.filter_by(user_id=user_id).all()
    return jsonify([
        {
            'id': i.id,
            'property': i.property.to_dict(),
            'subject': i.subject,
            'message': i.message,
            'recipient_email': i.recipient_email,
            'sent_at': i.sent_at.isoformat(),
            'status': i.status
        } for i in inquiries
    ]), 200


# Statistics
@api_bp.route('/stats', methods=['GET'])
def get_stats():
    """Get application statistics"""
    return jsonify({
        'total_properties': Property.query.count(),
        'active_properties': Property.query.filter_by(is_active=True).count(),
        'total_users': User.query.count(),
        'total_saved': SavedProperty.query.count(),
        'total_inquiries': Inquiry.query.count(),
    }), 200
