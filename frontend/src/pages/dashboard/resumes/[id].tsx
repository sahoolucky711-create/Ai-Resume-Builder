import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

const EditResume = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [contact, setContact] = useState({
    phone: "",
    email: "",
    linkedin: "",
    portfolio: "",
  });

  useEffect(() => {
    const loadResume = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://127.0.0.1:8000/api/resumes/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

      } catch (err) {
        console.error("Failed to load resume", err);
      }
    };

    loadResume();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://127.0.0.1:8000/api/resumes/${id}/update/`, {
        method: "PUT",
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

      if (!res.ok) {
        alert("Failed to update resume");
        return;
      }

      alert("Resume updated!");
      navigate("/dashboard/resumes");

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link
          to="/dashboard/resumes"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to resumes
        </Link>

        <h1 className="font-display text-2xl font-bold">Edit Resume</h1>
        <p className="text-sm text-muted-foreground">
          Update your resume details
        </p>
      </div>

      <div className="glass-card p-6 space-y-4">
        <div className="space-y-2">
          <Label>Resume Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Professional Summary</Label>
          <Textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={contact.phone}
              onChange={(e) =>
                setContact({ ...contact, phone: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={contact.email}
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>LinkedIn</Label>
            <Input
              value={contact.linkedin}
              onChange={(e) =>
                setContact({ ...contact, linkedin: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Portfolio</Label>
            <Input
              value={contact.portfolio}
              onChange={(e) =>
                setContact({ ...contact, portfolio: e.target.value })
              }
            />
          </div>
        </div>

        <Button onClick={handleUpdate} className="px-8">
          Update Resume
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default EditResume;
