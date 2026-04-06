from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Notification(models.Model):
    NOTIFICATION_TYPES = (
        ('job_match', 'Job Match'),
        ('application_update', 'Application Update'),
        ('skill_suggestion', 'Skill Suggestion'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")

    message = models.TextField()
    notification_type = models.CharField(max_length=30, choices=NOTIFICATION_TYPES)

    is_read = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.notification_type} for {self.user}"
