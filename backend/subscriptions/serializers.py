from rest_framework import serializers
from .models import SubscriptionPlan, UserSubscription
from user.serializers import UserSerializer

class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = '__all__'

class UserSubscriptionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    plan = SubscriptionPlanSerializer(read_only=True)
    
    class Meta:
        model = UserSubscription
        fields = '__all__'
        read_only_fields = (
            'user', 
            'plan',
            'payment_id',
            'amount',
            'start_date',
            'end_date',
            'is_active',
            'created_at',
            'updated_at'
        )

class PayHereInitSerializer(serializers.Serializer):
    plan_id = serializers.UUIDField()
    return_url = serializers.URLField()
    cancel_url = serializers.URLField()
    notify_url = serializers.URLField()

class PayHereCallbackSerializer(serializers.Serializer):
    merchant_id = serializers.CharField()
    order_id = serializers.CharField()
    payment_id = serializers.CharField()
    payhere_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    payhere_currency = serializers.CharField()
    status_code = serializers.IntegerField()
    md5sig = serializers.CharField()
    custom_1 = serializers.CharField()  # Will contain user_id
    custom_2 = serializers.CharField()  # Will contain plan_id
    method = serializers.CharField()
    status_message = serializers.CharField()