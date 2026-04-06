import { FileText, Brain, Target, BarChart3, Download, Bell } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: FileText,
    title: "Smart Resume Builder",
    description: "Create stunning resumes with our intuitive builder. Add experience, education, and skills with guided sections.",
  },
  {
    icon: Brain,
    title: "AI Suggestions",
    description: "Get intelligent recommendations to improve your resume — from action verbs to missing skills and quantifiable achievements.",
  },
  {
    icon: Target,
    title: "Job Matching",
    description: "Our TF-IDF algorithm matches your skills with job postings and shows your compatibility score instantly.",
  },
  {
    icon: BarChart3,
    title: "Application Tracker",
    description: "Track every application from Applied to Offered. Never lose sight of your job search progress.",
  },
  {
    icon: Download,
    title: "PDF Export",
    description: "Generate beautiful PDF resumes with multiple templates — modern, classic, or minimal styles.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get notified about new job matches, application updates, and skill improvement suggestions.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
            Everything You Need to <span className="text-gradient">Succeed</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A complete toolkit for college students to build, optimize, and leverage their resumes for career success.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card group p-6 transition-colors hover:border-primary/30"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
