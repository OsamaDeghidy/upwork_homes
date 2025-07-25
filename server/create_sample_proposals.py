#!/usr/bin/env python
"""
Script to create sample proposals for testing
"""
import os
import sys
import django
from django.utils import timezone
from datetime import timedelta

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alist_backend.settings')
django.setup()

from projects.models import Project
from authentication.models import User
from proposals.models import Proposal

def create_sample_proposals():
    """Create sample proposals for testing"""
    
    # Get the project with slug 'gg-3e277d84'
    try:
        project = Project.objects.get(slug='gg-3e277d84')
        print(f"Found project: {project.title}")
    except Project.DoesNotExist:
        print("Project with slug 'gg-3e277d84' not found")
        return
    
    # Get some professionals
    professionals = User.objects.filter(user_type__in=['home_pro', 'specialist'])[:3]
    
    if not professionals.exists():
        print("No professionals found")
        return
    
    # Create sample proposals
    sample_proposals = [
        {
            'cover_letter': 'I have extensive experience in this type of project and would love to help you bring your vision to life. I specialize in high-quality work and timely delivery.',
            'amount': 2500.00,
            'timeline': '2 weeks',
            'estimated_hours': 40,
            'status': 'pending'
        },
        {
            'cover_letter': 'I am a certified professional with over 5 years of experience in this field. I guarantee quality work and excellent communication throughout the project.',
            'amount': 3200.00,
            'timeline': '3 weeks',
            'estimated_hours': 60,
            'status': 'pending'
        },
        {
            'cover_letter': 'I have completed similar projects successfully and can deliver exceptional results within your timeline and budget requirements.',
            'amount': 1800.00,
            'timeline': '10 days',
            'estimated_hours': 30,
            'status': 'accepted'
        }
    ]
    
    for i, professional in enumerate(professionals):
        if i < len(sample_proposals):
            proposal_data = sample_proposals[i]
            
            # Check if proposal already exists
            existing_proposal = Proposal.objects.filter(
                project=project,
                professional=professional
            ).first()
            
            if not existing_proposal:
                proposal = Proposal.objects.create(
                    project=project,
                    professional=professional,
                    **proposal_data
                )
                print(f"Created proposal for {professional.first_name} {professional.last_name}")
            else:
                print(f"Proposal already exists for {professional.first_name} {professional.last_name}")
    
    # Update project proposals count
    project.proposals_count = Proposal.objects.filter(project=project).count()
    project.save()
    print(f"Updated project proposals count: {project.proposals_count}")

if __name__ == '__main__':
    create_sample_proposals() 