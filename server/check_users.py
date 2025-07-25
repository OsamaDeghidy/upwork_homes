#!/usr/bin/env python
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alist_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

User = get_user_model()

def check_users():
    """Check existing users in database"""
    print("=== Checking Users in Database ===")
    
    # Get all users
    users = User.objects.all()
    print(f"Total users: {users.count()}")
    
    for user in users:
        print(f"\nUser ID: {user.id}")
        print(f"Username: {user.username}")
        print(f"Email: {user.email}")
        print(f"First Name: {user.first_name}")
        print(f"Last Name: {user.last_name}")
        print(f"User Type: {user.user_type}")
        print(f"Is Active: {user.is_active}")
        print(f"Is Verified: {user.is_verified}")
        print("-" * 50)

def test_login(email, password):
    """Test login with specific credentials"""
    print(f"\n=== Testing Login ===")
    print(f"Email: {email}")
    print(f"Password: {password}")
    
    try:
        # Check if user exists
        user = User.objects.get(email=email)
        print(f"User found: {user.username}")
        print(f"User is active: {user.is_active}")
        
        # Test authentication
        authenticated_user = authenticate(username=user.username, password=password)
        if authenticated_user:
            print("✅ Authentication successful!")
            return True
        else:
            print("❌ Authentication failed!")
            return False
            
    except User.DoesNotExist:
        print(f"❌ User with email {email} not found!")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def create_user_if_not_exists(email, password, first_name="Test", last_name="User"):
    """Create user if not exists"""
    print(f"\n=== Creating User if not exists ===")
    print(f"Email: {email}")
    
    try:
        # Check if user exists
        if User.objects.filter(email=email).exists():
            print(f"User already exists: {email}")
            return False
        
        # Create user
        username = email.split('@')[0]  # Use email prefix as username
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            user_type='client',
            is_verified=True,
            verification_status='verified'
        )
        
        print(f"✅ User created successfully!")
        print(f"Username: {user.username}")
        print(f"Email: {user.email}")
        print(f"User ID: {user.id}")
        return True
        
    except Exception as e:
        print(f"❌ Error creating user: {e}")
        return False

if __name__ == '__main__':
    print("=== User Management Script ===")
    
    # Check existing users
    check_users()
    
    # Test specific user login
    test_email = "m01066906132@gmail.com"
    test_password = "osama5555"
    
    # Test login
    login_success = test_login(test_email, test_password)
    
    if not login_success:
        print(f"\nUser {test_email} not found or password incorrect.")
        print("Creating user...")
        create_user_if_not_exists(test_email, test_password, "Osama", "User")
        
        # Test login again
        print("\nTesting login again...")
        test_login(test_email, test_password)
    
    print("\n=== Script completed ===") 