# backend/services/pdf_services/templates.py


# ---------- SECTION BUILDERS ----------

def build_header_section(context):
    return {
        "type": "header",
        "name": context.get("name"),
        "email": context.get("email"),
        "phone": context.get("phone"),
    }


def build_summary_section(context):
    if not context.get("summary"):
        return None

    return {
        "type": "summary",
        "title": "Professional Summary",
        "content": context.get("summary"),
    }


def build_skills_section(context):
    skills = context.get("skills", [])
    if not skills:
        return None

    skill_lines = []
    for skill in skills:
        line = skill["name"]
        if skill["proficiency"]:
            line += f" ({skill['proficiency']})"
        if skill["years"]:
            line += f" - {skill['years']} yrs"
        skill_lines.append(line)

    return {
        "type": "skills",
        "title": "Skills",
        "items": skill_lines,
    }


def build_experience_section(context):
    experiences = context.get("experience", [])
    if not experiences:
        return None

    items = []
    for exp in experiences:
        items.append({
            "role": exp["role"],
            "company": exp["company"],
            "duration": exp["duration"],
            "description": exp["description"],
        })

    return {
        "type": "experience",
        "title": "Experience",
        "items": items,
    }


def build_education_section(context):
    education = context.get("education", [])
    if not education:
        return None

    items = []
    for edu in education:
        items.append({
            "degree": edu["degree"],
            "institution": edu["institution"],
            "duration": edu["duration"],
            "score": edu.get("score"),
        })

    return {
        "type": "education",
        "title": "Education",
        "items": items,
    }
def build_projects_section(context):
    if not context.get("projects"):
        return None

    return {
        "type": "projects",
        "title": "Projects",
        "items": context["projects"]
    }


# ---------- MASTER TEMPLATE ----------

def ats_resume_template(context):
    """
    Returns ordered layout blueprint for ATS resume.
    """

    sections = []

    # Header
    sections.append(build_header_section(context))

    # Summary
    summary = build_summary_section(context)
    if summary:
        sections.append(summary)

    # Skills
    skills = build_skills_section(context)
    if skills:
        sections.append(skills)

    # Experience
    experience = build_experience_section(context)
    if experience:
        sections.append(experience)

    # Education
    education = build_education_section(context)
    if education:
        sections.append(education)
    project_section = build_projects_section(context)
    if project_section:
        sections.append(project_section)



    return sections
