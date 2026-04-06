import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const loadNotifications = async () => {
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

        const alerts: any[] = [];

        // 1️⃣ New Job Matches
        if (jobs.length > 0) {
          alerts.push({
            type: "info",
            message: `You have ${jobs.length} job matches available.`,
          });
        }

        // 2️⃣ High Match Score Alert
        const highMatches = jobs.filter((j: any) => j.match_score >= 70);
        if (highMatches.length > 0) {
          alerts.push({
            type: "success",
            message: `${highMatches.length} high match jobs (70%+) found.`,
          });
        }

        // 3️⃣ Skill Gap Warning
        const totalGaps = jobs.reduce(
          (sum: number, j: any) => sum + (j.missing_skills?.length || 0),
          0
        );

        if (totalGaps > 5) {
          alerts.push({
            type: "warning",
            message: `You have ${totalGaps} missing skills across matches. Consider improving your resume.`,
          });
        }

        // 4️⃣ Rejection Alert
        const rejected = apps.filter((a: any) => a.status === "rejected");
        if (rejected.length > 0) {
          alerts.push({
            type: "danger",
            message: `${rejected.length} applications were rejected. Update your resume strategy.`,
          });
        }

        // 5️⃣ Interview Alert
        const interviews = apps.filter((a: any) => a.status === "interview");
        if (interviews.length > 0) {
          alerts.push({
            type: "success",
            message: `${interviews.length} interview(s) scheduled. Prepare well!`,
          });
        }

        setNotifications(alerts);
      } catch (err) {
        console.error("Notification load failed", err);
      }
    };

    loadNotifications();
  }, []);

  const getColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-500/30 bg-green-500/10 text-green-400";
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";
      case "danger":
        return "border-red-500/30 bg-red-500/10 text-red-400";
      default:
        return "border-blue-500/30 bg-blue-500/10 text-blue-400";
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold">Notifications</h1>
        <p className="text-sm text-muted-foreground">
          Smart insights based on your job activity
        </p>
      </div>

      {notifications.length === 0 ? (
        <div className="glass-card p-6 text-sm text-muted-foreground">
          No new notifications. You're all caught up!
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n, i) => (
            <div
              key={i}
              className={`glass-card p-5 border ${getColor(n.type)}`}
            >
              {n.message}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Notifications;
