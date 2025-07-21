from django.contrib import admin
from .models import SubscriptionPlan, UserSubscription

@admin.register(SubscriptionPlan)
class SubscriptionPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'duration_days', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('name',)
    ordering = ('created_at',)

@admin.register(UserSubscription)
class UserSubscriptionAdmin(admin.ModelAdmin):
    list_display = ('user', 'plan', 'amount', 'start_date', 'end_date', 'is_active')
    list_filter = ('is_active', 'plan')
    search_fields = ('user__email', 'payment_id')
    ordering = ('-start_date',)
    readonly_fields = ('start_date', 'end_date')