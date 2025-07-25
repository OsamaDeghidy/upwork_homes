#!/usr/bin/env python
"""
Create English Sample Data
==========================

Script to create comprehensive English sample data for A-List APIs
"""

import os
import sys
import json
from datetime import datetime, timedelta

# Django setup
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alist_backend.settings')

import django
django.setup()

from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

def create_english_users():
    """Create English sample users"""
    print("👥 Creating English sample users...")
    
    users_data = [
        {
            'username': 'john_admin',
            'email': 'john.admin@alist.com',
            'first_name': 'John',
            'last_name': 'Administrator',
            'user_type': 'admin',
            'is_staff': True,
            'is_superuser': True,
            'location': 'New York, USA',
            'bio': 'Platform administrator with extensive experience in home services management'
        },
        {
            'username': 'sarah_client',
            'email': 'sarah.client@example.com',
            'first_name': 'Sarah',
            'last_name': 'Johnson',
            'user_type': 'client',
            'location': 'Los Angeles, CA',
            'bio': 'Homeowner looking for quality professionals for home improvement projects'
        },
        {
            'username': 'mike_pro',
            'email': 'mike.pro@example.com',
            'first_name': 'Mike',
            'last_name': 'Thompson',
            'user_type': 'home_pro',
            'location': 'Chicago, IL',
            'bio': 'Professional contractor with 10+ years experience in home renovation and repair'
        },
        {
            'username': 'lisa_specialist',
            'email': 'lisa.specialist@example.com',
            'first_name': 'Lisa',
            'last_name': 'Rodriguez',
            'user_type': 'specialist',
            'location': 'Miami, FL',
            'bio': 'Interior design specialist focusing on modern and contemporary home aesthetics'
        },
        {
            'username': 'david_crew',
            'email': 'david.crew@example.com',
            'first_name': 'David',
            'last_name': 'Wilson',
            'user_type': 'crew_member',
            'location': 'Seattle, WA',
            'bio': 'Experienced crew member specializing in electrical and plumbing work'
        }
    ]
    
    created_users = []
    
    for user_data in users_data:
        user, created = User.objects.get_or_create(
            username=user_data['username'],
            defaults={
                'email': user_data['email'],
                'first_name': user_data['first_name'],
                'last_name': user_data['last_name'],
                'user_type': user_data['user_type'],
                'is_staff': user_data.get('is_staff', False),
                'is_superuser': user_data.get('is_superuser', False),
                'location': user_data['location'],
                'bio': user_data['bio'],
                'is_verified': True
            }
        )
        
        if created:
            user.set_password('password123')
            user.save()
            created_users.append(user)
            print(f"✅ Created user: {user.username} ({user.user_type})")
    
    return created_users

def generate_english_api_examples():
    """Generate English API usage examples"""
    print("📝 Generating English API examples...")
    
    examples = {
        "authentication": {
            "register_user": {
                "endpoint": "POST /api/auth/register/",
                "description": "Register a new user account",
                "sample_data": {
                    "username": "new_professional",
                    "email": "professional@example.com",
                    "password": "SecurePass123!",
                    "password_confirm": "SecurePass123!",
                    "first_name": "Alex",
                    "last_name": "Smith",
                    "user_type": "home_pro",
                    "location": "San Francisco, CA",
                    "bio": "Experienced home professional specializing in kitchen renovations"
                }
            },
            "login": {
                "endpoint": "POST /api/auth/login/",
                "description": "Authenticate user and get JWT token",
                "sample_data": {
                    "email": "mike.pro@example.com",
                    "password": "password123"
                }
            }
        },
        "projects": {
            "create_project": {
                "endpoint": "POST /api/projects/",
                "description": "Create a new home improvement project",
                "sample_data": {
                    "title": "Kitchen Renovation Project",
                    "description": "Complete kitchen remodel including cabinets, countertops, appliances, and flooring. Looking for experienced contractor.",
                    "budget_min": 15000,
                    "budget_max": 25000,
                    "currency": "USD",
                    "location": "Los Angeles, CA",
                    "duration_days": 45,
                    "skills_required": ["Kitchen Design", "Cabinet Installation", "Plumbing", "Electrical Work"],
                    "project_type": "fixed",
                    "urgency": "medium"
                }
            },
            "bathroom_renovation": {
                "endpoint": "POST /api/projects/",
                "description": "Bathroom renovation project",
                "sample_data": {
                    "title": "Master Bathroom Renovation",
                    "description": "Modern bathroom renovation with walk-in shower, double vanity, and premium fixtures.",
                    "budget_min": 8000,
                    "budget_max": 15000,
                    "currency": "USD",
                    "location": "Chicago, IL",
                    "duration_days": 30,
                    "skills_required": ["Bathroom Design", "Tile Work", "Plumbing", "Electrical"],
                    "project_type": "fixed",
                    "urgency": "low"
                }
            }
        },
        "messaging": {
            "send_message": {
                "endpoint": "POST /api/messages/",
                "description": "Send a message in project conversation",
                "sample_data": {
                    "conversation_id": 1,
                    "content": "Hi! I'm interested in your project. I have 10+ years of experience in kitchen renovations and would love to discuss the details with you.",
                    "message_type": "text"
                }
            }
        },
        "reviews": {
            "create_review": {
                "endpoint": "POST /api/reviews/",
                "description": "Leave a review for a professional",
                "sample_data": {
                    "professional_id": 3,
                    "project_id": 1,
                    "rating": 5,
                    "title": "Excellent Work and Communication",
                    "comment": "Mike did an outstanding job on our kitchen renovation. Professional, timely, and attention to detail was exceptional. Highly recommend!",
                    "skills_ratings": {
                        "communication": 5,
                        "quality": 5,
                        "timeliness": 5,
                        "professionalism": 5
                    },
                    "would_recommend": True
                }
            }
        },
        "portfolio": {
            "add_portfolio_item": {
                "endpoint": "POST /api/portfolio/",
                "description": "Add a new portfolio item",
                "sample_data": {
                    "title": "Modern Kitchen Renovation - Downtown Condo",
                    "description": "Complete kitchen transformation featuring quartz countertops, custom cabinets, and stainless steel appliances. Project completed in 6 weeks.",
                    "category": "Kitchen Renovation",
                    "technologies": ["Custom Cabinetry", "Quartz Countertops", "LED Lighting", "Smart Appliances"],
                    "project_duration": "6 weeks",
                    "client_feedback": "Outstanding results, exceeded expectations",
                    "completion_date": "2024-01-15",
                    "is_featured": True
                }
            }
        }
    }
    
    # Save examples to JSON file
    with open('english_api_examples.json', 'w', encoding='utf-8') as f:
        json.dump(examples, f, indent=2)
    
    print("✅ Created english_api_examples.json")
    return examples

def create_postman_collection_english():
    """Create English Postman collection"""
    print("📮 Creating English Postman collection...")
    
    collection = {
        "info": {
            "name": "A-List Home Professionals API - English",
            "description": "Complete API collection for A-List platform with English sample data",
            "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        "auth": {
            "type": "bearer",
            "bearer": [{"key": "token", "value": "{{access_token}}", "type": "string"}]
        },
        "variable": [
            {"key": "base_url", "value": "http://localhost:8000", "type": "string"},
            {"key": "access_token", "value": "", "type": "string"}
        ],
        "item": [
            {
                "name": "Authentication",
                "item": [
                    {
                        "name": "Login Professional",
                        "request": {
                            "method": "POST",
                            "header": [{"key": "Content-Type", "value": "application/json"}],
                            "body": {
                                "mode": "raw",
                                "raw": json.dumps({
                                    "email": "mike.pro@example.com",
                                    "password": "password123"
                                })
                            },
                            "url": {
                                "raw": "{{base_url}}/api/auth/login/",
                                "host": ["{{base_url}}"],
                                "path": ["api", "auth", "login", ""]
                            }
                        }
                    },
                    {
                        "name": "Register New Professional",
                        "request": {
                            "method": "POST",
                            "header": [{"key": "Content-Type", "value": "application/json"}],
                            "body": {
                                "mode": "raw",
                                "raw": json.dumps({
                                    "username": "emma_designer",
                                    "email": "emma.designer@example.com",
                                    "password": "SecurePass123!",
                                    "password_confirm": "SecurePass123!",
                                    "first_name": "Emma",
                                    "last_name": "Davis",
                                    "user_type": "home_pro",
                                    "location": "Austin, TX",
                                    "bio": "Interior designer with focus on sustainable and eco-friendly designs"
                                })
                            },
                            "url": {
                                "raw": "{{base_url}}/api/auth/register/",
                                "host": ["{{base_url}}"],
                                "path": ["api", "auth", "register", ""]
                            }
                        }
                    }
                ]
            },
            {
                "name": "Projects",
                "item": [
                    {
                        "name": "Create Kitchen Project",
                        "request": {
                            "method": "POST",
                            "header": [{"key": "Content-Type", "value": "application/json"}],
                            "body": {
                                "mode": "raw",
                                "raw": json.dumps({
                                    "title": "Modern Kitchen Renovation",
                                    "description": "Looking for professional contractor to renovate our outdated kitchen with modern design and appliances",
                                    "budget_min": 20000,
                                    "budget_max": 35000,
                                    "currency": "USD",
                                    "location": "Denver, CO",
                                    "duration_days": 42,
                                    "skills_required": ["Kitchen Design", "Cabinetry", "Countertops", "Appliance Installation"],
                                    "project_type": "fixed",
                                    "urgency": "medium"
                                })
                            },
                            "url": {
                                "raw": "{{base_url}}/api/projects/",
                                "host": ["{{base_url}}"],
                                "path": ["api", "projects", ""]
                            }
                        }
                    }
                ]
            }
        ]
    }
    
    with open('A-List_English_API_Collection.json', 'w', encoding='utf-8') as f:
        json.dump(collection, f, indent=2)
    
    print("✅ Created A-List_English_API_Collection.json")

def print_english_usage_guide():
    """Print comprehensive English usage guide"""
    print("\n" + "="*60)
    print("🚀 A-List API - English Usage Guide")
    print("="*60)
    
    print("\n🔑 Login Credentials (All users: password123):")
    print("• Admin: john.admin@alist.com")
    print("• Client: sarah.client@example.com") 
    print("• Professional: mike.pro@example.com")
    print("• Specialist: lisa.specialist@example.com")
    print("• Crew Member: david.crew@example.com")
    
    print("\n🌐 API Endpoints:")
    print("• Swagger UI: http://localhost:8000/api/docs/")
    print("• API Root: http://localhost:8000/api/")
    print("• Admin Panel: http://localhost:8000/admin/")
    
    print("\n📋 Sample Project Data (English):")
    project_example = {
        "title": "Luxury Bathroom Remodel",
        "description": "Transform existing bathroom into spa-like retreat with premium materials",
        "budget_min": 12000,
        "budget_max": 20000,
        "currency": "USD",
        "location": "San Diego, CA",
        "skills_required": ["Bathroom Design", "Tile Installation", "Custom Vanity", "Lighting"]
    }
    print(json.dumps(project_example, indent=2))
    
    print("\n💬 Sample Message Data:")
    message_example = {
        "content": "I'm very interested in your bathroom renovation project. I have completed over 50 similar projects in the San Diego area. Would you like to schedule a consultation?",
        "message_type": "text"
    }
    print(json.dumps(message_example, indent=2))
    
    print("\n⭐ Sample Review Data:")
    review_example = {
        "rating": 5,
        "title": "Professional and High Quality Work",
        "comment": "Exceptional craftsmanship and attention to detail. Project was completed on time and within budget. Would definitely hire again!",
        "would_recommend": True
    }
    print(json.dumps(review_example, indent=2))

def main():
    """Main function"""
    print("🇺🇸 A-List English Data Creator")
    print("="*50)
    
    # Create English users
    users = create_english_users()
    
    # Generate API examples
    examples = generate_english_api_examples()
    
    # Create Postman collection
    create_postman_collection_english()
    
    # Print usage guide
    print_english_usage_guide()
    
    print("\n" + "="*60)
    print("✅ English setup completed successfully!")
    print("\n📁 Files created:")
    print("• english_api_examples.json - API usage examples")
    print("• A-List_English_API_Collection.json - Postman collection")
    
    print("\n🎯 Next steps:")
    print("1. Start server: python manage.py runserver")
    print("2. Open Swagger: http://localhost:8000/api/docs/")
    print("3. Login with English credentials")
    print("4. Test APIs with English sample data")
    
    print("\n💡 All API responses and data will now be in English!")

if __name__ == "__main__":
    main() 