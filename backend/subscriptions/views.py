from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import SubscriptionPlan, UserSubscription
from .serializers import (
    SubscriptionPlanSerializer, UserSubscriptionSerializer,
    PayHereInitSerializer, PayHereCallbackSerializer
)
from user.models import User
from django.conf import settings
import hashlib
import uuid
import logging
from datetime import timedelta
from django.utils import timezone

logger = logging.getLogger(__name__)

class SubscriptionPlanListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = SubscriptionPlan.objects.filter(is_active=True)
    serializer_class = SubscriptionPlanSerializer

class UserSubscriptionView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSubscriptionSerializer
    
    def get_object(self):
        user = self.request.user
        subscription = UserSubscription.objects.filter(
            user=user,
            is_active=True,
            end_date__gt=timezone.now()
        ).order_by('-end_date').first()
        
        return subscription

class InitiatePaymentView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = PayHereInitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            plan = SubscriptionPlan.objects.get(
                id=serializer.validated_data['plan_id'],
                is_active=True
            )
        except SubscriptionPlan.DoesNotExist:
            return Response(
                {'error': 'Invalid subscription plan'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = request.user
        order_id = str(uuid.uuid4())
        
        # PayHere parameters
        payhere_params = {
            'merchant_id': settings.PAYHERE_MERCHANT_ID,
            'return_url': serializer.validated_data['return_url'],
            'cancel_url': serializer.validated_data['cancel_url'],
            'notify_url': serializer.validated_data['notify_url'],
            'order_id': order_id,
            'items': f"PyWhiz {plan.name} Subscription",
            'currency': 'USD',
            'amount': str(plan.price),
            'first_name': user.username,
            'email': user.email,
            'custom_1': str(user.id),  # Store user ID for verification
            'custom_2': str(plan.id),   # Store plan ID for verification
        }
        
        # Generate MD5 hash for security
        secret = settings.PAYHERE_MERCHANT_SECRET
        md5_hash = hashlib.md5()
        md5_hash.update(secret.encode('utf-8'))
        
        for key, value in sorted(payhere_params.items()):
            md5_hash.update(key.encode('utf-8'))
            md5_hash.update(value.encode('utf-8'))
        
        payhere_params['hash'] = md5_hash.hexdigest().upper()
        
        return Response({
            'payment_url': settings.PAYHERE_CHECKOUT_URL,
            'payment_params': payhere_params
        })

class PaymentCallbackView(APIView):
    permission_classes = []  # Public endpoint for PayHere callbacks
    
    def post(self, request):
        serializer = PayHereCallbackSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        data = serializer.validated_data
        
        # Verify MD5 signature
        secret = settings.PAYHERE_MERCHANT_SECRET
        md5_hash = hashlib.md5()
        md5_hash.update(secret.encode('utf-8'))
        
        # PayHere sends all parameters except md5sig for verification
        for key, value in sorted(request.data.items()):
            if key != 'md5sig' and key != 'hash':
                md5_hash.update(key.encode('utf-8'))
                md5_hash.update(str(value).encode('utf-8'))
        
        calculated_hash = md5_hash.hexdigest().upper()
        
        if calculated_hash != data['md5sig']:
            logger.error(f"Invalid hash for payment {data['payment_id']}")
            return Response({'status': 'invalid_hash'}, status=400)
        
        # Check if payment was successful (status_code 2 is success)
        if data['status_code'] != 2:
            logger.info(f"Payment failed for {data['payment_id']}: {data['status_message']}")
            return Response({'status': 'payment_failed'})
        
        try:
            user = User.objects.get(id=data['custom_1'])
            plan = SubscriptionPlan.objects.get(id=data['custom_2'])
        except (User.DoesNotExist, SubscriptionPlan.DoesNotExist):
            logger.error(f"Invalid user or plan in payment {data['payment_id']}")
            return Response({'status': 'invalid_user_or_plan'}, status=400)
        
        # Create or update subscription
        subscription, created = UserSubscription.objects.update_or_create(
            user=user,
            payment_id=data['payment_id'],
            defaults={
                'plan': plan,
                'amount': data['payhere_amount'],
                'is_active': True
            }
        )
        
        logger.info(f"Subscription updated for user {user.email}: {subscription}")
        return Response({'status': 'success'})

class CheckSubscriptionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        response = self.get_response(request)
        return response
    
    def process_view(self, request, view_func, view_args, view_kwargs):
        # Skip for certain endpoints
        if request.path in [
            '/api/subscriptions/plans/',
            '/api/subscriptions/initiate/',
            '/api/subscriptions/callback/',
            '/api/subscriptions/status/'
        ] or request.path.startswith('/admin/'):
            return None
        
        user = request.user
        
        # Only check for authenticated users
        if not user.is_authenticated:
            return None
        
        # Check if user has completed 14 milestones
        from learn.models import UserProgress
        try:
            progress = UserProgress.objects.get(user=user)
            completed_count = progress.completed_milestones.count()
            
            # If user hasn't completed 14 milestones, no need to check subscription
            if completed_count < 4:
                return None
                
            # Check if user has active subscription
            from .models import UserSubscription
            has_active_sub = UserSubscription.objects.filter(
                user=user,
                is_active=True,
                end_date__gt=timezone.now()
            ).exists()
            
            if not has_active_sub:
                return Response(
                    {'error': 'Subscription required to access this content'},
                    status=status.HTTP_402_PAYMENT_REQUIRED
                )
                
        except UserProgress.DoesNotExist:
            return None

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

@api_view(['GET'])
@permission_classes([AllowAny])  # Allow access without authentication for testing
def payment_success_test(request):
    """Test endpoint for successful payment redirects"""
    return Response({
        "status": "TEST - Payment Success",
        "message": "This is a simulated success page. In production, users would be redirected here after payment.",
        "next_steps": [
            "Check Django admin for subscription record",
            "Verify callback was processed in server logs"
        ]
    })

@api_view(['GET'])
@permission_classes([AllowAny])  # Allow access without authentication for testing
def payment_cancel_test(request):
    """Test endpoint for canceled payments"""
    return Response({
        "status": "TEST - Payment Canceled",
        "message": "This is a simulated cancellation page. Users would be redirected here if they canceled the payment.",
        "next_steps": [
            "Verify no subscription was created in Django admin",
            "Check server logs for any callback attempts"
        ]
    })