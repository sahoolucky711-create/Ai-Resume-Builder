from rest_framework import generics, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated

from django.http import FileResponse
from .models import *
from .serializers import *

from services.pdf_services.generator import generate_resume_pdf


# ---------- CRUD VIEWS ----------

class ResumeCreateView(generics.CreateAPIView):
    serializer_class = ResumeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ResumeListView(generics.ListAPIView):
    serializer_class = ResumeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)


class ResumeDetailView(generics.RetrieveAPIView):
    serializer_class = ResumeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)


class ResumeUpdateView(generics.UpdateAPIView):
    serializer_class = ResumeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)


class ResumeDeleteView(generics.DestroyAPIView):
    serializer_class = ResumeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "pk"

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)

class ProjectCreateView(generics.CreateAPIView):
    serializer_class = ProjectSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
class SkillCreateView(generics.CreateAPIView):
    serializer_class = SkillSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


class ExperienceCreateView(generics.CreateAPIView):
    serializer_class = ExperienceSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


class EducationCreateView(generics.CreateAPIView):
    serializer_class = EducationSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
# ---------- PDF DOWNLOAD VIEW ----------

@api_view(["GET"])
@authentication_classes([JWTAuthentication])   # ADD THIS
@permission_classes([IsAuthenticated])
def download_resume_pdf(request, pk):

    try:
        resume = Resume.objects.get(id=pk, user=request.user)
    except Resume.DoesNotExist:
        return Response({"error": "Resume not found"}, status=404)

    pdf_buffer = generate_resume_pdf(pk)

    filename = f"{resume.title.replace(' ', '_')}_resume.pdf"

    return FileResponse(
        pdf_buffer,
        as_attachment=True,
        filename=filename,
        content_type="application/pdf"
    )

from services.ai_matching_services.suggestion_engine import generate_resume_suggestions

@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def resume_suggestions(request, pk):
    Resume.objects.get(id=pk, user=request.user)
    suggestions = generate_resume_suggestions(pk)
    return Response({"resume_id": pk, "suggestions": suggestions})
