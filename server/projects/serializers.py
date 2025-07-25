from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Project, Category, ProjectImage, ProjectFile, ProjectFavorite, ProjectView, ProjectUpdate

User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    """Serializer لتصنيفات المشاريع"""
    projects_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = [
            'id', 'name', 'slug', 'description', 'icon', 
            'is_active', 'order', 'projects_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_projects_count(self, obj):
        """Get count of active projects in this category"""
        return obj.projects.filter(status__in=['published', 'in_progress']).count()


class ProjectImageSerializer(serializers.ModelSerializer):
    """Serializer لصور المشاريع"""
    
    class Meta:
        model = ProjectImage
        fields = [
            'id', 'project', 'image', 'caption', 
            'is_primary', 'order', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class ProjectFileSerializer(serializers.ModelSerializer):
    """Serializer لملفات المشاريع"""
    file_size_display = serializers.SerializerMethodField()
    
    class Meta:
        model = ProjectFile
        fields = [
            'id', 'project', 'file', 'filename', 'file_type', 
            'file_size', 'file_size_display', 'description', 'created_at'
        ]
        read_only_fields = ['id', 'filename', 'file_size', 'created_at']
    
    def get_file_size_display(self, obj):
        return obj.get_file_size_display()
    
    def create(self, validated_data):
        file_obj = validated_data.get('file')
        if file_obj:
            validated_data['filename'] = file_obj.name
            validated_data['file_size'] = file_obj.size
            # Detect file type based on extension
            filename = file_obj.name.lower()
            if filename.endswith(('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp')):
                validated_data['file_type'] = 'image'
            elif filename.endswith(('.mp4', '.avi', '.mov', '.wmv', '.flv')):
                validated_data['file_type'] = 'video'
            elif filename.endswith(('.mp3', '.wav', '.flac', '.aac')):
                validated_data['file_type'] = 'audio'
            elif filename.endswith(('.pdf', '.doc', '.docx', '.txt', '.rtf')):
                validated_data['file_type'] = 'document'
            else:
                validated_data['file_type'] = 'other'
        
        return super().create(validated_data)


class UserBasicSerializer(serializers.ModelSerializer):
    """Serializer أساسي لبيانات المستخدم"""
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'first_name', 'last_name', 
            'avatar', 'rating_average', 'rating_count', 
            'projects_completed', 'is_verified'
        ]


class ProjectListSerializer(serializers.ModelSerializer):
    """Serializer لقائمة المشاريع"""
    client = UserBasicSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    budget_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'description', 'client', 'category',
            'location', 'budget_display', 'timeline', 'status', 'urgency',
            'required_skills', 'required_roles', 'is_featured', 'is_remote_allowed',
            'requires_license', 'requires_insurance', 'views_count', 
            'favorites_count', 'proposals_count', 'assigned_professional',
            'completion_percentage', 'published_at', 'created_at'
        ]
    
    def get_budget_display(self, obj):
        return obj.get_budget_display()


class ProjectDetailSerializer(serializers.ModelSerializer):
    """Serializer تفصيلي للمشاريع"""
    client = UserBasicSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    assigned_professional = UserBasicSerializer(read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True)
    files = ProjectFileSerializer(many=True, read_only=True)
    budget_display = serializers.SerializerMethodField()
    is_favorited = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'description', 'client', 'category',
            'location', 'budget_type', 'budget_min', 'budget_max', 
            'budget_display', 'timeline', 'start_date', 'end_date',
            'required_skills', 'required_roles', 'additional_requirements', 'status', 'urgency',
            'is_featured', 'is_remote_allowed', 'requires_license', 
            'requires_insurance', 'views_count', 'favorites_count', 
            'proposals_count', 'assigned_professional', 'completion_percentage',
            'published_at', 'created_at', 'updated_at', 'images', 'files',
            'is_favorited'
        ]
    
    def get_budget_display(self, obj):
        return obj.get_budget_display()
    
    def get_is_favorited(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return ProjectFavorite.objects.filter(
                user=request.user, 
                project=obj
            ).exists()
        return False


class ProjectCreateSerializer(serializers.ModelSerializer):
    """Serializer لإنشاء المشاريع"""
    image_ids = serializers.ListField(
        child=serializers.IntegerField(allow_null=False),
        required=False,
        allow_empty=True,
        write_only=True,
        help_text="List of uploaded file IDs to associate with this project"
    )
    
    class Meta:
        model = Project
        fields = [
            'title', 'description', 'category', 'location', 
            'budget_type', 'budget_min', 'budget_max', 'budget_display',
            'timeline', 'start_date', 'end_date', 'required_skills',
            'required_roles', 'additional_requirements', 'urgency', 'is_remote_allowed',
            'requires_license', 'requires_insurance', 'image_ids'
        ]
    
    def validate(self, attrs):
        # Validate budget fields
        budget_type = attrs.get('budget_type')
        budget_min = attrs.get('budget_min')
        budget_max = attrs.get('budget_max')
        
        if budget_type == 'fixed' and not budget_min:
            raise serializers.ValidationError("Fixed budget requires minimum budget")
        
        if budget_min and budget_max and budget_min > budget_max:
            raise serializers.ValidationError("Minimum budget cannot be greater than maximum budget")
        
        return attrs
    
    def create(self, validated_data):
        from file_management.models import UploadedFile
        
        # Extract image_ids before creating project
        image_ids = validated_data.pop('image_ids', [])
        
        # Set client from request user
        validated_data['client'] = self.context['request'].user
        
        # Create the project
        project = super().create(validated_data)
        
        # Associate uploaded files with the project
        if image_ids:
            # Get uploaded files that belong to the current user
            uploaded_files = UploadedFile.objects.filter(
                id__in=image_ids,
                uploaded_by=self.context['request'].user,
                upload_purpose='project_image'
            )
            
            # Create ProjectImage instances
            for i, uploaded_file in enumerate(uploaded_files):
                ProjectImage.objects.create(
                    project=project,
                    image=uploaded_file.file,
                    caption=uploaded_file.description or '',
                    is_primary=(i == 0),  # First image is primary
                    order=i
                )
        
        return project


class ProjectUpdateSerializer(serializers.ModelSerializer):
    """Serializer لتحديث المشاريع"""
    
    class Meta:
        model = Project
        fields = [
            'title', 'description', 'category', 'location', 
            'budget_type', 'budget_min', 'budget_max', 'budget_display',
            'timeline', 'start_date', 'end_date', 'required_skills',
            'required_roles', 'urgency', 'is_remote_allowed',
            'requires_license', 'requires_insurance', 'status'
        ]
    
    def validate_status(self, value):
        """Validate status transitions"""
        if self.instance:
            current_status = self.instance.status
            # Only allow certain status transitions
            allowed_transitions = {
                'draft': ['published', 'cancelled'],
                'published': ['in_progress', 'cancelled'],
                'in_progress': ['completed', 'paused', 'cancelled'],
                'paused': ['in_progress', 'cancelled'],
                'completed': [],  # No transitions from completed
                'cancelled': []   # No transitions from cancelled
            }
            
            if value not in allowed_transitions.get(current_status, []):
                raise serializers.ValidationError(
                    f"Cannot change status from {current_status} to {value}"
                )
        
        return value


class ProjectFavoriteSerializer(serializers.ModelSerializer):
    """Serializer لمفضلة المشاريع"""
    project = ProjectListSerializer(read_only=True)
    
    class Meta:
        model = ProjectFavorite
        fields = ['id', 'project', 'created_at']
        read_only_fields = ['id', 'created_at']


class ProjectUpdateHistorySerializer(serializers.ModelSerializer):
    """Serializer لتاريخ تحديثات المشاريع"""
    user = UserBasicSerializer(read_only=True)
    
    class Meta:
        model = ProjectUpdate
        fields = [
            'id', 'project', 'user', 'update_type', 'title', 
            'description', 'previous_status', 'new_status',
            'previous_completion', 'new_completion', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class ProjectStatsSerializer(serializers.Serializer):
    """Serializer لإحصائيات المشاريع"""
    total_projects = serializers.IntegerField()
    published_projects = serializers.IntegerField()
    in_progress_projects = serializers.IntegerField()
    completed_projects = serializers.IntegerField()
    cancelled_projects = serializers.IntegerField()
    total_budget = serializers.DecimalField(max_digits=15, decimal_places=2)
    average_budget = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_views = serializers.IntegerField()
    total_favorites = serializers.IntegerField()
    total_proposals = serializers.IntegerField()


class ProjectSearchSerializer(serializers.Serializer):
    """Serializer للبحث في المشاريع"""
    query = serializers.CharField(required=False)
    category = serializers.CharField(required=False)
    location = serializers.CharField(required=False)
    budget_min = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    budget_max = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    status = serializers.CharField(required=False)
    urgency = serializers.CharField(required=False)
    is_remote_allowed = serializers.BooleanField(required=False)
    requires_license = serializers.BooleanField(required=False)
    requires_insurance = serializers.BooleanField(required=False)
    skills = serializers.ListField(child=serializers.CharField(), required=False)
    roles = serializers.ListField(child=serializers.CharField(), required=False)
    ordering = serializers.CharField(required=False)