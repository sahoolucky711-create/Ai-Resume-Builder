from rest_framework import generics, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import JobPosting
from .serializers import JobSerializer
from apps.jobs.models import JobMatch

class JobCreateView(generics.CreateAPIView):
    serializer_class = JobSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]


class JobListView(generics.ListAPIView):
    serializer_class = JobSerializer
    queryset = JobPosting.objects.all()


class JobDetailView(generics.RetrieveAPIView):
    serializer_class = JobSerializer
    queryset = JobPosting.objects.all()


class JobUpdateView(generics.UpdateAPIView):
    serializer_class = JobSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = JobPosting.objects.all()


class JobDeleteView(generics.DestroyAPIView):
    serializer_class = JobSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = JobPosting.objects.all()
class JobMatchesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        matches = JobMatch.objects.filter(resume__user=request.user).select_related("job")

        data = []

        for m in matches:
            data.append({
                "id": m.id,                 # JobMatch id (keep)
                "job_id": m.job.id,         # 🔥 ADD THIS (REAL JobPosting id)

                "job_title": m.job.title if hasattr(m.job,"title") else m.job.job_title,
                "company_name": m.job.company_name,
                "location": m.job.location,
                "salary_range": m.job.salary_range,
                "match_score": m.match_score,
                "matched_skills": m.matching_skills,
                "missing_skills": m.missing_skills
            })


        return Response(data)