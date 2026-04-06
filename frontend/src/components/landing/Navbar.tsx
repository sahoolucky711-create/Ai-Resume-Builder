import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">
            MEGGIE<span className="text-gradient">Soft</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">How It Works</a>
          <a href="#templates" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Templates</a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login">
            <Button variant="ghost" size="sm">Log In</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 p-6">
            <a href="#features" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>How It Works</a>
            <a href="#templates" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Templates</a>
            <div className="flex gap-3 pt-2">
              <Link to="/login"><Button variant="ghost" size="sm">Log In</Button></Link>
              <Link to="/register"><Button size="sm">Get Started</Button></Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
