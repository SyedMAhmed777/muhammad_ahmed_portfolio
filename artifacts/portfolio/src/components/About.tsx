import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "3+", label: "Years Experience", color: "text-foreground", bg: "bg-white/5", border: "border-white/10" },
  { value: "30+", label: "Projects Delivered", color: "text-foreground", bg: "bg-white/5", border: "border-white/10" },
  { value: "25+", label: "Happy Clients", color: "text-foreground", bg: "bg-white/5", border: "border-white/10" },
];

const tools = [
  { name: "Figma", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  { name: "Adobe XD", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { name: "Sketch", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[100px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-primary font-mono text-sm font-medium tracking-widest uppercase">01</span>
          <div className="h-px flex-1 bg-border max-w-[60px]" />
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tighter">About Me</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-foreground/80 text-lg leading-relaxed mb-8">
              Hi, I'm Muhammad Ahmed. I'm a Product Designer with over three years of experience delivering user centered design solutions across web and mobile products. I am proficient in the entire end to end UX design process, from user research and wireframing through to prototyping and polished design using Figma, Adobe XD, and Sketch.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-12">
              Throughout my work, I build scalable design systems, conduct usability testing, and collaborate across functions with product managers and engineers in Agile and Scrum environments to ship accessible, conversion focused digital experiences.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {stats.map(({ value, label, color, bg, border }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className={`text-center p-4 rounded-xl ${bg} ${border} border`}
                  data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className={`font-display font-bold text-3xl ${color} mb-1`}>{value}</div>
                  <div className="text-muted-foreground text-xs leading-tight">{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full max-w-sm mx-auto lg:mr-0 lg:ml-auto">
              {/* Stacked design layer offsets with subtle peek animation */}
              <motion.div
                animate={{ rotate: [3, 5, 3], x: [0, 4, 0], y: [0, -3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 border border-violet-500/30 rounded-2xl scale-98 -z-10"
              />
              <motion.div
                animate={{ rotate: [-3, -5, -3], x: [0, -4, 0], y: [0, 3, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute inset-0 border border-cyan-500/20 rounded-2xl scale-98 -z-20"
              />
              
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-card shadow-2xl transition-all duration-500 ease-out transform hover:rotate-0 hover:scale-[1.02] group">
                <img
                  src={`${basePath}/avatar.jpg`}
                  alt="Muhammad Ahmed"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
