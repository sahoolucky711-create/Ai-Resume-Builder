from django.db import models
from apps.resumes.models import Resume, ResumeTemplate


class PDFGenerated(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    template = models.ForeignKey(ResumeTemplate, on_delete=models.SET_NULL, null=True)

    pdf_url = models.URLField()
    generated_at = models.DateTimeField(auto_now_add=True)
    download_count = models.IntegerField(default=0)

    def __str__(self):
        return f"PDF for {self.resume.title}"
