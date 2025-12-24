from django.urls import path
from . import views

urlpatterns = [
    path("accounts/", views.accounts_list),
    path("transfer/", views.transfer),
    path("audit-log/", views.user_audit_log),
]
