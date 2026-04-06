import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { FileText, Briefcase, Target, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const [resumeCount, setResumeCount] = useState(0);
  const [jobMatchesCount, setJobMatchesCount] = useState(0);
  const [stats, setStats] = useState({
    matches: 0,
    applied: 0,
    avgScore: 0,
    skillGaps: 0,
  });
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const token = localStorage.getItem("access");

        // Fetch resumes
        const resumeRes = await fetch("http://127.0.0.1:8000/api/resumes/list/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const resumeData = await resumeRes.json();
        setResumeCount(resumeData.length);

        // Fetch job matches
        const jobRes = await fetch("http://127.0.0.1:8000/api/jobs/matches/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const jobData = await jobRes.json();
        setJobMatchesCount(jobData.length);

      } catch (err) {
        console.error("Dashboard load error:", err);
      }
    };
    const loadStats = async () => {
      try {
        const token = localStorage.getItem("access");

        const jobsRes = await fetch("http://127.0.0.1:8000/api/jobs/matches/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const jobs = await jobsRes.json();

        const appsRes = await fetch("http://127.0.0.1:8000/api/applications/list/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const apps = await appsRes.json();

        const avgScore =
          jobs.length > 0
            ? Math.round(
              jobs.reduce((sum: number, j: any) => sum + j.match_score, 0) /
              jobs.length
            )
            : 0;

        const skillGaps = jobs.reduce(
          (sum: number, j: any) => sum + (j.missing_skills?.length || 0),
          0
        );

        setStats({
          matches: jobs.length,
          applied: apps.length,
          avgScore,
          skillGaps,
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    };

    loadDashboardData();
    loadStats();
  }, []);

  const dashboardCards = [
    { icon: FileText, label: "Resumes", value: resumeCount, color: "text-primary" },
    { icon: Briefcase, label: "Job Matches", value: jobMatchesCount, color: "text-primary" },
    { icon: Target, label: "Applications", value: stats.applied, color: "text-primary" },
    { icon: TrendingUp, label: "Match Rate", value: stats.avgScore, color: "text-primary" },
  ];

  const recentActivity = [
    { text: "Resume updated recently", time: "Live data soon" },
    { text: "New job matches detected", time: "Live data soon" },
    { text: "Applications tracked", time: "Live data soon" },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here's your overview.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((stat) => (
          <div key={stat.label} className="glass-card flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <div className="font-display text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity */}
      <div className="glass-card p-6">
        <h2 className="mb-4 font-display text-lg font-semibold">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((item, i) => (
            <div
              key={i}
              className="flex items-start justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0"
            >
              <p className="text-sm text-foreground">{item.text}</p>
              <span className="ml-4 flex-shrink-0 text-xs text-muted-foreground">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <div className="glass-card p-4">
          <p className="text-xs text-muted-foreground">Matches</p>
          <h2 className="text-2xl font-bold">{stats.matches}</h2>
        </div>

        <div className="glass-card p-4">
          <p className="text-xs text-muted-foreground">Applied</p>
          <h2 className="text-2xl font-bold">{stats.applied}</h2>
        </div>

        <div className="glass-card p-4">
          <p className="text-xs text-muted-foreground">Resume Score</p>
          <h2 className="text-2xl font-bold">{stats.avgScore}%</h2>
        </div>

        <div className="glass-card p-4">
          <p className="text-xs text-muted-foreground">Skill Gaps</p>
          <h2 className="text-2xl font-bold">{stats.skillGaps}</h2>
        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;
