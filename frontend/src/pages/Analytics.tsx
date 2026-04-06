import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalMatches: 0,
    avgScore: 0,
    totalApplied: 0,
    totalSkillGaps: 0,
  });

  const [applicationData, setApplicationData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);

  useEffect(() => {
    const loadAnalytics = async () => {
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

        setAnalytics({
          totalMatches: jobs.length,
          avgScore,
          totalApplied: apps.length,
          totalSkillGaps: skillGaps,
        });

        // 🔥 Real dynamic status chart
        const statusCounts: any = {};
        apps.forEach((a: any) => {
          statusCounts[a.status] = (statusCounts[a.status] || 0) + 1;
        });

        const statusChart = Object.keys(statusCounts).map((key) => ({
          name: key,
          value: statusCounts[key],
        }));

        setStatusData(statusChart);

        // 🔥 Real monthly application chart
        const monthly: any = {};
        apps.forEach((a: any) => {
          const month = new Date(a.applied_at).toLocaleString("default", { month: "short" });
          monthly[month] = (monthly[month] || 0) + 1;
        });

        const monthlyChart = Object.keys(monthly).map((m) => ({
          month: m,
          count: monthly[m],
        }));

        setApplicationData(monthlyChart);

      } catch (err) {
        console.error("Analytics load failed", err);
      }
    };

    loadAnalytics();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Track your job search performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4">
          <p className="text-xs text-muted-foreground">Matches</p>
          <h2 className="text-2xl font-bold">{analytics.totalMatches}</h2>
        </div>

        <div className="glass-card p-4">
          <p className="text-xs text-muted-foreground">Applied</p>
          <h2 className="text-2xl font-bold">{analytics.totalApplied}</h2>
        </div>

        <div className="glass-card p-4">
          <p className="text-xs text-muted-foreground">Resume Score</p>
          <h2 className="text-2xl font-bold">{analytics.avgScore}%</h2>
        </div>

        <div className="glass-card p-4">
          <p className="text-xs text-muted-foreground">Skill Gaps</p>
          <h2 className="text-2xl font-bold">{analytics.totalSkillGaps}</h2>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Applications Over Time */}
        <div className="glass-card p-6">
          <h3 className="mb-4 font-display font-semibold">Applications Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={applicationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="glass-card p-6">
          <h3 className="mb-4 font-display font-semibold">Application Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={100}>
                {statusData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.name === "applied"
                        ? "#3b82f6"
                        : entry.name === "interview"
                          ? "#a855f7"
                          : entry.name === "offered"
                            ? "#10b981"
                            : "#ef4444"
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
