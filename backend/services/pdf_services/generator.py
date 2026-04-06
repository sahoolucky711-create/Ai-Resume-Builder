# backend/services/pdf_services/generator.py

from io import BytesIO
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import LETTER

from services.pdf_services.formatters import build_resume_context
from services.pdf_services.templates import ats_resume_template

from apps.resumes.models import Resume, Experience, Education, Skill
from django.http import FileResponse

# ---------- STYLE SETUP ----------

styles = getSampleStyleSheet()

name_style = styles["Heading1"]
section_title_style = styles["Heading2"]
body_style = styles["Normal"]


# ---------- SECTION RENDERERS ----------

def render_header(section, elements):
    elements.append(Paragraph(section["name"], name_style))
    contact_line = f"{section['email']} | {section['phone']}"
    elements.append(Paragraph(contact_line, body_style))
    elements.append(Spacer(1, 12))


def render_summary(section, elements):
    elements.append(Paragraph(section["title"], section_title_style))
    elements.append(Paragraph(section["content"], body_style))
    elements.append(Spacer(1, 12))


def render_skills(section, elements):
    elements.append(Paragraph(section["title"], section_title_style))
    skill_list = ListFlowable(
        [Paragraph(skill, body_style) for skill in section["items"]],
        bulletType="bullet"
    )
    elements.append(skill_list)
    elements.append(Spacer(1, 12))


def render_experience(section, elements):
    elements.append(Paragraph(section["title"], section_title_style))

    for item in section["items"]:
        header = f"<b>{item['role']}</b> - {item['company']} ({item['duration']})"
        elements.append(Paragraph(header, body_style))

        bullets = ListFlowable(
            [Paragraph(point, body_style) for point in item["description"]],
            bulletType="bullet"
        )
        elements.append(bullets)
        elements.append(Spacer(1, 8))

    elements.append(Spacer(1, 12))


def render_education(section, elements):
    elements.append(Paragraph(section["title"], section_title_style))

    for item in section["items"]:
        header = f"<b>{item['degree']}</b> - {item['institution']} ({item['duration']})"
        elements.append(Paragraph(header, body_style))

        if item["score"]:
            elements.append(Paragraph(f"Score: {item['score']}", body_style))

        elements.append(Spacer(1, 8))

    elements.append(Spacer(1, 12))

def render_projects(section, elements):
    elements.append(Paragraph(section["title"], section_title_style))

    for item in section["items"]:
        title = item.get("title", "")
        desc = item.get("description", "")

        elements.append(Paragraph(f"<b>{title}</b>", body_style))
        elements.append(Spacer(1, 4))

        if desc:
            if isinstance(desc, str):
                elements.append(Paragraph(desc.replace("\n", "<br/>"), body_style))
            elif isinstance(desc, list):
                for line in desc:
                    elements.append(Paragraph(str(line), body_style))

        elements.append(Spacer(1, 8))

    elements.append(Spacer(1, 12))


# ---------- MAIN GENERATOR ----------

def generate_resume_pdf(resume_id):
    """
    Main service entry.
    Returns PDF buffer.
    """

    # Fetch data
    resume = Resume.objects.get(id=resume_id)

    educations = resume.education_set.all()
    experiences = resume.experience_set.all()
    projects = resume.project_set.all()
    skills = resume.skill_set.all()


    # Build structured context
    context = build_resume_context(resume, experiences, educations, skills,projects)
    # Build ATS template layout
    template_sections = ats_resume_template(context)

    # Prepare PDF buffer
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=LETTER)

    elements = []

    # Render sections
    for section in template_sections:
        if section["type"] == "header":
            render_header(section, elements)

        elif section["type"] == "summary":
            render_summary(section, elements)

        elif section["type"] == "skills":
            render_skills(section, elements)

        elif section["type"] == "experience":
            render_experience(section, elements)

        elif section["type"] == "education":
            render_education(section, elements)
        elif section["type"] == "projects":
            render_projects(section, elements)


    # Build PDF
    doc.build(elements)

    buffer.seek(0)
    return buffer
