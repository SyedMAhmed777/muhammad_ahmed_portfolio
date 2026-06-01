import { useRef } from "react";
import { useHashLocation } from "@/hooks/use-hash-location";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, LayoutDashboard, ChevronLeft, ChevronRight, Smartphone, Palette, Gamepad2 } from "lucide-react";

const toolColors: Record<string, string> = {
  "Figma":              "text-violet-400 bg-violet-400/10 border-violet-400/20",
  "Adobe Illustrator":  "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "Adobe Photoshop":    "text-sky-400 bg-sky-400/10 border-sky-400/20",
  "Brand Identity":     "text-pink-400 bg-pink-400/10 border-pink-400/20",
  "Logo Design":        "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Typography":         "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "UX Research":        "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "Interaction Design": "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  "Prototyping":        "text-rose-400 bg-rose-400/10 border-rose-400/20",
  "Web Design":         "text-teal-400 bg-teal-400/10 border-teal-400/20",
  "UI Design":          "text-purple-400 bg-purple-400/10 border-purple-400/20",
  "Branding":           "text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/20",
  "Stationery":         "text-lime-400 bg-lime-400/10 border-lime-400/20",
};

const getToolColor = (tool: string) =>
  toolColors[tool] ?? "text-muted-foreground bg-muted border-border";

const projects = [
  {
    id: 1,
    name: "PayGoDash",
    subtitle: "Website Design",
    description: "A modern fintech dashboard website redesigned for clarity and conversion, featuring clean data visualisation, intuitive navigation, and a bold visual identity built for the web.",
    tools: ["Figma", "UI Design", "Prototyping", "Branding"],
    category: "Web Design",
    gradient: "from-emerald-600/30 via-teal-500/20 to-cyan-400/10",
    accent: "from-emerald-500 to-teal-400",
    icon: LayoutDashboard,
    href: "/case-study/paygo-dash",
    thumbnail: "/paygo-dash-thumbnail.png",
    chipColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  {
    id: 2,
    name: "Jsoor",
    subtitle: "Brand Guidelines",
    description: "Full brand identity for Jsoor Global, a GCC consultancy for startups and SMEs. Covers logo variants, clear space rules, misuse guidelines, colour palette (Pine Green, Aquamarine, Azure), DM Sans typography, and stationery across business cards, letterhead, and real-world mockups.",
    tools: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Brand Identity", "Logo Design", "Typography"],
    category: "Branding",
    badge: "Brand Guidelines",
    gradient: "from-[#00796B]/30 via-[#00796B]/15 to-[#AAF2E3]/10",
    accent: "from-[#00796B] to-[#AAF2E3]",
    icon: Palette,
    href: "/brand-guide/jsoor",
    thumbnail: "/jsoor/01.png",
    chipColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  {
    id: 3,
    name: "Lumen",
    subtitle: "IoT Companion App",
    description: "Smart-home app spanning 8 screen areas: a guided 60-second pairing flow with live countdown, error recovery, bulk device management, automation scenes, and a profile built around voice-assistant integrations. 7/7 users paired without assistance.",
    tools: ["Figma", "UX Research", "Interaction Design", "Prototyping"],
    category: "Mobile App",
    badge: "Design Project",
    gradient: "from-orange-400/25 via-amber-300/15 to-orange-200/10",
    accent: "from-orange-500 to-amber-400",
    icon: Smartphone,
    href: "/case-study/lumen",
    thumbnail: "/lumen-thumbnail.png",
    chipColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    screens: [
      "/lumen/Timer connecting deivces.png",
      "/lumen/Home- listing devices.png",
      "/lumen/Scene.png",
    ],
  },
  {
    id: 4,
    name: "Nicotina",
    subtitle: "Gamified Quit-Smoking App",
    description: "A gamified quit-smoking companion for iOS & Android. A veggie mascot tracks your habits, money saved, and lungs, rewarding you for showing up even on days you slip. Designed across 29 screens including onboarding, diary, calculators, reward shop, and community.",
    tools: ["Figma", "UX Research", "Interaction Design", "Prototyping", "Notion"],
    category: "Mobile App",
    badge: "Project",
    gradient: "from-emerald-500/25 via-green-400/15 to-teal-300/10",
    accent: "from-emerald-500 to-green-400",
    icon: Gamepad2,
    href: "/case-study/nicotina",
    thumbnail: "/nicotina/thumbnail.png",
    chipColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  {
    id: 5,
    name: "Serene",
    subtitle: "Mental Health & Self-Care Companion",
    description: "A restorative mental-health app connecting clients with licensed therapists while quietly tracking everyday wellness signals (sleep, mood, steps, calories) shaping our well-being. Built as a dual client-therapist platform designed across 25 high-fidelity screens.",
    tools: ["Figma", "UX Research", "Interaction Design", "Prototyping", "Information Architecture"],
    category: "Mobile App",
    badge: "Design Project",
    gradient: "from-[#5E8B7E]/25 via-[#C3D9D1]/15 to-[#F5F2EC]/10",
    accent: "from-[#5E8B7E] to-[#C3D9D1]",
    icon: Smartphone,
    href: "/case-study/serene",
    screens: [
      "/serene/Home-client.png",
      "/serene/Profile.png",
      "/serene/Therapist  Dashboard.png",
    ],
    chipColor: "text-[#5E8B7E] bg-[#5E8B7E]/10 border-[#5E8B7E]/20",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [, navigate] = useHashLocation();

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const getAssetUrl = (url: string) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${basePath}/${url.replace(/^\//, "")}`;
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector("[data-card]") as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 24 : 380;
    scrollRef.current.scrollBy({ left: dir === "right" ? cardWidth : -cardWidth, behavior: "smooth" });
  };

  return (
    <section id="projects" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header row */}
        <div className="flex items-end justify-between mb-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4"
          >
            <span className="text-primary font-mono text-sm font-medium tracking-widest uppercase">02</span>
            <div className="h-px flex-1 bg-border max-w-[60px]" />
            <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tighter">My Work</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg mb-10 max-w-xl"
        >
          A selection of work that showcases the depth and range of my design practice.
        </motion.p>

        {/*
          Horizontal scroll strip that starts aligned inside the container
          but bleeds out dynamically to the right up to a max-width of 1440px.
        */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            marginRight: "calc(-1 * max(0px, 100vw - 100%) / 2)",
            paddingRight: "2rem",
          }}
        >
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                data-card
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                onClick={() => {
                  if (project.href) navigate(project.href);
                  else if ((project as any).externalHref) window.open((project as any).externalHref, "_blank", "noopener");
                }}
                className={`group relative rounded-2xl border border-card-border bg-card overflow-hidden shrink-0 snap-start w-[320px] sm:w-[360px] lg:w-[380px] ${project.href || (project as any).externalHref ? "cursor-pointer" : ""}`}
                data-testid={`card-project-${project.id}`}
              >
                {/* Card thumbnail / placeholder */}
                <div className={`relative h-52 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                  {project.thumbnail ? (
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
                          const offsets = [-38, 0, 38];
                          const rotations = [-14, 0, 14];
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
                                width: 110,
                              }}
                            >
                              <div style={{
                                borderRadius: 18,
                                background: "#fff",
                                padding: 2.5,
                                border: "1.5px solid #d2d2d2",
                                boxShadow: "0 12px 30px -8px rgba(0,0,0,0.2)",
                                overflow: "hidden",
                                position: "relative"
                              }}>
                                {/* Phone Notch in preview */}
                                <div style={{
                                  position: "absolute", top: 3, left: "50%", transform: "translateX(-50%)",
                                  width: 32, height: 5, borderRadius: 100, background: "#0F1417", zIndex: 10
                                }} />
                                <img
                                  src={getAssetUrl(src)}
                                  alt=""
                                  style={{
                                    borderRadius: 15,
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
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.accent} flex items-center justify-center shadow-lg`}>
                          <project.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex gap-2">
                          {[...Array(3)].map((_, j) => (
                            <div key={j} className={`${j === 1 ? "w-12" : "w-8"} h-1.5 rounded-full bg-white/30`} />
                          ))}
                        </div>
                        <div className="flex gap-1.5">
                          {[...Array(4)].map((_, j) => (
                            <div key={j} className="w-6 h-6 rounded bg-white/20" />
                          ))}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    </>
                  )}
                </div>

                {/* Card body */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${(project as any).chipColor ?? "text-primary bg-primary/10 border-primary/20"}`}>
                        {project.category}
                      </span>
                      {(project.href || (project as any).externalHref) && (
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${(project as any).chipColor ?? "text-primary bg-primary/10 border-primary/20"}`}>
                          {(project as any).badge ?? "Case Study"}
                        </span>
                      )}
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 15 }}
                      className={`w-8 h-8 rounded-full border border-border flex items-center justify-center transition-colors ${
                        project.href || (project as any).externalHref
                          ? "text-muted-foreground group-hover:text-primary group-hover:border-primary/50"
                          : "text-muted-foreground/30"
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                  </div>

                  <h3 className="font-display font-bold text-xl tracking-tight mb-1 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <p className="text-xs text-muted-foreground/70 tracking-wide">
                    {project.tools.join(" · ")}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    </section>
  );
}
