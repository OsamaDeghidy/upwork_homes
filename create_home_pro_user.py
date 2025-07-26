import os
import sys
import django

# Change to server directory
os.chdir('server')

# Set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alist_backend.settings')
django.setup()

from django.contrib.auth.models import User
from accounts.models import UserProfile

# Create a home_pro user
email = 'testpro@test.com'
password = 'testpass123'

try:
    # Check if user already exists
    if User.objects.filter(email=email).exists():
        user = User.objects.get(email=email)
        print(f'User {email} already exists')
    else:
        # Create new user
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name='Test',
            last_name='Professional'
        )
        print(f'Created user: {email}')
    
    # Get or create user profile
    profile, created = UserProfile.objects.get_or_create(
        user=user,
        defaults={
            'user_type': 'home_pro',
            'phone': '+1234567890',
            'location': 'Test City',
            'bio': 'Test professional user',
            'hourly_rate': 50.00,
            'experience_years': 5
        }
    )
    
    if created:
        print(f'Created profile for {email} with type: {profile.user_type}')
    else:
        # Update existing profile to home_pro
        profile.user_type = 'home_pro'
        profile.save()
        print(f'Updated profile for {email} to type: {profile.user_type}')
    
    print(f'✅ User {email} is ready with password: {password}')
    
except Exception as e:
    print(f'❌ Error: {e}')