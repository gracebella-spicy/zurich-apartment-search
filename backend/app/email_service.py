"""
Email service for sending alerts and contact forms
"""
import os
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

# Using Resend email service
try:
    import resend
    RESEND_AVAILABLE = True
except ImportError:
    RESEND_AVAILABLE = False
    logger.warning("Resend package not installed. Email functionality will be limited.")


def send_alert_email(user, search, properties):
    """
    Send email alert with matching properties
    """
    if not RESEND_AVAILABLE:
        logger.warning("Resend not available. Email not sent.")
        return False
    
    sender_email = os.getenv('SENDER_EMAIL', 'noreply@example.com')
    
    try:
        # Build email content
        subject = f"🏠 {len(properties)} neue Wohnungen gefunden!"
        
        html_content = f"""
        <h2>Neue Wohnungsangebote für deine Suche: {search.name}</h2>
        <p>Hallo {user.name},</p>
        <p>Es wurden {len(properties)} neue Immobilien gefunden, die deinen Suchkriterien entsprechen:</p>
        <ul>
        """
        
        for prop in properties:
            html_content += f"""
            <li>
                <strong>{prop.title}</strong><br>
                Preis: CHF {prop.price}/Monat<br>
                Größe: {prop.size} m²<br>
                Zimmer: {prop.rooms}<br>
                Adresse: {prop.address}, {prop.postal_code} {prop.city}<br>
                <a href="https://example.com/property/{prop.id}">Details ansehen</a>
            </li>
            """
        
        html_content += """
        </ul>
        <p><a href="https://example.com/dashboard">Alle Angebote anschauen</a></p>
        <p>Beste Grüße,<br>Dein Apartment Search Team</p>
        """
        
        # Send email via Resend
        params = {
            "from": sender_email,
            "to": user.email,
            "subject": subject,
            "html": html_content,
        }
        
        email = resend.Emails.send(params)
        logger.info(f"Alert email sent to {user.email}")
        return True
        
    except Exception as e:
        logger.error(f"Error sending alert email: {str(e)}")
        return False


def send_inquiry_email(user, property_obj, inquiry):
    """
    Send inquiry email to property manager
    """
    if not RESEND_AVAILABLE:
        logger.warning("Resend not available. Email not sent.")
        return False
    
    sender_email = os.getenv('SENDER_EMAIL', 'noreply@example.com')
    
    try:
        # Build email content
        html_content = f"""
        <p>Guten Tag,</p>
        <p>Ich interessiere mich für folgende Immobilie:</p>
        <p>
            <strong>{property_obj.title}</strong><br>
            {property_obj.address}<br>
            {property_obj.postal_code} {property_obj.city}
        </p>
        <p><strong>Meine Nachricht:</strong></p>
        <p>{inquiry.message}</p>
        <p>
            Mit freundlichen Grüßen,<br>
            {user.name}<br>
            Email: {user.email}<br>
            Telefon: {user.phone or 'Nicht angegeben'}
        </p>
        """
        
        params = {
            "from": sender_email,
            "to": inquiry.recipient_email,
            "reply_to": user.email,
            "subject": inquiry.subject,
            "html": html_content,
        }
        
        email = resend.Emails.send(params)
        logger.info(f"Inquiry email sent to {inquiry.recipient_email}")
        return True
        
    except Exception as e:
        logger.error(f"Error sending inquiry email: {str(e)}")
        return False


def send_confirmation_email(user, property_obj):
    """
    Send confirmation email to user after inquiry
    """
    if not RESEND_AVAILABLE:
        logger.warning("Resend not available. Email not sent.")
        return False
    
    sender_email = os.getenv('SENDER_EMAIL', 'noreply@example.com')
    
    try:
        html_content = f"""
        <p>Hallo {user.name},</p>
        <p>Deine Anfrage zu folgender Immobilie wurde versendet:</p>
        <p>
            <strong>{property_obj.title}</strong><br>
            {property_obj.address}<br>
            {property_obj.postal_code} {property_obj.city}
        </p>
        <p>Der Vermieter wird sich in Kürze bei dir melden.</p>
        <p>Beste Grüße,<br>Dein Apartment Search Team</p>
        """
        
        params = {
            "from": sender_email,
            "to": user.email,
            "subject": f"Anfrage bestätigt: {property_obj.title}",
            "html": html_content,
        }
        
        email = resend.Emails.send(params)
        logger.info(f"Confirmation email sent to {user.email}")
        return True
        
    except Exception as e:
        logger.error(f"Error sending confirmation email: {str(e)}")
        return False
