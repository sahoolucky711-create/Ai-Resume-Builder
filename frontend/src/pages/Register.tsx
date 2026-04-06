import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, ArrowLeft } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", college: "", graduationYear: "" });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("http://127.0.0.1:8000/api/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        first_name: form.firstName,
        last_name: form.lastName,
        college_name: form.college,
        graduation_year: Number(form.graduationYear),
        phone: "0000000000", // temporary or add input field
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(JSON.stringify(data));
      return;
    }

    alert("Account created successfully! Please login.");
    navigate("/login");

  } catch (err) {
    console.error(err);
    alert("Registration failed");
  }
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="hero-glow absolute inset-0" />
      <div className="dot-pattern absolute inset-0 opacity-20" />

      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="glass-card p-8">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">LandmineSoft</span>
          </div>

          <h1 className="mb-1 font-display text-2xl font-bold">Create your account</h1>
          <p className="mb-6 text-sm text-muted-foreground">Start building your professional resume today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input placeholder="John" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input placeholder="Doe" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="you@college.edu" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>College Name</Label>
              <Input placeholder="Your University" value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Graduation Year</Label>
              <Select onValueChange={(v) => setForm({ ...form, graduationYear: v })}>
                <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                <SelectContent>
                  {[2024, 2025, 2026, 2027, 2028].map((y) => (
                    <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">Create Account</Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
