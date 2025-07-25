#!/usr/bin/env python
"""
سكريبت للتحقق من العروض ولماذا لا تظهر
"""
import os
import sys

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alist_backend.settings')
import django
django.setup()

# Import models
from proposals.models import Proposal

def check_proposals():
    proposals = Proposal.objects.all()
    print(f"📊 Total proposals: {proposals.count()}")
    print()
    
    for i, proposal in enumerate(proposals[:5], 1):
        print(f"🔍 Proposal {i} (ID: {proposal.id}):")
        print(f"   Professional: {proposal.professional.get_full_name()}")
        print(f"   Project: {proposal.project_id}")
        print(f"   Amount: ${proposal.amount}")
        
        if proposal.cover_letter:
            print(f"   Cover Letter: YES ({len(proposal.cover_letter)} chars)")
            print(f"   Preview: {repr(proposal.cover_letter[:50])}...")
        else:
            print(f"   Cover Letter: NO (None or empty)")
        print(f"   Created: {proposal.created_at}")
        print("-" * 50)

if __name__ == '__main__':
    check_proposals() 