from django.db import models


class Account(models.Model):
    user_id = models.CharField(max_length=32, unique=True)
    balance = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.user_id} ({self.balance})"


class AuditLog(models.Model):
    STATUS_CHOICES = [
        ("SUCCESS", "Success"),
        ("FAILED", "Failed"),
    ]

    sender = models.ForeignKey(
        Account, related_name="sent_logs", on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        Account, related_name="received_logs", on_delete=models.CASCADE
    )
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default="SUCCESS"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.id}: {self.sender} -> {self.receiver} {self.amount} [{self.status}]"
