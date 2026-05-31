import { useHashLocation } from "@/hooks/use-hash-location";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const [, navigate] = useHashLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <p className="text-primary font-mono text-sm font-medium tracking-widest uppercase mb-4">404</p>
        <h1 className="font-display font-bold text-5xl sm:text-6xl tracking-tighter text-foreground mb-4">
          Page not found
        </h1>
        <p className="text-muted-foreground text-lg mb-10 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </button>
      </div>
    </div>
  );
}
