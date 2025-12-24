from django.apps import AppConfig
from django.db.utils import OperationalError

class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core"

    def ready(self):
        
        from .models import Account

        # Seed only if table exists
        try:
            if Account.objects.count() == 0:
                defaults = {
                    "USR001": 2000,
                    "USR002": 2000,
                    "USR003": 2000,
                    "USR004": 2000,
                    "USR009": 2000,
                    "USR010": 2000,
                }
                for user_id, balance in defaults.items():
                    Account.objects.get_or_create(
                        user_id=user_id,
                        defaults={"balance": balance},
                    )
        except OperationalError:
            # Migrations not applied yet; skip
            pass
