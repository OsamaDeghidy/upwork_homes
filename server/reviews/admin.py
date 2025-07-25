from django.contrib import admin
from django.utils.html import format_html
from django.db.models import Avg
from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    """
    إدارة التقييمات
    """
    list_display = (
        'project_title', 'client', 'professional', 'rating_stars',
        'overall_rating', 'created_at'
    )
    list_filter = ('rating', 'created_at')
    search_fields = (
        'project__title', 'client__username', 'professional__username',
        'comment'
    )
    readonly_fields = ('created_at', 'updated_at')
    autocomplete_fields = ['project', 'client', 'professional']
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Review Information', {
            'fields': ('project', 'client', 'professional')
        }),
        ('Overall Rating', {
            'fields': ('rating', 'comment')
        }),
        ('Detailed Ratings', {
            'fields': (
                'quality_rating', 'communication_rating',
                'timeliness_rating', 'professionalism_rating'
            ),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def project_title(self, obj):
        return obj.project.title
    project_title.short_description = 'المشروع'
    
    def rating_stars(self, obj):
        stars = '⭐' * obj.rating
        return format_html('<span title="{}/5">{}</span>', obj.rating, stars)
    rating_stars.short_description = 'التقييم'
    
    def overall_rating(self, obj):
        detailed_ratings = [
            obj.quality_rating, obj.communication_rating,
            obj.timeliness_rating, obj.professionalism_rating
        ]
        valid_ratings = [r for r in detailed_ratings if r is not None]
        if valid_ratings:
            avg = sum(valid_ratings) / len(valid_ratings)
            return f"{avg:.1f}/5"
        return '-'
    overall_rating.short_description = 'المتوسط التفصيلي'
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related(
            'project', 'client', 'professional'
        )
