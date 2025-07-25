from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import PaymentMethod, Payment

User = get_user_model()


class PaymentMethodSerializer(serializers.ModelSerializer):
    """Serializer لطرق الدفع"""
    
    class Meta:
        model = PaymentMethod
        fields = [
            'id', 'type', 'provider', 'last4', 'expiry_date',
            'cardholder_name', 'is_default', 'is_verified',
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'is_verified', 'created_at', 'updated_at'
        ]
        extra_kwargs = {
            'stripe_payment_method_id': {'write_only': True}
        }
    
    def validate_expiry_date(self, value):
        """Validate expiry date format"""
        if value and not value.match(r'^\d{2}/\d{2}$'):
            raise serializers.ValidationError("Expiry date must be in MM/YY format")
        return value
    
    def create(self, validated_data):
        # Set user from request
        validated_data['user'] = self.context['request'].user
        
        # If this is set as default, unset other defaults
        if validated_data.get('is_default', False):
            PaymentMethod.objects.filter(
                user=validated_data['user'],
                is_default=True
            ).update(is_default=False)
        
        return super().create(validated_data)


class PaymentMethodCreateSerializer(serializers.ModelSerializer):
    """Serializer لإنشاء طريقة دفع جديدة"""
    stripe_token = serializers.CharField(write_only=True)
    
    class Meta:
        model = PaymentMethod
        fields = [
            'type', 'stripe_token', 'cardholder_name', 'is_default'
        ]
    
    def create(self, validated_data):
        stripe_token = validated_data.pop('stripe_token')
        validated_data['user'] = self.context['request'].user
        
        # Here you would integrate with Stripe to create payment method
        # For now, we'll create a placeholder
        validated_data['provider'] = 'Stripe'
        validated_data['last4'] = '4242'
        validated_data['expiry_date'] = '12/25'
        validated_data['is_verified'] = True
        
        # If this is set as default, unset other defaults
        if validated_data.get('is_default', False):
            PaymentMethod.objects.filter(
                user=validated_data['user'],
                is_default=True
            ).update(is_default=False)
        
        return super().create(validated_data)


class PaymentSerializer(serializers.ModelSerializer):
    """Serializer للمدفوعات"""
    payer_info = serializers.SerializerMethodField()
    payee_info = serializers.SerializerMethodField()
    contract_info = serializers.SerializerMethodField()
    payment_method_info = serializers.SerializerMethodField()
    
    class Meta:
        model = Payment
        fields = [
            'id', 'payment_id', 'amount', 'currency', 'status', 'payment_type',
            'payer_info', 'payee_info', 'contract_info', 'milestone',
            'payment_method_info', 'description', 'created_at',
            'updated_at', 'processed_at'
        ]
        read_only_fields = [
            'id', 'payment_id', 'status', 'created_at',
            'updated_at', 'processed_at'
        ]
    
    def get_payer_info(self, obj):
        return {
            'id': obj.payer.id,
            'name': obj.payer.get_full_name(),
            'email': obj.payer.email,
            'avatar': obj.payer.avatar.url if obj.payer.avatar else None
        }
    
    def get_payee_info(self, obj):
        return {
            'id': obj.payee.id,
            'name': obj.payee.get_full_name(),
            'email': obj.payee.email,
            'avatar': obj.payee.avatar.url if obj.payee.avatar else None
        }
    
    def get_contract_info(self, obj):
        if obj.contract:
            return {
                'id': obj.contract.id,
                'title': obj.contract.title,
                'contract_number': obj.contract.contract_number
            }
        return None
    
    def get_payment_method_info(self, obj):
        if obj.payment_method:
            return {
                'id': obj.payment_method.id,
                'type': obj.payment_method.type,
                'provider': obj.payment_method.provider,
                'last4': obj.payment_method.last4
            }
        return None


class PaymentCreateSerializer(serializers.ModelSerializer):
    """Serializer لإنشاء دفعة جديدة"""
    
    class Meta:
        model = Payment
        fields = [
            'amount', 'currency', 'payee', 'contract', 'milestone',
            'payment_method', 'description'
        ]
    
    def validate_amount(self, value):
        """Validate payment amount"""
        if value <= 0:
            raise serializers.ValidationError("Payment amount must be positive")
        return value
    
    def validate_payment_method(self, value):
        """Validate payment method belongs to user"""
        if value and value.user != self.context['request'].user:
            raise serializers.ValidationError("Invalid payment method")
        return value
    
    def validate(self, attrs):
        """Validate payment data"""
        contract = attrs.get('contract')
        milestone = attrs.get('milestone')
        
        if milestone and milestone.contract != contract:
            raise serializers.ValidationError("Milestone must belong to the contract")
        
        if contract and contract.client != self.context['request'].user:
            raise serializers.ValidationError("You can only make payments for your own contracts")
        
        return attrs
    
    def create(self, validated_data):
        # Set payer from request user
        validated_data['payer'] = self.context['request'].user
        validated_data['status'] = 'pending'
        
        return super().create(validated_data)


class PaymentProcessSerializer(serializers.Serializer):
    """Serializer لمعالجة الدفع"""
    payment_id = serializers.IntegerField()
    stripe_payment_intent_id = serializers.CharField(required=False)
    
    def validate_payment_id(self, value):
        """Validate payment exists and belongs to user"""
        try:
            payment = Payment.objects.get(id=value)
            if payment.payer != self.context['request'].user:
                raise serializers.ValidationError("Payment not found")
            if payment.status != 'pending':
                raise serializers.ValidationError("Payment cannot be processed")
            return value
        except Payment.DoesNotExist:
            raise serializers.ValidationError("Payment not found")


class PaymentStatsSerializer(serializers.Serializer):
    """Serializer لإحصائيات المدفوعات"""
    total_payments = serializers.IntegerField()
    total_amount_paid = serializers.DecimalField(max_digits=15, decimal_places=2)
    total_amount_received = serializers.DecimalField(max_digits=15, decimal_places=2)
    pending_payments = serializers.IntegerField()
    succeeded_payments = serializers.IntegerField()
    failed_payments = serializers.IntegerField()
    total_refunds = serializers.DecimalField(max_digits=15, decimal_places=2)
    current_month_payments = serializers.DecimalField(max_digits=15, decimal_places=2)
    current_month_earnings = serializers.DecimalField(max_digits=15, decimal_places=2)


class PaymentHistorySerializer(serializers.ModelSerializer):
    """Serializer لتاريخ المدفوعات"""
    payment_type_display = serializers.SerializerMethodField()
    related_user = serializers.SerializerMethodField()
    
    class Meta:
        model = Payment
        fields = [
            'id', 'payment_id', 'amount', 'currency', 'status', 'payment_type',
            'payment_type_display', 'related_user', 'description',
            'created_at', 'processed_at'
        ]
    
    def get_payment_type_display(self, obj):
        """Get payment type based on user perspective"""
        user = self.context['request'].user
        if obj.payer == user:
            return 'outgoing'
        elif obj.payee == user:
            return 'incoming'
        return 'unknown'
    
    def get_related_user(self, obj):
        """Get the other party in the transaction"""
        user = self.context['request'].user
        if obj.payer == user:
            other_user = obj.payee
        else:
            other_user = obj.payer
        
        return {
            'id': other_user.id,
            'name': other_user.get_full_name(),
            'avatar': other_user.avatar.url if other_user.avatar else None
        }


class PaymentSummarySerializer(serializers.Serializer):
    """Serializer لملخص المدفوعات"""
    contract_id = serializers.IntegerField()
    contract_title = serializers.CharField()
    total_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    paid_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    remaining_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    payment_count = serializers.IntegerField()
    last_payment_date = serializers.DateTimeField()
    completion_percentage = serializers.DecimalField(max_digits=5, decimal_places=2)


# Import models for validation
from django.db import models 