from rest_framework import serializers
from .models import JobPosting,JobMatch


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPosting
        fields = "__all__"

class JobMatchSerializer(serializers.ModelSerializer):
    job_id = serializers.IntegerField(source="job.id", read_only=True)
    job_title = serializers.CharField(source="job.job_title", read_only=True)
    company_name = serializers.CharField(source="job.company_name", read_only=True)
    location = serializers.CharField(source="job.location", read_only=True)
    salary_range = serializers.CharField(source="job.salary_range", read_only=True)

    class Meta:
        model = JobMatch
        fields = [
            "id",
            "job_id",
            "job_title",
            "company_name",
            "location",
            "salary_range",
            "match_score",
            "matched_skills",
            "missing_skills",
        ]