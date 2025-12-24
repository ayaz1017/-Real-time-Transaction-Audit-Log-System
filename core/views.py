# core/views.py
from django.db import transaction
from django.db.models import Q
from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Account, AuditLog
from .serializers import (
    AccountSerializer,
    TransferSerializer,
    AuditLogSerializer,
)


def home(request):
    return HttpResponse("Fintech backend is running.")


@api_view(["GET"])
def accounts_list(request):
    accounts = Account.objects.all().order_by("user_id")
    serializer = AccountSerializer(accounts, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def transfer(request):
    """
    POST /api/transfer/
    Body: { "sender": "USR001", "receiver": "USR002", "amount": 200 }
    Atomically debit sender, credit receiver, and write an AuditLog row.
    """
    serializer = TransferSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    sender_id = serializer.validated_data["sender"]
    receiver_id = serializer.validated_data["receiver"]
    amount = serializer.validated_data["amount"]

    if sender_id == receiver_id:
        return Response(
            {"detail": "Sender and receiver must be different."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    with transaction.atomic():
        sender = Account.objects.select_for_update().get(user_id=sender_id)
        receiver = Account.objects.select_for_update().get(user_id=receiver_id)

        if sender.balance < amount:
            AuditLog.objects.create(
                sender=sender,
                receiver=receiver,
                amount=amount,
                status="FAILED",
            )
            return Response(
                {"detail": "Insufficient balance."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        sender.balance -= amount
        receiver.balance += amount
        sender.save()
        receiver.save()

        log = AuditLog.objects.create(
            sender=sender,
            receiver=receiver,
            amount=amount,
            status="SUCCESS",
        )

    out = AuditLogSerializer(log).data
    return Response(out, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def user_audit_log(request):
    """
    GET /api/audit-log/?user_id=USR001
    Returns all SUCCESS/FAILED transfers where this user is sender or receiver.
    For now user_id query param is required (no auth).
    """
    user_id = request.query_params.get("user_id")
    if not user_id:
        return Response(
            {"detail": "user_id query param is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    qs = AuditLog.objects.filter(
        Q(sender__user_id=user_id) | Q(receiver__user_id=user_id)
    ).order_by("-created_at")

    serializer = AuditLogSerializer(qs, many=True)
    return Response(serializer.data)
