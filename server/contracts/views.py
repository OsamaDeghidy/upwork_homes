from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from django.utils import timezone
from drf_spectacular.utils import extend_schema
from .models import Contract, ContractMilestone, ContractDocument, ContractLocation, ContractCalendarEvent
from .serializers import (
    ContractSerializer, ContractDetailSerializer, ContractMilestoneSerializer,
    ContractDocumentSerializer, ContractLocationSerializer, ContractCalendarEventSerializer
)
# Import location services
from location_services.models import UserLocation, Address
from location_services.serializers import UserLocationSerializer
# Import calendar services
from calendar_app.models import Appointment
from calendar_app.serializers import AppointmentSerializer
# Import payments for contract termination
from payments.models import Payment
from payments.serializers import PaymentSerializer


class ContractListView(generics.ListAPIView):
    """قائمة العقود"""
    serializer_class = ContractSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Contract.objects.filter(
            Q(client=user) | Q(professional=user)
        )


class ContractDetailView(generics.RetrieveAPIView):
    """تفاصيل العقد"""
    serializer_class = ContractDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Contract.objects.filter(
            Q(client=user) | Q(professional=user)
        )


class ContractCreateView(generics.CreateAPIView):
    """إنشاء عقد جديد"""
    serializer_class = ContractSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(client=self.request.user)


class ContractUpdateView(generics.UpdateAPIView):
    """تحديث العقد"""
    serializer_class = ContractSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Contract.objects.filter(
            Q(client=user) | Q(professional=user)
        )


class ContractSignView(APIView):
    """توقيع العقد"""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ContractSerializer
    
    @extend_schema(
        operation_id="sign_contract",
        summary="توقيع العقد",
        description="توقيع العقد من قبل العميل أو المحترف",
        tags=["Contracts"],
        request={
            'type': 'object',
            'properties': {}
        }
    )
    def post(self, request, pk):
        try:
            contract = Contract.objects.get(pk=pk)
            user = request.user
            
            if user == contract.client:
                contract.client_signed = True
                contract.client_signed_date = timezone.now()
            elif user == contract.professional:
                contract.professional_signed = True
                contract.professional_signed_date = timezone.now()
            else:
                return Response(
                    {'error': 'Not authorized to sign this contract'},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            contract.save()
            return Response({'message': 'Contract signed successfully'})
            
        except Contract.DoesNotExist:
            return Response(
                {'error': 'Contract not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class ContractMilestoneListView(generics.ListAPIView):
    """قائمة مراحل العقد"""
    serializer_class = ContractMilestoneSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        contract_id = self.kwargs.get('pk')
        user = self.request.user
        return ContractMilestone.objects.filter(
            contract_id=contract_id,
            contract__in=Contract.objects.filter(
                Q(client=user) | Q(professional=user)
            )
        )


class ContractDocumentListView(generics.ListAPIView):
    """قائمة مستندات العقد"""
    serializer_class = ContractDocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        contract_id = self.kwargs.get('pk')
        user = self.request.user
        return ContractDocument.objects.filter(
            contract_id=contract_id,
            contract__in=Contract.objects.filter(
                Q(client=user) | Q(professional=user)
            )
        )


class ClientContractListView(generics.ListAPIView):
    """قائمة عقود العميل"""
    serializer_class = ContractSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Contract.objects.filter(client=self.request.user)


class ProfessionalContractListView(generics.ListAPIView):
    """قائمة عقود المحترف"""
    serializer_class = ContractSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Contract.objects.filter(professional=self.request.user)


# Contract Amendments Views (Appointments)
class ContractAmendmentListView(generics.ListCreateAPIView):
    """Contract Appointments List - Connected to Calendar App"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        contract_id = self.kwargs.get('pk')
        # Get appointments from calendar_app for this contract
        return Appointment.objects.filter(
            project__contracts__id=contract_id
        ).select_related('professional', 'client', 'project')
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = AppointmentSerializer(queryset, many=True)
        return Response({
            'count': queryset.count(),
            'results': serializer.data
        })
    
    def create(self, request, *args, **kwargs):
        contract_id = self.kwargs.get('pk')
        try:
            contract = Contract.objects.get(pk=contract_id)
            
            # Create appointment in calendar_app
            appointment_data = {
                'title': request.data.get('title'),
                'description': request.data.get('description'),
                'professional': contract.professional.id,
                'client': contract.client.id,
                'project': contract.project.id,
                'date': request.data.get('appointment_date'),
                'time': request.data.get('start_time'),
                'duration': self._calculate_duration(
                    request.data.get('start_time'),
                    request.data.get('end_time')
                ),
                'location': request.data.get('location'),
                'type': 'consultation',
                'status': 'scheduled'
            }
            
            serializer = AppointmentSerializer(data=appointment_data)
            if serializer.is_valid():
                appointment = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
        except Contract.DoesNotExist:
            return Response(
                {'error': 'Contract not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def _calculate_duration(self, start_time, end_time):
        """Calculate duration in minutes between start and end time"""
        if not start_time or not end_time:
            return 60  # Default 1 hour
        
        try:
            from datetime import datetime
            start = datetime.strptime(start_time, '%H:%M')
            end = datetime.strptime(end_time, '%H:%M')
            duration = (end - start).total_seconds() / 60
            return max(15, int(duration))  # Minimum 15 minutes
        except:
            return 60


# Contract Locations Views  
class ContractLocationListView(generics.ListCreateAPIView):
    """قائمة مواقع العقد"""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ContractLocationSerializer
    
    def get_queryset(self):
        contract_id = self.kwargs.get('pk')
        return ContractLocation.objects.filter(contract_id=contract_id)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'count': queryset.count(),
            'results': serializer.data
        })
    
    def create(self, request, *args, **kwargs):
        contract_id = self.kwargs.get('pk')
        try:
            contract = Contract.objects.get(pk=contract_id)
            # Add contract context to request
            request.data['contract'] = contract_id
            return super().create(request, *args, **kwargs)
        except Contract.DoesNotExist:
            return Response(
                {'error': 'Contract not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class ContractLocationDetailView(generics.RetrieveAPIView):
    """تفاصيل موقع العقد"""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ContractLocationSerializer
    
    def get_queryset(self):
        return ContractLocation.objects.all()


class ContractLocationUpdateView(generics.UpdateAPIView):
    """تحديث موقع العقد"""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ContractLocationSerializer
    
    def get_queryset(self):
        return ContractLocation.objects.all()


class ContractLocationDeleteView(generics.DestroyAPIView):
    """حذف موقع العقد"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return ContractLocation.objects.all()


class ContractLocationSetPrimaryView(APIView):
    """تعيين موقع العقد كموقع رئيسي"""
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, pk):
        try:
            location = ContractLocation.objects.get(pk=pk)
            # Set all other locations in the same contract as non-primary
            ContractLocation.objects.filter(contract=location.contract).update(is_primary=False)
            # Set this location as primary
            location.is_primary = True
            location.save()
            serializer = ContractLocationSerializer(location)
            return Response(serializer.data)
        except ContractLocation.DoesNotExist:
            return Response(
                {'error': 'Location not found'},
                status=status.HTTP_404_NOT_FOUND
            )


# Contract Calendar Events Views
class ContractCalendarEventListView(generics.ListCreateAPIView):
    """قائمة أحداث تقويم العقد (المواعيد)"""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ContractCalendarEventSerializer
    
    def get_queryset(self):
        contract_id = self.kwargs.get('pk')
        return ContractCalendarEvent.objects.filter(contract_id=contract_id)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'count': queryset.count(),
            'results': serializer.data
        })
    
    def create(self, request, *args, **kwargs):
        contract_id = self.kwargs.get('pk')
        try:
            contract = Contract.objects.get(pk=contract_id)
            # Add contract context to request
            request.data['contract'] = contract_id
            return super().create(request, *args, **kwargs)
        except Contract.DoesNotExist:
            return Response(
                {'error': 'Contract not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class ContractTerminateView(APIView):
    """إنهاء العقد وتحويل الأموال للمحترف"""
    permission_classes = [permissions.IsAuthenticated]
    
    @extend_schema(
        operation_id="terminate_contract",
        summary="إنهاء العقد",
        description="إنهاء العقد من قبل العميل مع تحويل الأموال المتبقية للمحترف",
        tags=["Contracts"],
        request={
            'type': 'object',
            'properties': {
                'reason': {
                    'type': 'string',
                    'description': 'سبب إنهاء العقد'
                }
            }
        }
    )
    def post(self, request, pk):
        try:
            contract = Contract.objects.get(pk=pk)
            user = request.user
            
            # Only client can terminate contract
            if user != contract.client:
                return Response(
                    {'error': 'Only the client can terminate this contract'},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            # Check if contract is already terminated
            if contract.status == 'terminated':
                return Response(
                    {'error': 'Contract is already terminated'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Calculate remaining amount
            total_paid = contract.paid_amount or 0
            total_amount = contract.total_amount or 0
            remaining_amount = total_amount - total_paid
            
            # Create payment to professional for remaining amount
            if remaining_amount > 0:
                payment_data = {
                    'amount': remaining_amount,
                    'payment_type': 'contract_termination',
                    'status': 'completed',
                    'payer': contract.client,
                    'payee': contract.professional,
                    'contract': contract,
                    'description': f'Contract termination payment - Contract #{contract.contract_number}',
                    'notes': request.data.get('reason', 'Contract terminated by client')
                }
                
                payment = Payment.objects.create(**payment_data)
                
                # Update contract
                contract.status = 'terminated'
                contract.actual_end_date = timezone.now()
                contract.paid_amount = total_amount  # Mark as fully paid
                contract.save()
                
                return Response({
                    'message': 'Contract terminated successfully',
                    'payment_id': payment.id,
                    'amount_transferred': remaining_amount,
                    'contract_status': contract.status
                })
            else:
                # No remaining amount to transfer
                contract.status = 'terminated'
                contract.actual_end_date = timezone.now()
                contract.save()
                
                return Response({
                    'message': 'Contract terminated successfully',
                    'amount_transferred': 0,
                    'contract_status': contract.status
                })
                
        except Contract.DoesNotExist:
            return Response(
                {'error': 'Contract not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': f'Failed to terminate contract: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
