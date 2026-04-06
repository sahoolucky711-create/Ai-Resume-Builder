from django.db import models
from django.contrib.auth import get_user_model
from apps.jobs.models import JobPosting
from apps.resumes.models import Resume

User = get_user_model()

class Application(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(JobPosting, on_delete=models.CASCADE)
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)

    status = models.CharField(default="applied", max_length=50)
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} → {self.job}"
