from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.resumes.models import Resume
from apps.jobs.models import JobPosting, JobMatch
from .engine import calculate_match, compare_skills


def get_resume_skills(resume):
    # pull skills from Skill model
    return [skill.skill_name for skill in resume.skills.all()]


@receiver(post_save, sender=Resume)
def auto_match_resume(sender, instance, created, **kwargs):
    if created:
        jobs = JobPosting.objects.all()

        resume_skills = get_resume_skills(instance)

        for job in jobs:
            score = calculate_match(
                instance.summary or "",
                job.description or ""
            )

            matched, missing = compare_skills(
                resume_skills,
                job.required_skills or []
            )

            JobMatch.objects.create(
                resume=instance,
                job=job,
                match_score=score,
                matching_skills=matched,
                missing_skills=missing
            )


@receiver(post_save, sender=JobPosting)
def auto_match_job(sender, instance, created, **kwargs):

    if not created:
        return

    job = instance   # clearer naming

    resumes = Resume.objects.all()

    for resume in resumes:
        resume_skills = get_resume_skills(resume)

        score = calculate_match(
            resume.summary or "",
            job.description or ""
        )

        matched, missing = compare_skills(
            resume_skills,
            job.required_skills or []
        )

        JobMatch.objects.update_or_create(
            resume=resume,
            job=job,
            defaults={
                "match_score": score,
                "matching_skills": matched,
                "missing_skills": missing
            }
        )

from apps.resumes.models import Skill


@receiver(post_save, sender=Skill)
def auto_match_on_skill_update(sender, instance, created, **kwargs):
    resume = instance.resume
    jobs = JobPosting.objects.all()

    resume_skills = get_resume_skills(resume)

    for job in jobs:
        score = calculate_match(
            resume.summary or "",
            job.description or ""
        )

        matched, missing = compare_skills(
            resume_skills,
            job.required_skills or []
        )

        JobMatch.objects.update_or_create(
            resume=resume,
            job=job,
            defaults={
                "match_score": score,
                "matching_skills": matched,
                "missing_skills": missing
            }
        )
