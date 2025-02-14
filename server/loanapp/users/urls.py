from django.urls import path
from . import views

urlpatterns = [
    # Authentication endpoints
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('verify-email/', views.verify_email, name='verify-email'),
    path('resend-verification/', views.resend_verification, name='resend-verification'),
    
    # Password management
    path('request-password-reset/', views.request_password_reset, name='request-password-reset'),
    path('reset-password/', views.reset_password, name='reset-password'),
    
    # Token management
    path('token/refresh/', views.token_refresh, name='token-refresh'),
    
    path('profile/', views.get_profile, name='get-profile'),
    path('profile/create/', views.create_profile, name='create_profile'),
    path('profile/update/', views.update_profile, name='update-profile'),
    
    path('credit-cards/', views.get_credit_cards, name='get-credit-cards'),
    path('credit-cards/add/', views.add_credit_card, name='add-credit-card'),
    path('credit-cards/<uuid:card_id>/delete/', views.delete_credit_card, name='delete-credit-card'),
    path('credit-cards/<uuid:card_id>/set-default/', views.set_default_card, name='set-default-card'),

    path('me/', views.get_user_details, name='user-details'),
    path('admin/users/', views.get_all_users_details, name='all-users-details'),
    path('admin/users/<int:user_id>/', views.get_specific_user_details, name='specific-user-details'),
]