from django.urls import path
from . import views

app_name = 'payments'

urlpatterns = [
    # Payment methods
    path('methods/', views.PaymentMethodListView.as_view(), name='payment_method_list'),
    path('methods/create/', views.PaymentMethodCreateView.as_view(), name='create_payment_method'),
    path('methods/<int:pk>/update/', views.PaymentMethodUpdateView.as_view(), name='update_payment_method'),
    path('methods/<int:pk>/delete/', views.PaymentMethodDeleteView.as_view(), name='delete_payment_method'),
    
    # Payments
    path('', views.PaymentListView.as_view(), name='payment_list'),
    path('<int:pk>/', views.PaymentDetailView.as_view(), name='payment_detail'),
    path('create/', views.PaymentCreateView.as_view(), name='create_payment'),
    path('process/', views.PaymentProcessView.as_view(), name='process_payment'),
    
    # Analytics and stats
    path('stats/', views.payment_stats, name='payment_stats'),
    path('summary/', views.payment_summary, name='payment_summary'),
    path('analytics/', views.payment_analytics, name='payment_analytics'),
] 