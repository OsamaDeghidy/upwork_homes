"""alist_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    
    # JWT Authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # API Endpoints
    path('api/auth/', include('authentication.urls')),
    path('api/dashboard/', include('dashboard.urls')),  # Move dashboard up
    path('api/projects/', include('projects.urls')),
    path('api/proposals/', include('proposals.urls')),
    path('api/contracts/', include('contracts.urls')),
    path('api/payments/', include('payments.urls')),
    path('api/messages/', include('messaging.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/calendar/', include('calendar_app.urls')),
    path('api/time-tracking/', include('time_tracking.urls')),
    path('api/tasks/', include('tasks.urls')),
    path('api/portfolio/', include('portfolio.urls')),
    path('api/notifications/', include('notifications.urls')),
    path('api/subscriptions/', include('subscriptions.urls')),
    path('api/files/', include('file_management.urls')),
    path('', include('location_services.urls')),
    
    # Health Check
    path('health/', TemplateView.as_view(template_name='health.html'), name='health'),
    
    # Root API endpoint
    path('api/', TemplateView.as_view(template_name='api_root.html'), name='api_root'),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Custom error handlers
handler400 = 'alist_backend.views.bad_request'
handler403 = 'alist_backend.views.permission_denied'
handler404 = 'alist_backend.views.page_not_found'
handler500 = 'alist_backend.views.server_error'
