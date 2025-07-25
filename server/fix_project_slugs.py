#!/usr/bin/env python
"""
Script to fix missing project slugs
"""
import os
import sys
import django
from django.utils.text import slugify
import uuid

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alist_backend.settings')
django.setup()

from projects.models import Project

def fix_project_slugs():
    """Fix missing project slugs"""
    projects_without_slug = Project.objects.filter(slug__isnull=True) | Project.objects.filter(slug='')
    
    print(f"Found {projects_without_slug.count()} projects without slugs")
    
    for project in projects_without_slug:
        # Generate slug from title
        base_slug = slugify(project.title)
        unique_slug = f"{base_slug}-{str(uuid.uuid4())[:8]}"
        
        # Ensure uniqueness
        counter = 1
        while Project.objects.filter(slug=unique_slug).exists():
            unique_slug = f"{base_slug}-{str(uuid.uuid4())[:8]}"
            counter += 1
            if counter > 10:  # Prevent infinite loop
                break
        
        project.slug = unique_slug
        project.save(update_fields=['slug'])
        print(f"Fixed slug for project '{project.title}': {unique_slug}")
    
    print("Slug fixing completed!")

if __name__ == '__main__':
    fix_project_slugs() 