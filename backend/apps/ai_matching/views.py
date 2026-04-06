from .engine import calculate_match, compare_skills
from apps.resumes.models import Resume
from apps.jobs.models import JobPosting, JobMatch
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


class AIMatchView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        resume_id = request.data.get("resume_id")
        job_id = request.data.get("job_id")

        try:
            resume = Resume.objects.get(id=resume_id, user=request.user)
            job = JobPosting.objects.get(id=job_id)
        except:
            return Response({"error": "Invalid resume or job id"}, status=400)

        # 🔥 STEP 1 — get skills FIRST
        text_skills = resume.skills.split(",") if resume.skills else []
        db_skills = [skill.skill_name for skill in resume.skills.all()]

        resume_skills = list(set([s.strip().lower() for s in text_skills + db_skills]))
        job_skills = job.required_skills or []

        # 🔥 STEP 2 — create text for TF-IDF
        resume_text = f"{resume.summary} {' '.join(resume_skills)}"
        job_text = f"{job.description} {' '.join(job_skills)}"

        # 🔥 STEP 3 — calculate match score
        score = calculate_match(resume_text, job_text)

        # 🔥 STEP 4 — compare skills
        matched_skills, missing_skills = compare_skills(resume_skills, job_skills)

        # 🔥 STEP 5 — save match
        JobMatch.objects.create(
            resume=resume,
            job=job,
            match_score=score,
            matching_skills=matched_skills,
            missing_skills=missing_skills
        )

        return Response({
            "match_score": score,
            "matched_skills": matched_skills,
            "missing_skills": missing_skills
        })
