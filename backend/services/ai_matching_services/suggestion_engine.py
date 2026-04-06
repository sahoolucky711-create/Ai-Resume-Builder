from apps.resumes.models import Resume, Experience, Education, Skill
from apps.jobs.models import JobMatch


def generate_resume_suggestions(resume_id):
    resume = Resume.objects.get(id=resume_id)

    experiences = Experience.objects.filter(resume=resume)
    educations = Education.objects.filter(resume=resume)
    skills = Skill.objects.filter(resume=resume)
    matches = JobMatch.objects.filter(resume=resume)

    suggestions = set()

    # Summary
    if not resume.summary:
        suggestions.add("Add a professional summary.")
    elif len(resume.summary.split()) < 20:
        suggestions.add("Expand summary with skills and goals.")

    # Experience
    if not experiences.exists():
        suggestions.add("Add internship/project experience.")
    else:
        for exp in experiences:
            if not exp.description or len(exp.description.split()) < 12:
                suggestions.add(f"Add measurable achievements at {exp.company_name}.")

    # Education
    if not educations.exists():
        suggestions.add("Add education details.")

    # Skills
    if skills.count() < 5:
        suggestions.add("Add more relevant technical skills.")

    # Profile links
    if not resume.linkedin:
        suggestions.add("Add LinkedIn profile.")
    if not resume.portfolio:
        suggestions.add("Add GitHub/portfolio link.")

    # Job skill gaps
    for match in matches:
        if match.missing_skills:
            for skill in match.missing_skills:
                suggestions.add(f"Learn {skill} to improve job matching.")

    return list(suggestions)
