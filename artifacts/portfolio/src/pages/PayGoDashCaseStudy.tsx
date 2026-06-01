import { useEffect } from "react";
import { useHashLocation } from "@/hooks/use-hash-location";
import { ArrowLeft, ExternalLink } from "lucide-react";

const slides = [
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/7a8b33207978201.66e7272f8fabc.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/451e69207978201.66e7272f8dfe7.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/cba393207978201.66e7272f904b2.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/184522207978201.66e7272f8e53f.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/4747e7207978201.66e7272f8f5b4.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/93f9b5207978201.66e7272f8c784.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/7c11c7207978201.66e7272f8edb9.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/cecaf5207978201.66e7272f8cd0e.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b33174207978201.66e7272f8d27f.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/f64dbc207978201.66e7272f8ff98.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/bfaf86207978201.66e7272f90964.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs/8d2d31207978201.66e7272f8dab6.png",
];

export default function PayGoDashCaseStudy() {
  const [, navigate] = useHashLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between h-16">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </button>

          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-base tracking-tight">
              Pay<span className="text-[#6366F1]">Go</span>Dash
            </span>
            <span className="hidden sm:block text-xs text-muted-foreground border border-[#6366F1]/20 bg-[#6366F1]/5 rounded-full px-2.5 py-0.5">
              Website Design · Case Study
            </span>
          </div>

          <a
            href="https://www.behance.net/gallery/207978201/PayGoDash-Website-Design-Case-Study"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#6366F1] hover:text-[#818CF8] transition-colors font-medium"
          >
            Behance
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto">
        {slides.map((src, i) => (
          <div
            key={i}
            className="w-full border-t border-white/[0.04] first:border-t-0"
          >
            <img
              src={src}
              alt={`PayGoDash Case Study – Slide ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
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
            href="https://www.behance.net/gallery/207978201/PayGoDash-Website-Design-Case-Study"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#6366F1] hover:text-[#818CF8] transition-colors"
          >
            View on Behance
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => navigate("/")}
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
