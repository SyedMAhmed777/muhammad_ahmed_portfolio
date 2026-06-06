import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    company: "O3 Interfaces",
    role: "UI/UX Designer",
    period: "May to September 2024",
    location: "Islamabad (Onsite)",
    color: "text-violet-400",
    dot: "bg-violet-500",
    ring: "ring-violet-500/30",
    border: "hover:border-violet-500/30",
    bullets: [
      "Led complete design of a responsive design system and visual language for UBL, ensuring brand consistency across all digital touchpoints.",
      "Built single click responsive layouts in Figma using component variables and design tokens, accelerating handoff and reducing QA cycles.",
      "Collaborated with front-end developers in an Agile/Scrum workflow, contributing to a 15% improvement in website delivery speed.",
    ],
  },
  {
    company: "InterfaceX",
    role: "Product Designer",
    period: "October 2023 to April 2024",
    location: "Islamabad (Onsite)",
    color: "text-cyan-400",
    dot: "bg-cyan-500",
    ring: "ring-cyan-500/30",
    border: "hover:border-cyan-500/30",
    bullets: [
      "Delivered user focused UI/UX for 30+ client products across SaaS, e-commerce, and mobile app verticals, boosting client satisfaction and brand engagement.",
      "Managed the full product design lifecycle: stakeholder discovery, IA, interaction design, wireframing, prototyping, and polished mockups.",
      "Consistently met deadlines while exceeding client expectations on design quality and usability standards.",
    ],
  },
  {
    company: "Funsol Technologies",
    role: "UI/UX Designer",
    period: "May to September 2023",
    location: "Islamabad (Onsite)",
    color: "text-amber-400",
    dot: "bg-amber-500",
    ring: "ring-amber-500/30",
    border: "hover:border-amber-500/30",
    bullets: [
      "Contributed to UX design of 5 mobile applications, owning user flows, interaction patterns, and polished UI elements from concept to final assets.",
      "Partnered with developers and PMs to streamline implementation, reducing design and dev misalignment and iteration time.",
      "Conducted user interviews, usability testing, and A/B testing to validate design decisions and optimise user satisfaction metrics.",
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[120px]" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-primary font-mono text-sm font-medium tracking-widest uppercase">04</span>
          <div className="h-px flex-1 bg-border max-w-[60px]" />
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tighter">Experience</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-cyan-500/30 to-transparent hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-8"
                data-testid={`experience-${exp.company.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="hidden md:flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                    className={`w-4 h-4 rounded-full ${exp.dot} border-4 border-background ring-2 ${exp.ring} mt-6 flex-shrink-0`}
                  />
                </div>

                <div className={`flex-1 p-6 rounded-2xl bg-card border border-card-border transition-colors group ${exp.border}`}>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className={`font-display font-bold text-xl tracking-tight transition-colors group-hover:${exp.color}`}>
                        {exp.company}
                      </h3>
                      <p className="font-medium mt-0.5 text-foreground/60">{exp.role}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 text-right">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm justify-end">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm justify-end">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mt-1">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${exp.dot} opacity-60 flex-shrink-0`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
