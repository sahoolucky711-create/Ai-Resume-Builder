from rest_framework import serializers
from .models import Application

class ApplicationSerializer(serializers.ModelSerializer):
    job_id = serializers.IntegerField(source="job.id", read_only=True)

    job_title = serializers.CharField(source="job.job_title", read_only=True)
    company_name = serializers.CharField(source="job.company_name", read_only=True)
    location = serializers.CharField(source="job.location", read_only=True)
    status = serializers.CharField()

    class Meta:
        model = Application
        fields = [
            "id",
            "job_id",
            "job_title",
            "company_name",
            "location",
            "status",
            "applied_at",
        ]
from rest_framework import serializers

class ApplyJobSerializer(serializers.Serializer):
    job_id = serializers.IntegerField()
    resume_id = serializers.IntegerField()
    class Meta:
        model = Application
        fields = "__all__"
