import { motion } from "framer-motion";
import { UserPlus, PenTool, Zap, Send } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Create Account", description: "Sign up with your college email in seconds" },
  { icon: PenTool, title: "Build Resume", description: "Add your experience, education, and skills" },
  { icon: Zap, title: "Get AI Insights", description: "Receive smart suggestions and job matches" },
  { icon: Send, title: "Apply & Track", description: "Apply to matched jobs and track your progress" },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Four simple steps from signup to landing your dream job.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          {/* Connector line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent lg:block" />

          <div className="grid gap-12 lg:gap-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`flex items-center gap-8 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="flex-1">
                  <div className="glass-card p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {i + 1}
                      </div>
                      <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                <div className="hidden h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 lg:flex">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>

                <div className="hidden flex-1 lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
