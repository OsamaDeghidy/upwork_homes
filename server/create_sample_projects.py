#!/usr/bin/env python
import os
import sys
import django
from decimal import Decimal

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alist_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from projects.models import Project, Category
from django.utils import timezone
from datetime import timedelta

User = get_user_model()

def create_sample_projects():
    # Get or create a client user
    client, created = User.objects.get_or_create(
        username='client_demo',
        defaults={
            'email': 'client@demo.com',
            'first_name': 'Sarah',
            'last_name': 'Johnson',
            'user_type': 'client',
            'phone': '+1-555-0123',
            'location': 'Los Angeles, CA',
            'is_verified': True,
            'is_active': True
        }
    )
    if created:
        client.set_password('demo123')
        client.save()
        print(f'✅ Created client user: {client.username}')

    # Get categories
    kitchen_cat = Category.objects.get(slug='kitchen-remodeling')
    bathroom_cat = Category.objects.get(slug='bathroom-renovation')
    electrical_cat = Category.objects.get(slug='electrical-work')
    plumbing_cat = Category.objects.get(slug='plumbing')
    landscaping_cat = Category.objects.get(slug='landscaping')

    projects_data = [
        {
            'title': 'Modern Kitchen Renovation - Luxury Design',
            'description': '''Looking for an experienced contractor to completely renovate our 200 sq ft kitchen. 
We want a modern design with quartz countertops, new custom cabinets, updated lighting, and premium appliances.

The project includes:
- Complete demolition of existing kitchen
- New electrical wiring and outlets
- Plumbing modifications for island sink
- Custom cabinet installation
- Quartz countertop installation
- Tile backsplash
- Premium lighting package
- Paint and finishing work

We have a detailed design plan ready and all permits are approved.''',
            'category': kitchen_cat,
            'budget_type': 'fixed',
            'budget_min': Decimal('8000'),
            'budget_max': Decimal('12000'),
            'budget_display': '$8,000 - $12,000',
            'location': 'Los Angeles, CA',
            'timeline': 'Within 6-8 weeks',
            'required_skills': ['Licensed Professional', 'Kitchen Design', 'Electrical Work', 'Plumbing'],
            'required_roles': ['home_pro'],
            'urgency': 'normal',
            'requires_license': True,
            'requires_insurance': True,
            'is_remote_allowed': False,
            'is_featured': True,
            'status': 'published'
        },
        {
            'title': 'Master Bathroom Tile Installation',
            'description': '''Need a skilled professional to install premium ceramic tiles in our master bathroom. 
The space is approximately 100 sq ft including shower, floor, and accent walls.

Requirements:
- Experience with waterproofing systems
- Precision tile cutting and layout
- Knowledge of proper drainage slopes
- Attention to detail for pattern matching

Materials will be provided by us. Looking for someone with proven tile work experience.''',
            'category': bathroom_cat,
            'budget_type': 'fixed',
            'budget_min': Decimal('2500'),
            'budget_max': Decimal('4000'),
            'budget_display': '$2,500 - $4,000',
            'location': 'Miami, FL',
            'timeline': 'Within 2-3 weeks',
            'required_skills': ['Tile Installation', 'Waterproofing', 'Precision Work'],
            'required_roles': ['home_pro'],
            'urgency': 'high',
            'requires_license': False,
            'requires_insurance': True,
            'is_remote_allowed': False,
            'status': 'published'
        },
        {
            'title': 'Electrical Panel Upgrade - 200A Service',
            'description': '''Seeking a licensed electrician to upgrade our home's electrical panel from 100A to 200A service.

Scope of work:
- Remove existing 100A panel
- Install new 200A main panel
- Update service entrance wiring
- Coordinate with utility company
- Obtain all necessary permits
- Pass final inspection

Must be licensed and insured. Project requires coordination with city inspectors.''',
            'category': electrical_cat,
            'budget_type': 'fixed',
            'budget_min': Decimal('1500'),
            'budget_max': Decimal('2500'),
            'budget_display': '$1,500 - $2,500',
            'location': 'Chicago, IL',
            'timeline': 'Within 1 month',
            'required_skills': ['Licensed Electrician', 'Panel Installation', 'Permit Coordination'],
            'required_roles': ['home_pro'],
            'urgency': 'urgent',
            'requires_license': True,
            'requires_insurance': True,
            'is_remote_allowed': False,
            'is_featured': True,
            'status': 'published'
        },
        {
            'title': 'Emergency Plumbing Repair - Kitchen Leak',
            'description': '''URGENT: Need immediate plumbing repair for a leak under the kitchen sink.
Water is causing damage to the cabinet and we need this fixed ASAP.

Issues observed:
- Constant dripping from main supply line
- Water pooling in cabinet base
- Possible pipe joint failure

Looking for a licensed plumber available today or tomorrow.''',
            'category': plumbing_cat,
            'budget_type': 'estimate',
            'budget_min': Decimal('200'),
            'budget_max': Decimal('500'),
            'budget_display': '$200 - $500',
            'location': 'Phoenix, AZ',
            'timeline': 'ASAP - Emergency',
            'required_skills': ['Emergency Plumbing', 'Leak Repair', 'Quick Response'],
            'required_roles': ['home_pro'],
            'urgency': 'urgent',
            'requires_license': True,
            'requires_insurance': True,
            'is_remote_allowed': False,
            'status': 'published'
        },
        {
            'title': 'Backyard Garden Landscaping Project',
            'description': '''Transform our backyard into a beautiful garden oasis. Looking for creative landscaping design and installation.

Project includes:
- Design consultation and planning
- Lawn removal and soil preparation
- Installation of flower beds and borders
- Tree and shrub planting
- Irrigation system installation
- Decorative stone pathways
- Garden lighting

We want drought-resistant plants and sustainable design solutions.''',
            'category': landscaping_cat,
            'budget_type': 'fixed',
            'budget_min': Decimal('5000'),
            'budget_max': Decimal('8000'),
            'budget_display': '$5,000 - $8,000',
            'location': 'San Diego, CA',
            'timeline': 'Within 4-6 weeks',
            'required_skills': ['Landscape Design', 'Irrigation Systems', 'Plant Knowledge', 'Sustainable Design'],
            'required_roles': ['specialist'],
            'urgency': 'normal',
            'requires_license': False,
            'requires_insurance': True,
            'is_remote_allowed': False,
            'is_featured': True,
            'status': 'published'
        },
        {
            'title': 'Interior House Painting - 3 Bedrooms',
            'description': '''Professional painting services needed for interior of 3-bedroom house.
Approximately 2,000 sq ft total area including bedrooms, hallways, and common areas.

Requirements:
- High-quality paint materials (we will provide)
- Proper surface preparation
- Clean, professional work
- Minimal disruption to daily routine
- Furniture protection and cleanup

Looking for experienced painters with good references.''',
            'category': Category.objects.get(slug='painting'),
            'budget_type': 'fixed',
            'budget_min': Decimal('3000'),
            'budget_max': Decimal('5000'),
            'budget_display': '$3,000 - $5,000',
            'location': 'Denver, CO',
            'timeline': 'Within 2-3 weeks',
            'required_skills': ['Interior Painting', 'Surface Preparation', 'Clean Work'],
            'required_roles': ['crew_member', 'home_pro'],
            'urgency': 'normal',
            'requires_license': False,
            'requires_insurance': True,
            'is_remote_allowed': False,
            'status': 'published'
        }
    ]

    created_count = 0
    
    for project_data in projects_data:
        # Check if project already exists
        if not Project.objects.filter(title=project_data['title']).exists():
            project = Project.objects.create(
                client=client,
                published_at=timezone.now() - timedelta(days=created_count),
                **project_data
            )
            created_count += 1
            print(f'✅ Created project: {project.title}')
        else:
            print(f'⏭️  Project already exists: {project_data["title"]}')

    print(f'\n🎉 Created {created_count} sample projects!')

if __name__ == '__main__':
    create_sample_projects() 