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
const SAGE_MID = "#C3D9D1";

const INK_900 = "#0F1417";
const INK_700 = "#2A323A";
const INK_500 = "#5B6670";
const INK_300 = "#9AA3AC";
const INK_100 = "#ECECEC";
const INK_50  = "#FAFAF7";

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
    name: "Onboarding Experience",
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
function Tag({ children, type = "sage" }: { children: React.ReactNode; type?: "sage" | "ink" | "cream" | "neutral" }) {
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
  } else if (type === "neutral") {
    color = INK_700;
    bg = INK_50;
    border = `1px solid ${INK_100}`;
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
  const [activeCat, setActiveCat] = useState<CategoryItem>(CATEGORIES[0]);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const activeScreen = activeCat.screens[activeScreenIndex] || activeCat.screens[0];
  const fullSrc = `${basePath}/${activeScreen.src.replace(/^\//, "")}`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleCatChange = (cat: CategoryItem) => {
    setActiveCat(cat);
    setActiveScreenIndex(0);
  };

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      color: INK_900,
      background: WHITE,
      minHeight: "100vh",
      overflowX: "hidden"
    }}>
      {/* ── Custom font load (Fraunces) ── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500;1,9..144,700&display=swap" rel="stylesheet" />

      {/* ── Hide scrollbars in device mockups ── */}
      <style>{`
        .phone-screen::-webkit-scrollbar {
          display: none;
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.25); }
        }
        .pulse-dot {
          animation: pulseDot 2s infinite ease-in-out;
        }
        .workspace-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 32px;
        }
        .preview-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 40px;
          align-items: center;
        }
        @media (max-width: 991px) {
          .workspace-grid {
            grid-template-columns: 1fr;
          }
          .preview-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* ── TOP NAV BAR ────────────────────────────────────── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 40,
        background: `rgba(255,255,255,0.92)`, backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${INK_900}0f`,
        width: "100%"
      }}>
        <div style={{
          maxWidth: "72rem", margin: "0 auto", padding: "0 32px",
          height: 60, display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <button 
            onClick={() => navigate("/")}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "none", border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 600, color: INK_500, padding: 0
            }}
            onMouseEnter={e => (e.currentTarget.style.color = INK_900)}
            onMouseLeave={e => (e.currentTarget.style.color = INK_500)}
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </button>

          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <span style={{
              width: 28, height: 28, borderRadius: 8, background: SAGE_PRIMARY,
              display: "grid", placeItems: "center", color: WHITE, fontWeight: 700
            }}>S</span>
            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em", color: INK_900 }}>
              Serene<span style={{ color: SAGE_PRIMARY, marginLeft: 2, marginRight: 2 }}>·</span>Interactive Showcase
            </span>
          </a>
        </div>
      </header>

      {/* ── HERO SECTION ───────────────────────────────────── */}
      <div id="top" style={{ maxWidth: "72rem", margin: "0 auto", padding: "64px 32px 48px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          <Tag type="neutral">2024 · UI/UX Project</Tag>
          <Tag type="sage">iOS · Android · Figma</Tag>
          <Tag type="cream">Holistic Health App</Tag>
        </div>

        <h1 style={{
          fontFamily: "Fraunces, serif",
          fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
          fontWeight: 500,
          lineHeight: 1.05,
          color: INK_900,
          letterSpacing: "-0.03em",
          margin: "0 0 16px"
        }}>
          Serene: A calmer way to find help, <span style={{ color: SAGE_PRIMARY }}>talk it out</span>, and take care of yourself.
        </h1>

        <p style={{
          fontSize: 16,
          lineHeight: 1.7,
          color: INK_700,
          margin: "0 0 24px",
          maxWidth: 660
        }}>
          A complete end-to-end companion platform connecting clients with licensed therapists while quietly monitoring everyday wellness signals (sleep, mood, steps, macros) that shape how we feel. Click through the interactive workspace below to explore all <strong style={{ color: INK_900 }}>25 high-fidelity screens</strong>.
        </p>

        <div style={{
          display: "flex",
          gap: 32,
          padding: "20px 0",
          borderTop: `1px solid ${INK_100}`,
          borderBottom: `1px solid ${INK_100}`,
          maxWidth: 540
        }}>
          {[
            ["Deliverables", "25 Screens Designed"],
            ["Personalities", "2 User Personas"],
            ["Timeline", "8 Weeks"],
            ["Category", "Mobile App UI/UX"]
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: INK_300, marginBottom: 4 }}>{k}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK_900 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── INTERACTIVE SHOWCASE WORKSPACE ─────────────────── */}
      <Section id="gallery" background="radial-gradient(circle at 10% 10%, rgba(94,139,126,0.08) 0%, rgba(94,139,126,0.01) 50%, transparent 100%), radial-gradient(circle at 90% 90%, rgba(245,242,236,0.06) 0%, rgba(245,242,236,0.01) 50%, transparent 100%), #FAFAF7">
        <div style={{ 
          background: "rgba(255, 255, 255, 0.85)", 
          backdropFilter: "blur(20px)",
          border: `1px solid rgba(255, 255, 255, 0.6)`, 
          borderRadius: 24, 
          padding: 32, 
          boxShadow: "0 20px 50px -12px rgba(17, 17, 17, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.8)",
          gap: 32
        }}
        className="workspace-grid"
      >
          
          {/* Sidebar Tabs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, borderRight: `1px solid ${INK_100}`, paddingRight: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: INK_300, letterSpacing: "0.1em", paddingLeft: 12, marginBottom: 12 }}>
              Feature Modules
            </div>
            {CATEGORIES.map(cat => {
              const isActive = cat.id === activeCat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCatChange(cat)}
                  style={{
                    position: "relative",
                    display: "flex", alignItems: "center", gap: 12, width: "100%",
                    height: 44, padding: "0 12px", border: "none", borderRadius: 12,
                    background: "transparent",
                    color: isActive ? SAGE_PRIMARY : INK_700,
                    fontWeight: isActive ? 700 : 500, fontSize: 13,
                    textAlign: "left", cursor: "pointer", 
                    transition: "color 0.25s ease, padding-left 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    paddingLeft: isActive ? "16px" : "12px",
                    outline: "none"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.paddingLeft = "18px";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.paddingLeft = isActive ? "16px" : "12px";
                  }}
                >
                  {/* Sliding Background Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: SAGE_LIGHT,
                        borderRadius: 12,
                        zIndex: 0
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span style={{ fontSize: 16, position: "relative", zIndex: 1 }}>{cat.icon}</span>
                  <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", position: "relative", zIndex: 1 }}>
                    {cat.name}
                  </span>
                  
                  {/* Sliding Active Dot */}
                  {isActive && (
                    <motion.span 
                      layoutId="activeTabDot"
                      style={{ 
                        width: 6, height: 6, borderRadius: "50%", 
                        background: SAGE_PRIMARY, position: "relative", zIndex: 1 
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Preview Workspace */}
          <div className="preview-grid" style={{ gap: 40, alignItems: "center" }}>
            
            {/* Phone Display Frame */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: "100%", maxWidth: 220, position: "relative" }}>
                
                {/* Framer Motion AnimatePresence for smooth screen sliding */}
                <div style={{
                  borderRadius: 36, background: WHITE, padding: 6,
                  boxShadow: "0 25px 50px -12px rgba(17,17,17,0.15)",
                  border: "1px solid #e2e2e2", overflow: "hidden",
                  position: "relative"
                }}>
                  {/* Phone Notch */}
                  <div style={{
                    position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
                    width: 70, height: 16, borderRadius: 100, background: INK_900, zIndex: 10
                  }} />

                  <div 
                    className="phone-screen"
                    style={{ 
                      overflowY: "auto", 
                      aspectRatio: "375/812",
                      borderRadius: 30, 
                      background: INK_50, 
                      position: "relative",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none"
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={fullSrc}
                        src={fullSrc}
                        alt={activeScreen.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Interactive Scroll Tip */}
              <div style={{
                marginTop: 16,
                fontSize: 10,
                fontWeight: 600,
                color: SAGE_PRIMARY,
                background: `${SAGE_PRIMARY}0D`,
                padding: "4px 12px",
                borderRadius: 100,
                display: "flex",
                alignItems: "center",
                gap: 6,
                border: `1px solid ${SAGE_PRIMARY}20`
              }}>
                <span className="pulse-dot" style={{
                  display: "inline-block",
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: SAGE_PRIMARY
                }}></span>
                <span>Interactive mockup: Scroll to explore ↕</span>
              </div>
            </div>

            {/* Description & Screen Selector */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <Tag>{activeCat.name}</Tag>
              </div>

              <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 24, fontWeight: 500, margin: 0, color: INK_900 }}>
                {activeScreen.title}
              </h3>

              <p style={{ fontSize: 14, lineHeight: 1.6, color: INK_700, margin: 0 }}>
                {activeCat.description}
              </p>

              <div style={{ padding: 16, borderRadius: 16, background: CREAM, border: `1px solid ${SAGE_PRIMARY}1a` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: SAGE_PRIMARY, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <Sparkle size={12} /> Key Feature
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.5, color: INK_700, margin: "6px 0 0" }}>
                  {activeScreen.note}
                </p>
              </div>

              {/* Clickable screen selector thumbnails */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: INK_300, letterSpacing: "0.1em" }}>
                    Screens In Module ({activeCat.screens.length})
                  </span>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: SAGE_LIGHT, color: SAGE_PRIMARY,
                    fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                    borderRadius: 100, padding: "2px 10px", letterSpacing: "0.05em",
                    boxShadow: `0 2px 8px ${SAGE_PRIMARY}15`
                  }}>
                    <span className="pulse-dot" style={{
                      display: "inline-block", width: 5, height: 5, borderRadius: "50%",
                      background: SAGE_PRIMARY
                    }} />
                    Click to swap screen
                  </span>
                </div>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {activeCat.screens.map((screen, idx) => {
                    const isSelected = idx === activeScreenIndex;
                    const thumbSrc = `${basePath}/${screen.src.replace(/^\//, "")}`;
                    return (
                      <button
                        key={screen.title}
                        onClick={() => setActiveScreenIndex(idx)}
                        style={{
                          width: 52, height: 96, borderRadius: 8, padding: 2,
                          background: WHITE, cursor: "pointer", overflow: "hidden",
                          border: isSelected ? `2.5px solid ${SAGE_PRIMARY}` : `1px solid ${INK_100}`,
                          boxShadow: isSelected ? `0 4px 12px ${SAGE_PRIMARY}25` : "none",
                          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
                          e.currentTarget.style.boxShadow = `0 8px 16px ${SAGE_PRIMARY}20`;
                          if (!isSelected) e.currentTarget.style.borderColor = `${SAGE_PRIMARY}80`;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = "translateY(0) scale(1)";
                          e.currentTarget.style.boxShadow = isSelected ? `0 4px 12px ${SAGE_PRIMARY}25` : "none";
                          if (!isSelected) e.currentTarget.style.borderColor = INK_100;
                        }}
                      >
                        <img 
                          src={thumbSrc} 
                          alt={screen.title} 
                          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4 }} 
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

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

      {/* ── FOOTER CTA ─────────────────────────────────────── */}
      <section style={{ padding: "0 32px 96px 32px", marginTop: 64 }}>
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
          <div>© Serene · A UI/UX Showcase by Muhammad Ahmed</div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#top" style={{ color: INK_500, textDecoration: "none" }}>Top</a>
            <a href="#gallery" style={{ color: INK_500, textDecoration: "none" }}>Interactive Showcase</a>
            <a href="#system" style={{ color: INK_500, textDecoration: "none" }}>Design System</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
