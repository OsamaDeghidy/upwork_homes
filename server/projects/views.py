from rest_framework import generics, permissions, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.db.models import Q, Count, Avg, Sum
from django.db import models
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema

from .models import Project, Category, ProjectImage, ProjectFile
from .serializers import (
    ProjectListSerializer, 
    ProjectDetailSerializer, 
    ProjectCreateSerializer,
    CategorySerializer,
    ProjectImageSerializer,
    ProjectFileSerializer
)

User = get_user_model()


class ProjectListView(generics.ListAPIView):
    """قائمة المشاريع مع فلترة وبحث"""
    serializer_class = ProjectListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['created_at', 'published_at', 'budget_min', 'budget_max']
    ordering = ['-published_at']
    
    def get_queryset(self):
        """Get filtered queryset"""
        queryset = Project.objects.filter(
            status__in=['published', 'in_progress']
        ).select_related('client', 'category')
        
        # Apply filters from query parameters
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category)
        
        location = self.request.query_params.get('location')
        if location:
            queryset = queryset.filter(location__icontains=location)
        
        budget_min = self.request.query_params.get('budget_min')
        if budget_min:
            queryset = queryset.filter(budget_min__gte=budget_min)
        
        budget_max = self.request.query_params.get('budget_max')
        if budget_max:
            queryset = queryset.filter(budget_max__lte=budget_max)
        
        urgency = self.request.query_params.get('urgency')
        if urgency:
            queryset = queryset.filter(urgency=urgency)
        
        is_remote = self.request.query_params.get('is_remote_allowed')
        if is_remote is not None:
            queryset = queryset.filter(is_remote_allowed=is_remote.lower() == 'true')
        
        requires_license = self.request.query_params.get('requires_license')
        if requires_license is not None:
            queryset = queryset.filter(requires_license=requires_license.lower() == 'true')
        
        return queryset


class ProjectDetailView(generics.RetrieveAPIView):
    """تفاصيل المشروع"""
    serializer_class = ProjectDetailSerializer
    permission_classes = [permissions.AllowAny]  # Allow anyone to view project details
    lookup_field = 'slug'
    
    def get_queryset(self):
        # Allow access to all projects including drafts
        return Project.objects.all().select_related('client', 'category')


class CategoryListView(generics.ListAPIView):
    """قائمة تصنيفات المشاريع"""
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        return Category.objects.filter(is_active=True).order_by('order', 'name')


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticatedOrReadOnly])
@extend_schema(
    operation_id="get_project_stats",
    summary="Project Statistics",
    description="Get comprehensive project statistics and market insights",
    tags=["Projects"],
)
def project_stats(request):
    """Get project statistics"""
    
    # Basic stats
    total_projects = Project.objects.filter(status__in=['published', 'in_progress']).count()
    active_projects = Project.objects.filter(status='published').count()
    
    # Budget stats
    budget_stats = Project.objects.filter(
        status__in=['published', 'in_progress'],
        budget_min__isnull=False
    ).aggregate(
        total_budget=Sum('budget_max'),
        avg_budget=Avg('budget_min')
    )
    
    total_budget = budget_stats.get('total_budget') or 0
    avg_budget = budget_stats.get('avg_budget') or 0
    
    # Top categories
    top_categories = Category.objects.annotate(
        project_count=Count('projects', filter=models.Q(projects__status__in=['published', 'in_progress']))
    ).filter(project_count__gt=0).order_by('-project_count')[:5]
    
    categories_data = []
    for cat in top_categories:
        percentage = (cat.project_count / total_projects * 100) if total_projects > 0 else 0
        categories_data.append({
            'name': cat.name,
            'count': cat.project_count,
            'percentage': round(percentage, 1)
        })
    
    # Trending skills (most common required skills)
    all_projects = Project.objects.filter(status__in=['published', 'in_progress'])
    skills_counter = {}
    for project in all_projects:
        for skill in project.required_skills:
            skills_counter[skill] = skills_counter.get(skill, 0) + 1
    
    trending_skills = sorted(skills_counter.items(), key=lambda x: x[1], reverse=True)[:10]
    trending_skills = [skill[0] for skill in trending_skills]
    
    # Location stats
    location_stats = Project.objects.filter(
        status__in=['published', 'in_progress']
    ).values('location').annotate(
        count=Count('id')
    ).order_by('-count')[:5]
    
    location_stats = [{'location': loc['location'], 'count': loc['count']} for loc in location_stats]
    
    stats_data = {
        'total_projects': total_projects,
        'active_projects': active_projects,
        'total_budget': f"${total_budget:,.0f}" if total_budget else "$0",
        'average_budget': f"${avg_budget:,.0f}" if avg_budget else "$0",
        'success_rate': "98%",
        'average_response_time': "24h",
        'top_categories': categories_data,
        'trending_skills': trending_skills,
        'location_stats': location_stats
    }
    
    return Response(stats_data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def project_search(request):
    """Search projects with suggestions"""
    query = request.data.get('q', '').strip()
    
    if not query:
        return Response({
            'results': [],
            'suggestions': []
        })
    
    # Search projects
    projects = Project.objects.filter(
        Q(title__icontains=query) | 
        Q(description__icontains=query) |
        Q(required_skills__overlap=[query]) |
        Q(location__icontains=query),
        status__in=['published', 'in_progress']
    ).select_related('client', 'category')[:10]
    
    # Generate suggestions
    suggestions = []
    
    # Skill suggestions
    all_projects = Project.objects.filter(status__in=['published', 'in_progress'])
    matching_skills = set()
    for project in all_projects:
        for skill in project.required_skills:
            if query.lower() in skill.lower():
                matching_skills.add(skill)
    
    for skill in list(matching_skills)[:5]:
        suggestions.append({
            'id': f'skill-{skill}',
            'type': 'skill',
            'text': skill,
            'count': len([p for p in all_projects if skill in p.required_skills])
        })
    
    # Location suggestions
    locations = Project.objects.filter(
        location__icontains=query,
        status__in=['published', 'in_progress']
    ).values_list('location', flat=True).distinct()[:3]
    
    for location in locations:
        suggestions.append({
            'id': f'location-{location}',
            'type': 'location', 
            'text': location,
            'count': Project.objects.filter(location=location).count()
        })
    
    # Category suggestions
    categories = Category.objects.filter(name__icontains=query)[:3]
    for category in categories:
        suggestions.append({
            'id': f'category-{category.slug}',
            'type': 'category',
            'text': category.name,
            'count': category.projects.filter(status__in=['published', 'in_progress']).count()
        })
    
    serializer = ProjectListSerializer(projects, many=True)
    
    return Response({
        'results': serializer.data,
        'suggestions': suggestions
    })


class ProjectCreateView(generics.CreateAPIView):
    """إنشاء مشروع جديد"""
    serializer_class = ProjectCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        # Set the client to the current user
        serializer.save(client=self.request.user)
    
    def create(self, request, *args, **kwargs):
        # Validate user is a client
        if request.user.user_type != 'client':
            return Response(
                {'error': 'Only clients can create projects'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Debug logging
        print(f"🔍 ProjectCreateView - Request data: {request.data}")
        
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print(f"❌ ProjectCreateView - Validation errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class MyProjectsView(generics.ListAPIView):
    """عرض مشاريع المستخدم الحالي"""
    serializer_class = ProjectListSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['created_at', 'published_at', 'deadline', 'budget_min', 'budget_max']
    ordering = ['-created_at']
    
    def get_queryset(self):
        """إرجاع مشاريع المستخدم الحالي فقط"""
        user = self.request.user
        
        if user.user_type == 'client':
            # للعملاء: إرجاع المشاريع التي نشروها
            queryset = Project.objects.filter(
                client=user
            ).select_related('client', 'category', 'assigned_professional')
        else:
            # للمهنيين: إرجاع المشاريع المكلفين بها
            queryset = Project.objects.filter(
                assigned_professional=user
            ).select_related('client', 'category', 'assigned_professional')
        
        # Add status filter
        status = self.request.query_params.get('status')
        if status and status != 'all':
            if status == 'active':
                queryset = queryset.filter(status__in=['published', 'in_progress'])
            elif status == 'in_progress':
                queryset = queryset.filter(status='in_progress')
            elif status == 'completed':
                queryset = queryset.filter(status='completed')
            elif status == 'cancelled':
                queryset = queryset.filter(status='cancelled')
            else:
                queryset = queryset.filter(status=status)
        
        # Add category filter
        category = self.request.query_params.get('category')
        if category and category != 'all':
            queryset = queryset.filter(category__slug=category)
        
        return queryset


class ProjectImageViewSet(ModelViewSet):
    """ViewSet لصور المشاريع"""
    serializer_class = ProjectImageSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        slug = self.kwargs.get('slug')
        return ProjectImage.objects.filter(project__slug=slug)
    
    def perform_create(self, serializer):
        slug = self.kwargs.get('slug')
        project = Project.objects.get(slug=slug)
        serializer.save(project=project)


class ProjectFileViewSet(ModelViewSet):
    """ViewSet لملفات المشاريع"""
    serializer_class = ProjectFileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        slug = self.kwargs.get('slug')
        return ProjectFile.objects.filter(project__slug=slug)
    
    def perform_create(self, serializer):
        slug = self.kwargs.get('slug')
        project = Project.objects.get(slug=slug)
        serializer.save(project=project)
