from rest_framework import serializers
from .models import Account, AuditLog


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ["id", "user_id", "balance"]


class TransferSerializer(serializers.Serializer):
    sender = serializers.CharField()
    receiver = serializers.CharField()
    amount = serializers.DecimalField(max_digits=12, decimal_places=2)


class AuditLogSerializer(serializers.ModelSerializer):
    sender = serializers.CharField(source="sender.user_id")
    receiver = serializers.CharField(source="receiver.user_id")

    class Meta:
        model = AuditLog
        fields = ["id", "sender", "receiver", "amount", "status", "created_at"]
