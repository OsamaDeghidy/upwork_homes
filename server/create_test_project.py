#!/usr/bin/env python
import os
import sys
import django

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alist_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from projects.models import Project, Category
from django.utils import timezone
from django.utils.text import slugify

User = get_user_model()

def create_test_project():
    # Create or get a test user (client)
    client, created = User.objects.get_or_create(
        email='test_client@example.com',
        defaults={
            'first_name': 'أحمد',
            'last_name': 'محمد',
            'user_type': 'client',
            'is_verified': True,
            'location': 'الرياض، السعودية',
            'phone': '+966501234567'
        }
    )
    
    if created:
        client.set_password('testpass123')
        client.save()
        print(f"Created test client: {client.email}")
    else:
        print(f"Using existing client: {client.email}")
    
    # Create or get a test category
    category, created = Category.objects.get_or_create(
        name='تطوير المواقع',
        defaults={
            'slug': 'web-development',
            'description': 'تطوير وتصميم المواقع الإلكترونية',
            'icon': 'fas fa-code',
            'is_active': True
        }
    )
    
    if created:
        print(f"Created test category: {category.name}")
    else:
        print(f"Using existing category: {category.name}")
    
    # Create test project
    project_title = 'تطوير موقع إلكتروني للتجارة الإلكترونية'
    project_slug = 'test-project'
    
    # Delete existing project with same slug if exists
    Project.objects.filter(slug=project_slug).delete()
    
    project = Project.objects.create(
        title=project_title,
        slug=project_slug,
        description='''نحن نبحث عن مطور ويب محترف لتطوير موقع إلكتروني للتجارة الإلكترونية.

المتطلبات:
- تصميم واجهة مستخدم حديثة وجذابة
- تطوير نظام إدارة المنتجات
- تكامل مع بوابات الدفع
- تحسين محركات البحث (SEO)
- تصميم متجاوب مع جميع الأجهزة

المشروع يتطلب خبرة في:
- React.js أو Vue.js
- Node.js
- قواعد البيانات
- تصميم UI/UX''',
        client=client,
        category=category,
        location='الرياض، السعودية',
        budget_type='fixed',
        budget_min=15000,
        budget_max=25000,
        budget_display='15,000 - 25,000 ريال',
        timeline='4-6 أسابيع',
        required_skills=[
            'React.js',
            'Node.js',
            'JavaScript',
            'CSS',
            'HTML',
            'MongoDB',
            'Express.js',
            'UI/UX Design'
        ],
        required_roles=['مطور ويب', 'مصمم UI/UX'],
        additional_requirements='يفضل وجود أعمال سابقة في مجال التجارة الإلكترونية',
        status='published',
        urgency='normal',
        is_featured=True,
        is_remote_allowed=True,
        requires_license=False,
        requires_insurance=False,
        views_count=45,
        favorites_count=8,
        proposals_count=12,
        published_at=timezone.now()
    )
    
    print(f"Created test project: {project.title}")
    print(f"Project slug: {project.slug}")
    print(f"Project URL: http://localhost:3001/projects/{project.slug}")
    
    return project

if __name__ == '__main__':
    try:
        project = create_test_project()
        print("\nTest project created successfully!")
    except Exception as e:
        print(f"Error creating test project: {e}")
        import traceback
        traceback.print_exc()