from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
import uuid

User = get_user_model()


class Contract(models.Model):
    """
    نموذج العقود
    """
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('pending', 'Pending'),
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('disputed', 'Disputed'),
    ]
    
    PAYMENT_TYPE_CHOICES = [
        ('fixed', 'Fixed Price'),
        ('hourly', 'Hourly Rate'),
        ('milestone', 'Milestone-based'),
    ]
    
    # Basic Information
    contract_number = models.CharField(max_length=50, unique=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    
    # Parties
    client = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='client_contracts',
        limit_choices_to={'user_type': 'client'}
    )
    professional = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='professional_contracts',
        limit_choices_to={'user_type__in': ['home_pro', 'specialist', 'crew_member']}
    )
    
    # Project Reference
    project = models.ForeignKey(
        'projects.Project',
        on_delete=models.CASCADE,
        related_name='contracts',
        null=True,
        blank=True
    )
    
    # Financial Details
    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    paid_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )
    payment_type = models.CharField(
        max_length=20,
        choices=PAYMENT_TYPE_CHOICES,
        default='fixed'
    )
    hourly_rate = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)]
    )
    
    # Timeline
    start_date = models.DateField()
    end_date = models.DateField()
    actual_end_date = models.DateField(null=True, blank=True)
    
    # Status
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='draft'
    )
    
    # Contract Terms
    terms_and_conditions = models.TextField(blank=True)
    warranty_period = models.CharField(max_length=100, blank=True)
    payment_terms = models.CharField(max_length=255, blank=True)
    
    # Signatures
    client_signed = models.BooleanField(default=False)
    professional_signed = models.BooleanField(default=False)
    client_signed_date = models.DateTimeField(null=True, blank=True)
    professional_signed_date = models.DateTimeField(null=True, blank=True)
    
    # Completion
    completion_percentage = models.PositiveIntegerField(
        default=0,
        validators=[MaxValueValidator(100)]
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'contracts'
        verbose_name = 'Contract'
        verbose_name_plural = 'Contracts'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['client']),
            models.Index(fields=['professional']),
            models.Index(fields=['start_date']),
            models.Index(fields=['end_date']),
        ]
    
    def __str__(self):
        return f"{self.contract_number} - {self.title}"
    
    def save(self, *args, **kwargs):
        if not self.contract_number:
            self.contract_number = f"CON-{timezone.now().year}-{str(uuid.uuid4())[:8].upper()}"
        super().save(*args, **kwargs)
    
    @property
    def remaining_amount(self):
        return self.total_amount - self.paid_amount
    
    def is_fully_signed(self):
        return self.client_signed and self.professional_signed
    
    def is_active(self):
        return self.status == 'active'
    
    def is_completed(self):
        return self.status == 'completed'


class ContractMilestone(models.Model):
    """
    مراحل العقد
    """
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    contract = models.ForeignKey(
        Contract,
        on_delete=models.CASCADE,
        related_name='milestones'
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    due_date = models.DateField()
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
    completion_date = models.DateField(null=True, blank=True)
    payment_date = models.DateField(null=True, blank=True)
    order = models.PositiveIntegerField(default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'contract_milestones'
        verbose_name = 'Contract Milestone'
        verbose_name_plural = 'Contract Milestones'
        ordering = ['order', 'due_date']
        unique_together = ['contract', 'order']
    
    def __str__(self):
        return f"{self.contract.contract_number} - {self.title}"


class ContractDocument(models.Model):
    """
    مستندات العقد
    """
    DOCUMENT_TYPE_CHOICES = [
        ('contract', 'Contract'),
        ('invoice', 'Invoice'),
        ('receipt', 'Receipt'),
        ('change_order', 'Change Order'),
        ('other', 'Other'),
    ]
    
    contract = models.ForeignKey(
        Contract,
        on_delete=models.CASCADE,
        related_name='documents'
    )
    name = models.CharField(max_length=255)
    document_type = models.CharField(
        max_length=20,
        choices=DOCUMENT_TYPE_CHOICES,
        default='other'
    )
    file = models.FileField(upload_to='contracts/documents/')
    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='uploaded_documents'
    )
    is_signed = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'contract_documents'
        verbose_name = 'Contract Document'
        verbose_name_plural = 'Contract Documents'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.contract.contract_number} - {self.name}"


class ContractLocation(models.Model):
    """
    مواقع العقد
    """
    contract = models.ForeignKey(
        Contract,
        on_delete=models.CASCADE,
        related_name='locations'
    )
    name = models.CharField(max_length=255)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )
    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )
    is_primary = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'contract_locations'
        verbose_name = 'Contract Location'
        verbose_name_plural = 'Contract Locations'
        ordering = ['-is_primary', '-created_at']
    
    def __str__(self):
        return f"{self.contract.contract_number} - {self.name}"
    
    def save(self, *args, **kwargs):
        # Ensure only one primary location per contract
        if self.is_primary:
            ContractLocation.objects.filter(
                contract=self.contract,
                is_primary=True
            ).exclude(pk=self.pk).update(is_primary=False)
        super().save(*args, **kwargs)


class ContractCalendarEvent(models.Model):
    """
    أحداث تقويم العقد (المواعيد)
    """
    EVENT_TYPE_CHOICES = [
        ('meeting', 'Meeting'),
        ('milestone', 'Milestone'),
        ('deadline', 'Deadline'),
        ('review', 'Review'),
        ('payment', 'Payment'),
        ('inspection', 'Inspection'),
        ('delivery', 'Delivery'),
        ('appointment', 'Appointment'),
    ]
    
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('postponed', 'Postponed'),
    ]
    
    PRIORITY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]
    
    contract = models.ForeignKey(
        Contract,
        on_delete=models.CASCADE,
        related_name='calendar_events'
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    event_type = models.CharField(
        max_length=20,
        choices=EVENT_TYPE_CHOICES,
        default='appointment'
    )
    date = models.DateField()
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    location = models.CharField(max_length=255, blank=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='scheduled'
    )
    priority = models.CharField(
        max_length=10,
        choices=PRIORITY_CHOICES,
        default='medium'
    )
    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_events'
    )
    notes = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'contract_calendar_events'
        verbose_name = 'Contract Calendar Event'
        verbose_name_plural = 'Contract Calendar Events'
        ordering = ['date', 'start_time']
        indexes = [
            models.Index(fields=['contract']),
            models.Index(fields=['date']),
            models.Index(fields=['event_type']),
            models.Index(fields=['status']),
        ]
    
    def __str__(self):
        return f"{self.contract.contract_number} - {self.title}"
    
    @property
    def duration(self):
        """Calculate event duration in minutes"""
        if self.start_time and self.end_time:
            start_minutes = self.start_time.hour * 60 + self.start_time.minute
            end_minutes = self.end_time.hour * 60 + self.end_time.minute
            return end_minutes - start_minutes
        return 0
