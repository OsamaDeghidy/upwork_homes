from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import Contract, ContractMilestone, ContractDocument


@admin.register(Contract)
class ContractAdmin(admin.ModelAdmin):
    list_display = [
        'contract_number', 'title', 'client', 'professional', 
        'total_amount', 'status', 'progress_bar', 'is_signed', 'created_at'
    ]
    list_filter = ['status', 'payment_type', 'client_signed', 'professional_signed', 'created_at']
    search_fields = ['contract_number', 'title', 'client__username', 'professional__username']
    readonly_fields = ['contract_number', 'created_at', 'updated_at', 'remaining_amount']
    autocomplete_fields = ['client', 'professional', 'project']
    
    fieldsets = [
        ('معلومات أساسية', {
            'fields': ('contract_number', 'title', 'description')
        }),
        ('الأطراف', {
            'fields': ('client', 'professional', 'project')
        }),
        ('التفاصيل المالية', {
            'fields': ('total_amount', 'paid_amount', 'remaining_amount', 'payment_type', 'hourly_rate')
        }),
        ('الجدول الزمني', {
            'fields': ('start_date', 'end_date', 'actual_end_date')
        }),
        ('الحالة والإكمال', {
            'fields': ('status', 'completion_percentage')
        }),
        ('شروط العقد', {
            'fields': ('terms_and_conditions', 'warranty_period', 'payment_terms')
        }),
        ('التوقيعات', {
            'fields': ('client_signed', 'client_signed_date', 'professional_signed', 'professional_signed_date')
        }),
        ('الطوابع الزمنية', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    ]
    
    def progress_bar(self, obj):
        if obj.completion_percentage:
            percentage = int(obj.completion_percentage) if obj.completion_percentage else 0
            color = 'green' if percentage >= 100 else 'orange' if percentage >= 50 else 'red'
            return format_html(
                '<div style="width: 100px; background-color: #f0f0f0;">'
                '<div style="width: {}%; background-color: {}; height: 20px; text-align: center; color: white;">{}%</div>'
                '</div>',
                percentage, color, percentage
            )
        return "لم يبدأ"
    progress_bar.short_description = "Progress"
    
    def is_signed(self, obj):
        if obj.client_signed and obj.professional_signed:
            return format_html('<span style="color: green;">✓ موقع بالكامل</span>')
        elif obj.client_signed or obj.professional_signed:
            return format_html('<span style="color: orange;">⚠ موقع جزئياً</span>')
        else:
            return format_html('<span style="color: red;">✗ غير موقع</span>')
    is_signed.short_description = "Signature Status"


@admin.register(ContractMilestone)
class ContractMilestoneAdmin(admin.ModelAdmin):
    list_display = ['title', 'contract', 'amount', 'due_date', 'status', 'completion_date']
    list_filter = ['status', 'due_date', 'completion_date']
    search_fields = ['title', 'contract__contract_number', 'contract__title']
    autocomplete_fields = ['contract']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = [
        ('معلومات المرحلة', {
            'fields': ('contract', 'title', 'description', 'order')
        }),
        ('التفاصيل المالية', {
            'fields': ('amount',)
        }),
        ('الجدول الزمني', {
            'fields': ('due_date', 'completion_date', 'payment_date')
        }),
        ('الحالة', {
            'fields': ('status',)
        }),
        ('الطوابع الزمنية', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    ]


@admin.register(ContractDocument)
class ContractDocumentAdmin(admin.ModelAdmin):
    list_display = ['name', 'contract', 'document_type', 'uploaded_by', 'is_signed', 'created_at']
    list_filter = ['document_type', 'is_signed', 'created_at']
    search_fields = ['name', 'contract__contract_number']
    autocomplete_fields = ['contract', 'uploaded_by']
    readonly_fields = ['created_at']
    
    fieldsets = [
        ('معلومات المستند', {
            'fields': ('contract', 'name', 'document_type')
        }),
        ('الملف', {
            'fields': ('file', 'uploaded_by')
        }),
        ('حالة التوقيع', {
            'fields': ('is_signed',)
        }),
        ('الطوابع الزمنية', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    ]
