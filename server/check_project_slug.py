#!/usr/bin/env python
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alist_backend.settings')
django.setup()

from projects.models import Project
from proposals.models import Proposal

# Check the project with the slug
slug = 'project-volt-555555555-7c8b2f0a'
project = Project.objects.filter(slug=slug).first()

if project:
    print(f"✅ Project found:")
    print(f"   ID: {project.id}")
    print(f"   Title: {project.title}")
    print(f"   Slug: {project.slug}")
    
    # Check proposals for this project
    proposals = Proposal.objects.filter(project=project)
    print(f"\n📋 Proposals for this project: {proposals.count()}")
    
    for i, proposal in enumerate(proposals, 1):
        print(f"   {i}. {proposal.professional.get_full_name()} - ${proposal.amount}")
else:
    print(f"❌ Project with slug '{slug}' not found")
    
    # Let's see what projects exist
    print("\n📋 Available projects:")
    projects = Project.objects.all()[:10]
    for project in projects:
        print(f"   ID: {project.id}, Slug: {project.slug}, Title: {project.title}")