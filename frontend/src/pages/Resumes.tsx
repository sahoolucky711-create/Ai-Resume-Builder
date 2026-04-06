import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, FileText, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

const Resumes = () => {
  const [resumes, setResumes] = useState<any[]>([]);

  useEffect(() => {
    const loadResumes = async () => {
      try {
        const token = localStorage.getItem("access");

        const res = await fetch("http://127.0.0.1:8000/api/resumes/list/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setResumes(data);
      } catch (err) {
        console.error("Failed to load resumes", err);
      }
    };

    loadResumes();
  }, []);

  const deleteResume = async (id: number) => {
    const confirmDelete = window.confirm("Delete this resume?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("access");

    await fetch(`http://127.0.0.1:8000/api/resumes/${id}/delete/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setResumes(resumes.filter((r) => r.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">My Resumes</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage your resumes
          </p>
        </div>

        <Link to="/dashboard/resumes/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Resume
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resumes.map((resume) => (
          <div key={resume.id} className="glass-card group p-6 hover:border-primary/30">
            
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>

              <button
                onClick={() => deleteResume(resume.id)}
                className="rounded-md p-1 text-muted-foreground hover:text-destructive"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <h3 className="mb-1 font-display font-semibold">
              {resume.title}
            </h3>

            <p className="mb-4 text-xs text-muted-foreground">
              Created: {new Date(resume.created_at).toLocaleDateString()}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Resume ID: {resume.id}
              </span>

              <Link to={`/dashboard/resumes/${resume.id}`}>
                <Button variant="ghost" size="sm" className="text-xs">
                  Edit
                </Button>
              </Link>
            </div>

            {/* ACTIONS */}
            <div className="mt-3 flex gap-2">

              {/* PDF */}
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={async () => {
                  const token = localStorage.getItem("access");

                  const res = await fetch(
                    `http://127.0.0.1:8000/api/resumes/${resume.id}/generate-pdf/`,
                    { headers: { Authorization: `Bearer ${token}` } }
                  );

                  const blob = await res.blob();
                  const url = window.URL.createObjectURL(blob);

                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${resume.title}.pdf`;
                  a.click();
                }}
              >
                Download PDF
              </Button>

              {/* SUGGESTIONS */}
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={async () => {
                  const token = localStorage.getItem("access");

                  const res = await fetch(
                    `http://127.0.0.1:8000/api/resumes/${resume.id}/suggestions/`,
                    { headers: { Authorization: `Bearer ${token}` } }
                  );

                  const data = await res.json();
                  alert(data.suggestions.join("\n"));
                }}
              >
                Suggestions
              </Button>

            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Resumes;
