import { useEffect, useRef, useState, Fragment } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Check, AlertCircle, Wifi, Clock, Layers, Plus, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

/* ── brand tokens ─────────────────────────────────────────── */
const E500 = "#F26B2C";
const E600 = "#DC551A";
const E100 = "#FFE0D2";
const E200 = "#FFC2A4";
const E700 = "#B43F0E";
const INK900 = "#0F1014";
const INK700 = "#262830";
const INK500 = "#5B5E66";
const INK300 = "#A4A6AC";
const INK100 = "#EEEEF0";
const INK50  = "#F7F7F8";
const OK500  = "#2EE093";
const OK700  = "#13A36A";
const ERR500 = "#EF4444";
const PAPER  = "#FBFBFA";
const WHITE  = "#FFFFFF";
const DARK2  = "#181A1F";

/* ── primitives ───────────────────────────────────────────── */
function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.025, transition: { duration: 0.25, ease: "easeOut" } }}
      style={{
        borderRadius: 38, background: WHITE, padding: 8,
        boxShadow: "0 30px 60px -25px rgba(15,16,20,0.40), 0 8px 20px -10px rgba(15,16,20,0.20)",
        border: "1px solid rgba(15,16,20,0.08)",
        cursor: "default",
      }}
    >
      <img src={src} alt={alt} style={{ borderRadius: 30, display: "block", width: "100%", height: "auto" }} />
    </motion.div>
  );
}

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-block",
      fontFamily: "Space Grotesk, ui-sans-serif", fontSize: 11, fontWeight: 600,
      letterSpacing: "0.12em", textTransform: "uppercase" as const,
      color: E600, background: `${E500}14`, borderRadius: 4, padding: "3px 10px",
    }}>
      {children}
    </span>
  );
}

function Rule() {
  return <div style={{ height: 1, background: `${INK900}0f`, maxWidth: "80rem", margin: "0 auto" }} />;
}

/* editorial two-column layout: narrow left label + wide right content */
function Section({ children, noPad }: { children: React.ReactNode; noPad?: boolean }) {
  return (
    <section style={{ maxWidth: "72rem", margin: "0 auto", padding: noPad ? "0 48px" : "72px 48px" }}>
      {children}
    </section>
  );
}

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const gridChildVariants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

function EditGrid({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "64px", alignItems: "start" }}
    >
      <motion.div variants={gridChildVariants} style={{ minWidth: 0 }}>{left}</motion.div>
      <motion.div variants={gridChildVariants} style={{ minWidth: 0 }}>{right}</motion.div>
    </motion.div>
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
    position: "absolute", top: "38%", transform: "translateY(-50%)",
    width: 36, height: 36, borderRadius: "50%",
    background: WHITE, border: `1px solid ${INK900}12`,
    boxShadow: "0 4px 16px -4px rgba(15,16,20,0.18)",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", zIndex: 2, transition: "opacity 0.2s",
  };

  return (
    <div style={{ position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw", width: "100vw" }}>
      {canLeft && (
        <button onClick={() => scroll(-1)} style={{ ...btnBase, left: 20 }} aria-label="Scroll left">
          <ArrowLeft style={{ width: 15, height: 15, color: INK700 }} />
        </button>
      )}
      <div ref={ref} onScroll={update} style={{ overflowX: "auto", paddingTop: 40, paddingBottom: 40, paddingLeft: "max(48px, calc((100vw - 72rem) / 2 + 48px))", paddingRight: 64, scrollbarWidth: "none" }}>
        {children}
      </div>
      {canRight && (
        <button onClick={() => scroll(1)} style={{ ...btnBase, right: 20 }} aria-label="Scroll right">
          <ArrowRight style={{ width: 15, height: 15, color: INK700 }} />
        </button>
      )}
    </div>
  );
}

function InfoCard({ title, body, wide }: { title: string; body: string; wide?: boolean }) {
  return (
    <div style={{
      background: `${INK900}05`, border: `1px solid ${INK900}08`,
      borderRadius: 14, padding: "20px 20px", gridColumn: wide ? "1 / -1" : undefined,
    }}>
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, color: INK900 }}>{title}</div>
      <p style={{ fontSize: 13, color: INK500, lineHeight: 1.65 }}>{body}</p>
    </div>
  );
}

/* ── main page ───────────────────────────────────────────── */
export default function LumenCaseStudy() {
  const [, navigate] = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ fontFamily: "Inter, ui-sans-serif, system-ui", background: PAPER, color: INK900, minHeight: "100vh" }}>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        backdropFilter: "blur(16px)", background: `${PAPER}e8`,
        borderBottom: `1px solid ${INK900}0d`,
      }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 48px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={() => navigate("/")}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: INK500, background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={e => (e.currentTarget.style.color = INK900)}
            onMouseLeave={e => (e.currentTarget.style.color = INK500)}
          >
            <ArrowLeft style={{ width: 14, height: 14 }} />
            Back to Portfolio
          </button>

          <div style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 600, fontSize: 15, color: INK900, letterSpacing: "0.01em" }}>
            Lumen<span style={{ color: E500 }}>.</span>
            <span style={{ fontWeight: 400, fontSize: 13, color: INK500, marginLeft: 8 }}>Smart Home · Design Project</span>
          </div>

          <a href="#screens" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: E500, textDecoration: "none" }}>
            View screens <ArrowRight style={{ width: 13, height: 13 }} />
          </a>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "80px 48px 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 80, alignItems: "center" }}>
          <div>
            <Tag>Design Project · 2025</Tag>

            <h1 style={{
              fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700,
              fontSize: "clamp(3rem,6vw,5rem)", letterSpacing: "-0.03em",
              lineHeight: 1.0, margin: "24px 0 0", color: INK900,
            }}>
              Lumen.
            </h1>

            <h2 style={{
              fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 400,
              fontSize: "clamp(1.2rem,2.5vw,1.6rem)", lineHeight: 1.35,
              margin: "14px 0 0", color: INK500,
            }}>
              Designing calm control<br />for a smarter home.
            </h2>

            <p style={{ fontSize: 17, lineHeight: 1.78, margin: "28px 0 0", color: INK700, maxWidth: 480 }}>
              A mobile IoT platform that strips back the noise of smart-home management, replacing cluttered dashboards with a single, intentional interface across <strong style={{ color: INK900 }}>18 screens</strong>.
            </p>

            <div style={{ display: "flex", gap: 40, marginTop: 48 }}>
              {[["Role", "Product Design"], ["Duration", "6 Weeks"], ["Platform", "iOS · Android"], ["Tools", "Figma · Notion"]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: INK300, marginBottom: 5 }}>{k}</div>
                  <div style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontSize: 14, fontWeight: 600, color: INK900 }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
              <a href="#screens" style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 20px", background: `linear-gradient(180deg,#FF7E48,${E500})`, color: WHITE, borderRadius: 12, fontWeight: 600, fontSize: 14, textDecoration: "none", boxShadow: "0 12px 28px -8px rgba(242,107,44,0.50)" }}>
                Explore the screens <ArrowRight style={{ width: 14, height: 14 }} />
              </a>
              <a href="#problem" style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 20px", background: WHITE, color: INK700, borderRadius: 12, fontWeight: 600, fontSize: 14, textDecoration: "none", border: `1px solid ${INK900}12` }}>
                Read the story
              </a>
            </div>
          </div>

          {/* hero phone */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "85%" }}>
              <Phone src="/lumen/Home- listing devices.png" alt="Lumen Home" />
              {/* floating spec chips */}
              <div style={{ position: "absolute", top: -14, left: -20, display: "flex", alignItems: "center", gap: 10, backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.88)", border: `1px solid ${INK900}0d`, borderRadius: 14, padding: "10px 14px", boxShadow: "0 8px 24px -10px rgba(15,16,20,0.20)" }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: `${OK500}20`, display: "grid", placeItems: "center" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: OK500, display: "block" }} />
                </span>
                <div>
                  <div style={{ fontSize: 11, color: INK500 }}>Socket</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>ON · 12W</div>
                </div>
              </div>
              <div style={{ position: "absolute", right: -20, top: "35%", display: "flex", alignItems: "center", gap: 10, backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.88)", border: `1px solid ${INK900}0d`, borderRadius: 14, padding: "10px 14px", boxShadow: "0 8px 24px -10px rgba(15,16,20,0.20)" }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: E100, display: "grid", placeItems: "center", color: E700 }}>
                  <svg viewBox="0 0 24 24" style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" /><circle cx="12" cy="12" r="3" /></svg>
                </span>
                <div>
                  <div style={{ fontSize: 11, color: INK500 }}>Living Room</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Fan · 66%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS STRIP ──────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${INK900}0f`, borderBottom: `1px solid ${INK900}0f` }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {[
            { n: "18", label: "Screens designed" },
            { n: "5", label: "Device types" },
            { n: "60s", label: "Target time-to-pair" },
            { n: "7 / 7", label: "Users recovered unaided" },
          ].map(({ n, label }, i) => (
            <div key={i} style={{ padding: "32px 0", paddingLeft: i > 0 ? 32 : 0, borderRight: i < 3 ? `1px solid ${INK900}0f` : "none" }}>
              <div style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontSize: 44, fontWeight: 700, color: i === 0 ? E500 : INK900, lineHeight: 1, letterSpacing: "-0.03em" }}>{n}</div>
              <div style={{ fontSize: 13, color: INK500, marginTop: 6, fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── OVERVIEW ─────────────────────────────────────────── */}
      <Section>
        <EditGrid
          left={
            <>
              <Tag>01 · Overview</Tag>
              <h2 style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.2rem)", letterSpacing: "-0.025em", lineHeight: 1.2, color: INK900, margin: "18px 0 0" }}>
                One app.<br />Many homes.<br />Hundreds of devices.
              </h2>
            </>
          }
          right={
            <div>
              <p style={{ fontSize: 17, lineHeight: 1.78, color: INK700, marginBottom: 20 }}>
                Smart-home apps live or die on a single moment: the first time a user holds an unboxed plug, opens the app, and tries to bring the two together. Lumen is designed to make that moment feel less like flashing a router and more like AirPods pairing: guided, forgiving, and quick.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.78, color: INK700 }}>
                Beyond pairing, the product organises devices by <strong style={{ color: INK900 }}>home</strong> and <strong style={{ color: INK900 }}>room</strong>, exposes contextual bottom-sheet controls for each device type, and ties the lot together with scenes and voice-assistant hooks.
              </p>
            </div>
          }
        />
      </Section>

      <Rule />

      {/* ── PROBLEM ──────────────────────────────────────────── */}
      <Section>
        <EditGrid
          left={
            <>
              <Tag>02 · The Problem</Tag>
              <h2 style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.2rem)", letterSpacing: "-0.025em", lineHeight: 1.2, color: INK900, margin: "18px 0 16px" }}>
                IoT apps fail at the moments that matter most.
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: INK500 }}>
                After auditing 6 leading smart-home apps and watching 5 first-time setups in person, four failure modes accounted for nearly every drop-off.
              </p>
            </>
          }
          right={
            <div>
              {/* pull quote */}
              <blockquote style={{ borderLeft: `3px solid ${E500}`, paddingLeft: 24, marginBottom: 32 }}>
                <p style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontSize: "clamp(1.1rem,2.5vw,1.35rem)", fontWeight: 500, lineHeight: 1.5, color: INK900, margin: 0 }}>
                  "I bought the plug, downloaded the app, and spent twenty minutes trying to figure out why it kept timing out. Turned out my router was 5GHz. The app never said a word."
                </p>
                <footer style={{ fontSize: 13, color: INK500, marginTop: 12 }}>User interview, 34, first-time smart-plug owner</footer>
              </blockquote>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { n: "01", title: "Pairing is a black box", body: "Connecting\u2026 with a spinner. No timer, no progress, no idea what to do if it stalls." },
                  { n: "02", title: "Empty states feel like errors", body: "A blank home screen on day-1 looks broken. Users assume the app doesn\u2019t work." },
                  { n: "03", title: "Errors are dead ends", body: "Failed. Try again. gives no diagnostic \u2014 most users blame themselves and give up." },
                  { n: "04", title: "Lists break at scale", body: "Past a dozen devices, flat lists become unusable. Users want rooms, scenes, and a panic button." },
                ].map(({ n, title, body }) => (
                  <div key={n} style={{ background: `${INK900}05`, border: `1px solid ${INK900}08`, borderRadius: 14, padding: "20px 20px" }}>
                    <div style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: 22, color: E500, letterSpacing: "-0.04em", marginBottom: 8 }}>{n}</div>
                    <h3 style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, color: INK900 }}>{title}</h3>
                    <p style={{ fontSize: 13, color: INK500, lineHeight: 1.65 }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          }
        />
      </Section>

      <Rule />

      {/* ── GOALS ────────────────────────────────────────────── */}
      <Section>
        <EditGrid
          left={
            <>
              <Tag>03 · Goals</Tag>
              <h2 style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.2rem)", letterSpacing: "-0.025em", lineHeight: 1.2, color: INK900, margin: "18px 0 0" }}>
                Four principles guided every screen.
              </h2>
            </>
          }
          right={
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: <Check style={{ width: 16, height: 16 }} />, title: "Make first-pair feel like a magic trick", body: "A countdown timer, a clear blinking check, and a 3-bullet recovery modal: pairing as a guided 60-second journey, not a black box." },
                { icon: <svg viewBox="0 0 24 24" style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>, title: "Treat empty as opportunity, not failure", body: "An illustrated empty home plus a dashed arrow pointing at the FAB, so even day-zero users know exactly what to do next." },
                { icon: <AlertCircle style={{ width: 16, height: 16 }} />, title: "Errors should be conversations", body: "Every failure modal lists the three most likely causes, turning a dead end into a checklist." },
                { icon: <Layers style={{ width: 16, height: 16 }} />, title: "Daily control belongs in the thumb zone", body: "Bottom sheets, not new pages, for power, dimmer, regulator. The home screen never has to leave focus." },
              ].map(({ icon, title, body }) => (
                <div key={title} style={{ display: "flex", gap: 16, padding: "18px 20px", background: `${INK900}05`, border: `1px solid ${INK900}08`, borderRadius: 14, alignItems: "flex-start" }}>
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: E100, display: "grid", placeItems: "center", color: E700, flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, color: INK900 }}>{title}</div>
                    <p style={{ fontSize: 13, color: INK500, lineHeight: 1.65 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          }
        />
      </Section>

      <Rule />

      {/* ── PERSONAS ─────────────────────────────────────────── */}
      <Section>
        <EditGrid
          left={
            <>
              <Tag>04 · Who we designed for</Tag>
              <h2 style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.2rem)", letterSpacing: "-0.025em", lineHeight: 1.2, color: INK900, margin: "18px 0 0" }}>
                The first-timer and the power user.
              </h2>
            </>
          }
          right={
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                {
                  letter: "P", name: "Priya, 29", subtitle: "First-time smart-plug buyer · One bedroom, one device",
                  gradient: `linear-gradient(135deg,${E200},${E500})`,
                  bio: "Bought a smart plug to schedule her aquarium light. Will return the device if setup takes longer than ten minutes.",
                  needs: ["A first-device walkthrough", "Honest feedback during pairing", "Plain-language errors"],
                  frustrations: ["Account creation before setup", "Mystery WiFi requirements", "No way to back out cleanly"],
                },
                {
                  letter: "M", name: "Murat, 41", subtitle: "Power user · 3 homes, 32 devices, 12 scenes",
                  gradient: `linear-gradient(135deg,${INK700},${INK900})`,
                  bio: "Manages his apartment, his parents' place, and a holiday home from one phone. Wants speed: fewer taps, more bulk actions.",
                  needs: ["Multi-home switcher", "Bulk-select & Off all", "Voice-assistant pairing"],
                  frustrations: ["Single flat device list", "Re-pairing after WiFi change", "Slow scene authoring"],
                },
              ].map(({ letter, name, subtitle, gradient, bio, needs, frustrations }) => (
                <div key={name} style={{ background: WHITE, border: `1px solid ${INK900}08`, borderRadius: 18, padding: "28px 28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: gradient, display: "grid", placeItems: "center", color: WHITE, fontSize: 20, fontWeight: 700, fontFamily: "Space Grotesk, ui-sans-serif", flexShrink: 0 }}>{letter}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 16 }}>{name}</div>
                      <div style={{ color: INK500, fontSize: 13 }}>{subtitle}</div>
                    </div>
                  </div>
                  <p style={{ color: INK700, lineHeight: 1.7, fontSize: 14, marginBottom: 16 }}>{bio}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 13 }}>
                    <div>
                      <div style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: INK300, marginBottom: 8 }}>Needs</div>
                      <ul style={{ color: INK700, margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>{needs.map(n => <li key={n}>· {n}</li>)}</ul>
                    </div>
                    <div>
                      <div style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: INK300, marginBottom: 8 }}>Frustrations</div>
                      <ul style={{ color: INK700, margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>{frustrations.map(f => <li key={f}>· {f}</li>)}</ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        />
      </Section>

      <Rule />

      {/* ── PAIRING FLOW ─────────────────────────────────────── */}
      <Section>
        <EditGrid
          left={
            <>
              <Tag>05 · The Pairing Flow</Tag>
              <h2 style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.2rem)", letterSpacing: "-0.025em", lineHeight: 1.2, color: INK900, margin: "18px 0 16px" }}>
                Six steps. One minute. Zero ambiguity.
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: INK500 }}>
                Each step has an explicit visual checkpoint: a blinking indicator, a 2.4 GHz check, a live timer.
              </p>
            </>
          }
          right={
            <div>
              {/* step strip */}
              <div style={{ overflowX: "auto", paddingBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 660 }}>
                  {[
                    { n: "01", label: "Tap +", sub: "Empty home", icon: <Plus style={{ width: 18, height: 18 }} />, bg: E100, fg: E700 },
                    { n: "02", label: "Reset device", sub: "Confirm blink", icon: <RotateCcw style={{ width: 18, height: 18 }} />, bg: E100, fg: E700 },
                    { n: "03", label: "2.4 GHz Wi-Fi", sub: "Pre-flight", icon: <Wifi style={{ width: 18, height: 18 }} />, bg: E100, fg: E700 },
                    { n: "04", label: "Pair (60s)", sub: "Progress ring", icon: <Clock style={{ width: 18, height: 18 }} />, bg: E100, fg: E700 },
                    { n: "05", label: "Success", sub: "Name & done", icon: <Check style={{ width: 18, height: 18 }} />, bg: `${OK500}26`, fg: OK700 },
                    { n: "06", label: "Control", sub: "Bottom sheet", icon: <Layers style={{ width: 18, height: 18 }} />, bg: INK900, fg: WHITE },
                  ].map(({ n, label, sub, icon, bg, fg }, i, arr) => (
                    <Fragment key={n}>
                      <div style={{ textAlign: "center", flex: 1 }}>
                        <div style={{ width: 44, height: 44, margin: "0 auto 10px", borderRadius: 12, background: bg, display: "grid", placeItems: "center", color: fg }}>{icon}</div>
                        <div style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: INK300, marginBottom: 2 }}>{n}</div>
                        <div style={{ fontWeight: 600, fontSize: 12, color: INK900 }}>{label}</div>
                        <div style={{ fontSize: 11, color: INK500, marginTop: 2 }}>{sub}</div>
                      </div>
                      {i < arr.length - 1 && <ArrowRight style={{ width: 16, height: 16, flexShrink: 0, color: E200 }} />}
                    </Fragment>
                  ))}
                </div>
              </div>

              {/* error note */}
              <div style={{ marginTop: 20, padding: "14px 16px", background: `${ERR500}0a`, border: `1px solid ${ERR500}20`, borderRadius: 12, display: "flex", alignItems: "center", gap: 12, fontSize: 13 }}>
                <AlertCircle style={{ width: 18, height: 18, color: ERR500, flexShrink: 0 }} />
                <span style={{ color: INK500 }}>
                  <strong style={{ color: INK900 }}>If step 04 times out:</strong> a modal lists three diagnostics: indicator state, 2.4 GHz, password, with a single Retry CTA. No dead ends.
                </span>
              </div>
            </div>
          }
        />
      </Section>

      <Rule />

      {/* ── DESIGN SYSTEM ────────────────────────────────────── */}
      <div style={{ background: INK50 }}>
        <Section>
          <EditGrid
            left={
              <>
                <Tag>06 · Design System</Tag>
                <h2 style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.2rem)", letterSpacing: "-0.025em", lineHeight: 1.2, color: INK900, margin: "18px 0 16px" }}>
                  Warm tech. Hard edges. Soft tone.
                </h2>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: INK500 }}>
                  A warm ember orange does the heavy lifting on every primary action, chosen to stand out against the neutral cool palette of most smart-home products.
                </p>
              </>
            }
            right={
              <div>
                {/* color swatches */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28, marginBottom: 28 }}>
                  {[
                    { title: "Primary · Ember", swatches: [["#FFF1EA","50"],["#FFC2A4","200"],["#F26B2C","500"],["#DC551A","600"],["#7E2B07","800"]] },
                    { title: "Neutral · Ink",   swatches: [["#F7F7F8","50"],["#D9D9DD","200"],["#5B5E66","500"],["#262830","700"],["#0F1014","900"]] },
                    { title: "State · ON / Error", swatches: [["#7BE8B0","ON lt"],["#2EE093","ON"],["#13A36A","ON dk"],["#EF4444","Err"]] },
                  ].map(({ title, swatches }) => (
                    <div key={title}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: INK900, marginBottom: 14 }}>{title}</div>
                      <div style={{ display: "grid", gridTemplateColumns: `repeat(${swatches.length},1fr)`, gap: 8 }}>
                        {swatches.map(([hex, label]) => (
                          <div key={hex}>
                            <div style={{ aspectRatio: "1/1", borderRadius: 10, background: hex, boxShadow: "inset 0 0 0 1px rgba(15,16,20,0.07)" }} />
                            <div style={{ fontSize: 11, color: INK500, marginTop: 6 }}>{label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* type + components */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div style={{ background: WHITE, border: `1px solid ${INK900}08`, borderRadius: 16, padding: 24 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: INK900, marginBottom: 20 }}>Typography</div>
                    <div style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontSize: 42, fontWeight: 700, lineHeight: 1, marginBottom: 6 }}>Aa</div>
                    <div style={{ fontSize: 12, color: INK500, marginBottom: 3 }}>Display · Space Grotesk</div>
                    <div style={{ fontSize: 11, color: INK300, marginBottom: 24, lineHeight: 1.5 }}>Headlines and big numbers.</div>
                    <div style={{ fontSize: 42, fontWeight: 600, lineHeight: 1, marginBottom: 6 }}>Aa</div>
                    <div style={{ fontSize: 12, color: INK500, marginBottom: 3 }}>UI · Inter</div>
                    <div style={{ fontSize: 11, color: INK300, lineHeight: 1.5 }}>Body, labels, list rows.</div>
                  </div>
                  <div style={{ background: WHITE, border: `1px solid ${INK900}08`, borderRadius: 16, padding: 24 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: INK900, marginBottom: 20 }}>Core components</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <button style={{ background: `linear-gradient(180deg,#FF7E48,${E500})`, color: WHITE, borderRadius: 12, height: 42, fontWeight: 600, fontSize: 13, width: "100%", border: "none", boxShadow: "0 10px 24px -8px rgba(242,107,44,0.45)", cursor: "default" }}>
                        Primary CTA · Add Device
                      </button>
                      <button style={{ background: INK900, color: WHITE, borderRadius: 12, height: 42, fontWeight: 600, fontSize: 13, width: "100%", border: "none", cursor: "default" }}>
                        Inverted · Stop Pairing
                      </button>
                      <button style={{ background: WHITE, color: INK700, borderRadius: 12, height: 42, fontWeight: 600, fontSize: 13, width: "100%", border: `1px solid ${INK100}`, cursor: "default" }}>
                        Ghost · Cancel
                      </button>
                      <div style={{ padding: "12px 14px", borderRadius: 12, background: INK50, border: `1px solid ${INK100}`, display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ width: 36, height: 36, borderRadius: 10, background: E100, display: "grid", placeItems: "center", color: E700, flexShrink: 0 }}>
                          <svg viewBox="0 0 24 24" style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="6" y="3" width="12" height="18" rx="3" /><circle cx="9.5" cy="11" r="1.2" fill="currentColor" /><circle cx="14.5" cy="11" r="1.2" fill="currentColor" /></svg>
                        </span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>Socket</div>
                          <div style={{ fontSize: 11, color: INK500 }}>Living Room · 4 devices</div>
                        </div>
                        <div style={{ width: 40, height: 24, borderRadius: 999, background: OK500, padding: 3, display: "flex", alignItems: "center" }}>
                          <div style={{ width: 18, height: 18, borderRadius: "50%", background: WHITE, marginLeft: "auto", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </Section>
      </div>

      {/* ── KEY SCREENS ──────────────────────────────────────── */}
      <div id="screens" style={{ maxWidth: "72rem", margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ marginBottom: 56 }}>
          <Tag>07 · Key Screens</Tag>
          <h2 style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: INK900, margin: "18px 0 0", maxWidth: 560 }}>
            Every screen, organized by what the user is trying to do.
          </h2>
        </div>

        {/* individual screen sections */}
        {[
          {
            id: "7.1", tag: "7.1 · Authentication", headline: "Get past the door, fast.",
            desc: "A short, mobile-first auth set: login, signup with inline validation, and a 4-digit OTP screen with an honest 60-second timer.",
            bullets: ["Login: orange CTA against a quiet screen", "Signup: inline validation, never blocks", "OTP: live 00:60 countdown, Resend code always visible"],
            phones: [
              { src: "/lumen/Login.png", alt: "Login", label: "Login" },
              { src: "/lumen/Sign Up.png", alt: "Sign Up", label: "Sign Up" },
              { src: "/lumen/OTP Verification.png", alt: "OTP", label: "OTP Verification" },
            ],
            layout: "three",
          },
          {
            id: "7.2", tag: "7.2 · First-time Setup", headline: "An empty home, with a way out.",
            desc: "Day-zero is the highest-stakes moment in any IoT app. The empty state earns its keep with an illustration, a one-line ask, and a dashed arrow pointing to the FAB.",
            bullets: ["Illustration says: we know it's empty, here's what to do", "Dashed arrow from illustration to the + FAB", "Create Home: house name, location, room defaults on one screen"],
            phones: [
              { src: "/lumen/Home.png", alt: "Empty home", label: "Empty Home" },
              { src: "/lumen/Home-1.png", alt: "First-run hint", label: "First-run Hint" },
              { src: "/lumen/Create Home.png", alt: "Create Home", label: "Create Home" },
            ],
            layout: "three",
          },
        ].map(({ id, tag, headline, desc, bullets, phones, layout }) => (
          <div key={id} style={{ marginBottom: 72, paddingBottom: 72, borderBottom: `1px solid ${INK900}0f` }}>
            <EditGrid
              left={
                <div style={{ position: "sticky", top: 76 }}>
                  <Tag>{tag}</Tag>
                  <h3 style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", letterSpacing: "-0.02em", lineHeight: 1.25, color: INK900, margin: "16px 0 14px" }}>{headline}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: INK500, marginBottom: 20 }}>{desc}</p>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {bullets.map(b => (
                      <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: INK500, lineHeight: 1.55 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: E500, flexShrink: 0, marginTop: 5 }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              }
              right={
                <div style={{ display: "flex", gap: 20 }}>
                  {phones.map(({ src, alt, label }) => (
                    <div key={label} style={{ flex: 1 }}>
                      <Phone src={src} alt={alt} />
                      <div style={{ marginTop: 10, fontFamily: "Space Grotesk, ui-sans-serif", fontSize: 11, fontWeight: 600, color: INK300, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{label}</div>
                    </div>
                  ))}
                </div>
              }
            />
          </div>
        ))}

        {/* 7.3 Pairing flow - full-width with scroll */}
        <div style={{ marginBottom: 72, paddingBottom: 72, borderBottom: `1px solid ${INK900}0f` }}>
          {/* header row */}
          <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "64px", marginBottom: 32 }}>
            <div>
              <Tag>7.3 · Pairing Flow</Tag>
              <h3 style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", letterSpacing: "-0.02em", lineHeight: 1.25, color: INK900, margin: "16px 0 0" }}>
                Five screens that turn IoT into AirPods.
              </h3>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: INK500, margin: 0 }}>
                The most important sequence. Every screen keeps the user oriented while a radio handshake happens behind the scenes.
              </p>
            </div>
          </div>

          {/* full-width scrollable phones */}
          <ScrollRow>
            <div style={{ display: "flex", gap: 24, minWidth: "min-content", paddingBottom: 4 }}>
              {[
                { src: "/lumen/reset device.png", alt: "Reset", label: "01 · Reset device", note: "Animated dot shows what blinking rapidly looks like." },
                { src: "/lumen/Connect screen.png", alt: "WiFi", label: "02 · 2.4 GHz Wi-Fi", note: "Pre-empts the #1 cause of pairing failure." },
                { src: "/lumen/Timer connecting deivces.png", alt: "Timer", label: "03 · Pair (60s)", note: "Live countdown ring, not a vague spinner." },
                { src: "/lumen/Error connecting.png", alt: "Error", label: "04 · Recover", note: "Three-cause modal. Always somewhere to go." },
                { src: "/lumen/Devicess.png", alt: "Success", label: "05 · Success", note: "Rename before you leave the flow." },
              ].map(s => (
                <div key={s.label} style={{ minWidth: 220, flex: "0 0 220px" }}>
                  <Phone src={s.src} alt={s.alt} />
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: INK900 }}>{s.label}</div>
                    <p style={{ fontSize: 12, color: INK500, marginTop: 4, lineHeight: 1.6 }}>{s.note}</p>
                  </div>
                </div>
              ))}
              <div style={{ flex: "0 0 40px", minWidth: 40 }} />
            </div>
          </ScrollRow>

          {/* pull quote */}
          <blockquote style={{ borderLeft: `3px solid ${E500}`, paddingLeft: 24, marginTop: 32 }}>
            <p style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontSize: 16, fontWeight: 500, lineHeight: 1.55, color: INK900, margin: 0 }}>
              "The hardest UX problem in IoT is not the happy path. It's the fourth screen. The one nobody designs for."
            </p>
            <footer style={{ fontSize: 13, color: INK500, marginTop: 10 }}>Design principle for the pairing flow</footer>
          </blockquote>
        </div>

        {/* 7.4 Daily home */}
        <div style={{ marginBottom: 72, paddingBottom: 72, borderBottom: `1px solid ${INK900}0f` }}>
          <EditGrid
            left={
              <div style={{ position: "sticky", top: 76 }}>
                <Tag>7.4 · Daily Home</Tag>
                <h3 style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", letterSpacing: "-0.02em", lineHeight: 1.25, color: INK900, margin: "16px 0 14px" }}>List of devices, and a quiet "off all".</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: INK500, marginBottom: 20 }}>Once devices exist, the home becomes a list. Each row is one tap to toggle; the overflow menu hides bulk actions for power users.</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {["Mint toggles signal this device is live", "Room tabs scope instantly to any space", "Switch Off All behind overflow, visible to power users, hidden from beginners"].map(b => (
                    <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: INK500, lineHeight: 1.55 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: E500, flexShrink: 0, marginTop: 5 }} />{b}
                    </li>
                  ))}
                </ul>
              </div>
            }
            right={
              <div style={{ display: "flex", gap: 24, justifyContent: "flex-start" }}>
                {[
                  { src: "/lumen/Home- listing devices.png", alt: "Devices listed", label: "Devices Listed" },
                  { src: "/lumen/Home- listing devices-1.png", alt: "Overflow menu", label: "Overflow Menu" },
                ].map(({ src, alt, label }) => (
                  <div key={label} style={{ width: "42%" }}>
                    <Phone src={src} alt={alt} />
                    <div style={{ marginTop: 10, fontFamily: "Space Grotesk, ui-sans-serif", fontSize: 11, fontWeight: 600, color: INK300, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{label}</div>
                  </div>
                ))}
              </div>
            }
          />
        </div>

        {/* 7.5 Device control */}
        <div style={{ marginBottom: 72, paddingBottom: 72, borderBottom: `1px solid ${INK900}0f` }}>
          <EditGrid
            left={
              <div style={{ position: "sticky", top: 76 }}>
                <Tag>7.5 · Device Control</Tag>
                <h3 style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", letterSpacing: "-0.02em", lineHeight: 1.25, color: INK900, margin: "16px 0 14px" }}>Bottom sheets, not new pages.</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: INK500, marginBottom: 20 }}>Tapping a device card opens a contextual sheet scaled to the device's controls, never an entire new screen for a single slider.</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {["Oversized power button, the only thing that matters for binary devices", "Tactile slider with real-time percentage readout", "Edit pencil for renaming, discoverable but never in the way"].map(b => (
                    <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: INK500, lineHeight: 1.55 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: E500, flexShrink: 0, marginTop: 5 }} />{b}
                    </li>
                  ))}
                </ul>
              </div>
            }
            right={
              <div style={{ display: "flex", gap: 24, justifyContent: "flex-start" }}>
                {[
                  { src: "/lumen/Device Control OFF.png", alt: "Power sheet", label: "Power · ON / OFF" },
                  { src: "/lumen/Device Control Regulator.png", alt: "Regulator", label: "Regulator · Dimmer" },
                ].map(({ src, alt, label }) => (
                  <div key={label} style={{ width: "42%" }}>
                    <Phone src={src} alt={alt} />
                    <div style={{ marginTop: 10, fontFamily: "Space Grotesk, ui-sans-serif", fontSize: 11, fontWeight: 600, color: INK300, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{label}</div>
                  </div>
                ))}
              </div>
            }
          />
        </div>

        {/* 7.6 Bulk management */}
        <div style={{ marginBottom: 72, paddingBottom: 72, borderBottom: `1px solid ${INK900}0f` }}>
          <EditGrid
            left={
              <div style={{ position: "sticky", top: 76 }}>
                <Tag>7.6 · Bulk Management</Tag>
                <h3 style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", letterSpacing: "-0.02em", lineHeight: 1.25, color: INK900, margin: "16px 0 14px" }}>For when one isn't enough.</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: INK500 }}>Power users live and die on bulk actions, hidden from first-timers but two taps away.</p>
              </div>
            }
            right={
              <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
                <div style={{ flex: "0 0 230px" }}>
                  <Phone src="/lumen/Device Managment.png" alt="Bulk device management" />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, paddingTop: 8 }}>
                  {[
                    { title: "Card-based multi-select", body: "Selection markers in the corner, readable from a thumb's distance." },
                    { title: "Sticky destructive footer", body: "Delete Device: red, pinned, only enabled while a card is selected." },
                    { title: "Same grid, different mode", body: "No separate edit-mode page. One mental model, two jobs." },
                  ].map(({ title, body }) => <InfoCard key={title} title={title} body={body} />)}
                </div>
              </div>
            }
          />
        </div>

        {/* 7.7 Automation */}
        <div style={{ marginBottom: 72, paddingBottom: 72, borderBottom: `1px solid ${INK900}0f` }}>
          <EditGrid
            left={
              <div style={{ position: "sticky", top: 76 }}>
                <Tag>7.7 · Automation & Scenes</Tag>
                <h3 style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", letterSpacing: "-0.02em", lineHeight: 1.25, color: INK900, margin: "16px 0 14px" }}>A second tab, for the "set it and forget it" life.</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: INK500 }}>Automations (event-triggered) and Tap-to-Run (manual scenes) live in their own tab, discoverable but separate from daily control.</p>
              </div>
            }
            right={
              <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
                <div style={{ flex: "0 0 230px" }}>
                  <Phone src="/lumen/Scene.png" alt="Automation / Scene" />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, paddingTop: 8 }}>
                  {[
                    { title: "Two pills, one tab", body: "Automation = if X then Y. Tap-to-Run = a scene you trigger manually." },
                    { title: "Helpful empty state", body: "A one-line value prop rather than a hollow 'No automations yet'." },
                    { title: "Same FAB pattern", body: "Orange + in the same corner, muscle memory transfers between tabs." },
                  ].map(({ title, body }) => <InfoCard key={title} title={title} body={body} />)}
                </div>
              </div>
            }
          />
        </div>

        {/* 7.8 Profile */}
        <div style={{ marginBottom: 0 }}>
          <EditGrid
            left={
              <div style={{ position: "sticky", top: 76 }}>
                <Tag>7.8 · Profile</Tag>
                <h3 style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", letterSpacing: "-0.02em", lineHeight: 1.25, color: INK900, margin: "16px 0 14px" }}>Account, integrations, support. In one quiet screen.</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: INK500 }}>Voice-assistant integrations sit above the fold, as they're a major reason people choose one IoT brand over another.</p>
              </div>
            }
            right={
              <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
                <div style={{ flex: "0 0 230px" }}>
                  <Phone src="/lumen/Profile.png" alt="Profile screen" />
                </div>
                <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, paddingTop: 8 }}>
                  {[
                    { title: "User card · orange CTA", body: "Edit is the only orange element. Focus where it counts." },
                    { title: "Third-party services first", body: "Google Assistant + Alexa as visible cards, not buried menus." },
                    { title: "Three settings rows", body: "Home Management, Message Centre, FAQ & Feedback. No clutter." },
                    { title: "Settings icon, top-right", body: "Present but not the headline. The gear never competes." },
                  ].map(({ title, body }) => <InfoCard key={title} title={title} body={body} />)}
                </div>
              </div>
            }
          />
        </div>
      </div>

      <Rule />

      {/* ── OUTCOMES ─────────────────────────────────────────── */}
      <Section>
        <EditGrid
          left={
            <>
              <Tag>08 · Outcomes</Tag>
              <h2 style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.2rem)", letterSpacing: "-0.025em", lineHeight: 1.2, color: INK900, margin: "18px 0 16px" }}>
                What changed once real plugs hit the room.
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: INK500 }}>
                Tested with 7 participants across two cohorts: 4 first-time IoT buyers and 3 power users. Results held across Android and iOS prototypes.
              </p>
            </>
          }
          right={
            <div>
              {/* big stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
                {[
                  { value: "47s", label: "Median time-to-pair, under the 60s ceiling.", bg: E500, valueColor: WHITE, labelColor: E100, border: "none" },
                  { value: "7/7", label: "Users who recovered from a forced pairing failure unaided.", bg: `${INK900}06`, valueColor: INK900, labelColor: INK500, border: `1px solid ${INK900}08` },
                  { value: "0",   label: "Users who tapped the wrong CTA on the empty home screen.", bg: `${INK900}06`, valueColor: OK700, labelColor: INK500, border: `1px solid ${INK900}08` },
                ].map(({ value, label, bg, valueColor, labelColor, border }, i) => (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, y: 28, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                    style={{ background: bg, border, borderRadius: 16, padding: "28px 24px" }}
                  >
                    <div style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: 52, letterSpacing: "-0.04em", lineHeight: 1, color: valueColor, marginBottom: 8 }}>{value}</div>
                    <div style={{ color: labelColor, fontSize: 13, lineHeight: 1.5 }}>{label}</div>
                  </motion.div>
                ))}
              </div>

              {/* what worked / what's next */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: WHITE, border: `1px solid ${INK900}08`, borderRadius: 16, padding: 24 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: INK900, marginBottom: 14 }}>What worked</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      "The 60s timer was cited as the moment trust kicked in.",
                      "2.4 GHz pre-flight prevented all expected router failures.",
                      "Bottom-sheet control preferred 7/7 over full-screen pages.",
                      "Power users found Switch Off All unprompted in 3/3 cases.",
                    ].map(s => (
                      <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: INK500, lineHeight: 1.55 }}>
                        <Check style={{ width: 13, height: 13, color: OK700, flexShrink: 0, marginTop: 2 }} />{s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ background: WHITE, border: `1px solid ${INK900}08`, borderRadius: 16, padding: 24 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: INK900, marginBottom: 14 }}>What I'd change next</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      "Add a multi-home switcher to the top-left dropdown.",
                      "Build a real scene authoring flow. The empty state implies polish that doesn't yet exist.",
                      "Surface a per-device signal-strength badge for early WiFi diagnosis.",
                      "Separate schedule-based automations from the overloaded + FAB.",
                    ].map(s => (
                      <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: INK500, lineHeight: 1.55 }}>
                        <ArrowRight style={{ width: 13, height: 13, color: E500, flexShrink: 0, marginTop: 2 }} />{s}
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
      <div style={{ borderTop: `1px solid ${INK900}0f` }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "56px 48px 64px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
          <div>
            <div style={{ fontFamily: "Space Grotesk, ui-sans-serif", fontWeight: 700, fontSize: 24, color: INK900, marginBottom: 6 }}>Building hardware that needs a soft touch?</div>
            <p style={{ color: INK500, fontSize: 15, lineHeight: 1.6, maxWidth: 480 }}>I design companion apps for connected products: IoT, wearables, fintech hardware. Always happy to talk through a brief.</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => navigate("/#contact")}
              style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 20px", background: `linear-gradient(180deg,#FF7E48,${E500})`, color: WHITE, borderRadius: 12, fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer", boxShadow: "0 12px 28px -8px rgba(242,107,44,0.45)" }}
            >
              Get in touch
            </button>
            <button
              onClick={() => navigate("/")}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 20px", background: WHITE, color: INK700, borderRadius: 12, fontWeight: 600, fontSize: 14, border: `1px solid ${INK900}12`, cursor: "pointer" }}
            >
              <ArrowLeft style={{ width: 14, height: 14 }} /> Back to Portfolio
            </button>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${INK900}08` }}>
          <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: INK300 }}>
            <span>Lumen · A Design Project by Muhammad Ahmed</span>
            <div style={{ display: "flex", gap: 20 }}>
              {["overview","screens","outcome"].map(s => (
                <a key={s} href={`#${s}`} style={{ color: INK300, textDecoration: "none", textTransform: "capitalize" as const }}
                  onMouseEnter={e => (e.currentTarget.style.color = INK900)}
                  onMouseLeave={e => (e.currentTarget.style.color = INK300)}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
