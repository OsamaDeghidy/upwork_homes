from django.urls import path
from . import views

app_name = 'contracts'

urlpatterns = [
    # Contract management
    path('', views.ContractListView.as_view(), name='contract_list'),
    path('stats/', views.ContractStatsView.as_view(), name='contract_stats'),
    path('<int:pk>/', views.ContractDetailView.as_view(), name='contract_detail'),
    path('create/', views.ContractCreateView.as_view(), name='contract_create'),
    path('<int:pk>/update/', views.ContractUpdateView.as_view(), name='contract_update'),
    
    # Contract actions
    path('<int:pk>/sign/', views.ContractSignView.as_view(), name='contract_sign'),
    path('<int:pk>/terminate/', views.ContractTerminateView.as_view(), name='contract_terminate'),
    path('<int:pk>/milestones/', views.ContractMilestoneListView.as_view(), name='milestone_list'),
    path('<int:pk>/documents/', views.ContractDocumentListView.as_view(), name='document_list'),
    
    # Contract amendments (now appointments)
    path('<int:pk>/amendments/', views.ContractAmendmentListView.as_view(), name='amendment_list'),
    
    # Contract locations
    path('<int:pk>/locations/', views.ContractLocationListView.as_view(), name='location_list'),
    
    # Contract calendar events (appointments)
    path('<int:pk>/calendar-events/', views.ContractCalendarEventListView.as_view(), name='calendar_event_list'),
    
    # Individual contract location operations
    path('locations/<int:pk>/', views.ContractLocationDetailView.as_view(), name='location_detail'),
    path('locations/<int:pk>/update/', views.ContractLocationUpdateView.as_view(), name='location_update'),
    path('locations/<int:pk>/delete/', views.ContractLocationDeleteView.as_view(), name='location_delete'),
    path('locations/<int:pk>/set_primary/', views.ContractLocationSetPrimaryView.as_view(), name='location_set_primary'),
    
    # Client contracts
    path('client/', views.ClientContractListView.as_view(), name='client_contracts'),
    
    # Professional contracts
    path('professional/', views.ProfessionalContractListView.as_view(), name='professional_contracts'),
]