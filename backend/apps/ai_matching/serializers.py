from rest_framework import serializers


class AIMatchSerializer(serializers.Serializer):
    resume_id = serializers.IntegerField()
    job_id = serializers.IntegerField()
