from django.db import models
from user.models import User
import uuid
from django.utils import timezone

class SubscriptionPlan(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_days = models.IntegerField()  # 30 for monthly, 365 for yearly
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class UserSubscription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subscriptions')
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE)
    payment_id = models.CharField(max_length=100)  # PayHere payment ID
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.pk:  # Only on creation
            self.end_date = timezone.now() + timezone.timedelta(days=self.plan.duration_days)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.email} - {self.plan.name}"

    @property
    def is_valid(self):
        return self.is_active and timezone.now() < self.end_date