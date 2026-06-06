import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Smartphone, Grid, FlaskConical, MousePointer, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Search,
    title: "UX Design & Strategy",
    description: "End-to-end UX strategy grounded in user research. From information architecture and flows to validated design decisions that drive real outcomes.",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10",
    iconBorder: "border-violet-500/20",
    hoverBg: "group-hover:bg-violet-500/20",
    hoverTitle: "group-hover:text-violet-400",
    hoverCard: "hover:border-violet-500/30",
  },
  {
    icon: Smartphone,
    title: "Mobile App Design",
    description: "Native mobile experiences for iOS and Android that feel intuitive, polished, and aligned with platform conventions. Built for real users.",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
    iconBorder: "border-cyan-500/20",
    hoverBg: "group-hover:bg-cyan-500/20",
    hoverTitle: "group-hover:text-cyan-400",
    hoverCard: "hover:border-cyan-500/30",
  },
  {
    icon: Grid,
    title: "Design System Creation",
    description: "Scalable, tokenized design systems with reusable components, documentation, and developer handoff assets that keep teams moving fast.",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
    iconBorder: "border-amber-500/20",
    hoverBg: "group-hover:bg-amber-500/20",
    hoverTitle: "group-hover:text-amber-400",
    hoverCard: "hover:border-amber-500/30",
  },
  {
    icon: FlaskConical,
    title: "User Research & Testing",
    description: "Structured qualitative and quantitative research: interviews, usability tests, card sorting, and A/B testing, to ground every design decision.",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    iconBorder: "border-emerald-500/20",
    hoverBg: "group-hover:bg-emerald-500/20",
    hoverTitle: "group-hover:text-emerald-400",
    hoverCard: "hover:border-emerald-500/30",
  },
  {
    icon: MousePointer,
    title: "Interaction Design & Prototyping",
    description: "High-fidelity interactive prototypes that communicate motion, transitions, and micro-interactions with precision before a single line of code is written.",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10",
    iconBorder: "border-rose-500/20",
    hoverBg: "group-hover:bg-rose-500/20",
    hoverTitle: "group-hover:text-rose-400",
    hoverCard: "hover:border-rose-500/30",
  },
  {
    icon: ShieldCheck,
    title: "UX Audit & Accessibility",
    description: "Heuristic evaluation and WCAG compliance review that identifies friction points, accessibility gaps, and quick win improvements across your product.",
    iconColor: "text-sky-400",
    iconBg: "bg-sky-500/10",
    iconBorder: "border-sky-500/20",
    hoverBg: "group-hover:bg-sky-500/20",
    hoverTitle: "group-hover:text-sky-400",
    hoverCard: "hover:border-sky-500/30",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-primary font-mono text-sm font-medium tracking-widest uppercase">05</span>
          <div className="h-px flex-1 bg-border max-w-[60px]" />
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tighter">Services</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg mb-16 max-w-xl"
        >
          What I bring to every engagement, from discovery to delivery.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl bg-card border border-card-border group cursor-default transition-colors ${service.hoverCard}`}
              data-testid={`service-${service.title.toLowerCase().replace(/[\s&/]+/g, "-")}`}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
                className={`w-12 h-12 rounded-xl ${service.iconBg} border ${service.iconBorder} flex items-center justify-center mb-5 transition-colors ${service.hoverBg}`}
              >
                <service.icon className={`w-5 h-5 ${service.iconColor}`} />
              </motion.div>
              <h3 className={`font-display font-semibold text-lg tracking-tight mb-3 transition-colors ${service.hoverTitle}`}>
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
