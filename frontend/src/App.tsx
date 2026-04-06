import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Resumes from "./pages/Resumes";
import ResumeBuilder from "./pages/ResumeBuilder";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notification";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/resumes" element={<Resumes />} />
          <Route path="/dashboard/resumes/new" element={<ResumeBuilder />} />
          <Route path="/dashboard/resumes/:id" element={<ResumeBuilder />} />
          <Route path="/dashboard/jobs" element={<Jobs />} />
          <Route path="/dashboard/applications" element={<Applications />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
