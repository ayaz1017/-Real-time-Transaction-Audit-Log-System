from django.contrib import admin
from .models import Account, AuditLog


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ("user_id", "balance")


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ("id", "sender", "receiver", "amount", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("sender__user_id", "receiver__user_id")
