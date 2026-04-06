from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="resumes")
    title = models.CharField(max_length=255)
    summary = models.TextField(blank=True, null=True)
    #skills = models.TextField()

    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    portfolio = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Experience(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name="experiences")
    company_name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)

    duration_start = models.DateField()
    duration_end = models.DateField(blank=True, null=True)

    description = models.TextField(blank=True, null=True)
    skills_used = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f"{self.position} at {self.company_name}"


class Education(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name="educations")
    school_name = models.CharField(max_length=255)
    degree = models.CharField(max_length=100)
    field_of_study = models.CharField(max_length=100)

    graduation_date = models.DateField(blank=True, null=True)
    gpa = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"{self.degree} - {self.school_name}"


class Skill(models.Model):
    PROFICIENCY_CHOICES = (
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
        ('Expert', 'Expert'),
    )

    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name="skills")
    skill_name = models.CharField(max_length=100)
    proficiency = models.CharField(max_length=20, choices=PROFICIENCY_CHOICES)
    years_of_experience = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.skill_name

class Project(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name="projects")
    title = models.CharField(max_length=255)
    description = models.TextField()
    tech_stack = models.JSONField(blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    live_link = models.URLField(blank=True, null=True)
    def __str__(self):
        return self.title

class ResumeTemplate(models.Model):
    template_name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    layout = models.CharField(max_length=50)
    css_config = models.JSONField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.template_name
