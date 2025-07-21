from django.urls import path
from .views import (
    SubscriptionPlanListView,
    UserSubscriptionView,
    InitiatePaymentView,
    PaymentCallbackView,
    payment_success_test,
    payment_cancel_test
)

urlpatterns = [
    path('plans/', SubscriptionPlanListView.as_view(), name='subscription-plans'),
    path('status/', UserSubscriptionView.as_view(), name='subscription-status'),
    path('initiate/', InitiatePaymentView.as_view(), name='initiate-payment'),
    path('callback/', PaymentCallbackView.as_view(), name='payment-callback'),
    
    # Testing endpoints
    path('test-success/', payment_success_test, name='test-success'),
    path('test-cancel/', payment_cancel_test, name='test-cancel'),
]