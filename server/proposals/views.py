from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from django.utils import timezone
from datetime import datetime, timedelta
from .models import Proposal, ProposalMilestone
from .serializers import (
    ProposalListSerializer, ProposalDetailSerializer, 
    CreateProposalSerializer
)
from contracts.models import Contract, ContractMilestone


@api_view(['GET'])
@permission_classes([AllowAny])  # Allow anyone to view proposals
def proposal_list(request):
    """Get all proposals"""
    try:
        proposals = Proposal.objects.all().select_related(
            'professional', 'project'
        ).prefetch_related('milestones')
        
        serializer = ProposalListSerializer(proposals, many=True)
        return Response({
            'count': proposals.count(),
            'results': serializer.data
        })
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([AllowAny])  # Allow anyone to view project proposals
def project_proposals(request, project_id):
    """Get proposals for a specific project"""
    try:
        proposals = Proposal.objects.filter(
            project_id=project_id
        ).select_related(
            'professional', 'project'
        ).prefetch_related('milestones')
        
        serializer = ProposalListSerializer(proposals, many=True)
        return Response({
            'count': proposals.count(),
            'results': serializer.data
        })
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_proposal(request):
    """Create a new proposal"""
    try:
        serializer = CreateProposalSerializer(
            data=request.data, 
            context={'request': request}
        )
        if serializer.is_valid():
            proposal = serializer.save()
            response_serializer = ProposalDetailSerializer(proposal)
            return Response(
                response_serializer.data, 
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors, 
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([AllowAny])
def proposal_detail(request, proposal_id):
    """Get proposal details"""
    try:
        proposal = get_object_or_404(Proposal, id=proposal_id)
        serializer = ProposalDetailSerializer(proposal)
        return Response(serializer.data)
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


def create_contract_from_proposal(proposal, contract_data=None):
    """
    إنشاء عقد من العرض المقبول مع إمكانية تخصيص البيانات
    """
    try:
        print(f"DEBUG: Creating contract from proposal {proposal.id}")
        print(f"DEBUG: Proposal amount: {proposal.amount}")
        print(f"DEBUG: Proposal timeline: {proposal.timeline}")
        
        # حساب تواريخ البدء والانتهاء
        start_date = timezone.now().date()
        print(f"DEBUG: Start date: {start_date}")
        
        # استخدام البيانات المخصصة أو البيانات الافتراضية
        if contract_data:
            total_amount = contract_data.get('total_amount', proposal.amount)
            timeline_days = contract_data.get('timeline_days', 30)
            payment_type = contract_data.get('payment_type', 'fixed')
            payment_terms = contract_data.get('payment_terms', f"Payment: ${total_amount} USD")
            warranty_period = contract_data.get('warranty_period', proposal.warranty_period or "30 days")
        else:
            # إذا كان هناك timeline في العرض، نحسب تاريخ الانتهاء
            if proposal.timeline:
                # تحويل timeline إلى أيام (افتراض بسيط)
                timeline_days = 30  # افتراض 30 يوم
                if 'week' in proposal.timeline.lower():
                    timeline_days = 7
                elif 'month' in proposal.timeline.lower():
                    timeline_days = 30
                elif 'day' in proposal.timeline.lower():
                    timeline_days = 1
            else:
                timeline_days = 30  # افتراض 30 يوم
            
            total_amount = proposal.amount
            payment_type = 'fixed'
            payment_terms = f"Payment: ${total_amount} USD"
            warranty_period = proposal.warranty_period or "30 days"
        
        end_date = start_date + timedelta(days=timeline_days)
        print(f"DEBUG: End date: {end_date}")
        print(f"DEBUG: Total amount: {total_amount}")
        print(f"DEBUG: Payment type: {payment_type}")
        
        # إنشاء العقد
        contract = Contract.objects.create(
            title=f"Contract for {proposal.project.title}",
            description=proposal.cover_letter,
            client=proposal.project.client,
            professional=proposal.professional,
            project=proposal.project,
            total_amount=total_amount,
            payment_type=payment_type,
            start_date=start_date,
            end_date=end_date,
            status='pending',
            terms_and_conditions=proposal.cover_letter,
            payment_terms=payment_terms,
            warranty_period=warranty_period
        )
        
        print(f"DEBUG: Contract created with ID: {contract.id}")
        
        # إنشاء مراحل العقد
        if contract_data and contract_data.get('milestones'):
            # إنشاء مراحل مخصصة
            for i, milestone_data in enumerate(contract_data['milestones']):
                ContractMilestone.objects.create(
                    contract=contract,
                    title=milestone_data.get('title', f"Milestone {i+1}"),
                    description=milestone_data.get('description', ''),
                    amount=milestone_data.get('amount', total_amount / len(contract_data['milestones'])),
                    due_date=milestone_data.get('due_date', end_date),
                    status='pending',
                    order=i+1
                )
        else:
            # إنشاء مرحلة واحدة للعقد (يمكن تعديلها لاحقاً)
            ContractMilestone.objects.create(
                contract=contract,
                title="Project Completion",
                description="Complete project according to specifications",
                amount=contract.total_amount,
                due_date=contract.end_date,
                status='pending',
                order=1
            )
        
        print(f"DEBUG: Contract milestone created")
        return contract
    except Exception as e:
        print(f"DEBUG: Error creating contract from proposal: {e}")
        import traceback
        traceback.print_exc()
        return None


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_proposal(request, proposal_id):
    """Accept a proposal and create contract"""
    try:
        print(f"DEBUG: Accepting proposal {proposal_id}")
        print(f"DEBUG: Request user: {request.user}")
        print(f"DEBUG: Request user type: {request.user.user_type}")
        
        proposal = get_object_or_404(Proposal, id=proposal_id)
        print(f"DEBUG: Found proposal: {proposal.id}")
        print(f"DEBUG: Proposal status: {proposal.status}")
        print(f"DEBUG: Proposal project client: {proposal.project.client}")
        print(f"DEBUG: Proposal project client ID: {proposal.project.client.id}")
        print(f"DEBUG: Request user ID: {request.user.id}")
        
        # Check if user is project owner
        if proposal.project.client != request.user:
            print(f"DEBUG: Permission denied - user is not project owner")
            print(f"DEBUG: Project client ID: {proposal.project.client.id}")
            print(f"DEBUG: Request user ID: {request.user.id}")
            return Response(
                {'error': 'Permission denied. Only the project owner can accept proposals.'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Check if proposal is already accepted
        if proposal.status == 'accepted':
            print(f"DEBUG: Proposal already accepted")
            return Response(
                {'error': 'This proposal is already accepted'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if proposal is rejected
        if proposal.status == 'rejected':
            print(f"DEBUG: Proposal is rejected")
            return Response(
                {'error': 'Cannot accept a rejected proposal'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if project already has an active contract
        print(f"DEBUG: Checking for existing contracts for project: {proposal.project.id}")
        existing_contracts = Contract.objects.filter(project=proposal.project)
        print(f"DEBUG: Found {existing_contracts.count()} contracts for this project")
        
        for contract in existing_contracts:
            print(f"DEBUG: Contract {contract.id} - Status: {contract.status}")
        
        existing_contract = Contract.objects.filter(
            project=proposal.project,
            status__in=['pending', 'active']
        ).first()
        
        if existing_contract:
            print(f"DEBUG: Project already has active contract: {existing_contract.id} with status: {existing_contract.status}")
            return Response(
                {'error': 'This project already has an active contract'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        print(f"DEBUG: Creating contract from proposal...")
        
        # Accept the proposal
        proposal.status = 'accepted'
        proposal.save()
        print(f"DEBUG: Proposal status updated to accepted")
        
        # Create contract from proposal
        contract = create_contract_from_proposal(proposal)
        
        if contract:
            print(f"DEBUG: Contract created successfully: {contract.id}")
            
            # Update proposal with contract reference
            proposal.contract = contract
            proposal.save()
            print(f"DEBUG: Proposal updated with contract: {contract.id}")
            
            # Update project status to in_progress
            project = proposal.project
            project.status = 'in_progress'
            project.assigned_professional = proposal.professional
            project.save()
            print(f"DEBUG: Project status updated to in_progress")
            
            return Response({
                'message': 'Proposal accepted and contract created successfully',
                'contract_id': contract.id,
                'contract_number': contract.contract_number,
                'proposal_id': proposal.id
            })
        else:
            print(f"DEBUG: Failed to create contract")
            # Revert proposal status if contract creation failed
            proposal.status = 'pending'
            proposal.save()
            return Response(
                {'error': 'Failed to create contract. Please try again.'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
    except Exception as e:
        print(f"DEBUG: Exception in accept_proposal: {str(e)}")
        import traceback
        traceback.print_exc()
        return Response(
            {'error': f'An error occurred while accepting the proposal: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_contract_from_proposal_custom(request, proposal_id):
    """Create contract from proposal with custom data"""
    try:
        proposal = get_object_or_404(Proposal, id=proposal_id)
        
        # Check if user is project owner
        if proposal.project.client != request.user:
            return Response(
                {'error': 'Permission denied'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Check if proposal is already accepted
        if proposal.status == 'accepted':
            return Response(
                {'error': 'Proposal is already accepted'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if project already has an active contract
        existing_contract = Contract.objects.filter(
            project=proposal.project,
            status__in=['pending', 'active']
        ).first()
        
        if existing_contract:
            return Response(
                {'error': 'Project already has an active contract'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get custom contract data from request
        contract_data = request.data.get('contract_data', {})
        
        # Accept the proposal
        proposal.status = 'accepted'
        proposal.save()
        
        # Create contract from proposal with custom data
        contract = create_contract_from_proposal(proposal, contract_data)
        
        if contract:
            # Update project status to in_progress
            project = proposal.project
            project.status = 'in_progress'
            project.assigned_professional = proposal.professional
            project.save()
            
            return Response({
                'message': 'Contract created successfully from proposal',
                'contract_id': contract.id,
                'contract_number': contract.contract_number,
                'total_amount': contract.total_amount,
                'start_date': contract.start_date,
                'end_date': contract.end_date
            })
        else:
            return Response(
                {'error': 'Failed to create contract'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_proposal(request, proposal_id):
    """Reject a proposal"""
    try:
        proposal = get_object_or_404(Proposal, id=proposal_id)
        
        # Check if user is project owner
        if proposal.project.client != request.user:
            return Response(
                {'error': 'Permission denied'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        proposal.status = 'rejected'
        proposal.rejection_reason = request.data.get('reason', '')
        proposal.save()
        
        return Response({'message': 'Proposal rejected successfully'})
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
