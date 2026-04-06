import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusColors: Record<string, string> = {
  applied: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  shortlisted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  interview: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  offered: "bg-primary/10 text-primary border-primary/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

const Applications = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const updateStatus = async (appId: number, status: string) => {
  try {
    const token = localStorage.getItem("access");

    await fetch(`http://127.0.0.1:8000/api/applications/${appId}/status/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    // update UI instantly
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status } : a))
    );
  } catch (err) {
    console.error("Status update failed", err);
  }
};


  useEffect(() => {
    const loadApplications = async () => {
      try {
        const token = localStorage.getItem("access");

        const res = await fetch("http://127.0.0.1:8000/api/applications/list/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setApplications(data);
      } catch (err) {
        console.error("Failed to load applications", err);
      }
    };

    loadApplications();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold">
          Application Tracker
        </h1>
        <p className="text-sm text-muted-foreground">
          Track all your job applications in one place
        </p>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-6 py-4 font-medium">Job Title</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Applied</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b border-border/50 last:border-0"
                >
                  <td className="px-6 py-4 text-sm font-medium">
                    {app.job_title}
                  </td>

                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {app.company_name}
                  </td>

                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(app.applied_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        statusColors[app.status?.toLowerCase()] || ""
                      }`}
                    >
                      {app.status}
                    </Badge>
                  </td>

                  <td className="px-6 py-4">
                    <Select defaultValue={app.status}>
                      <SelectTrigger className="h-8 w-32 text-xs">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        {Object.keys(statusColors).map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}

              {applications.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-sm text-muted-foreground py-8"
                  >
                    No applications yet. Apply to jobs to see them here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Applications;
