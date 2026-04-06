import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, ArrowLeft } from "lucide-react";

interface Skill { name: string; proficiency: string; years: string }
interface Experience { company: string; position: string; startDate: string; endDate: string; description: string }
interface Education { school: string; degree: string; field: string; gradDate: string; gpa: string }

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [contact, setContact] = useState({ phone: "", email: "", linkedin: "", portfolio: "" });

  const [skills, setSkills] = useState<Skill[]>([{ name: "", proficiency: "Intermediate", years: "1" }]);
  const [experiences, setExperiences] = useState<Experience[]>([{ company: "", position: "", startDate: "", endDate: "", description: "" }]);
  const [education, setEducation] = useState<Education[]>([{ school: "", degree: "", field: "", gradDate: "", gpa: "" }]);

  interface Project {
    title: string;
    tech_stack: string;
    description: string;
    github: string;
    live: string;
  }

  const [projects, setProjects] = useState<Project[]>([
    { title: "", tech_stack: "", description: "", github: "", live: "" }
  ]);


  // LOAD EXISTING RESUME FOR EDIT
  useEffect(() => {
    if (!id) return;

    const loadResume = async () => {
      const token = localStorage.getItem("access");

      const res = await fetch(`http://127.0.0.1:8000/api/resumes/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      setTitle(data.title || "");
      setSummary(data.summary || "");
      setContact({
        phone: data.phone || "",
        email: data.email || "",
        linkedin: data.linkedin || "",
        portfolio: data.portfolio || "",
      });
    };

    loadResume();
  }, [id]);

  const addSkill = () => setSkills([...skills, { name: "", proficiency: "Intermediate", years: "1" }]);
  const removeSkill = (i: number) => setSkills(skills.filter((_, idx) => idx !== i));

  const addExp = () => setExperiences([...experiences, { company: "", position: "", startDate: "", endDate: "", description: "" }]);
  const removeExp = (i: number) => setExperiences(experiences.filter((_, idx) => idx !== i));

  const addEdu = () => setEducation([...education, { school: "", degree: "", field: "", gradDate: "", gpa: "" }]);
  const removeEdu = (i: number) => setEducation(education.filter((_, idx) => idx !== i));
  const addProject = () =>
    setProjects([...projects, { title: "", tech_stack: "", description: "", github: "", live: "" }]);

  const removeProject = (i: number) =>
    setProjects(projects.filter((_, idx) => idx !== i));


  const handleSave = async () => {
    try {
      const token = localStorage.getItem("access");

      const url = isEditMode
        ? `http://127.0.0.1:8000/api/resumes/${id}/update/`
        : "http://127.0.0.1:8000/api/resumes/create/";

      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          summary,
          phone: contact.phone,
          email: contact.email,
          linkedin: contact.linkedin,
          portfolio: contact.portfolio,
        }),
      });

      const resume = await res.json();
      if (!res.ok) {
        alert("Failed to save resume");
        return;
      }

      const resumeId = resume.id || id;

      // SAVE SKILLS
      for (let skill of skills) {
        if (!skill.name) continue;

        await fetch("http://127.0.0.1:8000/api/resumes/skills/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            resume: resumeId,
            skill_name: skill.name,
            proficiency: skill.proficiency,
            years_of_experience: skill.years,
          }),
        });
      }

      // SAVE EXPERIENCE
      for (let exp of experiences) {
        if (!exp.company) continue;

        await fetch("http://127.0.0.1:8000/api/resumes/experience/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            resume: resumeId,
            company_name: exp.company,
            position: exp.position,
            duration_start: exp.startDate,
            duration_end: exp.endDate,
            description: exp.description,
          }),
        });
      }

      // SAVE EDUCATION
      for (let edu of education) {
        if (!edu.school) continue;

        await fetch("http://127.0.0.1:8000/api/resumes/education/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            resume: resumeId,
            school_name: edu.school,
            degree: edu.degree,
            field_of_study: edu.field,
            graduation_date: edu.gradDate,
            gpa: edu.gpa,
          }),
        });
      }
      // SAVE PROJECTS
      for (let proj of projects) {
        await fetch("http://127.0.0.1:8000/api/resumes/projects/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            resume: resumeId,
            title: proj.title,
            tech_stack: proj.tech_stack,
            description: proj.description,
            github_link: proj.github,
            live_link: proj.live,
          }),
        });
      }


      alert(isEditMode ? "Resume updated!" : "Resume created!");
      navigate("/dashboard/resumes");

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link to="/dashboard/resumes" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to resumes
        </Link>
        <h1 className="font-display text-2xl font-bold">{isEditMode ? "Edit Resume" : "Resume Builder"}</h1>
        <p className="text-sm text-muted-foreground">Fill in your details to create a professional resume</p>
      </div>

      <div className="space-y-8">

        {/* BASIC INFO */}
        <div className="glass-card p-6 space-y-4">
          <Label>Resume Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />

          <Label>Professional Summary</Label>
          <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="Phone" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
            <Input placeholder="Email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
            <Input placeholder="LinkedIn" value={contact.linkedin} onChange={(e) => setContact({ ...contact, linkedin: e.target.value })} />
            <Input placeholder="Portfolio" value={contact.portfolio} onChange={(e) => setContact({ ...contact, portfolio: e.target.value })} />
          </div>
        </div>

        {/* SKILLS */}
        <div className="glass-card p-6">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Skills</h2>
            <Button onClick={addSkill}><Plus className="h-4 w-4" /></Button>
          </div>

          {skills.map((skill, i) => (
            <div key={i} className="flex gap-3 mb-3">
              <Input placeholder="Skill" value={skill.name} onChange={(e) => { const s = [...skills]; s[i].name = e.target.value; setSkills(s) }} />
              <Input placeholder="Years" value={skill.years} onChange={(e) => { const s = [...skills]; s[i].years = e.target.value; setSkills(s) }} />
              <Button onClick={() => removeSkill(i)} variant="ghost"><Trash2 /></Button>
            </div>
          ))}
        </div>

        {/* EXPERIENCE */}
        <div className="glass-card p-6">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Experience</h2>
            <Button onClick={addExp}><Plus /></Button>
          </div>
          {experiences.map((exp, i) => (
            <div key={i} className="space-y-2 mb-4">
              <Input placeholder="Company" value={exp.company} onChange={(e) => { const x = [...experiences]; x[i].company = e.target.value; setExperiences(x) }} />
              <Input placeholder="Position" value={exp.position} onChange={(e) => { const x = [...experiences]; x[i].position = e.target.value; setExperiences(x) }} />
            </div>
          ))}
        </div>

        {/* EDUCATION */}
        <div className="glass-card p-6">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Education</h2>
            <Button onClick={addEdu}><Plus /></Button>
          </div>
          {education.map((edu, i) => (
            <div key={i} className="space-y-2 mb-4">
              <Input placeholder="School" value={edu.school} onChange={(e) => { const x = [...education]; x[i].school = e.target.value; setEducation(x) }} />
              <Input placeholder="Degree" value={edu.degree} onChange={(e) => { const x = [...education]; x[i].degree = e.target.value; setEducation(x) }} />
            </div>
          ))}
        </div>
        {/* PROJECTS */}
        <div className="glass-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Projects</h2>
            <Button variant="outline" size="sm" onClick={addProject}>
              <Plus className="h-3 w-3" /> Add
            </Button>
          </div>

          {projects.map((proj, i) => (
            <div key={i} className="space-y-3 mb-4">
              <Input
                placeholder="Project title"
                value={proj.title}
                onChange={(e) => {
                  const n = [...projects];
                  n[i].title = e.target.value;
                  setProjects(n);
                }}
              />

              <Input
                placeholder="Tech stack (React, Django)"
                value={proj.tech_stack}
                onChange={(e) => {
                  const n = [...projects];
                  n[i].tech_stack = e.target.value;
                  setProjects(n);
                }}
              />

              <Textarea
                placeholder="Project description"
                value={proj.description}
                onChange={(e) => {
                  const n = [...projects];
                  n[i].description = e.target.value;
                  setProjects(n);
                }}
              />

              <Input
                placeholder="GitHub link"
                value={proj.github}
                onChange={(e) => {
                  const n = [...projects];
                  n[i].github = e.target.value;
                  setProjects(n);
                }}
              />

              <Input
                placeholder="Live link"
                value={proj.live}
                onChange={(e) => {
                  const n = [...projects];
                  n[i].live = e.target.value;
                  setProjects(n);
                }}
              />

              <Button variant="ghost" onClick={() => removeProject(i)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>


        <Button onClick={handleSave} className="px-8">Save Resume</Button>
      </div>
    </DashboardLayout>
  );
};

export default ResumeBuilder;
