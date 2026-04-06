import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="hero-glow absolute inset-0" />
      <div className="dot-pattern absolute inset-0 opacity-30" />

      <div className="container relative z-10 mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">AI-Powered Resume Builder</span>
          </motion.div>

          <h1 className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Build Your Dream Resume,{" "}
            <span className="text-gradient">Land Your Dream Job</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            AI-powered resume builder designed for college students. Create professional resumes, 
            get smart suggestions, and match with the perfect job openings — all in one platform.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/register">
              <Button size="lg" className="group gap-2 px-8 text-base">
                Start Building Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg" className="px-8 text-base">
                See How It Works
              </Button>
            </a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8"
          >
            {[
              { value: "10K+", label: "Resumes Built" },
              { value: "95%", label: "Match Rate" },
              { value: "500+", label: "Companies" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl font-bold text-foreground sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
