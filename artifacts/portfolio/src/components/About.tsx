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
            className="relative"
          >
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-violet-500/20 via-cyan-500/5 to-transparent flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-cyan-500/10 to-transparent" />
                <div className="relative flex flex-col items-center gap-4">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-white/10">
                    <img src={`${basePath}/avatar.jpg`} alt="Muhammad Ahmed" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="text-center px-6">
                    <p className="font-display font-semibold text-lg text-foreground">Muhammad Ahmed</p>
                    <p className="text-muted-foreground text-sm mt-1">Product & UI/UX Designer</p>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-center px-6">
                    {tools.map(({ name, color, bg, border }) => (
                      <span key={name} className={`text-xs px-3 py-1 rounded-full ${bg} ${color} ${border} border font-medium`}>
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-xl bg-cyan-500/10 border border-cyan-500/20 -z-10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-amber-500/10 border border-amber-500/20 -z-10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-foreground/80 text-lg leading-relaxed mb-8">
              Results-driven UI/UX Designer with 3+ years of experience delivering user-centered design solutions across web and mobile products. Proficient in end-to-end UX design processes from user research and wireframing through prototyping and high-fidelity design using Figma, Adobe XD, and Sketch.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-12">
              Proven ability to build scalable design systems, conduct usability testing, and collaborate cross-functionally with product managers and engineers in Agile/Scrum environments to ship accessible, conversion-optimised digital experiences.
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
        </div>
      </div>
    </section>
  );
}
