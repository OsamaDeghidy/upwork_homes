from django.urls import path
from . import views

app_name = 'portfolio'

urlpatterns = [
    # Portfolio
    path('', views.PortfolioListView.as_view(), name='portfolio_list'),
    path('<int:pk>/', views.PortfolioDetailView.as_view(), name='portfolio_detail'),
    path('create/', views.PortfolioCreateView.as_view(), name='portfolio_create'),
    path('<int:pk>/update/', views.PortfolioUpdateView.as_view(), name='portfolio_update'),
    path('<int:pk>/delete/', views.PortfolioDeleteView.as_view(), name='portfolio_delete'),
    
    # My portfolio
    path('my/', views.MyPortfolioView.as_view(), name='my_portfolio'),
] 