from django.db import models
from django.conf import settings
from apps.resumes.models import Resume

User = settings.AUTH_USER_MODEL


class JobPosting(models.Model):
    job_title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    description = models.TextField()

    required_skills = models.JSONField(blank=True, null=True)
    experience_required = models.IntegerField(blank=True, null=True)

    location = models.CharField(max_length=255, blank=True, null=True)
    salary_range = models.CharField(max_length=100, blank=True, null=True)

    job_url = models.URLField(blank=True, null=True)
    source = models.CharField(max_length=50, blank=True, null=True)

    posted_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.job_title} - {self.company_name}"


class JobMatch(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name="job_matches")
    job = models.ForeignKey(JobPosting, on_delete=models.CASCADE, related_name="matches")

    match_score = models.DecimalField(max_digits=5, decimal_places=2)
    matching_skills = models.JSONField(blank=True, null=True)
    missing_skills = models.JSONField(blank=True, null=True)

    calculated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Match {self.match_score}%"
