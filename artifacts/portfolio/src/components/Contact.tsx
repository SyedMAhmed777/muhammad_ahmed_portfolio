import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send, Linkedin } from "lucide-react";
import { SiBehance, SiDribbble } from "react-icons/si";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const socialLinks = [
  { icon: SiBehance, href: "https://www.behance.net/ui_ahmed/projects", label: "Behance" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-ahmed7/", label: "LinkedIn" },
  { icon: SiDribbble, href: "https://dribbble.com/syedahmed777", label: "Dribbble" },
];

// ─── EmailJS config ────────────────────────────────────────────────────────────
// Replace the three placeholder values below with your real EmailJS credentials.
// Setup guide: https://www.emailjs.com/docs/tutorial/overview/
//   1. Create a free account at https://emailjs.com
//   2. Add Email Service  → connect your Gmail → copy the Service ID
//   3. Create Email Template → copy the Template ID
//   4. Account → API Keys → copy your Public Key
// ──────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_iwgdx5k";    // ✅ Gmail service
const EMAILJS_TEMPLATE_ID = "template_toximko";   // ✅ Contact Us template
const EMAILJS_PUBLIC_KEY  = "HbIdAcYe2JjIktnxE";  // ✅ Public key

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    data.name,
          from_email:   data.email,
          message:      data.message,
          reply_to:     data.email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      toast({
        title: "Message sent! ✉️",
        description: "Thanks for reaching out. I'll get back to you shortly.",
      });
      form.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      toast({
        title: "Couldn't send message",
        description: "Please email me directly at muhammad.ahmed.9760@gmail.com",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/8 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-primary font-mono text-sm font-medium tracking-widest uppercase">06</span>
          <div className="h-px flex-1 bg-border max-w-[60px]" />
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tighter">Get in Touch</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="font-display font-bold text-3xl sm:text-4xl tracking-tighter mb-6 leading-tight">
              Let's Build Something Great
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Whether you have a project in mind, want to collaborate, or just want to say hello. My inbox is always open.
            </p>

            <a
              href="mailto:muhammad.ahmed.9760@gmail.com"
              className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors group mb-10"
              data-testid="link-email"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium">muhammad.ahmed.9760@gmail.com</span>
            </a>

            <div>
              <p className="text-muted-foreground text-sm mb-4 uppercase tracking-widest font-medium">Find me on</p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    data-testid={`link-contact-social-${label.toLowerCase()}`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Your Name</label>
                <input
                  {...form.register("name")}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                  data-testid="input-name"
                />
                {form.formState.errors.name && (
                  <p className="text-destructive text-xs mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Email Address</label>
                <input
                  {...form.register("email")}
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                  data-testid="input-email"
                />
                {form.formState.errors.email && (
                  <p className="text-destructive text-xs mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">Message</label>
                <textarea
                  {...form.register("message")}
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
                  data-testid="input-message"
                />
                {form.formState.errors.message && (
                  <p className="text-destructive text-xs mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl h-12 font-medium gap-2"
                disabled={form.formState.isSubmitting}
                data-testid="button-submit"
              >
                <Send className="w-4 h-4" />
                {form.formState.isSubmitting ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
