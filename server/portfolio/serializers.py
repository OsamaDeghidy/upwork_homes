from rest_framework import serializers
from .models import PortfolioItem, PortfolioImage


class PortfolioImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioImage
        fields = ['id', 'image', 'caption', 'is_primary', 'order']


class PortfolioItemSerializer(serializers.ModelSerializer):
    images = PortfolioImageSerializer(many=True, read_only=True)
    professional_info = serializers.SerializerMethodField()
    
    class Meta:
        model = PortfolioItem
        fields = [
            'id', 'title', 'description', 'category', 'project_duration',
            'project_cost', 'completion_date', 'featured', 'likes',
            'views', 'images', 'professional_info', 'created_at'
        ]
        read_only_fields = ['id', 'likes', 'views', 'created_at']
    
    def get_professional_info(self, obj):
        return {
            'id': obj.professional.id,
            'name': obj.professional.get_full_name(),
            'avatar': obj.professional.avatar.url if obj.professional.avatar else None
        }


class PortfolioItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioItem
        fields = [
            'title', 'description', 'category', 'project_duration',
            'project_cost', 'completion_date', 'featured'
        ]
    
    def create(self, validated_data):
        validated_data['professional'] = self.context['request'].user
        return super().create(validated_data) 