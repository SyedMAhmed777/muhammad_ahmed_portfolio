import { Linkedin } from "lucide-react";
import { SiBehance, SiDribbble } from "react-icons/si";

const socialLinks = [
  { icon: SiBehance, href: "https://www.behance.net/ui_ahmed/projects", label: "Behance" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-ahmed7/", label: "LinkedIn" },
  { icon: SiDribbble, href: "https://dribbble.com/syedahmed777", label: "Dribbble" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-display font-bold text-xl tracking-tighter">
              Muhammad Ahmed<span className="text-primary">.</span>
            </span>
            <p className="text-muted-foreground text-xs">Designed & Built with care</p>
          </div>

          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Muhammad Ahmed. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                data-testid={`link-footer-${label.toLowerCase()}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
