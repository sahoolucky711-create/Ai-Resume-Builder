# backend/services/pdf_services/formatters.py

def clean_text(text):
    if not text:
        return ""
    return str(text).strip()


# ---------- DATE FORMAT ----------

def format_date(date_obj):
    if not date_obj:
        return ""
    return date_obj.strftime("%b %Y")


def format_date_range(start_date, end_date=None):
    start = format_date(start_date)
    if not end_date:
        return f"{start} - Present"
    end = format_date(end_date)
    return f"{start} - {end}"


# ---------- EXPERIENCE ----------

def format_experience(experiences):
    formatted = []

    for exp in experiences:
        formatted.append({
            "role": clean_text(exp.position),
            "company": clean_text(exp.company_name),
            "duration": format_date_range(exp.duration_start, exp.duration_end),
            "description": clean_text(exp.description).split("\n") if exp.description else [],
        })

    return formatted


# ---------- EDUCATION ----------

def format_education(educations):
    formatted = []

    for edu in educations:
        formatted.append({
            "degree": clean_text(edu.degree),
            "institution": clean_text(edu.school_name),
            "duration": format_date(edu.graduation_date),
            "score": clean_text(edu.gpa),
        })

    return formatted


# ---------- SKILLS ----------

def format_skills(skills):
    skill_list = []

    for skill in skills:
        skill_list.append({
            "name": clean_text(skill.skill_name),
            "proficiency": clean_text(skill.proficiency),
            "years": clean_text(skill.years_of_experience),
        })

    return skill_list


# ---------- SUMMARY ----------

def format_summary(summary):
    return clean_text(summary)

# ---------- PROJECTS ----------

def format_projects(projects):
    formatted = []

    for proj in projects:
        formatted.append({
            "title": clean_text(proj.title),
            "description": clean_text(proj.description),
        })

    return formatted

# ---------- CONTEXT BUILDER ----------

def build_resume_context(resume, experiences, educations, skills, projects):
    return {
        "name": clean_text(resume.title),
        "email": clean_text(resume.email),
        "phone": clean_text(resume.phone),
        "summary": format_summary(resume.summary),
        "skills": format_skills(skills),
        "experience": format_experience(experiences),
        "education": format_education(educations),
        "projects": format_projects(projects),   # 🔥 ADD THIS LINE
    }


