import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    category: "Design",
    skills: [
      "UX Strategy", "Information Architecture", "User Flows", "Wireframing",
      "Prototyping", "High-Fidelity Mockups", "Interaction Design",
      "Experience Mapping", "Usability Testing", "Accessibility (WCAG)",
    ],
    bar: "bg-violet-500",
    cardGlow: "hover:border-violet-500/30",
    chipHover: "hover:bg-violet-500/15 hover:border-violet-500/40 hover:text-violet-400",
    label: "text-violet-400",
  },
  {
    category: "Research",
    skills: [
      "User Interviews", "Persona Development", "Competitor Analysis",
      "A/B Testing", "Card Sorting", "Surveys", "Heuristic Evaluation",
    ],
    bar: "bg-cyan-500",
    cardGlow: "hover:border-cyan-500/30",
    chipHover: "hover:bg-cyan-500/15 hover:border-cyan-500/40 hover:text-cyan-400",
    label: "text-cyan-400",
  },
  {
    category: "Tools",
    skills: [
      "Figma (Variables & Tokenization)", "Sketch", "Adobe XD",
      "Adobe Illustrator", "Adobe Photoshop",
    ],
    bar: "bg-amber-500",
    cardGlow: "hover:border-amber-500/30",
    chipHover: "hover:bg-amber-500/15 hover:border-amber-500/40 hover:text-amber-400",
    label: "text-amber-400",
  },
  {
    category: "Process",
    skills: [
      "Agile / Scrum", "Design Systems", "Design Tokens",
      "Component Libraries", "Cross-functional Collaboration", "Developer Handoff",
    ],
    bar: "bg-emerald-500",
    cardGlow: "hover:border-emerald-500/30",
    chipHover: "hover:bg-emerald-500/15 hover:border-emerald-500/40 hover:text-emerald-400",
    label: "text-emerald-400",
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[120px]" />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-primary font-mono text-sm font-medium tracking-widest uppercase">03</span>
          <div className="h-px flex-1 bg-border max-w-[60px]" />
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tighter">Skills</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + groupIndex * 0.12 }}
              className={`p-6 rounded-2xl bg-card border border-card-border transition-colors ${group.cardGlow}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-1.5 h-6 rounded-full ${group.bar}`} />
                <h3 className={`font-display font-semibold text-lg tracking-tight ${group.label}`}>{group.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + groupIndex * 0.1 + skillIndex * 0.04 }}
                    whileHover={{ scale: 1.06 }}
                    className={`text-sm px-3 py-1.5 rounded-full bg-muted text-muted-foreground border border-border transition-colors cursor-default ${group.chipHover}`}
                    data-testid={`skill-${skill.toLowerCase().replace(/[\s()&/]+/g, "-")}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
