from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from drf_spectacular.utils import extend_schema
from .models import Notification
from .serializers import NotificationSerializer, NotificationUpdateSerializer


class NotificationListView(generics.ListAPIView):
    """قائمة الإشعارات"""
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['type', 'is_read']
    ordering = ['-created_at']
    
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)
    
    @extend_schema(
        operation_id="list_notifications",
        summary="List Notifications",
        description="Get user's notifications list",
        tags=["Notifications"],
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class NotificationDetailView(generics.RetrieveAPIView):
    """تفاصيل الإشعار"""
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)
    
    @extend_schema(
        operation_id="get_notification_detail",
        summary="Notification Details",
        description="Get specific notification details",
        tags=["Notifications"],
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class NotificationUpdateView(generics.UpdateAPIView):
    """تحديث الإشعار"""
    serializer_class = NotificationUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)
    
    def perform_update(self, serializer):
        if serializer.validated_data.get('is_read'):
            serializer.save(read_at=timezone.now())
        else:
            serializer.save()
    
    @extend_schema(
        operation_id="update_notification",
        summary="Update Notification",
        description="Update notification status",
        tags=["Notifications"],
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def mark_all_read(request):
    """وضع علامة مقروء على جميع الإشعارات"""
    updated_count = Notification.objects.filter(
        user=request.user,
        is_read=False
    ).update(is_read=True, read_at=timezone.now())
    
    return Response({
        'message': f'{updated_count} notifications marked as read',
        'updated_count': updated_count
    })


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def notification_stats(request):
    """إحصائيات الإشعارات"""
    notifications = Notification.objects.filter(user=request.user)
    
    stats = {
        'total_notifications': notifications.count(),
        'unread_notifications': notifications.filter(is_read=False).count(),
        'read_notifications': notifications.filter(is_read=True).count(),
        'notifications_by_type': {}
    }
    
    # Group by type
    for notification_type in Notification.TYPE_CHOICES:
        type_code = notification_type[0]
        type_count = notifications.filter(type=type_code).count()
        stats['notifications_by_type'][type_code] = type_count
    
    return Response(stats)
