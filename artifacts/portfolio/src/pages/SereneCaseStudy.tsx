import { useEffect, useRef, useState } from "react";
import { useHashLocation } from "@/hooks/use-hash-location";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Heart,
  Activity,
  Calendar,
  Layers,
  Sparkle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ── brand tokens ─────────────────────────────────────────── */
const SAGE_PRIMARY = "#5E8B7E";
const SAGE_DARK = "#314D45";
const SAGE_LIGHT = "#E1ECE7";
const SAGE_BG = "#F2F6F4";

const INK_900 = "#0F1417";
const INK_700 = "#2A323A";
const INK_500 = "#5B6670";
const INK_300 = "#9AA3AC";
const INK_50 = "#FAFAF7";

const CREAM = "#F5F2EC";
const WHITE = "#FFFFFF";

/* ── screen data structures ───────────────────────────────── */
interface ScreenItem {
  src: string;
  title: string;
  note: string;
}

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  screens: ScreenItem[];
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "onboarding",
    name: "Onboarding",
    icon: "👋",
    description: "A welcoming, secure first 30 seconds. Social options, minimal fields, and clear status feedback to lower the bar of entry.",
    screens: [
      { src: "serene/Login.png", title: "Login Screen", note: "Email + password with social SSO options. Clean and focused layout with zero clutter." },
      { src: "serene/Sign up.png", title: "Create Account", note: "Four essential fields — name, email, password, and age to surface appropriate clinical options later." },
    ]
  },
  {
    id: "home",
    name: "Client Dashboard",
    icon: "🏠",
    description: "A daily glance, not a homework assignment. Today's date, sleep, mood, activity, and nutrition all unified in one serene scroll.",
    screens: [
      { src: "serene/Home-client.png", title: "Client Home Dashboard", note: "Sleep and mood trends at a glance. ENERGY and nutrition rings reduce cognitive load." },
    ]
  },
  {
    id: "discovery",
    name: "Discovery & Search",
    icon: "🔍",
    description: "Discover and compare therapists end-to-end. Highlight specialty pills, credentials, pricing, and authentic client proof.",
    screens: [
      { src: "serene/Search.png", title: "Search Therapists", note: "Search filters and result cards prioritizing the three trust signals: who, what, how much." },
      { src: "serene/Profile.png", title: "Therapist Profile", note: "Biography, introduction clips, patient reviews, and a sticky scheduling footer for quick actions." },
      { src: "serene/Profile-1.png", title: "Client Profile (Therapist View)", note: "Unified client health context (sleep, mood, calories) displayed directly to the matched therapist." },
    ]
  },
  {
    id: "booking",
    name: "Booking & Payment",
    icon: "📅",
    description: "Confirm a session in just two taps. Horizontal date swipers, clean hour grids, and saved payment integration.",
    screens: [
      { src: "serene/Booking.png", title: "Appointment Scheduler", note: "Warm layout, swipeable days, and clear time-slot selection to make scheduling stress-free." },
      { src: "serene/Payment.png", title: "Payment Confirmation", note: "Saved cards shown first, custom entry last. The confirm CTA stays disabled until selected." },
    ]
  },
  {
    id: "sessions",
    name: "Sessions & Chat",
    icon: "💬",
    description: "The room where healing happens. Asynchronous 1:1 chat, moderated support groups, high-quality video, and history logs.",
    screens: [
      { src: "serene/Consultation.png", title: "Upcoming Consultations", note: "Review booked sessions with a simple, direct one-tap join and cancel option." },
      { src: "serene/Consultation Video Call.png", title: "Video Consultation", note: "Full-screen video, self picture-in-picture, and simple call controls built for focus." },
      { src: "serene/Chat.png", title: "1:1 Messaging", note: "Encrypted text, voice notes, and media sharing. Generation of safety parameters inline." },
      { src: "serene/Group Chat.png", title: "Group Support Rooms", note: "Topic-based community circles (Anxiety, Depression) for guided peer support." },
      { src: "serene/History.png", title: "Session History", note: "Logs of past consultations with recorded clips and simple delete/archive options." },
    ]
  },
  {
    id: "monitors",
    name: "Self-Care Monitors",
    icon: "📊",
    description: "Numbers that feel like a friend asking how you are. Curated templates for mood, sleep, steps, and nutrition tracker.",
    screens: [
      { src: "serene/Mood Monitor.png", title: "Mood Tracker", note: "Five simple emoji states, weekly trends, and gentle notes — absolutely no judgment or strict scores." },
      { src: "serene/Sleep Monitor.png", title: "Sleep Analyzer", note: "Visual breakdown of Bedtime, Waketime, and Sleep Stages (REM, Light, Deep)." },
      { src: "serene/Steps.png", title: "Activity Counter", note: "Daily steps, total active duration, and calories tracked cleanly in real-time." },
      { src: "serene/Calories.png", title: "Nutrition Ring", note: "Visual macro rings (Carbs, Protein, Fats) inside a unified calories intake display." },
    ]
  },
  {
    id: "resources",
    name: "Curated Library",
    icon: "📚",
    description: "A free, generous path for those who aren't ready to commit to therapy yet. Curated guides, articles, and audio files.",
    screens: [
      { src: "serene/Library.png", title: "Library Hub", note: "Categorized guides for Anxiety, Stress, Loneliness, ADHD, and relationships in plain language." },
      { src: "serene/Library-1.png", title: "Anxiety Topic Detail", note: "Editorial cover, search filters, group chat entry points, and bite-sized video reels." },
      { src: "serene/Blog.png", title: "Calm Reads", note: "Beautifully set typography articles for clients who prefer mindful, long-form reading." },
    ]
  },
  {
    id: "therapist",
    name: "Therapist Space",
    icon: "💼",
    description: "A complete professional workspace in a single screen. Set schedules, track metrics, and manage consultations in a click.",
    screens: [
      { src: "serene/Therapist  Dashboard.png", title: "Therapist Dashboard", note: "Day-at-a-glance dashboard showing total sessions, today's schedule, and direct video links." },
    ]
  },
  {
    id: "premium",
    name: "Premium Options",
    icon: "⭐",
    description: "Monetization that builds long-term trust. Clean comparisons, transparent yearly packages, and zero FOMO dark patterns.",
    screens: [
      { src: "serene/Premium.png", title: "Premium Matrix", note: "Free vs. Pro side-by-side table, highlighting transparent billing cycles with a single-tap cancellation guarantee." },
    ]
  }
];

/* ── primitives ───────────────────────────────────────────── */
function Tag({ children, type = "sage" }: { children: React.ReactNode; type?: "sage" | "ink" | "cream" }) {
  let color = SAGE_PRIMARY;
  let bg = SAGE_LIGHT;
  let border = `1px solid ${SAGE_PRIMARY}30`;

  if (type === "ink") {
    color = INK_900;
    bg = CREAM;
    border = `1px solid ${INK_300}`;
  } else if (type === "cream") {
    color = SAGE_DARK;
    bg = CREAM;
    border = `1px solid ${SAGE_DARK}20`;
  }

  return (
    <span style={{
      display: "inline-block",
      fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700,
      letterSpacing: "0.1em", textTransform: "uppercase" as const,
      color, background: bg, border, borderRadius: 100, padding: "4px 12px",
    }}>
      {children}
    </span>
  );
}

function Section({ children, noPad, background = WHITE, id }: { children: React.ReactNode; noPad?: boolean; background?: string; id?: string }) {
  return (
    <section id={id} style={{ background, width: "100%" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: noPad ? "0 32px" : "96px 32px" }}>
        {children}
      </div>
    </section>
  );
}

export default function SereneCaseStudy() {
  const [, navigate] = useHashLocation();
  const [activeCat, setActiveCat] = useState("home");
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const getAssetUrl = (url: string) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${basePath}/${url.replace(/^\//, "")}`;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const category = CATEGORIES.find(c => c.id === activeCat) || CATEGORIES[0];
  const screens = category.screens;
  const currentScreen = screens[activeScreenIndex] || screens[0];

  const handleCatChange = (catId: string) => {
    setActiveCat(catId);
    setActiveScreenIndex(0);
  };

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      color: INK_900,
      background: INK_50,
      minHeight: "100vh",
      overflowX: "hidden"
    }}>
      {/* ── Custom font load (Fraunces) ── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500;1,9..144,700&display=swap" rel="stylesheet" />

      {/* ── TOP NAV BAR ────────────────────────────────────── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 40,
        background: `${INK_50}F0`, backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${INK_900}10`,
        width: "100%"
      }}>
        <div style={{
          maxWidth: "72rem", margin: "0 auto", padding: "0 32px",
          height: 64, display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <button 
            onClick={() => navigate("/")}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "none", border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: 600, color: INK_700, padding: 0
            }}
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              width: 32, height: 32, borderRadius: 10, background: SAGE_PRIMARY,
              display: "grid", placeItems: "center", color: WHITE, fontWeight: 700
            }}>S</span>
            <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Serene<span style={{ color: SAGE_PRIMARY }}>.</span>
            </span>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ───────────────────────────────────── */}
      <section style={{
        background: `radial-gradient(1200px 600px at 10% 0%, ${SAGE_LIGHT} 0%, transparent 60%), radial-gradient(1000px 500px at 100% 20%, ${CREAM} 0%, transparent 55%), ${INK_50}`,
        padding: "96px 0 120px 0",
        borderBottom: `1px solid ${INK_900}10`,
        width: "100%"
      }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64, alignItems: "center" }}>
            
            {/* Left side info */}
            <div>
              <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                <Tag type="ink">2024 · iOS / Android</Tag>
                <Tag type="cream">Holistic Design</Tag>
              </div>

              <h1 style={{
                fontFamily: "Fraunces, serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 500,
                lineHeight: 1.05,
                color: INK_900,
                letterSpacing: "-0.03em"
              }}>
                A calmer way to find help, <br/>
                <span style={{ fontStyle: "italic", color: SAGE_PRIMARY }}>talk it out,</span> and <br/>
                take care of yourself.
              </h1>

              <p style={{
                fontSize: "1.125rem",
                lineHeight: 1.6,
                color: INK_700,
                marginTop: 32,
                maxWidth: 540
              }}>
                <strong style={{ color: INK_900 }}>Serene</strong> is a holistic mental-health companion app that connects clients with licensed therapists while quietly monitoring daily wellness signals (sleep, mood, calories, steps) that shape how we feel.
              </p>

              <div style={{
                marginTop: 48,
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "24px 32px",
                maxWidth: 480
              }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: SAGE_PRIMARY, marginBottom: 4 }}>Role</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: INK_900 }}>Lead Product Designer</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: SAGE_PRIMARY, marginBottom: 4 }}>Timeline</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: INK_900 }}>8 Weeks</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: SAGE_PRIMARY, marginBottom: 4 }}>Scope</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: INK_900 }}>25 Core App Screens</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: SAGE_PRIMARY, marginBottom: 4 }}>Tools</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: INK_900 }}>Figma · Notion</div>
                </div>
              </div>
            </div>

            {/* Right side phones */}
            <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
              <motion.div 
                initial={{ opacity: 0, y: 40, rotate: -3 }}
                animate={{ opacity: 1, y: 0, rotate: -3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  background: WHITE,
                  borderRadius: 36,
                  padding: 8,
                  boxShadow: "0 30px 60px -25px rgba(31,48,43,0.3), 0 8px 20px -10px rgba(31,48,43,0.1)",
                  border: "1px solid rgba(31,48,43,0.06)",
                  width: 220,
                  transform: "translateY(24px)"
                }}
              >
                <img 
                  src={getAssetUrl("serene/Home-client.png")} 
                  alt="Client Home Screen" 
                  style={{ width: "100%", height: "auto", borderRadius: 28, display: "block" }} 
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 40, rotate: 3 }}
                animate={{ opacity: 1, y: 0, rotate: 3 }}
                transition={{ duration: 0.8 }}
                style={{
                  background: WHITE,
                  borderRadius: 36,
                  padding: 8,
                  boxShadow: "0 30px 60px -25px rgba(31,48,43,0.3), 0 8px 20px -10px rgba(31,48,43,0.1)",
                  border: "1px solid rgba(31,48,43,0.06)",
                  width: 220
                }}
              >
                <img 
                  src={getAssetUrl("serene/Profile.png")} 
                  alt="Therapist Profile Screen" 
                  style={{ width: "100%", height: "auto", borderRadius: 28, display: "block" }} 
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── OVERVIEW & NUMBERS ─────────────────────────────── */}
      <Section background={WHITE} id="overview">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: SAGE_PRIMARY, marginBottom: 12 }}>01 — Overview</div>
            <h2 style={{
              fontFamily: "Fraunces, serif",
              fontSize: "2.25rem",
              fontWeight: 500,
              lineHeight: 1.15,
              color: INK_900,
              letterSpacing: "-0.02em"
            }}>
              Therapy, health tracking and community in one place.
            </h2>
          </div>
          <div style={{ fontSize: 17, lineHeight: 1.65, color: INK_700 }}>
            <p style={{ marginBottom: 24 }}>
              Most mental-health apps focus heavily on a single action: meditation, mood journaling, or therapist search. Serene was designed as a single, calm home for all of these components — so a person in a difficult moment does not have to juggle multiple subscriptions and apps.
            </p>
            <p style={{ marginBottom: 32 }}>
              The product spans a complete two-sided experience: a <strong style={{ color: INK_900 }}>client companion app</strong> for scheduling, messaging, and health self-monitoring, and a <strong style={{ color: INK_900 }}>therapist dashboard</strong> for medical scheduling and real-time client analytics.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24 }}>
              <div style={{ padding: 24, borderRadius: 20, background: INK_50, border: `1px solid ${INK_900}08` }}>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 40, color: SAGE_PRIMARY, fontWeight: 600 }}>25</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: INK_500, marginTop: 4 }}>Screens Designed</div>
              </div>
              <div style={{ padding: 24, borderRadius: 20, background: INK_50, border: `1px solid ${INK_900}08` }}>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 40, color: SAGE_PRIMARY, fontWeight: 600 }}>2</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: INK_500, marginTop: 4 }}>User Personas Served</div>
              </div>
              <div style={{ padding: 24, borderRadius: 20, background: INK_50, border: `1px solid ${INK_900}08` }}>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 40, color: SAGE_PRIMARY, fontWeight: 600 }}>9</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: INK_500, marginTop: 4 }}>Core App Pillars</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── THE PROBLEM ────────────────────────────────────── */}
      <Section background={CREAM} id="problem">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: SAGE_PRIMARY, marginBottom: 12 }}>02 — The Problem</div>
            <h2 style={{
              fontFamily: "Fraunces, serif",
              fontSize: "2.25rem",
              fontWeight: 500,
              lineHeight: 1.15,
              color: INK_900,
              letterSpacing: "-0.02em",
              marginBottom: 24
            }}>
              Asking for help is hard. The tools shouldn't be.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: INK_700 }}>
              Through interviews and competition mapping, four massive friction points surfaced. Each was a drop-off point where a user would exhaustively give up:
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            <div style={{ padding: 24, background: WHITE, borderRadius: 24, border: `1px solid ${INK_900}05` }}>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: SAGE_PRIMARY, marginBottom: 12 }}>01</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: INK_900, marginBottom: 8 }}>Opaque Discovery</h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: INK_500 }}>Users can't compare clinical experts easily by price, specialty, or schedules, making matches feel like guesswork.</p>
            </div>
            <div style={{ padding: 24, background: WHITE, borderRadius: 24, border: `1px solid ${INK_900}05` }}>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: SAGE_PRIMARY, marginBottom: 12 }}>02</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: INK_900, marginBottom: 8 }}>Bureaucratic Booking</h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: INK_500 }}>Calendars, intakes, and payments are fragmented across different portals, killing user momentum.</p>
            </div>
            <div style={{ padding: 24, background: WHITE, borderRadius: 24, border: `1px solid ${INK_900}05` }}>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: SAGE_PRIMARY, marginBottom: 12 }}>03</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: INK_900, marginBottom: 8 }}>Fragmented Tracking</h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: INK_500 }}>Mood, steps, and sleep live in standalone health apps therapists never see, losing valuable contextual details.</p>
            </div>
            <div style={{ padding: 24, background: WHITE, borderRadius: 24, border: `1px solid ${INK_900}05` }}>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: SAGE_PRIMARY, marginBottom: 12 }}>04</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: INK_900, marginBottom: 8 }}>Shallow Self-Help</h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: INK_500 }}>Self-directed resources are scattered across video sharing sites and personal blogs without professional guidance.</p>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 64,
          padding: 48,
          background: SAGE_PRIMARY,
          borderRadius: 24,
          color: WHITE,
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            fontFamily: "Fraunces, serif",
            fontSize: 160,
            lineHeight: 0.1,
            color: WHITE,
            opacity: 0.15,
            position: "absolute",
            top: 60,
            left: 24
          }}>“</div>
          <p style={{
            fontFamily: "Fraunces, serif",
            fontSize: "1.75rem",
            lineHeight: 1.4,
            fontWeight: 400,
            maxWidth: 880,
            position: "relative",
            zIndex: 1,
            paddingLeft: 48
          }}>
            I downloaded three different apps before my first session — one to find a therapist, one to book, and another to journal. By the time I was ready to talk, I was already exhausted.
          </p>
          <div style={{ fontSize: 14, color: SAGE_LIGHT, marginTop: 24, paddingLeft: 48, position: "relative", zIndex: 1 }}>
            — User Interview, 28, First-Time Therapy Seeker
          </div>
        </div>
      </Section>

      {/* ── GOALS ──────────────────────────────────────────── */}
      <Section background={WHITE} id="goals">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: SAGE_PRIMARY, marginBottom: 12 }}>03 — Goals</div>
            <h2 style={{
              fontFamily: "Fraunces, serif",
              fontSize: "2.25rem",
              fontWeight: 500,
              lineHeight: 1.15,
              color: INK_900,
              letterSpacing: "-0.02em"
            }}>
              Core design principles that guided every screen.
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: 24, borderRadius: 20, background: INK_50 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: SAGE_LIGHT, display: "grid", placeItems: "center", color: SAGE_PRIMARY, flexShrink: 0 }}>
                <Check size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: INK_900, marginBottom: 4 }}>Fast First Booking</h3>
                <p style={{ fontSize: 15, color: INK_500, lineHeight: 1.5 }}>Reduce time-to-first-session to under 5 minutes without losing quality onboarding data.</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: 24, borderRadius: 20, background: INK_50 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: SAGE_LIGHT, display: "grid", placeItems: "center", color: SAGE_PRIMARY, flexShrink: 0 }}>
                <Heart size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: INK_900, marginBottom: 4 }}>Supportive Data Viz</h3>
                <p style={{ fontSize: 15, color: INK_500, lineHeight: 1.5 }}>Ensure wellness graphs look encouraging, utilizing natural hues and rounded geometries instead of bright alerts.</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: 24, borderRadius: 20, background: INK_50 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: SAGE_LIGHT, display: "grid", placeItems: "center", color: SAGE_PRIMARY, flexShrink: 0 }}>
                <Layers size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: INK_900, marginBottom: 4 }}>Shared Context</h3>
                <p style={{ fontSize: 15, color: INK_500, lineHeight: 1.5 }}>Synchronize relevant client sleep and mood trends directly into the therapist view, eliminating repetitive status recaps.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── INTERACTIVE SHOWCASE ───────────────────────────── */}
      <Section background={WHITE} id="screens">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: SAGE_PRIMARY, marginBottom: 12 }}>04 — Interactive Showcase</div>
          <h2 style={{
            fontFamily: "Fraunces, serif",
            fontSize: "3rem",
            fontWeight: 500,
            lineHeight: 1.1,
            color: INK_900,
            letterSpacing: "-0.03em"
          }}>
            Explore the Serene Platform
          </h2>
          <p style={{ color: INK_500, marginTop: 16, fontSize: 16, maxWidth: 600, margin: "16px auto 0 auto" }}>
            Click on the design pillars below to review high-fidelity mockups, annotations, and UI UX product rationale.
          </p>
        </div>

        {/* Categories Bar */}
        <div style={{
          display: "flex", gap: 8, overflowX: "auto", paddingBottom: 16,
          justifyContent: "flex-start", borderBottom: `1px solid ${INK_900}08`,
          marginBottom: 48, scrollbarWidth: "none"
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCatChange(cat.id)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 20px", borderRadius: 100,
                border: `1px solid ${activeCat === cat.id ? SAGE_PRIMARY : "transparent"}`,
                background: activeCat === cat.id ? `${SAGE_PRIMARY}12` : "none",
                color: activeCat === cat.id ? SAGE_PRIMARY : INK_700,
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                whiteSpace: "nowrap", transition: "all 0.2s ease"
              }}
            >
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        {/* Content Showcase Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64, alignItems: "center" }}>
          
          {/* Left Side: Device Mockup */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              background: WHITE,
              borderRadius: 48,
              padding: 12,
              boxShadow: "0 40px 80px -30px rgba(15,20,23,0.25), 0 10px 28px -10px rgba(15,20,23,0.12)",
              border: `1px solid ${INK_900}10`,
              width: "100%",
              maxWidth: 360,
              position: "relative"
            }}>
              {/* Phone Notch */}
              <div style={{
                position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)",
                width: 110, height: 28, borderRadius: 100, background: INK_900, zIndex: 10
              }} />

              <div style={{ overflow: "hidden", borderRadius: 38, background: INK_50, position: "relative" }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentScreen.src}
                    src={getAssetUrl(currentScreen.src)}
                    alt={currentScreen.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Screen Nav Selectors */}
            {screens.length > 1 && (
              <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
                {screens.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveScreenIndex(index)}
                    style={{
                      width: 10, height: 10, borderRadius: "50%",
                      background: activeScreenIndex === index ? SAGE_PRIMARY : `${INK_900}15`,
                      border: "none", cursor: "pointer", padding: 0
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Descriptions & Details */}
          <div>
            <Tag>{category.name}</Tag>
            <h3 style={{
              fontFamily: "Fraunces, serif",
              fontSize: "2rem",
              fontWeight: 500,
              color: INK_900,
              marginTop: 16,
              lineHeight: 1.2
            }}>{currentScreen.title}</h3>
            
            <p style={{ fontSize: 16, color: INK_700, lineHeight: 1.6, marginTop: 16 }}>
              {category.description}
            </p>

            <div style={{
              marginTop: 32,
              padding: 24,
              background: CREAM,
              borderRadius: 20,
              border: `1px solid ${INK_900}05`
            }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", color: SAGE_PRIMARY, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                <Sparkle size={14} /> Design Note
              </div>
              <p style={{ fontSize: 14, color: INK_700, lineHeight: 1.5, marginTop: 8 }}>
                {currentScreen.note}
              </p>
            </div>

            {screens.length > 1 && (
              <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
                <button
                  disabled={activeScreenIndex === 0}
                  onClick={() => setActiveScreenIndex(prev => prev - 1)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "10px 20px", borderRadius: 100, border: `1px solid ${INK_900}10`,
                    background: WHITE, color: activeScreenIndex === 0 ? INK_300 : INK_700,
                    fontSize: 14, fontWeight: 600, cursor: activeScreenIndex === 0 ? "not-allowed" : "pointer"
                  }}
                >
                  <ArrowLeft size={16} /> Previous
                </button>
                <button
                  disabled={activeScreenIndex === screens.length - 1}
                  onClick={() => setActiveScreenIndex(prev => prev + 1)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "10px 20px", borderRadius: 100, border: `1px solid ${INK_900}10`,
                    background: WHITE, color: activeScreenIndex === screens.length - 1 ? INK_300 : INK_700,
                    fontSize: 14, fontWeight: 600, cursor: activeScreenIndex === screens.length - 1 ? "not-allowed" : "pointer"
                  }}
                >
                  Next <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>

        </div>
      </Section>

      {/* ── DESIGN SYSTEM ─────────────────────────────────── */}
      <Section background={CREAM} id="system">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: SAGE_PRIMARY, marginBottom: 12 }}>05 — Design System</div>
            <h2 style={{
              fontFamily: "Fraunces, serif",
              fontSize: "2.25rem",
              fontWeight: 500,
              lineHeight: 1.15,
              color: INK_900,
              letterSpacing: "-0.02em"
            }}>
              A calming system borrowed from nature.
            </h2>
            <p style={{ color: INK_700, fontSize: 15, lineHeight: 1.6, marginTop: 24 }}>
              Sage green represents restoration. Additional vibrant highlights (purple, amber, coral) are exclusively reserved for daily reward milestones and metrics so that interface interactions feel helpful instead of medical.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            <div style={{ background: WHITE, padding: 32, borderRadius: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: INK_900, marginBottom: 16 }}>Typography</h3>
              
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 40, color: INK_900, lineHeight: 1 }}>Aa</div>
                <div style={{ fontSize: 12, color: INK_500, marginTop: 4 }}>Display: Fraunces</div>
                <div style={{ fontSize: 11, color: INK_300, marginTop: 2 }}>Elegant, organic serif used for editorial headers.</div>
              </div>

              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 40, fontWeight: 700, color: INK_900, lineHeight: 1 }}>Aa</div>
                <div style={{ fontSize: 12, color: INK_500, marginTop: 4 }}>Body & UI: Inter</div>
                <div style={{ fontSize: 11, color: INK_300, marginTop: 2 }}>Screen-optimized, legible sans-serif for numbers & labels.</div>
              </div>
            </div>

            <div style={{ background: WHITE, padding: 32, borderRadius: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: INK_900, marginBottom: 16 }}>Core Colors</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: SAGE_PRIMARY, border: `1px solid ${INK_900}05` }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>Sage Green</div>
                    <div style={{ fontSize: 11, color: INK_500 }}>#5E8B7E · Core Primary</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: CREAM, border: `1px solid ${INK_900}05` }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>Mindful Cream</div>
                    <div style={{ fontSize: 11, color: INK_500 }}>#F5F2EC · Secondary BG</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: INK_900, border: `1px solid ${INK_900}05` }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>Warm Ink</div>
                    <div style={{ fontSize: 11, color: INK_500 }}>#0F1417 · Strong Text</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── OUTCOMES ───────────────────────────────────────── */}
      <Section background={WHITE} id="outcomes">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: SAGE_PRIMARY, marginBottom: 12 }}>06 — Outcomes</div>
            <h2 style={{
              fontFamily: "Fraunces, serif",
              fontSize: "2.25rem",
              fontWeight: 500,
              lineHeight: 1.15,
              color: INK_900,
              letterSpacing: "-0.02em"
            }}>
              What changed once the screens were on devices.
            </h2>
            <p style={{ color: INK_500, fontSize: 14, lineHeight: 1.6, marginTop: 24 }}>
              Tested with 8 active participants in moderated research sessions — 6 prospective clients and 2 practicing therapists.
            </p>
          </div>

          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, marginBottom: 48 }}>
              <div style={{ padding: 32, borderRadius: 24, background: SAGE_PRIMARY, color: WHITE }}>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 48, fontWeight: 500, lineHeight: 1 }}>3:42</div>
                <div style={{ fontSize: 13, color: SAGE_LIGHT, marginTop: 8 }}>Median time to confirmed first booking (Target was &lt;5:00).</div>
              </div>
              <div style={{ padding: 32, borderRadius: 24, background: INK_50, border: `1px solid ${INK_900}05` }}>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 48, color: INK_900, fontWeight: 500, lineHeight: 1 }}>100%</div>
                <div style={{ fontSize: 13, color: INK_500, marginTop: 8 }}>Of cohort users completed scheduling without external help.</div>
              </div>
              <div style={{ padding: 32, borderRadius: 24, background: INK_50, border: `1px solid ${INK_900}05` }}>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 48, color: INK_900, fontWeight: 500, lineHeight: 1 }}>4.6<span style={{ fontSize: 24 }}>/5</span></div>
                <div style={{ fontSize: 13, color: INK_500, marginTop: 8 }}>Average brand "calming score" after completing flows.</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: INK_900, display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
                  <span style={{ color: SAGE_PRIMARY }}>✔</span> What Worked
                </h4>
                <ul style={{ fontSize: 13, color: INK_700, paddingLeft: 12, lineHeight: 1.6 }} className="space-y-2">
                  <li>· The sage-led color palette was consistently praised as calming and highly trustworthy.</li>
                  <li>· A standardized monitor layout (calendar strip → central ring → weekly charts) made self-tracking learnable in seconds.</li>
                  <li>· Sticky footers on expert profiles dramatically boosted core action rates.</li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: INK_900, display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
                  <span style={{ color: SAGE_PRIMARY }}>➔</span> Next Iteration
                </h4>
                <ul style={{ fontSize: 13, color: INK_700, paddingLeft: 12, lineHeight: 1.6 }} className="space-y-2">
                  <li>· Introduce a brief onboarding overlay explaining health monitors before tracking starts.</li>
                  <li>· Add quick search tags directly above results (pricing, language, specialties).</li>
                  <li>· Build a supportive "zero-data" dashboard state for new, non-tracking users.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── FOOTER CTA ─────────────────────────────────────── */}
      <section style={{ padding: "0 32px 96px 32px" }}>
        <div style={{
          maxWidth: "72rem", margin: "0 auto",
          background: INK_900, borderRadius: 32, padding: "64px 48px",
          color: WHITE, position: "relative", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", top: -80, right: -80, width: 320, height: 320,
            borderRadius: "50%", background: `${SAGE_PRIMARY}30`, filter: "blur(60px)"
          }} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "center", position: "relative", zIndex: 1 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: SAGE_PRIMARY, marginBottom: 12 }}>Thanks for reviewing</div>
              <h2 style={{
                fontFamily: "Fraunces, serif",
                fontSize: "2.5rem",
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: "-0.02em"
              }}>
                Got a product that needs the same kind of design care?
              </h2>
              <p style={{ color: INK_300, fontSize: 15, lineHeight: 1.6, marginTop: 16, maxWidth: 560 }}>
                I design calm, considered interfaces for digital applications that impact real lives — across health, wellness, finance, and education. Let's build something exceptional.
              </p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a 
                href="mailto:muhammad.ahmed.9760@gmail.com" 
                style={{
                  height: 48, borderRadius: 100, background: SAGE_PRIMARY, color: WHITE,
                  display: "grid", placeItems: "center", fontWeight: 600, fontSize: 14,
                  textDecoration: "none", transition: "opacity 0.2s"
                }}
                onMouseOver={e => e.currentTarget.style.opacity = "0.9"}
                onMouseOut={e => e.currentTarget.style.opacity = "1"}
              >
                Get in Touch
              </a>
              <button 
                onClick={() => navigate("/")}
                style={{
                  height: 48, borderRadius: 100, border: `1px solid ${WHITE}30`, background: "none", color: WHITE,
                  display: "grid", placeItems: "center", fontWeight: 600, fontSize: 14,
                  cursor: "pointer", transition: "background 0.2s"
                }}
                onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                onMouseOut={e => e.currentTarget.style.background = "none"}
              >
                Back to Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${INK_900}10`, padding: "32px 0", width: "100%" }}>
        <div style={{
          maxWidth: "72rem", margin: "0 auto", padding: "0 32px",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
          fontSize: 13, color: INK_500
        }}>
          <div>© Serene · A UX/UI Project by Muhammad Ahmed</div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#overview" style={{ color: INK_500, textDecoration: "none" }}>Overview</a>
            <a href="#screens" style={{ color: INK_500, textDecoration: "none" }}>Screens</a>
            <a href="#outcomes" style={{ color: INK_500, textDecoration: "none" }}>Outcomes</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
