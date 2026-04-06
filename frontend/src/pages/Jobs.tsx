import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, DollarSign, Target } from "lucide-react";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);


  // LOAD JOB MATCHES
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const token = localStorage.getItem("access");

        const res = await fetch("http://127.0.0.1:8000/api/jobs/matches/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Failed to load job matches", err);
      }
    };
    const loadAppliedJobs = async () => {
      try {
        const token = localStorage.getItem("access");

        const res = await fetch("http://127.0.0.1:8000/api/applications/list/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // store only job_ids user already applied to
        setAppliedJobs(data.map((a: any) => a.job_id));
      } catch (err) {
        console.error("Failed to load applied jobs", err);
      }
    };

    loadJobs();
    loadAppliedJobs();
  }, []);

  // 🔥 APPLY JOB FUNCTION
  const applyJob = async (jobId: number) => {
    try {
      const token = localStorage.getItem("access");

      // 1️⃣ get user's resume
      const resResume = await fetch("http://127.0.0.1:8000/api/resumes/list/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const resumes = await resResume.json();

      if (!resumes.length) {
        alert("Create a resume first");
        return;
      }

      const resumeId = resumes?.[0]?.id;

      console.log("RESUMES:", resumes);
      console.log("RESUME ID:", resumeId);

      if (!resumeId) {
        alert("Resume ID missing");
        return;
      }
      console.log("APPLY PAYLOAD:", {
        job: jobId,
        resume: resumeId,
      });



      // 2️⃣ apply to job
      const res = await fetch("http://127.0.0.1:8000/api/applications/apply/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          job_id: jobId,
          resume_id: resumeId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("BACKEND ERROR:", data);
        alert(JSON.stringify(data));
        return;
      }

      alert(data.message || "Applied successfully");

    } catch (err) {
      console.error(err);
      alert("Error applying");
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold">Job Matches</h1>
        <p className="text-sm text-muted-foreground">
          AI-matched jobs based on your resume skills
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="glass-card p-6 text-sm text-muted-foreground">
          No AI matches yet. Create a resume and add skills.
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => {
            console.log("JOB OBJECT:", job);
            return (

              <div
                key={job.id}
                className="glass-card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1">
                  <h3 className="font-display font-semibold">
                    {job.job_title}
                  </h3>

                  <div className="text-xs text-muted-foreground mt-2 flex gap-4">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {job.company_name}
                    </span>

                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </span>

                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {job.salary_range}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.matched_skills?.map((skill: string) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="font-display text-xl font-bold text-primary">
                        {job.match_score}%
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">Match</span>
                  </div>

                  {appliedJobs.includes(job.job_id) ? (
                    <Button size="sm" disabled className="bg-green-600 text-white">
                      Applied ✓
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => applyJob(job.job_id)}>
                      Apply
                    </Button>
                  )}

                </div>
              </div>
            )
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Jobs;
