from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from django.conf import settings
import random
import string
from datetime import datetime, timedelta
from django.utils import timezone
from .models import User
from .serializers import (
    UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer,
    EmailVerificationSerializer, PasswordResetRequestSerializer,
    PasswordResetSerializer
)
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.request import Request
from rest_framework.parsers import JSONParser
from io import BytesIO
from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
import logging

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate OTP
        otp = ''.join(random.choices(string.digits, k=6))
        user.otp = otp
        user.otp_created_at = datetime.now()
        user.save()
        
        # Send email with OTP
        send_mail(
            'Verify your email for PyWhiz',
            f'Your OTP is: {otp}',
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )
        
        return Response({
            'message': 'User registered successfully. Please check your email for OTP.',
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)

class VerifyEmailView(APIView):
    def post(self, request):
        serializer = EmailVerificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        otp = serializer.validated_data['otp']
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if OTP is valid and not expired (5 minutes)
        if (user.otp == otp and 
            user.otp_created_at and 
           (timezone.now() - user.otp_created_at) < timedelta(minutes=60)):
            user.email_verified = True
            user.otp = None
            user.otp_created_at = None
            user.save()
            return Response({'message': 'Email verified successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            access_token = response.data['access']
            refresh_token = response.data['refresh']
            
            # Set cookies
            response.set_cookie(
                'access_token',
                access_token,
                httponly=True,
                samesite='Lax'
            )
            response.set_cookie(
                'refresh_token',
                refresh_token,
                httponly=True,
                samesite='Lax'
            )
            
            # Remove tokens from response body
            del response.data['access']
            del response.data['refresh']
            
        return response

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        response = Response({'message': 'Logged out successfully'})
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response

class UserDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user

class PasswordResetRequestView(APIView):
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Generate OTP
        otp = ''.join(random.choices(string.digits, k=6))
        user.otp = otp
        user.otp_created_at = datetime.now()
        user.save()
        
        # Send email with OTP
        send_mail(
            'Password Reset OTP for PyWhiz',
            f'Your OTP is: {otp}',
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )
        
        return Response({'message': 'OTP sent to your email'}, status=status.HTTP_200_OK)

class PasswordResetView(APIView):
    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        otp = serializer.validated_data['otp']
        new_password = serializer.validated_data['new_password']
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if OTP is valid and not expired (5 minutes)
        if (user.otp == otp and 
            user.otp_created_at and 
            (timezone.now() - user.otp_created_at) < timedelta(minutes=60)):
            user.set_password(new_password)
            user.otp = None
            user.otp_created_at = None
            user.save()
            return Response({'message': 'Password reset successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)

logger = logging.getLogger(__name__)

class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            return Response(
                {"detail": "Refresh token not found in cookies"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            request_data = {'refresh': refresh_token}
            modified_request = Request(request._request)
            modified_request._full_data = request_data

            response = super().post(modified_request, *args, **kwargs)

            if response.status_code == 200:
                access_token = response.data.get('access')
                response.set_cookie(
                    key='access_token',
                    value=access_token,
                    httponly=True,
                    secure=not settings.DEBUG,
                    samesite='Lax',
                    max_age=int(settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()),
                    path='/',
                )

                response.data.pop('access', None)
                response.data.pop('refresh', None)

            return response

        except Exception as e:
            import traceback
            traceback_str = traceback.format_exc()
            print("🔴 Full traceback:\n", traceback_str)  # Logs to console
            return Response(
                {"detail": "Token refresh failed", "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
