from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db.models import Avg
from .models import Review

User = get_user_model()


class UserBasicSerializer(serializers.ModelSerializer):
    """Serializer أساسي لبيانات المستخدم"""
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'first_name', 'last_name', 
            'avatar', 'user_type', 'is_verified'
        ]


class ReviewSerializer(serializers.ModelSerializer):
    """Serializer للتقييمات"""
    professional = UserBasicSerializer(read_only=True)
    client = UserBasicSerializer(read_only=True)
    project_info = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Review
        fields = [
            'id', 'project_info', 'professional', 'client', 'rating', 
            'comment', 'quality_rating', 'communication_rating', 
            'timeliness_rating', 'professionalism_rating', 'average_rating',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_project_info(self, obj):
        """Get project information"""
        return {
            'id': obj.project.id,
            'title': obj.project.title,
            'slug': obj.project.slug,
            'status': obj.project.status
        }
    
    def get_average_rating(self, obj):
        """Calculate average of detailed ratings"""
        ratings = [
            obj.quality_rating,
            obj.communication_rating,
            obj.timeliness_rating,
            obj.professionalism_rating
        ]
        # Filter out None values
        valid_ratings = [r for r in ratings if r is not None]
        if valid_ratings:
            return sum(valid_ratings) / len(valid_ratings)
        return obj.rating


class ReviewCreateSerializer(serializers.ModelSerializer):
    """Serializer لإنشاء التقييمات"""
    
    class Meta:
        model = Review
        fields = [
            'project', 'professional', 'rating', 'comment',
            'quality_rating', 'communication_rating', 
            'timeliness_rating', 'professionalism_rating'
        ]
    
    def validate_rating(self, value):
        """Validate overall rating"""
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5")
        return value
    
    def validate_quality_rating(self, value):
        """Validate quality rating"""
        if value is not None and (value < 1 or value > 5):
            raise serializers.ValidationError("Quality rating must be between 1 and 5")
        return value
    
    def validate_communication_rating(self, value):
        """Validate communication rating"""
        if value is not None and (value < 1 or value > 5):
            raise serializers.ValidationError("Communication rating must be between 1 and 5")
        return value
    
    def validate_timeliness_rating(self, value):
        """Validate timeliness rating"""
        if value is not None and (value < 1 or value > 5):
            raise serializers.ValidationError("Timeliness rating must be between 1 and 5")
        return value
    
    def validate_professionalism_rating(self, value):
        """Validate professionalism rating"""
        if value is not None and (value < 1 or value > 5):
            raise serializers.ValidationError("Professionalism rating must be between 1 and 5")
        return value
    
    def validate_project(self, value):
        """Validate project belongs to user and is completed"""
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            # Check if user is the client of the project
            if value.client != request.user:
                raise serializers.ValidationError("You can only review your own projects")
            
            # Check if project is completed
            if value.status != 'completed':
                raise serializers.ValidationError("Project must be completed to leave a review")
        
        return value
    
    def validate_professional(self, value):
        """Validate professional is assigned to the project"""
        project = self.initial_data.get('project')
        if project and hasattr(project, 'assigned_professional'):
            if value != project.assigned_professional:
                raise serializers.ValidationError("Professional must be assigned to the project")
        
        return value
    
    def validate(self, attrs):
        """Validate review data"""
        project = attrs.get('project')
        professional = attrs.get('professional')
        
        # Check if professional is assigned to project
        if project and project.assigned_professional != professional:
            raise serializers.ValidationError("Professional must be assigned to the project")
        
        # Check if review already exists
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            existing_review = Review.objects.filter(
                project=project,
                client=request.user
            ).first()
            
            if existing_review:
                raise serializers.ValidationError("You have already reviewed this project")
        
        return attrs
    
    def create(self, validated_data):
        # Set client from request user
        validated_data['client'] = self.context['request'].user
        
        review = super().create(validated_data)
        
        # Update professional's rating
        professional = review.professional
        all_reviews = Review.objects.filter(professional=professional)
        
        # Calculate new average rating
        avg_rating = all_reviews.aggregate(avg=Avg('rating'))['avg']
        professional.rating_average = avg_rating or 0
        professional.rating_count = all_reviews.count()
        professional.save(update_fields=['rating_average', 'rating_count'])
        
        return review


class ReviewUpdateSerializer(serializers.ModelSerializer):
    """Serializer لتحديث التقييمات"""
    
    class Meta:
        model = Review
        fields = [
            'rating', 'comment', 'quality_rating', 'communication_rating', 
            'timeliness_rating', 'professionalism_rating'
        ]
    
    def validate_rating(self, value):
        """Validate overall rating"""
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5")
        return value
    
    def validate_quality_rating(self, value):
        """Validate quality rating"""
        if value is not None and (value < 1 or value > 5):
            raise serializers.ValidationError("Quality rating must be between 1 and 5")
        return value
    
    def validate_communication_rating(self, value):
        """Validate communication rating"""
        if value is not None and (value < 1 or value > 5):
            raise serializers.ValidationError("Communication rating must be between 1 and 5")
        return value
    
    def validate_timeliness_rating(self, value):
        """Validate timeliness rating"""
        if value is not None and (value < 1 or value > 5):
            raise serializers.ValidationError("Timeliness rating must be between 1 and 5")
        return value
    
    def validate_professionalism_rating(self, value):
        """Validate professionalism rating"""
        if value is not None and (value < 1 or value > 5):
            raise serializers.ValidationError("Professionalism rating must be between 1 and 5")
        return value
    
    def update(self, instance, validated_data):
        review = super().update(instance, validated_data)
        
        # Update professional's rating
        professional = review.professional
        all_reviews = Review.objects.filter(professional=professional)
        
        # Calculate new average rating
        avg_rating = all_reviews.aggregate(avg=Avg('rating'))['avg']
        professional.rating_average = avg_rating or 0
        professional.rating_count = all_reviews.count()
        professional.save(update_fields=['rating_average', 'rating_count'])
        
        return review


class ReviewListSerializer(serializers.ModelSerializer):
    """Serializer مبسط لقائمة التقييمات"""
    professional = UserBasicSerializer(read_only=True)
    client = UserBasicSerializer(read_only=True)
    project_title = serializers.CharField(source='project.title', read_only=True)
    
    class Meta:
        model = Review
        fields = [
            'id', 'project_title', 'professional', 'client', 'rating', 
            'comment', 'created_at'
        ]


class ProfessionalReviewsSerializer(serializers.ModelSerializer):
    """Serializer لتقييمات المحترف"""
    client = UserBasicSerializer(read_only=True)
    project_info = serializers.SerializerMethodField()
    
    class Meta:
        model = Review
        fields = [
            'id', 'project_info', 'client', 'rating', 'comment',
            'quality_rating', 'communication_rating', 
            'timeliness_rating', 'professionalism_rating',
            'created_at'
        ]
    
    def get_project_info(self, obj):
        """Get project information"""
        return {
            'id': obj.project.id,
            'title': obj.project.title,
            'slug': obj.project.slug
        }


class ReviewStatsSerializer(serializers.Serializer):
    """Serializer لإحصائيات التقييمات"""
    total_reviews = serializers.IntegerField()
    average_rating = serializers.DecimalField(max_digits=3, decimal_places=2)
    rating_distribution = serializers.DictField()
    
    # Detailed ratings averages
    average_quality = serializers.DecimalField(max_digits=3, decimal_places=2)
    average_communication = serializers.DecimalField(max_digits=3, decimal_places=2)
    average_timeliness = serializers.DecimalField(max_digits=3, decimal_places=2)
    average_professionalism = serializers.DecimalField(max_digits=3, decimal_places=2)
    
    # Recent activity
    recent_reviews_count = serializers.IntegerField()
    this_month_reviews = serializers.IntegerField()
    last_month_reviews = serializers.IntegerField()


class ReviewSummarySerializer(serializers.Serializer):
    """Serializer لملخص التقييمات"""
    professional_id = serializers.IntegerField()
    professional_name = serializers.CharField()
    total_reviews = serializers.IntegerField()
    average_rating = serializers.DecimalField(max_digits=3, decimal_places=2)
    latest_review = serializers.DateTimeField()
    five_star_percentage = serializers.DecimalField(max_digits=5, decimal_places=2)
    four_star_percentage = serializers.DecimalField(max_digits=5, decimal_places=2)
    three_star_percentage = serializers.DecimalField(max_digits=5, decimal_places=2)
    two_star_percentage = serializers.DecimalField(max_digits=5, decimal_places=2)
    one_star_percentage = serializers.DecimalField(max_digits=5, decimal_places=2)


class ReviewResponseSerializer(serializers.Serializer):
    """Serializer لردود المحترف على التقييمات"""
    response = serializers.CharField(max_length=1000)
    
    def validate_response(self, value):
        """Validate response content"""
        if not value or not value.strip():
            raise serializers.ValidationError("Response cannot be empty")
        return value.strip()


class ReviewFilterSerializer(serializers.Serializer):
    """Serializer لفلترة التقييمات"""
    professional_id = serializers.IntegerField(required=False)
    client_id = serializers.IntegerField(required=False)
    project_id = serializers.IntegerField(required=False)
    rating = serializers.IntegerField(required=False, min_value=1, max_value=5)
    rating_min = serializers.IntegerField(required=False, min_value=1, max_value=5)
    rating_max = serializers.IntegerField(required=False, min_value=1, max_value=5)
    date_from = serializers.DateField(required=False)
    date_to = serializers.DateField(required=False)
    has_comment = serializers.BooleanField(required=False)
    
    def validate(self, attrs):
        """Validate filter parameters"""
        rating_min = attrs.get('rating_min')
        rating_max = attrs.get('rating_max')
        
        if rating_min and rating_max and rating_min > rating_max:
            raise serializers.ValidationError("rating_min cannot be greater than rating_max")
        
        date_from = attrs.get('date_from')
        date_to = attrs.get('date_to')
        
        if date_from and date_to and date_from > date_to:
            raise serializers.ValidationError("date_from cannot be after date_to")
        
        return attrs


class ReviewReportSerializer(serializers.Serializer):
    """Serializer لتقرير التقييمات"""
    period = serializers.ChoiceField(
        choices=['week', 'month', 'quarter', 'year'],
        default='month'
    )
    professional_id = serializers.IntegerField(required=False)
    include_comments = serializers.BooleanField(default=False)
    include_detailed_ratings = serializers.BooleanField(default=True)
    
    def validate_professional_id(self, value):
        """Validate professional exists"""
        if value:
            try:
                User.objects.get(
                    id=value,
                    user_type__in=['home_pro', 'specialist', 'crew_member']
                )
            except User.DoesNotExist:
                raise serializers.ValidationError("Professional not found")
        
        return value 