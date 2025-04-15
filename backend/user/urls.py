from django.urls import path
from .views import (
    RegisterView, VerifyEmailView, LoginView, LogoutView,
    UserDetailView, PasswordResetRequestView, PasswordResetView, CookieTokenRefreshView
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/', UserDetailView.as_view(), name='user-detail'),
    path('password-reset-request/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password-reset/', PasswordResetView.as_view(), name='password-reset'),
    path('token/refresh/', CookieTokenRefreshView.as_view(), name='token-refresh'),  # Use custom view,
]