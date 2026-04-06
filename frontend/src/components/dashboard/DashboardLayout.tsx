import { Link, useLocation } from "react-router-dom";
import { FileText, LayoutDashboard, Briefcase, Target, BarChart3, Bell, LogOut } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FileText, label: "Resumes", path: "/dashboard/resumes" },
  { icon: Briefcase, label: "Jobs", path: "/dashboard/jobs" },
  { icon: Target, label: "Applications", path: "/dashboard/applications" },
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  { icon: Bell, label: "Notifications", path: "/dashboard/notifications" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-full w-64 flex-col border-r border-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <FileText className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-sidebar-foreground">LandmineSoft</span>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-display text-sm font-bold">LandmineSoft</span>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border bg-background/90 py-2 backdrop-blur-xl lg:hidden">
        {navItems.slice(0, 5).map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-1 text-xs ${isActive ? "text-primary" : "text-muted-foreground"}`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Main content */}
      <main className="flex-1 pt-14 pb-20 lg:ml-64 lg:pt-0 lg:pb-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
