import { FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-display text-sm font-bold text-foreground">LandmineSoft</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Landmine Soft. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Privacy</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Terms</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
