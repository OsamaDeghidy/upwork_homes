from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q, Sum, Count
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
    lookup_field = 'pk'
    
    def get_queryset(self):
        user = self.request.user
        return Contract.objects.filter(
            Q(client=user) | Q(professional=user)
        )
    
    def update(self, request, *args, **kwargs):
        """Override update method with detailed error logging"""
        try:
            print(f"\n=== CONTRACT UPDATE DEBUG ===")
            print(f"Request method: {request.method}")
            print(f"Request path: {request.path}")
            print(f"Request data: {request.data}")
            print(f"Contract ID: {kwargs.get('pk')}")
            print(f"User: {request.user}")
            print(f"User authenticated: {request.user.is_authenticated}")
            print(f"User type: {getattr(request.user, 'user_type', 'N/A')}")
            
            # Check if user is authenticated
            if not request.user.is_authenticated:
                print("ERROR: User not authenticated")
                return Response(
                    {'error': 'Authentication required'}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )
            
            # Try to get the object
            try:
                instance = self.get_object()
                print(f"Found contract instance: {instance}")
                print(f"Contract client: {instance.client}")
                print(f"Contract professional: {instance.professional}")
            except Exception as get_obj_error:
                print(f"ERROR getting object: {str(get_obj_error)}")
                return Response(
                    {'error': f'Contract not found: {str(get_obj_error)}'}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Check permissions
            if request.user != instance.client and request.user != instance.professional:
                print(f"ERROR: User {request.user} not authorized for contract {instance}")
                return Response(
                    {'error': 'Not authorized to update this contract'}, 
                    status=status.HTTP_403_FORBIDDEN
                )
            
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            
            if not serializer.is_valid():
                print(f"Serializer errors: {serializer.errors}")
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            self.perform_update(serializer)
            print(f"Contract updated successfully")
            print(f"=== END CONTRACT UPDATE DEBUG ===\n")
            return Response(serializer.data)
            
        except Exception as e:
            print(f"Contract update error: {str(e)}")
            import traceback
            traceback.print_exc()
            return Response(
                {'error': f'Update failed: {str(e)}'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def perform_update(self, serializer):
        """Custom update logic"""
        contract = serializer.save()
        
        # Update project status when contract status changes to completed
        if 'status' in serializer.validated_data:
            new_status = serializer.validated_data['status']
            if new_status == 'completed' and contract.project:
                # Update the related project status to completed
                contract.project.status = 'completed'
                contract.project.completion_percentage = 100
                contract.project.save()
                print(f"Project {contract.project.id} status updated to completed")
            elif new_status in ['cancelled', 'disputed'] and contract.project:
                # Update project status based on contract status
                if new_status == 'cancelled':
                    contract.project.status = 'cancelled'
                elif new_status == 'disputed':
                    contract.project.status = 'paused'
                contract.project.save()
                print(f"Project {contract.project.id} status updated to {contract.project.status}")


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


class ContractStatsView(APIView):
    """إحصائيات العقود"""
    permission_classes = [permissions.IsAuthenticated]
    
    @extend_schema(
        operation_id="get_contract_stats",
        summary="إحصائيات العقود",
        description="الحصول على إحصائيات العقود للمستخدم الحالي",
        tags=["Contracts"]
    )
    def get(self, request):
        user = request.user
        
        # Get user's contracts (both as client and professional)
        user_contracts = Contract.objects.filter(
            Q(client=user) | Q(professional=user)
        )
        
        # Calculate statistics
        total_contracts = user_contracts.count()
        active_contracts = user_contracts.filter(status='active').count()
        completed_contracts = user_contracts.filter(status='completed').count()
        
        # Calculate financial statistics
        total_value = user_contracts.aggregate(
            total=Sum('total_amount')
        )['total'] or 0
        
        paid_amount = user_contracts.aggregate(
            paid=Sum('paid_amount')
        )['paid'] or 0
        
        pending_amount = total_value - paid_amount
        
        # Calculate completion rate
        completion_rate = 0
        if total_contracts > 0:
            completion_rate = (completed_contracts / total_contracts) * 100
        
        return Response({
            'total_contracts': total_contracts,
            'active_contracts': active_contracts,
            'completed_contracts': completed_contracts,
            'total_value': float(total_value),
            'paid_amount': float(paid_amount),
            'pending_amount': float(pending_amount),
            'completion_rate': round(completion_rate, 2)
        })


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
