from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from drf_spectacular.utils import extend_schema
from .models import PortfolioItem
from .serializers import PortfolioItemSerializer, PortfolioItemCreateSerializer


class PortfolioListView(generics.ListAPIView):
    """قائمة معرض الأعمال"""
    serializer_class = PortfolioItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['category', 'featured']
    ordering = ['-created_at']
    
    def get_queryset(self):
        return PortfolioItem.objects.select_related('professional')
    
    @extend_schema(
        operation_id="list_portfolio",
        summary="List Portfolio Items",
        description="Get portfolio items list",
        tags=["Portfolio"],
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class PortfolioDetailView(generics.RetrieveAPIView):
    """تفاصيل عنصر المعرض"""
    serializer_class = PortfolioItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = PortfolioItem.objects.prefetch_related('images')
    
    @extend_schema(
        operation_id="get_portfolio_detail",
        summary="Portfolio Item Details", 
        description="Get specific portfolio item details",
        tags=["Portfolio"],
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class PortfolioCreateView(generics.CreateAPIView):
    """إنشاء عنصر معرض جديد"""
    serializer_class = PortfolioItemCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    @extend_schema(
        operation_id="create_portfolio_item",
        summary="Create New Portfolio Item",
        description="Create new portfolio item",
        tags=["Portfolio"],
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class PortfolioUpdateView(generics.UpdateAPIView):
    """تحديث عنصر المعرض"""
    serializer_class = PortfolioItemCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return PortfolioItem.objects.filter(professional=self.request.user)
    
    @extend_schema(
        operation_id="update_portfolio_item",
        summary="Update Portfolio Item",
        description="Update existing portfolio item",
        tags=["Portfolio"],
    )
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)
    
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


class PortfolioDeleteView(generics.DestroyAPIView):
    """حذف عنصر المعرض"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return PortfolioItem.objects.filter(professional=self.request.user)
    
    @extend_schema(
        operation_id="delete_portfolio_item",
        summary="Delete Portfolio Item",
        description="Delete existing portfolio item",
        tags=["Portfolio"],
    )
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)


class MyPortfolioView(generics.ListAPIView):
    """معرض أعمالي"""
    serializer_class = PortfolioItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return PortfolioItem.objects.filter(
            professional=self.request.user
        ).prefetch_related('images')
    
    @extend_schema(
        operation_id="get_my_portfolio",
        summary="معرض أعمالي",
        description="عرض معرض أعمال المستخدم الحالي",
        tags=["Portfolio"],
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
