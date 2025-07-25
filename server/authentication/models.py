from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone


class User(AbstractUser):
    """
    نموذج المستخدم المخصص لمنصة A-List Home Professionals
    """
    
    USER_TYPE_CHOICES = [
        ('client', 'Client'),
        ('home_pro', 'Home Pro'),
        ('specialist', 'A-List Specialist'),
        ('crew_member', 'Crew Member'),
    ]
    
    VERIFICATION_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('verified', 'Verified'),
        ('rejected', 'Rejected'),
    ]
    
    # Basic Information
    user_type = models.CharField(
        max_length=20,
        choices=USER_TYPE_CHOICES,
        default='client',
        help_text='Type of user account'
    )
    
    phone = PhoneNumberField(
        blank=True,
        null=True,
        help_text='Phone number with country code'
    )
    
    location = models.CharField(
        max_length=255,
        blank=True,
        help_text='User location/address'
    )
    
    avatar = models.ImageField(
        upload_to='avatars/',
        blank=True,
        null=True,
        help_text='User profile picture'
    )
    
    # Verification and Status
    is_verified = models.BooleanField(
        default=False,
        help_text='Whether user is verified'
    )
    
    verification_status = models.CharField(
        max_length=20,
        choices=VERIFICATION_STATUS_CHOICES,
        default='pending',
        help_text='Verification status'
    )
    
    # Professional Information (for non-clients)
    company_name = models.CharField(
        max_length=255,
        blank=True,
        help_text='Company or business name'
    )
    
    bio = models.TextField(
        blank=True,
        help_text='User biography or description'
    )
    
    website = models.URLField(
        blank=True,
        help_text='Website URL'
    )
    
    # Professional Details
    experience_years = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text='Years of experience'
    )
    
    hourly_rate = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text='Hourly rate in USD'
    )
    
    skills = models.JSONField(
        default=list,
        blank=True,
        help_text='List of skills and expertise'
    )
    
    # Ratings and Reviews
    rating_average = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0.00,
        help_text='Average rating from reviews'
    )
    
    rating_count = models.PositiveIntegerField(
        default=0,
        help_text='Total number of ratings'
    )
    
    # Activity Status
    is_available = models.BooleanField(
        default=True,
        help_text='Whether user is available for work'
    )
    
    last_activity = models.DateTimeField(
        auto_now=True,
        help_text='Last activity timestamp'
    )
    
    # Professional Verification
    license_number = models.CharField(
        max_length=100,
        blank=True,
        help_text='Professional license number'
    )
    
    insurance_verified = models.BooleanField(
        default=False,
        help_text='Whether insurance is verified'
    )
    
    background_check_verified = models.BooleanField(
        default=False,
        help_text='Whether background check is verified'
    )
    
    # Preferences
    notification_preferences = models.JSONField(
        default=dict,
        blank=True,
        help_text='User notification preferences'
    )
    
    # Statistics
    projects_completed = models.PositiveIntegerField(
        default=0,
        help_text='Number of completed projects'
    )
    
    total_earnings = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0.00,
        help_text='Total earnings from platform'
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def is_professional(self):
        """Check if user is a professional (home_pro, specialist, or crew_member)"""
        return self.user_type in ['home_pro', 'specialist', 'crew_member']
    
    def get_full_name(self):
        """Return full name of user"""
        return f"{self.first_name} {self.last_name}".strip() or self.username
    
    def get_display_name(self):
        """Return display name for user"""
        return self.get_full_name() or self.username
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        indexes = [
            models.Index(fields=['user_type']),
            models.Index(fields=['is_verified']),
            models.Index(fields=['location']),
            models.Index(fields=['rating_average']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.get_user_type_display()})"
    
    def get_full_name(self):
        """Return the full name of the user"""
        return f"{self.first_name} {self.last_name}".strip() or self.username
    
    def get_display_name(self):
        """Return the display name for the user"""
        return self.get_full_name() or self.username
    
    def update_rating(self, new_rating):
        """Update user's average rating"""
        if self.rating_count == 0:
            self.rating_average = new_rating
        else:
            total_rating = self.rating_average * self.rating_count + new_rating
            self.rating_average = total_rating / (self.rating_count + 1)
        
        self.rating_count += 1
        self.save(update_fields=['rating_average', 'rating_count'])
    
    def is_professional(self):
        """Check if user is a professional (not client)"""
        return self.user_type in ['home_pro', 'specialist', 'crew_member']
    
    def can_post_projects(self):
        """Check if user can post projects"""
        return self.user_type == 'client'
    
    def can_bid_on_projects(self):
        """Check if user can bid on projects"""
        return self.is_professional()
    
    def get_verification_badge(self):
        """Get verification badge based on verifications"""
        badges = []
        if self.is_verified:
            badges.append('verified')
        if self.license_number:
            badges.append('licensed')
        if self.insurance_verified:
            badges.append('insured')
        if self.background_check_verified:
            badges.append('background_checked')
        return badges
    
    def get_completion_rate(self):
        """Calculate profile completion rate"""
        required_fields = ['first_name', 'last_name', 'phone', 'location']
        professional_fields = ['bio', 'company_name', 'hourly_rate']
        
        completed = 0
        total = len(required_fields)
        
        for field in required_fields:
            if getattr(self, field):
                completed += 1
        
        if self.is_professional():
            total += len(professional_fields)
            for field in professional_fields:
                if getattr(self, field):
                    completed += 1
        
        return (completed / total) * 100 if total > 0 else 0


class UserProfile(models.Model):
    """
    ملف شخصي إضافي للمستخدم
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    
    # Social Links
    linkedin_url = models.URLField(blank=True)
    facebook_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    
    # Professional Portfolio
    portfolio_images = models.JSONField(
        default=list,
        blank=True,
        help_text='List of portfolio image URLs'
    )
    
    certifications = models.JSONField(
        default=list,
        blank=True,
        help_text='List of certifications'
    )
    
    # Emergency Contact
    emergency_contact_name = models.CharField(
        max_length=255,
        blank=True,
        help_text='Emergency contact name'
    )
    
    emergency_contact_phone = PhoneNumberField(
        blank=True,
        null=True,
        help_text='Emergency contact phone'
    )
    
    # Business Information
    business_address = models.TextField(
        blank=True,
        help_text='Business address'
    )
    
    tax_id = models.CharField(
        max_length=50,
        blank=True,
        help_text='Tax identification number'
    )
    
    # Banking Information (encrypted)
    bank_account_info = models.JSONField(
        default=dict,
        blank=True,
        help_text='Encrypted banking information'
    )
    
    # Availability Schedule
    availability_schedule = models.JSONField(
        default=dict,
        blank=True,
        help_text='Weekly availability schedule'
    )
    
    # Service Areas
    service_areas = models.JSONField(
        default=list,
        blank=True,
        help_text='List of service areas/locations'
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'user_profiles'
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'
    
    def __str__(self):
        return f"{self.user.get_full_name()}'s Profile"
