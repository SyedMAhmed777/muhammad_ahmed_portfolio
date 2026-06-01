import { useEffect, useRef, useState } from "react";
import { useHashLocation } from "@/hooks/use-hash-location";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Flame
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ── brand tokens ─────────────────────────────────────────── */
const MINT = "#3DCB7A";
const MINT_DARK = "#2EBC6E";
const MINT_LIGHT = "#E8F9EF";
const MINT_MID = "#c0ecd4";

const CORAL = "#FF5A5F";
const CORAL_LIGHT = "#FFF0F0";
const CORAL_DARK = "#D63840";

const SUN = "#FFB840";
const SUN_LIGHT = "#FFF8E7";
const SUN_DARK = "#D8901A";

const INK900 = "#111111";
const INK700 = "#333333";
const INK500 = "#555555";
const INK300 = "#888888";
const INK100 = "#ECECEC";
const INK50  = "#FAFAFA";

const PAPER  = "#FFFFFF";
const CREAM  = "#F9FBF7";
const WHITE  = "#FFFFFF";

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
    id: "welcome",
    name: "Welcome Experience",
    icon: "👋",
    description: "Mascots and a hand-lettered logo set the tone: playful, low-stakes, and a little weird in the best way.",
    screens: [
      { src: "nicotina/Splash.png", title: "Splash Screen", note: "Hand-drawn logo + the two heroes say \"this is a game\" before any words do. Establishes character." },
      { src: "nicotina/get started.png", title: "Get Started", note: "Honest framing: \"this app only works if you do 2 things.\" Sets expectations early, with no false promises." },
      { src: "nicotina/How to play.png", title: "How to Play", note: "A single page that explains the entire gamified mechanic: red when you slip, and blue when you replace." },
    ]
  },
  {
    id: "onboarding",
    name: "Onboarding & Quiz",
    icon: "📋",
    description: "A short behavioral quiz tunes the entire experience: what you smoke, how often, goals, and companion avatar.",
    screens: [
      { src: "nicotina/onboarding-1.png", title: "What you smoke", note: "Pill-style choice + cost + nicotine content database lookup for real-time calculations." },
      { src: "nicotina/onboarding-2.png", title: "How often", note: "Two stacked sliders + an honest \"Not Sure\" option to remove guilt for not knowing exact details." },
      { src: "nicotina/onboarding-3.png", title: "Your target", note: "Stop · Decrease · Maintain. Three completely different gamified routes inside one codebase." },
      { src: "nicotina/onboarding-4.png", title: "Choose veggie", note: "Three distinct companion mascot personalities to pick from, and the user gets to name them." },
      { src: "nicotina/Reminder.png", title: "Reminder timing", note: "Wheel-style time picker. \"Never\" is a valid, prominent option, avoiding dark patterns or forced notifications." },
    ]
  },
  {
    id: "auth",
    name: "Account Security",
    icon: "🔐",
    description: "A continuation path lowers the bar to entry: record habit data first, and form an account later.",
    screens: [
      { src: "nicotina/Sign in.png", title: "Sign In", note: "Username/email + password, with \"Continue as guest\" right under the primary CTA." },
      { src: "nicotina/Sign up.png", title: "Sign Up - Empty", note: "Four fields max. Social SSO at the bottom for quick, frictionless signup." },
      { src: "nicotina/Sign up-2.png", title: "Sign Up - Filled", note: "CTA stays calmly disabled until validation passes. Inline helper text instead of red shouting labels." },
      { src: "nicotina/Sign up-1.png", title: "Sign Up - Error State", note: "A worried cucumber mascot softens the \"Ooops!\", keeping the failure state friendly." },
    ]
  },
  {
    id: "dashboard",
    name: "Daily Dashboard",
    icon: "📱",
    description: "The 30-second daily check-in: see your level, check the mood strip, press the big red or blue button, and move on.",
    screens: [
      { src: "nicotina/v3.png", title: "Home Dashboard", note: "The central workspace. Blue = \"I replaced\" and Red = \"I smoked\". The whole behavioral model is reduced to two pixels of intent." },
    ]
  },
  {
    id: "diary",
    name: "Diary Logs",
    icon: "📓",
    description: "A small, scrollable list of every day logged, paired with a single feeling. No paragraph-writing required.",
    screens: [
      { src: "nicotina/diary.png", title: "Diary List", note: "Each row tells a tiny story: \"Smoked · I felt really bad\" / \"Didn't smoke · I felt superb.\" Honest and fast." },
    ]
  },
  {
    id: "progress",
    name: "Progress & Analytics",
    icon: "🏆",
    description: "A bright, responsive Levels and milestones view showcasing XP, streaks, and unlocked trophy assets.",
    screens: [
      { src: "nicotina/Levels.png", title: "Levels & Milestones", note: "Hexagons unlock left-to-right. Trophies sit on a quiet shelf below, present but not nagging." },
    ]
  },
  {
    id: "calculators",
    name: "Cost Calculators",
    icon: "🧮",
    description: "Two visual tools turn abstract numbers into something visceral: time won back, and real things the money becomes.",
    screens: [
      { src: "nicotina/Calculators.png", title: "Calculators Hub", note: "Two simple cards. No nested menus, no complex \"advanced settings\" hidden behind a gear." },
      { src: "nicotina/Life Calculator.png", title: "Life Calculator", note: "Slider-driven. Output: time won + money saved + nicotine avoided, yielding three concrete numbers." },
      { src: "nicotina/Life Calculator-1.png", title: "Wealth Calculator", note: "A car. A vacation. A laptop. Pink cards are out of reach, and green are within reach, displaying tangible trade-offs." },
    ]
  },
  {
    id: "replacement",
    name: "Habit Replacement",
    icon: "🍎",
    description: "Behavioral science says quitting is easier when you replace a habit. A new action card unlocks each day.",
    screens: [
      { src: "nicotina/Alternatives.png", title: "Alternatives Dashboard", note: "\"Day 1: Sugar Free Gum\" to \"Day 2: Eat an Apple\". The locked future cards build curiosity without overwhelming." },
    ]
  },
  {
    id: "shop",
    name: "Cosmetic Reward Shop",
    icon: "🛒",
    description: "Stars and gems earned through daily check-ins buy accessories and backgrounds for your companion mascot.",
    screens: [
      { src: "nicotina/shop.png", title: "Shop Categories", note: "Background, Wall, Pot, Table, Decoration: your veggie has a whole apartment." },
      { src: "nicotina/shop-1.png", title: "Shop Accessories", note: "Glasses and hats. Tiny, repeating dopaminergic rewards that reinforce showing up." },
      { src: "nicotina/Items.png", title: "Items · Buy", note: "Star-priced and gem-priced items side-by-side. \"Subscriber only\" is clear, honest, and not sneaky." },
      { src: "nicotina/Owned.png", title: "Owned · Equip", note: "A separate tab so the act of \"wearing\" items remains distinct and clean from buying." },
    ]
  },
  {
    id: "settings",
    name: "Settings & Profile",
    icon: "⚙️",
    description: "Familiar lists designed with the same care. Clear icons and simple actions keep settings approachable.",
    screens: [
      { src: "nicotina/Profile.png", title: "Profile", note: "Your veggie mascot up top, then a calm list including Achievements, Notifications, Community, and Stats." },
      { src: "nicotina/Settings.png", title: "Settings List", note: "Five rows. The dangerous one (\"Delete All Data\") gets a coral icon, earning attention without alarming." },
      { src: "nicotina/spotlight.png", title: "Spotlight", note: "Community events, IRL meetups, and seasonal campaigns like \"Nicotine-free February\"." },
      { src: "nicotina/Notification.png", title: "Notifications", note: "Two clear actions per row (Mark as Read or Delete), with no complex swipe gestures." },
    ]
  }
];

/* ── primitives ───────────────────────────────────────────── */
function Tag({ children, type = "mint" }: { children: React.ReactNode; type?: "mint" | "coral" | "sun" | "neutral" }) {
  let color = MINT_DARK;
  let bg = MINT_LIGHT;
  let border = `1px solid ${MINT_MID}`;

  if (type === "coral") {
    color = CORAL_DARK;
    bg = CORAL_LIGHT;
    border = `1px solid ${CORAL}40`;
  } else if (type === "sun") {
    color = SUN_DARK;
    bg = SUN_LIGHT;
    border = `1px solid ${SUN}40`;
  } else if (type === "neutral") {
    color = INK700;
    bg = INK50;
    border = `1px solid ${INK100}`;
  }

  return (
    <span style={{
      display: "inline-block",
      fontFamily: "Poppins, sans-serif", fontSize: 11, fontWeight: 700,
      letterSpacing: "0.1em", textTransform: "uppercase" as const,
      color, background: bg, border, borderRadius: 100, padding: "4px 12px",
    }}>
      {children}
    </span>
  );
}

function Section({ children, noPad, background = PAPER, id, maxWidth = "72rem" }: { children: React.ReactNode; noPad?: boolean; background?: string; id?: string; maxWidth?: string }) {
  return (
    <section id={id} style={{ background, width: "100%" }}>
      <div style={{ maxWidth, margin: "0 auto", padding: noPad ? "0 32px" : "96px 32px" }}>
        {children}
      </div>
    </section>
  );
}

function Rule() {
  return <div style={{ height: 1, background: `${INK900}0f`, maxWidth: "80rem", margin: "0 auto" }} />;
}

function EditGrid({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px", alignItems: "start" }}>
      <div style={{ minWidth: 0 }}>{left}</div>
      <div style={{ minWidth: 0 }}>{right}</div>
    </div>
  );
}

function ScrollRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => { update(); }, []);

  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  const btnBase: React.CSSProperties = {
    position: "absolute", top: "42%", transform: "translateY(-50%)",
    width: 44, height: 44, borderRadius: "50%",
    background: WHITE, border: `1px solid ${INK900}12`,
    boxShadow: "0 8px 24px -4px rgba(17,17,17,0.12)",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", zIndex: 2, transition: "opacity 0.2s",
  };

  return (
    <div style={{ position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw", width: "100vw" }}>
      {canLeft && (
        <button onClick={() => scroll(-1)} style={{ ...btnBase, left: 32 }} aria-label="Scroll left">
          <ArrowLeft style={{ width: 16, height: 16, color: INK700 }} />
        </button>
      )}
      <div ref={ref} onScroll={update} style={{ overflowX: "auto", paddingTop: 20, paddingBottom: 20, paddingLeft: "max(32px, calc((100vw - 72rem) / 2 + 32px))", paddingRight: 64, scrollbarWidth: "none" }}>
        {children}
      </div>
      {canRight && (
        <button onClick={() => scroll(1)} style={{ ...btnBase, right: 32 }} aria-label="Scroll right">
          <ArrowRight style={{ width: 16, height: 16, color: INK700 }} />
        </button>
      )}
    </div>
  );
}

/* ── main page ───────────────────────────────────────────── */
export default function NicotinaCaseStudy() {
  const [, navigate] = useHashLocation();
  const [activeCat, setActiveCat] = useState<CategoryItem>(CATEGORIES[0]);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  const activeScreen = activeCat.screens[activeScreenIndex] || activeCat.screens[0];
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const fullSrc = `${basePath}/${activeScreen.src.replace(/^\//, "")}`;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleCatChange = (cat: CategoryItem) => {
    setActiveCat(cat);
    setActiveScreenIndex(0);
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", background: PAPER, color: INK900, minHeight: "100vh", overflowX: "hidden" }}>
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
          grid-template-columns: 285px 1fr;
          gap: 48px;
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

      {/* ── NAV ─────────────────────────────────────────────── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        backdropFilter: "blur(12px)", background: `rgba(255,255,255,0.92)`,
        borderBottom: `1px solid ${INK900}0f`,
      }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={() => navigate("/")}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: INK500, background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={e => (e.currentTarget.style.color = INK900)}
            onMouseLeave={e => (e.currentTarget.style.color = INK500)}
          >
            <ArrowLeft style={{ width: 14, height: 14 }} />
            Back to Portfolio
          </button>

          <a href="#top" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <span style={{ width: 28, height: 28, background: MINT, borderRadius: 8, display: "grid", placeItems: "center" }}>
              <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" viewBox="0 0 24 24">
                <path d="M12 3c2 2.5 5 4 5 8a5 5 0 1 1-10 0c0-4 3-5.5 5-8Z" />
                <path d="M10 7c-.5 1-1 2-1 3" />
              </svg>
            </span>
            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-.02em", color: INK900 }}>
              Nicotina<span style={{ color: MINT, marginLeft: 2, marginRight: 2 }}>·</span>Interactive Showcase
            </span>
          </a>

        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div id="top" style={{ maxWidth: "72rem", margin: "0 auto", padding: "64px 32px 48px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          <Tag type="neutral">2023 · UI/UX Project</Tag>
          <Tag type="mint">iOS · Android · Figma</Tag>
          <Tag type="coral">Gamified Interface</Tag>
        </div>

        <h1 style={{
          fontFamily: "Poppins, sans-serif", fontWeight: 700,
          fontSize: "clamp(2.5rem,5vw,3.8rem)", letterSpacing: "-0.03em",
          lineHeight: 1.05, margin: "0 0 16px", color: INK900,
        }}>
          Nicotina: Quit smoking, <span style={{ color: MINT }}>one tomato</span> at a time.
        </h1>

        <p style={{ fontSize: 16, lineHeight: 1.7, margin: "0 0 24px", color: INK700, maxWidth: 660 }}>
          An end-to-end gamified companion app that replaces dry tracker spreadsheets with playful veggie mascots, streak currencies, cost calculators, and replacement habit loops. Click through the interactive dashboard below to explore all <strong style={{ color: INK900 }}>27 high-fidelity interface screens</strong>.
        </p>

        <div style={{ display: "flex", gap: 32, padding: "20px 0", borderTop: `1px solid ${INK100}`, borderBottom: `1px solid ${INK100}`, maxWidth: 540 }}>
          {[
            ["Deliverables", "27 Screens designed"],
            ["Personalities", "3 Mascots"],
            ["Timeline", "10 Weeks"],
            ["Category", "Mobile App UI/UX"]
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: INK300, marginBottom: 4 }}>{k}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK900 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── INTERACTIVE WORKSPACE ───────────────────────────── */}
      <Section id="gallery" background="radial-gradient(circle at 10% 10%, rgba(61,203,122,0.08) 0%, rgba(61,203,122,0.01) 50%, transparent 100%), radial-gradient(circle at 90% 90%, rgba(255,90,95,0.06) 0%, rgba(255,90,95,0.01) 50%, transparent 100%), #FAFAFA" maxWidth="86rem">
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
          <div style={{ display: "flex", flexDirection: "column", gap: 6, borderRight: `1px solid ${INK100}`, paddingRight: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: INK300, letterSpacing: "0.1em", paddingLeft: 12, marginBottom: 12 }}>
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
                    color: isActive ? MINT_DARK : INK700,
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
                        background: MINT_LIGHT,
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
                        background: MINT, position: "relative", zIndex: 1 
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Screen Preview Workspace */}
          <div className="preview-grid" style={{ gap: 40, alignItems: "center" }}>
            
            {/* Phone Display Frame - Stable height with viewport scrollability */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: "100%", maxWidth: 265, position: "relative" }}>
                
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
                    width: 70, height: 16, borderRadius: 100, background: INK900, zIndex: 10
                  }} />

                  <div 
                    className="phone-screen"
                    style={{ 
                      overflowY: "auto", 
                      aspectRatio: "375/812",
                      borderRadius: 30, 
                      background: INK50, 
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
                color: MINT_DARK,
                background: `${MINT}0D`,
                padding: "4px 12px",
                borderRadius: 100,
                display: "flex",
                alignItems: "center",
                gap: 6,
                border: `1px solid ${MINT}20`
              }}>
                <span className="pulse-dot" style={{
                  display: "inline-block",
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: MINT
                }}></span>
                <span>Interactive mockup: Scroll to explore ↕</span>
              </div>
            </div>

            {/* Selector Thumbnails & UI Highlight Description */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <Tag type="mint">{activeCat.name}</Tag>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 24, color: INK900, marginTop: 12, marginBottom: 8 }}>
                  {activeScreen.title}
                </h3>
                <p style={{ fontSize: 14, color: INK500, lineHeight: 1.6, margin: 0 }}>
                  {activeCat.description}
                </p>
              </div>

              <div style={{ padding: 16, borderRadius: 16, background: CREAM, border: `1px solid ${MINT}20` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: MINT_DARK, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <Sparkles size={12} style={{ width: 12, height: 12 }} /> Key Feature
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.5, color: INK700, margin: "6px 0 0" }}>
                  {activeScreen.note}
                </p>
              </div>

              {/* Clickable screen selector thumbnails */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: INK300, letterSpacing: "0.1em" }}>
                    Screens In Module ({activeCat.screens.length})
                  </span>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: MINT_LIGHT, color: MINT_DARK,
                    fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                    borderRadius: 100, padding: "2px 10px", letterSpacing: "0.05em",
                    boxShadow: `0 2px 8px ${MINT}15`
                  }}>
                    <span className="pulse-dot" style={{
                      display: "inline-block", width: 5, height: 5, borderRadius: "50%",
                      background: MINT
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
                          border: isSelected ? `2.5px solid ${MINT}` : `1px solid ${INK100}`,
                          boxShadow: isSelected ? "0 4px 12px rgba(61,203,122,0.15)" : "none",
                          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
                          e.currentTarget.style.boxShadow = "0 8px 16px rgba(61,203,122,0.12)";
                          if (!isSelected) e.currentTarget.style.borderColor = `${MINT}80`;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = "translateY(0) scale(1)";
                          e.currentTarget.style.boxShadow = isSelected ? "0 4px 12px rgba(61,203,122,0.15)" : "none";
                          if (!isSelected) e.currentTarget.style.borderColor = INK100;
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

      {/* ── DESIGN SYSTEM SHOWCASE ────────────────────────────── */}
      <Section id="design-system">
        <EditGrid
          left={
            <>
              <Tag type="neutral">02 · Design System Specs</Tag>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem,3vw,2.3rem)", letterSpacing: "-0.03em", lineHeight: 1.1, color: INK900, margin: "24px 0 16px" }}>
                Systematic colors. Playful shapes. Playful tone.
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: INK500 }}>
                Nicotina's design system leverages high-energy hues to emphasize growth and reward, paired with alarming yet friendly tones for relapse analytics.
              </p>
            </>
          }
          right={
            <div>
              {/* color swatches */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 32 }}>
                {[
                  { title: "Primary · Mint", swatches: [["#E8F9EF","50"],["#c0ecd4","200"],["#3DCB7A","500"],["#2EBC6E","600"]] },
                  { title: "Error · Coral", swatches: [["#FFF0F0","50"],["#ffd0d2","200"],["#FF5A5F","500"],["#D63840","700"]] },
                  { title: "Reward · Sun", swatches: [["#FFF8E7","50"],["#ffe3a8","200"],["#FFB840","500"],["#D8901A","700"]] },
                ].map(({ title, swatches }) => (
                  <div key={title}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: INK900, marginBottom: 12 }}>{title}</div>
                    <div style={{ display: "grid", gridTemplateColumns: `repeat(${swatches.length},1fr)`, gap: 8 }}>
                      {swatches.map(([hex, label]) => (
                        <div key={hex}>
                          <div style={{ aspectRatio: "1/1", borderRadius: 8, background: hex, border: `1px solid ${INK900}0a` }} />
                          <div style={{ fontSize: 11, color: INK500, marginTop: 4, fontWeight: 500 }}>{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* type + components */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                
                {/* Left Card: Typography Scales */}
                <div style={{ background: INK50, border: `1px solid ${INK100}`, borderRadius: 16, padding: 24, fontFamily: "Poppins, sans-serif" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: INK900, marginBottom: 20 }}>Typography Scales</div>
                  <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 36, fontWeight: 700, lineHeight: 1, marginBottom: 6 }}>Aa</div>
                  <div style={{ fontSize: 12, color: INK500, marginBottom: 3, fontWeight: 600 }}>Headings & Stats · Poppins Bold & Semi Bold</div>
                  <div style={{ fontSize: 11, color: INK300, marginBottom: 24, lineHeight: 1.5 }}>App headers, mascot names, and core goal counter highlights.</div>
                  <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 32, fontWeight: 300, lineHeight: 1, marginBottom: 6 }}>Aa</div>
                  <div style={{ fontSize: 12, color: INK500, marginBottom: 3, fontWeight: 600 }}>UI Body & Labels · Poppins Light & Regular & Medium</div>
                  <div style={{ fontSize: 11, color: INK300, lineHeight: 1.5 }}>Check-in descriptions, diary logs, and cosmetic shop detail cards.</div>
                </div>
                
                {/* Right Card: Gamified Core UI Elements */}
                <div style={{ background: INK50, border: `1px solid ${INK100}`, borderRadius: 16, padding: 24 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: INK900, marginBottom: 16 }}>Gamified UI Elements</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    
                    {/* Check-In / Counter Tabs */}
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: INK300, letterSpacing: "0.05em", marginBottom: 10 }}>
                        Check-In Metric Controls
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        
                        {/* I Didn't Smoke (Water Glass Counter) */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <img 
                            src={`${basePath}/nicotina/badge_water.png`} 
                            alt="I didn't smoke metric control" 
                            style={{ height: 60, width: "auto", objectFit: "contain", display: "block" }} 
                          />
                          <span style={{ fontSize: 12, color: INK700, fontWeight: 500 }}>"I didn't smoke" (Water goal replacement)</span>
                        </div>

                        {/* I Smoked (Cigarette Counter) */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <img 
                            src={`${basePath}/nicotina/badge_smoke.png`} 
                            alt="I smoked metric control" 
                            style={{ height: 60, width: "auto", objectFit: "contain", display: "block" }} 
                          />
                          <span style={{ fontSize: 12, color: INK700, fontWeight: 500 }}>"I smoked" tracker counter</span>
                        </div>

                      </div>
                    </div>

                    {/* The 3 Veggie Mascots */}
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: INK300, letterSpacing: "0.05em", marginBottom: 10 }}>
                        The 3 Veggie Mascot Companions
                      </div>
                      <div style={{ display: "flex", gap: 12 }}>
                        
                        {/* Tomato (Tomaty) */}
                        <div style={{ flex: 1, background: WHITE, border: `1px solid ${INK100}`, borderRadius: 12, padding: "16px 12px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                          <img 
                            src={`${basePath}/nicotina/mascot_tomato.png`} 
                            alt="Tomaty mascot" 
                            style={{ height: 56, width: "auto", objectFit: "contain", marginBottom: 8 }} 
                          />
                          <div style={{ fontSize: 11, fontWeight: 700, color: INK900 }}>Tomaty</div>
                          <div style={{ fontSize: 9, color: INK500, marginTop: 2 }}>Tomato</div>
                        </div>

                        {/* Cucumber (Cucumby) */}
                        <div style={{ flex: 1, background: WHITE, border: `1px solid ${INK100}`, borderRadius: 12, padding: "16px 12px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                          <img 
                            src={`${basePath}/nicotina/mascot_cucumber.png`} 
                            alt="Cucumby mascot" 
                            style={{ height: 56, width: "auto", objectFit: "contain", marginBottom: 8 }} 
                          />
                          <div style={{ fontSize: 11, fontWeight: 700, color: INK900 }}>Cucumby</div>
                          <div style={{ fontSize: 9, color: INK500, marginTop: 2 }}>Cucumber</div>
                        </div>

                        {/* Mushroom (Shroomy) */}
                        <div style={{ flex: 1, background: WHITE, border: `1px solid ${INK100}`, borderRadius: 12, padding: "16px 12px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                          <img 
                            src={`${basePath}/nicotina/mascot_mushroom.png`} 
                            alt="Shroomy mascot" 
                            style={{ height: 56, width: "auto", objectFit: "contain", marginBottom: 8 }} 
                          />
                          <div style={{ fontSize: 11, fontWeight: 700, color: INK900 }}>Shroomy</div>
                          <div style={{ fontSize: 9, color: INK500, marginTop: 2 }}>Mushroom</div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          }
        />
      </Section>

      <Rule />

      {/* ── IMPACT & SYSTEM VALIDATION ────────────────────────── */}
      <Section id="outcome">
        <EditGrid
          left={
            <>
              <Tag type="mint">03 · User Testing Insights</Tag>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem,3vw,2.3rem)", letterSpacing: "-0.03em", lineHeight: 1.1, color: INK900, margin: "24px 0 16px" }}>
                What I learned from real users.
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: INK500 }}>
                Tested the interactive Figma prototypes in moderated sessions with 9 participants (4 social vapers, 5 daily smokers) to validate onboarding loops, tracking ergonomics, and visual systems.
              </p>
            </>
          }
          right={
            <div>
              {/* big stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
                {[
                  { value: "100%", label: "Onboarding completion rate, indicating the quiz layout and avatar choice felt highly engaging and low-pressure.", bg: MINT, valueColor: WHITE, labelColor: MINT_LIGHT, border: "none" },
                  { value: "12s", label: "Average check-in time. The primary two-button dashboard layout made daily tracking extremely rapid and frictionless.", bg: `${INK900}06`, valueColor: INK900, labelColor: INK500, border: `1px solid ${INK900}08` },
                  { value: "8/9", label: "Users correctly mapped the visual color meaning (Mint for replaced, Coral for smoked check-ins) without any instructions.", bg: `${INK900}06`, valueColor: SUN_DARK, labelColor: INK500, border: `1px solid ${INK900}08` },
                ].map(({ value, label, bg, valueColor, labelColor, border }, i) => (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, y: 28, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                    style={{ background: bg, border, borderRadius: 20, padding: "32px 24px" }}
                  >
                    <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 52, letterSpacing: "-0.04em", lineHeight: 1, color: valueColor, marginBottom: 12 }}>{value}</div>
                    <div style={{ color: labelColor, fontSize: 13, lineHeight: 1.55 }}>{label}</div>
                  </motion.div>
                ))}
              </div>

              {/* what worked / what's next */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: WHITE, border: `1px solid ${INK100}`, borderRadius: 20, padding: 32 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: MINT_DARK, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 18 }}>What worked</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      "The Wealth Calculator's real-world cost comparisons immediately resonated, with users calling it a powerful mental shift.",
                      "Color-coded check-ins reduced cognitive load, allowing users to log their state in seconds without feelings of guilt.",
                      "Selecting and naming a companion veggie mascot established a clear sense of ownership and daily routine motivation.",
                      "The scrollable daily diary strip was praised for being extremely low-pressure compared to typical calendar checklists.",
                    ].map(s => (
                      <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: INK700, lineHeight: 1.6 }}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" style={{ color: MINT_DARK, flexShrink: 0, marginTop: 3 }}><path d="M20 6L9 17l-5-5"/></svg>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div style={{ background: WHITE, border: `1px solid ${INK100}`, borderRadius: 20, padding: 32 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: SUN_DARK, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 18 }}>What I'd change next</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      "Build a better empty state for the daily dashboard since the initial screen felt sparse before logging history.",
                      "Soften the slip-up reaction: when a user logs a smoke, the mascot should react with care and support, not a hard streak reset.",
                      "Surface the Alternatives suggestion pre-emptively on the dashboard during recurring high-craving hours.",
                      "Explore integrating tactile haptic feedback on the primary check-in buttons to make the logging action feel more physical.",
                    ].map(s => (
                      <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: INK700, lineHeight: 1.6 }}>
                        <ArrowRight style={{ width: 14, height: 14, color: SUN, flexShrink: 0, marginTop: 3 }} />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          }
        />
      </Section>

      {/* ── FOOTER CTA ───────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${INK100}`, background: CREAM }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "80px 32px 80px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
          <div>
            <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 28, color: INK900, marginBottom: 8 }}>Ready to quit the traditional spreadsheet trackers?</div>
            <p style={{ color: INK500, fontSize: 15, lineHeight: 1.6, maxWidth: 520 }}>I design delightful companion apps for behaviour change, wearables, and hardware companion platforms. Always happy to talk through a brief.</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => navigate("/#contact")}
              style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 24px", background: MINT, color: WHITE, borderRadius: 100, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", boxShadow: `0 12px 28px -8px ${MINT}60` }}
            >
              Get in touch
            </button>
            <button
              onClick={() => navigate("/")}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 24px", background: WHITE, color: INK700, borderRadius: 100, fontWeight: 600, fontSize: 14, border: `1px solid ${INK100}`, cursor: "pointer" }}
            >
              <ArrowLeft style={{ width: 14, height: 14 }} /> Back to Portfolio
            </button>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${INK900}08` }}>
          <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: INK300 }}>
            <span>© Nicotina · A UX/UI Project by Muhammad Ahmed</span>
          </div>
        </div>
      </div>

    </div>
  );
}
