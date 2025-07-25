from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Sum, Count, Q
from django.utils import timezone
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
from datetime import datetime, timedelta
from .models import PaymentMethod, Payment
from .serializers import (
    PaymentMethodSerializer, PaymentMethodCreateSerializer,
    PaymentSerializer, PaymentCreateSerializer, PaymentProcessSerializer,
    PaymentStatsSerializer,
    PaymentHistorySerializer, PaymentSummarySerializer
)

User = get_user_model()


class PaymentMethodListView(generics.ListAPIView):
    """قائمة طرق الدفع"""
    serializer_class = PaymentMethodSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return PaymentMethod.objects.filter(user=self.request.user)
    
    @extend_schema(
        operation_id="list_payment_methods",
        summary="List Payment Methods",
        description="Get current user's payment methods list",
        tags=["Payments"],
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class PaymentMethodCreateView(generics.CreateAPIView):
    """إضافة طريقة دفع جديدة"""
    serializer_class = PaymentMethodCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    @extend_schema(
        operation_id="create_payment_method",
        summary="إضافة طريقة دفع جديدة",
        description="إضافة طريقة دفع جديدة للمستخدم",
        tags=["Payment Methods"],
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class PaymentMethodUpdateView(generics.UpdateAPIView):
    """تحديث طريقة الدفع"""
    serializer_class = PaymentMethodSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return PaymentMethod.objects.filter(user=self.request.user)
    
    @extend_schema(
        operation_id="update_payment_method",
        summary="تحديث طريقة الدفع",
        description="تحديث طريقة دفع موجودة",
        tags=["Payment Methods"],
    )
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)
    
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


class PaymentMethodDeleteView(generics.DestroyAPIView):
    """حذف طريقة الدفع"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return PaymentMethod.objects.filter(user=self.request.user)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.is_default:
            # Find another payment method to set as default
            other_method = PaymentMethod.objects.filter(
                user=request.user
            ).exclude(id=instance.id).first()
            if other_method:
                other_method.is_default = True
                other_method.save()
        
        return super().destroy(request, *args, **kwargs)
    
    @extend_schema(
        operation_id="delete_payment_method",
        summary="حذف طريقة الدفع",
        description="حذف طريقة دفع موجودة",
        tags=["Payment Methods"],
    )
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)


class PaymentListView(generics.ListAPIView):
    """قائمة المدفوعات"""
    serializer_class = PaymentHistorySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['status', 'currency']
    ordering_fields = ['created_at', 'amount']
    ordering = ['-created_at']
    
    def get_queryset(self):
        user = self.request.user
        return Payment.objects.filter(
            Q(payer=user) | Q(payee=user)
        ).select_related('payer', 'payee', 'contract', 'payment_method')
    
    @extend_schema(
        operation_id="list_payments",
        summary="List Payments",
        description="Get current user's payments list",
        tags=["Payments"],
        parameters=[
            OpenApiParameter(
                name="status",
                description="حالة الدفع",
                required=False,
                type=OpenApiTypes.STR,
                enum=['pending', 'processing', 'succeeded', 'failed', 'cancelled']
            ),
            OpenApiParameter(
                name="currency",
                description="العملة",
                required=False,
                type=OpenApiTypes.STR
            ),
        ]
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class PaymentDetailView(generics.RetrieveAPIView):
    """تفاصيل الدفع"""
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Payment.objects.filter(
            Q(payer=user) | Q(payee=user)
        ).select_related('payer', 'payee', 'contract', 'payment_method')
    
    @extend_schema(
        operation_id="get_payment_detail",
        summary="Payment Details",
        description="Get specific payment details",
        tags=["Payments"],
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class PaymentCreateView(generics.CreateAPIView):
    """إنشاء دفع جديد"""
    serializer_class = PaymentCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        payment = serializer.save()
        # Here you would integrate with Stripe or other payment processor
        # For now, we'll just set it as pending
        payment.status = 'pending'
        payment.save()
    
    @extend_schema(
        operation_id="create_payment",
        summary="Create New Payment",
        description="Create new payment for contract or milestone",
        tags=["Payments"],
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class PaymentProcessView(APIView):
    """معالجة الدفع"""
    permission_classes = [permissions.IsAuthenticated]
    
    @extend_schema(
        operation_id="process_payment",
        summary="معالجة الدفع",
        description="معالجة الدفع مع Stripe أو مقدم الدفع",
        tags=["Payments"],
        request=PaymentProcessSerializer,
    )
    def post(self, request):
        serializer = PaymentProcessSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            payment_id = serializer.validated_data['payment_id']
            
            try:
                payment = Payment.objects.get(id=payment_id)
                
                # Here you would integrate with Stripe
                # For now, we'll simulate successful payment
                payment.status = 'succeeded'
                payment.processed_at = timezone.now()
                payment.save()
                
                # Update contract paid amount if applicable
                if payment.contract:
                    contract = payment.contract
                    contract.paid_amount += payment.amount
                    contract.save()
                
                # Update milestone if applicable
                if payment.milestone:
                    milestone = payment.milestone
                    milestone.status = 'completed'
                    milestone.payment_date = timezone.now().date()
                    milestone.save()
                
                return Response({
                    'message': 'Payment processed successfully',
                    'payment_id': payment.payment_id,
                    'status': payment.status
                })
                
            except Payment.DoesNotExist:
                return Response({
                    'error': 'Payment not found'
                }, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({
                    'error': 'Payment processing failed',
                    'details': str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def payment_stats(request):
    """إحصائيات المدفوعات"""
    user = request.user
    
    # Get payments where user is involved
    payments = Payment.objects.filter(Q(payer=user) | Q(payee=user))
    
    # Calculate stats
    total_payments = payments.count()
    total_amount_paid = payments.filter(payer=user, status='succeeded').aggregate(
        total=Sum('amount')
    )['total'] or 0
    
    total_amount_received = payments.filter(payee=user, status='succeeded').aggregate(
        total=Sum('amount')
    )['total'] or 0
    
    pending_payments = payments.filter(status='pending').count()
    succeeded_payments = payments.filter(status='succeeded').count()
    failed_payments = payments.filter(status='failed').count()
    
    # Calculate refunds
    refunds = Refund.objects.filter(
        Q(payment__payer=user) | Q(payment__payee=user),
        status='succeeded'
    )
    total_refunds = refunds.aggregate(total=Sum('amount'))['total'] or 0
    
    # Current month stats
    current_month_start = timezone.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    current_month_payments = payments.filter(
        payer=user,
        status='succeeded',
        processed_at__gte=current_month_start
    ).aggregate(total=Sum('amount'))['total'] or 0
    
    current_month_earnings = payments.filter(
        payee=user,
        status='succeeded',
        processed_at__gte=current_month_start
    ).aggregate(total=Sum('amount'))['total'] or 0
    
    stats = {
        'total_payments': total_payments,
        'total_amount_paid': total_amount_paid,
        'total_amount_received': total_amount_received,
        'pending_payments': pending_payments,
        'succeeded_payments': succeeded_payments,
        'failed_payments': failed_payments,
        'total_refunds': total_refunds,
        'current_month_payments': current_month_payments,
        'current_month_earnings': current_month_earnings
    }
    
    serializer = PaymentStatsSerializer(stats)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def payment_summary(request):
    """ملخص المدفوعات حسب العقد"""
    user = request.user
    
    # Get contracts where user is involved
    from contracts.models import Contract
    contracts = Contract.objects.filter(
        Q(client=user) | Q(professional=user)
    )
    
    summaries = []
    for contract in contracts:
        payments = Payment.objects.filter(
            contract=contract,
            status='succeeded'
        )
        
        paid_amount = payments.aggregate(total=Sum('amount'))['total'] or 0
        remaining_amount = contract.total_amount - paid_amount
        completion_percentage = (paid_amount / contract.total_amount * 100) if contract.total_amount > 0 else 0
        
        last_payment = payments.order_by('-processed_at').first()
        
        summary = {
            'contract_id': contract.id,
            'contract_title': contract.title,
            'total_amount': contract.total_amount,
            'paid_amount': paid_amount,
            'remaining_amount': remaining_amount,
            'payment_count': payments.count(),
            'last_payment_date': last_payment.processed_at if last_payment else None,
            'completion_percentage': completion_percentage
        }
        summaries.append(summary)
    
    serializer = PaymentSummarySerializer(summaries, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def payment_analytics(request):
    """تحليلات المدفوعات"""
    user = request.user
    
    # Get date range from query params
    days = int(request.query_params.get('days', 30))
    start_date = timezone.now() - timedelta(days=days)
    
    payments = Payment.objects.filter(
        Q(payer=user) | Q(payee=user),
        processed_at__gte=start_date,
        status='succeeded'
    )
    
    # Daily payment amounts
    daily_payments = {}
    for payment in payments:
        date_key = payment.processed_at.date().isoformat()
        if date_key not in daily_payments:
            daily_payments[date_key] = {
                'paid': 0,
                'received': 0,
                'count': 0
            }
        
        daily_payments[date_key]['count'] += 1
        if payment.payer == user:
            daily_payments[date_key]['paid'] += float(payment.amount)
        else:
            daily_payments[date_key]['received'] += float(payment.amount)
    
    # Payment method distribution
    payment_methods = payments.values('payment_method__provider').annotate(
        count=Count('id'),
        total=Sum('amount')
    )
    
    # Payment status distribution
    all_payments = Payment.objects.filter(Q(payer=user) | Q(payee=user))
    status_distribution = all_payments.values('status').annotate(count=Count('id'))
    
    return Response({
        'daily_payments': daily_payments,
        'payment_methods': list(payment_methods),
        'status_distribution': list(status_distribution),
        'date_range': {
            'start': start_date.date().isoformat(),
            'end': timezone.now().date().isoformat(),
            'days': days
        }
    })


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def set_default_payment_method(request, method_id):
    """تعيين طريقة الدفع الافتراضية"""
    try:
        # Remove default from all user's payment methods
        PaymentMethod.objects.filter(
            user=request.user,
            is_default=True
        ).update(is_default=False)
        
        # Set the new default
        payment_method = PaymentMethod.objects.get(
            id=method_id,
            user=request.user
        )
        payment_method.is_default = True
        payment_method.save()
        
        return Response({
            'message': 'Default payment method updated successfully',
            'method_id': method_id
        })
        
    except PaymentMethod.DoesNotExist:
        return Response({
            'error': 'Payment method not found'
        }, status=status.HTTP_404_NOT_FOUND)
