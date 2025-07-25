from rest_framework import serializers
from .models import Contract, ContractMilestone, ContractDocument, ContractLocation, ContractCalendarEvent
from authentication.models import User


class UserDetailSerializer(serializers.ModelSerializer):
    """Serializer for user details in contracts"""
    name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'avatar', 'name']
        read_only_fields = ['id']
    
    def get_name(self, obj):
        return f"{obj.first_name or ''} {obj.last_name or ''}".strip()


class ContractSerializer(serializers.ModelSerializer):
    """Serializer أساسي للعقود"""
    
    class Meta:
        model = Contract
        fields = [
            'id', 'contract_number', 'title', 'description',
            'client', 'professional', 'project',
            'total_amount', 'paid_amount', 'remaining_amount',
            'payment_type', 'hourly_rate',
            'start_date', 'end_date', 'actual_end_date',
            'status', 'completion_percentage',
            'client_signed', 'professional_signed',
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'contract_number', 'remaining_amount',
            'client_signed', 'professional_signed',
            'created_at', 'updated_at'
        ]


class ContractMilestoneSerializer(serializers.ModelSerializer):
    """Serializer لمراحل العقد"""
    
    class Meta:
        model = ContractMilestone
        fields = [
            'id', 'contract', 'title', 'description',
            'amount', 'due_date', 'status',
            'completion_date', 'payment_date', 'order',
            'created_at', 'updated_at'
        ]


class ContractDocumentSerializer(serializers.ModelSerializer):
    """Serializer لمستندات العقد"""
    
    class Meta:
        model = ContractDocument
        fields = [
            'id', 'contract', 'name', 'document_type',
            'file', 'uploaded_by', 'is_signed',
            'created_at'
        ]
        read_only_fields = ['id', 'uploaded_by', 'created_at']


class ContractLocationSerializer(serializers.ModelSerializer):
    """Serializer لمواقع العقد"""
    
    class Meta:
        model = ContractLocation
        fields = [
            'id', 'contract', 'name', 'address', 'city', 'state',
            'zip_code', 'country', 'latitude', 'longitude',
            'is_primary', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class ContractCalendarEventSerializer(serializers.ModelSerializer):
    """Serializer لأحداث تقويم العقد (المواعيد)"""
    
    class Meta:
        model = ContractCalendarEvent
        fields = [
            'id', 'contract', 'title', 'description', 'event_type',
            'date', 'start_time', 'end_time', 'location', 'status',
            'priority', 'assigned_to', 'notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class ContractDetailSerializer(serializers.ModelSerializer):
    """Serializer تفصيلي للعقود"""
    professional = UserDetailSerializer(read_only=True)
    client = UserDetailSerializer(read_only=True)
    milestones = ContractMilestoneSerializer(many=True, read_only=True)
    documents = ContractDocumentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Contract
        fields = [
            'id', 'contract_number', 'title', 'description',
            'client', 'professional', 'project',
            'total_amount', 'paid_amount', 'remaining_amount',
            'payment_type', 'hourly_rate',
            'start_date', 'end_date', 'actual_end_date',
            'status', 'completion_percentage',
            'terms_and_conditions', 'warranty_period', 'payment_terms',
            'client_signed', 'professional_signed',
            'client_signed_date', 'professional_signed_date',
            'milestones', 'documents',
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'contract_number', 'remaining_amount',
            'client_signed', 'professional_signed',
            'created_at', 'updated_at'
        ] 