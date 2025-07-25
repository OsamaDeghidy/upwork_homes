#!/usr/bin/env python
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alist_backend.settings')
django.setup()

from django.utils.text import slugify
from projects.models import Category

def create_categories():
    categories_data = [
        {
            'name': 'Kitchen Remodeling',
            'description': 'Complete kitchen renovations and upgrades',
            'icon': 'fas fa-utensils',
            'order': 1
        },
        {
            'name': 'Bathroom Renovation',
            'description': 'Bathroom improvements and renovations',
            'icon': 'fas fa-bath',
            'order': 2
        },
        {
            'name': 'Electrical Work',
            'description': 'Electrical installations and repairs',
            'icon': 'fas fa-bolt',
            'order': 3
        },
        {
            'name': 'Plumbing',
            'description': 'Plumbing installations and repairs',
            'icon': 'fas fa-wrench',
            'order': 4
        },
        {
            'name': 'Roofing',
            'description': 'Roof repairs and installations',
            'icon': 'fas fa-home',
            'order': 5
        },
        {
            'name': 'HVAC Services',
            'description': 'Heating, ventilation, and air conditioning',
            'icon': 'fas fa-thermometer-half',
            'order': 6
        },
        {
            'name': 'Landscaping',
            'description': 'Garden and outdoor space improvements',
            'icon': 'fas fa-leaf',
            'order': 7
        },
        {
            'name': 'Painting',
            'description': 'Interior and exterior painting services',
            'icon': 'fas fa-paint-brush',
            'order': 8
        },
        {
            'name': 'Flooring',
            'description': 'Floor installation and refinishing',
            'icon': 'fas fa-layer-group',
            'order': 9
        },
        {
            'name': 'Carpentry',
            'description': 'Custom woodwork and carpentry',
            'icon': 'fas fa-hammer',
            'order': 10
        },
        {
            'name': 'General Contracting',
            'description': 'General construction and contracting',
            'icon': 'fas fa-hard-hat',
            'order': 11
        },
        {
            'name': 'Interior Design',
            'description': 'Interior design and decoration',
            'icon': 'fas fa-couch',
            'order': 12
        }
    ]

    created_count = 0
    updated_count = 0

    for category_data in categories_data:
        slug = slugify(category_data['name'])
        category, created = Category.objects.get_or_create(
            slug=slug,
            defaults={
                'name': category_data['name'],
                'description': category_data['description'],
                'icon': category_data['icon'],
                'order': category_data['order'],
                'is_active': True
            }
        )
        
        if created:
            created_count += 1
            print(f'✅ Created category: {category.name}')
        else:
            # Update existing category
            category.description = category_data['description']
            category.icon = category_data['icon']
            category.order = category_data['order']
            category.is_active = True
            category.save()
            updated_count += 1
            print(f'🔄 Updated category: {category.name}')

    print(f'\n🎉 Completed! Created {created_count} new categories, updated {updated_count} existing categories.')

if __name__ == '__main__':
    create_categories() 