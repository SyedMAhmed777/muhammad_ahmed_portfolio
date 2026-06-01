import { motion } from "framer-motion";
import { ArrowDown, Mail, Linkedin, Download } from "lucide-react";
import { SiBehance, SiDribbble } from "react-icons/si";

const socialLinks = [
  {
    icon: SiBehance,
    href: "https://www.behance.net/ui_ahmed/projects",
    label: "Behance",
    hoverColor: "hover:text-blue-400 hover:border-blue-400/50",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/muhammad-ahmed7/",
    label: "LinkedIn",
    hoverColor: "hover:text-sky-400 hover:border-sky-400/50",
  },
  {
    icon: SiDribbble,
    href: "https://dribbble.com/syedahmed777",
    label: "Dribbble",
    hoverColor: "hover:text-rose-400 hover:border-rose-400/50",
  },
];

const words = ["Muhammad", "Ahmed"];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.14, 0.08] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-amber-500/10 blur-[100px]"
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for work
        </motion.div>

        <div className="overflow-hidden mb-4">
          <motion.h1
            className="font-display font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tighter"
            initial="hidden"
            animate="visible"
          >
            {words.map((word, i) => (
              <motion.span
                key={word}
                className="inline-block mr-[0.2em]"
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-primary mb-6 tracking-tight">
            Product & UI/UX Designer
          </p>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            Turning complex ideas into simple, intuitive digital products.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="mailto:muhammad.ahmed.9760@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            data-testid="button-contact-email"
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </a>
          <a
            href={`${import.meta.env.BASE_URL}muhammad-ahmed-resume.pdf`}
            download="MuhammadAhmed_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
            data-testid="button-download-resume"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label, hoverColor }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-colors ${hoverColor}`}
                data-testid={`link-social-${label.toLowerCase()}`}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
        <span className="text-xs tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
