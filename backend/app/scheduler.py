"""
Task scheduler for periodic scraping and alerts
"""
import os
import logging
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from app.scrapers import scrape_all_sources
from app.models import User, Search, Property, Alert
from app.email_service import send_alert_email
from sqlalchemy import and_
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

scheduler = None


def scrape_properties_job():
    """Scheduled job to scrape properties"""
    try:
        logger.info("Starting scheduled scraping job")
        
        # Scrape with default filters
        scrape_all_sources(
            property_type='',
            min_price=0,
            max_price=10000,
        )
        
        # Check for new properties and send alerts
        check_and_send_alerts()
        
        logger.info("Scraping job completed successfully")
    except Exception as e:
        logger.error(f"Error in scraping job: {str(e)}")


def check_and_send_alerts():
    """Check searches and send alerts for new matching properties"""
    try:
        logger.info("Checking for properties to alert users about")
        
        searches = Search.query.filter_by(alert_enabled=True).all()
        
        for search in searches:
            try:
                # Find properties matching this search
                query = Property.query.filter_by(is_active=True)
                
                if search.property_type:
                    query = query.filter_by(property_type=search.property_type)
                
                if search.min_rooms:
                    query = query.filter(Property.rooms >= search.min_rooms)
                
                if search.max_rooms:
                    query = query.filter(Property.rooms <= search.max_rooms)
                
                if search.min_size:
                    query = query.filter(Property.size >= search.min_size)
                
                if search.max_size:
                    query = query.filter(Property.size <= search.max_size)
                
                if search.min_price:
                    query = query.filter(Property.price >= search.min_price)
                
                if search.max_price:
                    query = query.filter(Property.price <= search.max_price)
                
                if search.postal_codes:
                    postal_codes = [pc.strip() for pc in search.postal_codes.split(',')]
                    query = query.filter(Property.postal_code.in_(postal_codes))
                
                # Only get properties scraped since last alert
                if search.last_alert_sent:
                    query = query.filter(Property.scraped_at > search.last_alert_sent)
                else:
                    # For first alert, get properties from last 24 hours
                    yesterday = datetime.utcnow() - timedelta(hours=24)
                    query = query.filter(Property.scraped_at > yesterday)
                
                matching_properties = query.all()
                
                if matching_properties:
                    # Send alert
                    success = send_alert_email(search.user, search, matching_properties)
                    
                    if success:
                        # Record alert
                        alert = Alert(
                            user_id=search.user_id,
                            search_id=search.id,
                            properties_found=len(matching_properties),
                            status='sent'
                        )
                        
                        # Update last alert sent time
                        search.last_alert_sent = datetime.utcnow()
                        
                        from app import db
                        db.session.add(alert)
                        db.session.commit()
                        
                        logger.info(f"Alert sent to {search.user.email} for search '{search.name}' with {len(matching_properties)} properties")
                
            except Exception as e:
                logger.error(f"Error processing search {search.id}: {str(e)}")
        
    except Exception as e:
        logger.error(f"Error checking and sending alerts: {str(e)}")


def start_scheduler(app):
    """Start the background scheduler"""
    global scheduler
    
    if scheduler is not None:
        return
    
    try:
        scheduler = BackgroundScheduler()
        scheduler.daemon = True
        
        # Get interval from environment (default: 24 hours)
        interval_hours = int(os.getenv('SCRAPER_INTERVAL_HOURS', 24))
        
        # Add job to run scraping periodically
        scheduler.add_job(
            func=scrape_properties_job,
            trigger=IntervalTrigger(hours=interval_hours),
            id='scrape_properties',
            name='Scrape properties from web',
            replace_existing=True
        )
        
        scheduler.start()
        logger.info(f"Scheduler started. Scraping every {interval_hours} hours.")
        
    except Exception as e:
        logger.error(f"Error starting scheduler: {str(e)}")
