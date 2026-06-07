"""
Flask application factory
"""
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_name='development'):
    """Create and configure the Flask application"""
    app = Flask(__name__)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
        'DATABASE_URL', 
        'sqlite:///zurich_apartments.db'
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Enable CORS
    cors_origins = os.getenv('CORS_ORIGINS', 'http://localhost:5173').split(',')
    CORS(app, origins=cors_origins)
    
    # Register blueprints
    from app.routes import api_bp, health_bp
    app.register_blueprint(api_bp, url_prefix='/api')
    app.register_blueprint(health_bp)
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    # Start scheduler if enabled
    if os.getenv('SCRAPER_ENABLED', 'True') == 'True':
        from app.scheduler import start_scheduler
        start_scheduler(app)
    
    return app
