#!/usr/bin/env python
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alist_backend.settings')
django.setup()

from authentication.models import User

def create_test_user():
    """Create a test user for login testing"""
    try:
        # Check if user already exists
        user, created = User.objects.get_or_create(
            email='client@test.com',
            defaults={
                'username': 'client_test',
                'first_name': 'Test',
                'last_name': 'Client',
                'user_type': 'client',
                'is_verified': True,
                'verification_status': 'verified',
                'is_active': True,
            }
        )
        
        if created:
            # Set password for new user
            user.set_password('test123')
            user.save()
            print(f"✅ Test user created successfully!")
            print(f"Email: {user.email}")
            print(f"Password: test123")
            print(f"User Type: {user.user_type}")
        else:
            # Update password for existing user
            user.set_password('test123')
            user.save()
            print(f"✅ Test user updated successfully!")
            print(f"Email: {user.email}")
            print(f"Password: test123")
            print(f"User Type: {user.user_type}")
        
        return user
        
    except Exception as e:
        print(f"❌ Error creating test user: {e}")
        return None

if __name__ == '__main__':
    create_test_user()