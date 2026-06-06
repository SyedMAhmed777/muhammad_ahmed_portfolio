import { useEffect } from "react";
import { useHashLocation } from "@/hooks/use-hash-location";
import { useBackNavigation } from "@/hooks/use-back-navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const pages = Array.from({ length: 26 }, (_, i) => `${basePath}/jsoor/${String(i + 1).padStart(2, "0")}.png`);

export default function JsoorBrandGuide() {
  const [, navigate] = useHashLocation();
  const { goBack } = useBackNavigation();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between h-16">
          <button
            onClick={() => goBack()}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </button>

          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-base tracking-tight">Jsoor</span>
            <span className="hidden sm:block text-xs text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
              Brand Style Guide · 2024
            </span>
          </div>

          <a
            href="https://drive.google.com/file/d/1IIZ79dugKJPxmI8ZsL5Eit41s9MDxc_0/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#00796B] hover:text-[#00796B]/70 transition-colors font-medium"
          >
            Full PDF
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto">
        {pages.map((src, i) => (
          <div key={src} className="w-full border-t border-white/[0.04] first:border-t-0">
            <img
              src={src}
              alt={`Jsoor Brand Guide, Page ${i + 1}`}
              loading={i < 3 ? "eager" : "lazy"}
              className="w-full h-auto block"
            />
          </div>
        ))}
      </main>

      <footer className="border-t border-border py-12 text-center">
        <p className="text-muted-foreground text-sm mb-4">
          Designed by Muhammad Ahmed
        </p>
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://drive.google.com/file/d/1IIZ79dugKJPxmI8ZsL5Eit41s9MDxc_0/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#00796B] hover:text-[#00796B]/70 transition-colors"
          >
            View Full PDF
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => goBack()}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Portfolio
          </button>
        </div>
      </footer>
    </div>
  );
}
