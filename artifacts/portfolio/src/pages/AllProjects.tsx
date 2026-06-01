import { useState, useEffect } from "react";
import { useHashLocation } from "@/hooks/use-hash-location";
import { useBackNavigation } from "@/hooks/use-back-navigation";
import { ArrowLeft, ArrowUpRight, Grid, Palette, Smartphone, LayoutDashboard, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/components/Projects";

const categories = ["All", "Case Study", "Web Design", "Mobile App", "Branding"];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Case Study":
      return BookOpen;
    case "Web Design":
      return LayoutDashboard;
    case "Mobile App":
      return Smartphone;
    case "Branding":
      return Palette;
    default:
      return Grid;
  }
};

const getGroupHoverClasses = (chipColor?: string) => {
  if (!chipColor) return "";
  return chipColor.split(" ").map(cls => `group-hover:${cls}`).join(" ");
};

export default function AllProjects() {
  const [, navigate] = useHashLocation();
  const { setBackDestination } = useBackNavigation();
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const getAssetUrl = (url: string) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${basePath}/${url.replace(/^\//, "")}`;
  };

  const filteredProjects = selectedCategory === "All"
    ? projects
    : selectedCategory === "Case Study"
      ? projects.filter(p => (p as any).badge === "Case Study")
      : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between h-20">
          <button
            onClick={() => {
              sessionStorage.setItem("scroll_to_projects", "true");
              navigate("/");
            }}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <span className="font-display font-bold text-lg tracking-tighter">
            Muhammad Ahmed<span className="text-primary">.</span> Work
          </span>

          <span className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1 bg-card">
            {projects.length} Total Projects
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Title */}
        <div className="mb-12">
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4">
            Archive & Showcase
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            A comprehensive look at my design and product engineering works across mobile interfaces, web experiences, and corporate brand guides.
          </p>
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-border/60 pb-6">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category);
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/10"
                    : "border-border bg-card/45 text-muted-foreground hover:text-white hover:border-white/20"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category}
              </button>
            );
          })}
        </div>

        {/* Dynamic high fidelity grid of projects */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() => {
                  if (project.href) {
                    setBackDestination("/projects");
                    navigate(project.href);
                  }
                  else if ((project as any).externalHref) window.open((project as any).externalHref, "_blank", "noopener");
                }}
                className={`group relative rounded-2xl border border-card-border bg-card overflow-hidden cursor-pointer flex flex-col h-full`}
              >
                {/* Card thumbnail / placeholder */}
                <div className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden shrink-0`}>
                  {(project as any).mockupThumbnail ? (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80`} />
                      <div className="relative flex items-center justify-center w-full h-full pt-4 pb-0">
                        <div 
                          style={{ width: 96, transformOrigin: "bottom center" }}
                          className="relative transition-all duration-500 transform translate-y-4 -rotate-3 group-hover:translate-y-2 group-hover:rotate-0 group-hover:scale-105"
                        >
                          <div style={{
                            borderRadius: 16,
                            background: "#fff",
                            padding: 2.2,
                            border: "1.5px solid #d2d2d2",
                            boxShadow: "0 12px 30px -8px rgba(0,0,0,0.22)",
                            overflow: "hidden",
                            position: "relative"
                          }}>
                            {/* Phone Notch */}
                            <div style={{
                              position: "absolute", top: 2, left: "50%", transform: "translateX(-50%)",
                              width: 28, height: 4, borderRadius: 100, background: "#0F1417", zIndex: 10
                            }} />
                            <img
                              src={getAssetUrl((project as any).mockupThumbnail)}
                              alt={project.name}
                              style={{
                                borderRadius: 13,
                                display: "block",
                                width: "100%",
                                height: "auto",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent" />
                    </>
                  ) : project.thumbnail ? (
                    <>
                      <img
                        src={getAssetUrl(project.thumbnail)}
                        alt={project.name}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent" />
                    </>
                  ) : (project as any).screens ? (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80`} />
                      <div className="relative flex items-end justify-center w-full h-full pb-0" style={{ gap: 0 }}>
                        {((project as any).screens as string[]).map((src, j) => {
                          const offsets = [-34, 0, 34];
                          const rotations = [-12, 0, 12];
                          const scales = [0.82, 0.95, 0.82];
                          const zIndex = [1, 3, 1];
                          return (
                            <div
                              key={src}
                              className="absolute bottom-0 transition-transform duration-500 group-hover:translate-y-[-6px]"
                              style={{
                                transform: `translateX(${offsets[j]}px) rotate(${rotations[j]}deg) scale(${scales[j]})`,
                                transformOrigin: "bottom center",
                                zIndex: zIndex[j],
                                transitionDelay: `${j * 40}ms`,
                                width: 100,
                              }}
                            >
                              <div style={{
                                borderRadius: 16,
                                background: "#fff",
                                padding: 2.2,
                                border: "1.5px solid #d2d2d2",
                                boxShadow: "0 12px 30px -8px rgba(0,0,0,0.2)",
                                overflow: "hidden",
                                position: "relative"
                              }}>
                                {/* Phone Notch */}
                                <div style={{
                                  position: "absolute", top: 2, left: "50%", transform: "translateX(-50%)",
                                  width: 28, height: 4, borderRadius: 100, background: "#0F1417", zIndex: 10
                                }} />
                                <img
                                  src={getAssetUrl(src)}
                                  alt=""
                                  style={{
                                    borderRadius: 13,
                                    display: "block",
                                    width: "100%",
                                    height: "auto",
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
                    </>
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`} />
                      <div className="relative flex flex-col items-center gap-3">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.accent} flex items-center justify-center shadow-lg`}>
                          <project.icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    </>
                  )}
                </div>

                {/* Card body */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${project.chipColor ?? "text-primary bg-primary/10 border-primary/20"}`}>
                        {project.category}
                      </span>
                      {(project as any).badge && (
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${project.chipColor ?? "text-primary bg-primary/10 border-primary/20"}`}>
                          {(project as any).badge}
                        </span>
                      )}
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        project.href || (project as any).externalHref
                          ? `text-white/80 border-white/20 bg-transparent ${getGroupHoverClasses(project.chipColor)} group-hover:scale-110`
                          : "text-muted-foreground/30 border-border/50 bg-transparent"
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl tracking-tight mb-2 group-hover:text-white transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-3 flex-grow">
                    {project.description}
                  </p>

                  <p className="text-xs text-muted-foreground/70 tracking-wide mt-auto">
                    {project.tools.join(" · ")}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <footer className="border-t border-border py-12 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} Muhammad Ahmed. All rights reserved.</p>
      </footer>
    </div>
  );
}
