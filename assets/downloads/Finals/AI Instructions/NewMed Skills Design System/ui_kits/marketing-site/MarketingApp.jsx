/* NewMed Skills — marketing site UI kit. Attaches MarketingApp to window. */
const { Logo, Button, Eyebrow, StepFlow, Card, Stat, Badge, Orb, Input, Select, ArrowButton, ArrowHighlight, ArrowBadge } =
  window.NewMedSkillsDesignSystem_cd1078;

const wrap = { maxWidth: 1160, margin: "0 auto", padding: "0 40px" };

function Nav({ audience, setAudience, onBook }) {
  const link = { fontSize: 15, color: "var(--text-primary)", textDecoration: "none", fontWeight: 500 };
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(248,243,234,0.82)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border-subtle)" }}>
      <div style={{ ...wrap, display: "flex", alignItems: "center", justifyContent: "space-between", height: 74 }}>
        <Logo variant="horizontal" size={24} />
        <nav style={{ display: "flex", gap: 30, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 4, background: "var(--nm-cream-2)", padding: 4, borderRadius: 999 }}>
            {["candidates", "hospitals"].map((a) => (
              <button key={a} onClick={() => setAudience(a)} style={{
                border: "none", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 600,
                padding: "7px 16px", borderRadius: 999, textTransform: "capitalize",
                background: audience === a ? "var(--color-bg-raised)" : "transparent",
                color: audience === a ? "var(--text-primary)" : "var(--text-secondary)",
                boxShadow: audience === a ? "var(--shadow-xs)" : "none",
              }}>For {a}</button>
            ))}
          </div>
          <a href="#" style={link}>How it works</a>
          <a href="#" style={link}>About</a>
          <ArrowButton size="sm" onClick={onBook}>Book a call</ArrowButton>
        </nav>
      </div>
    </header>
  );
}

const COPY = {
  candidates: {
    eyebrow: "For healthcare professionals",
    head: ["Take your career ", "across borders.", ""],
    sub: "You trained for years and passed the exams. We handle everything else — licensing, visa, placement — so paperwork is never the reason you don't go.",
    cta: "Start your application",
    stats: [["4–6 wks", "DataFlow verification", true], ["6", "stages, one team", false], ["0", "hidden fees", false]],
  },
  hospitals: {
    eyebrow: "For hospitals & HR teams",
    head: ["", "Workforce-ready talent.", " Not a stack of CVs."],
    sub: "Hiring nurses shouldn't take six months. We send you candidates who are already screened, licensed, and ready to contribute from day one.",
    cta: "Talk to our team",
    stats: [["1:3", "Offer-to-hire ratio", true], ["6 mo", "cut to weeks", false], ["100%", "DataFlow-cleared", false]],
  },
};

function GlobeGlyph({ size = "1em" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
    </svg>
  );
}

function Hero({ audience, onBook }) {
  const c = COPY[audience];
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <Orb tone="coral" size={720} style={{ position: "absolute", right: -240, top: -260 }} />
      <Orb tone="amber" size={420} style={{ position: "absolute", left: -180, bottom: -240, opacity: 0.7 }} />
      <div style={{ ...wrap, position: "relative", paddingTop: 96, paddingBottom: 80 }}>
        <div style={{ position: "absolute", right: 40, bottom: 0, width: 340, height: 520, zIndex: 1 }}>
          <image-slot key={audience} id={"hero-cutout-" + audience} shape="rect" fit="cover"
            src={audience === "candidates" ? "../../assets/photos/nurse-newmed-hijab.png" : "../../assets/photos/nurse-paperwork-orange.png"}
            placeholder="Drop cutout — healthcare professional PNG (transparent bg)"></image-slot>
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 780 }}>
        <ArrowBadge size={34}>{c.eyebrow}</ArrowBadge>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 58, lineHeight: 1.08, letterSpacing: "-0.025em", margin: "22px 0 20px", maxWidth: 780, color: "var(--heading-color)" }}>
          {c.head[0]}<ArrowHighlight icon={<GlobeGlyph />}>{c.head[1]}</ArrowHighlight>{c.head[2]}
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.55, color: "var(--text-secondary)", maxWidth: 560, margin: "0 0 32px" }}>{c.sub}</p>
        <div style={{ display: "flex", gap: 14, marginBottom: 56 }}>
          <ArrowButton size="lg" onClick={onBook}>{c.cta}</ArrowButton>
          <ArrowButton size="lg" outline>See how it works</ArrowButton>
        </div>
        <div style={{ display: "flex", gap: 52 }}>
          {c.stats.map(([v, l, a]) => <Stat key={l} value={v} label={l} accent={a} />)}
        </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <div style={{ borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", background: "var(--color-bg-raised)" }}>
      <div style={{ ...wrap, display: "flex", alignItems: "center", gap: 28, height: 72, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}>Compliant with</span>
        {["DHA", "SCFHS", "Prometric", "DataFlow"].map((n) => (
          <span key={n} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--text-primary)", opacity: 0.7 }}>{n}</span>
        ))}
      </div>
    </div>
  );
}

function Journey() {
  return (
    <section style={{ ...wrap, paddingTop: 88, paddingBottom: 88 }}>
      <div style={{ maxWidth: 620, marginBottom: 44 }}>
        <Eyebrow>The path</Eyebrow>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 40, letterSpacing: "-0.02em", lineHeight: 1.08, margin: "14px 0 14px", color: "var(--heading-color)" }}>One team, from sourcing to retention.</h2>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: "var(--text-secondary)", margin: 0 }}>We manage the whole workforce journey. You always know which stage you're at.</p>
      </div>
      <StepFlow active={3} />
    </section>
  );
}

function Values() {
  const items = [
    ["Screened before you see them", "Every candidate clears DataFlow, licensing, and clinical screening first — because readiness is the point."],
    ["Faster hiring", "Requisition to first shift in weeks, not months — because screening is already done."],
    ["Retention built in", "Ongoing professional development keeps early-stage exits from eroding your investment."],
  ];
  return (
    <section style={{ background: "var(--color-bg-raised)", borderTop: "1px solid var(--border-subtle)" }}>
      <div style={{ ...wrap, paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {items.map(([h, p]) => (
            <Card key={h} padding={28} interactive>
              <Badge tone="coral" style={{ marginBottom: 16 }}>Ready</Badge>
              <h3 style={{ fontSize: 21, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.2, color: "var(--heading-color)" }}>{h}</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.55, color: "var(--text-secondary)", margin: 0 }}>{p}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABand({ onBook }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--nm-ink)" }}>
      <Orb tone="coral" size={560} style={{ position: "absolute", right: -160, bottom: -300, opacity: 0.5 }} />
      <div style={{ ...wrap, position: "relative", paddingTop: 76, paddingBottom: 76, textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 42, letterSpacing: "-0.02em", color: "var(--nm-cream)", margin: "0 auto 14px", maxWidth: 620, lineHeight: 1.08 }}>We're here to get you across the border.</h2>
        <p style={{ fontSize: 18, color: "rgba(248,243,234,0.7)", margin: "0 auto 30px", maxWidth: 480 }}>A short call. We'll tell you plainly what your path looks like.</p>
        <ArrowButton size="lg" onClick={onBook}>Book a call</ArrowButton>
      </div>
    </section>
  );
}

function Footer() {
  const col = { display: "flex", flexDirection: "column", gap: 10 };
  const link = { fontSize: 14, color: "var(--text-secondary)", textDecoration: "none" };
  return (
    <footer style={{ background: "var(--color-bg-raised)", borderTop: "1px solid var(--border-subtle)" }}>
      <div style={{ ...wrap, paddingTop: 52, paddingBottom: 40, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
        <div style={{ maxWidth: 300 }}>
          <Logo variant="horizontal" size={22} />
          <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.55, marginTop: 16 }}>Healthcare workforce readiness and deployment across the GCC and international markets.</p>
        </div>
        <div style={{ display: "flex", gap: 64 }}>
          <div style={col}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Platform</span>
            <a href="#" style={link}>How it works</a><a href="#" style={link}>For candidates</a><a href="#" style={link}>For hospitals</a>
          </div>
          <div style={col}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Company</span>
            <a href="#" style={link}>About</a><a href="#" style={link}>Contact</a><a href="#" style={link}>Careers</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function BookModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(57,30,26,0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--color-bg-raised)", borderRadius: "var(--radius-lg)", padding: 32, width: 440, maxWidth: "100%", boxShadow: "var(--shadow-lg)" }}>
        <Eyebrow>Book a call</Eyebrow>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, letterSpacing: "-0.02em", margin: "10px 0 20px", color: "var(--heading-color)" }}>Tell us where you're starting.</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Input label="Full name" placeholder="Priya Nair" />
          <Input label="Work email" placeholder="you@hospital.org" />
          <Select label="I am a…" options={["Healthcare professional", "Hospital / HR team"]} />
          <Button fullWidth size="lg" onClick={onClose}>Request a call</Button>
        </div>
      </div>
    </div>
  );
}

function MarketingApp() {
  const [audience, setAudience] = React.useState("candidates");
  const [modal, setModal] = React.useState(false);
  return (
    <div style={{ background: "var(--nm-cream)", color: "var(--text-primary)", minHeight: "100vh", fontFamily: "var(--font-sans)" }}>
      <Nav audience={audience} setAudience={setAudience} onBook={() => setModal(true)} />
      <Hero audience={audience} onBook={() => setModal(true)} />
      <TrustBar />
      <Journey />
      <Values />
      <CTABand onBook={() => setModal(true)} />
      <Footer />
      <BookModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}
window.MarketingApp = MarketingApp;
