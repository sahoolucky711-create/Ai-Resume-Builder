from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from apps.jobs.models import JobPosting
from apps.resumes.models import Resume
from .models import Application
from .serializers import *
from drf_yasg.utils import swagger_auto_schema


from .serializers import ApplyJobSerializer
from drf_yasg.utils import swagger_auto_schema

class ApplyJobView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=ApplyJobSerializer)
    def post(self, request):
        serializer = ApplyJobSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        job_id = serializer.validated_data["job_id"]
        resume_id = serializer.validated_data["resume_id"]

        try:
            job = JobPosting.objects.get(id=job_id)
            resume = Resume.objects.get(id=resume_id, user=request.user)
        except:
            return Response({"error": "Invalid job or resume"}, status=400)

        if Application.objects.filter(user=request.user, job=job).exists():
            return Response({"message": "Already applied"}, status=200)

        Application.objects.create(
            user=request.user,
            job=job,
            resume=resume,
        )

        return Response({"message": "Application submitted successfully"})


class ApplicationListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        return Application.objects.filter(user=self.request.user).order_by("-applied_at")