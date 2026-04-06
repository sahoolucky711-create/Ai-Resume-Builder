import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card glow-border mx-auto max-w-3xl p-12 text-center"
        >
          <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
            Ready to Build Your <span className="text-gradient">Future</span>?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Join thousands of college students already using LandmineSoft to build professional resumes and land their dream jobs.
          </p>
          <Link to="/register">
            <Button size="lg" className="group gap-2 px-8 text-base">
              Create Your Resume Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
