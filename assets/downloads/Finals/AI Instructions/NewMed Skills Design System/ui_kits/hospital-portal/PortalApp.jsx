/* NewMed Skills — hospital workforce portal UI kit. Attaches PortalApp to window. */
const { Logo, Symbol, Button, IconButton, Input, Badge, Tag, Card, Stat, ProgressBar, Avatar, Eyebrow, StepFlow } =
  window.NewMedSkillsDesignSystem_cd1078;

const STAGES = ["Source", "Assess", "Develop", "Certify", "Deploy", "Retain"];
const CANDIDATES = [
  { name: "Priya Nair", role: "ICU nurse", loc: "Kochi → Riyadh", stage: 3, license: "SCFHS", pct: 62, tags: ["ICU", "5 yrs"] },
  { name: "Joseph Mathew", role: "Theatre nurse", loc: "Manila → Dubai", stage: 4, license: "DHA", pct: 78, tags: ["OR", "Night"] },
  { name: "Amara Okafor", role: "Radiographer", loc: "Lagos → Doha", stage: 2, license: "Prometric", pct: 34, tags: ["Allied"] },
  { name: "Ravi Kumar", role: "ER nurse", loc: "Chennai → Abu Dhabi", stage: 5, license: "DHA", pct: 96, tags: ["ER", "6 yrs"] },
  { name: "Sara Haddad", role: "Midwife", loc: "Amman → Riyadh", stage: 1, license: "SCFHS", pct: 18, tags: ["Maternity"] },
  { name: "Grace Wanjiru", role: "Ward nurse", loc: "Nairobi → Dubai", stage: 3, license: "DHA", pct: 58, tags: ["Med-surg"] },
];
const stageTone = ["neutral", "amber", "amber", "teal", "coral", "success"];

function Sidebar({ view, setView }) {
  const items = [["pipeline", "Pipeline"], ["candidates", "Candidates"], ["requisitions", "Requisitions"], ["compliance", "Compliance"], ["reports", "Reports"]];
  return (
    <aside style={{ width: 232, flexShrink: 0, background: "var(--nm-ink)", color: "var(--nm-cream)", display: "flex", flexDirection: "column", padding: "22px 16px", height: "100%", boxSizing: "border-box" }}>
      <div style={{ padding: "4px 8px 24px" }}><Logo variant="horizontal" size={20} color="var(--nm-cream)" /></div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map(([k, label]) => (
          <button key={k} onClick={() => setView(k)} style={{
            textAlign: "left", border: "none", cursor: "pointer", fontFamily: "var(--font-sans)",
            fontSize: 14.5, fontWeight: 500, padding: "11px 14px", borderRadius: "var(--radius-sm)",
            background: view === k ? "rgba(255,255,255,0.1)" : "transparent",
            color: view === k ? "var(--nm-cream)" : "rgba(248,243,234,0.6)",
          }}>{label}</button>
        ))}
      </nav>
      <div style={{ marginTop: "auto", padding: 14, background: "rgba(255,255,255,0.06)", borderRadius: "var(--radius-md)" }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>King Faisal Hospital</div>
        <div style={{ fontSize: 12.5, color: "rgba(248,243,234,0.55)" }}>Riyadh · Enterprise</div>
      </div>
    </aside>
  );
}

function Topbar({ onOpen }) {
  return (
    <div style={{ height: 66, borderBottom: "1px solid var(--border-subtle)", background: "var(--color-bg-raised)", display: "flex", alignItems: "center", gap: 16, padding: "0 28px" }}>
      <div style={{ flex: 1, maxWidth: 360 }}>
        <Input placeholder="Search candidates, requisitions…" iconLeft={<span>⌕</span>} />
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
        <Button size="sm" onClick={onOpen}>New requisition</Button>
        <IconButton variant="ghost" aria-label="Notifications">◔</IconButton>
        <Avatar name="You" size="sm" />
      </div>
    </div>
  );
}

function StatRow() {
  const s = [["48", "Active candidates", true], ["12", "Ready to deploy", false], ["4–6 wks", "Avg. time to license", false], ["96%", "Retention at 12 mo", false]];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 26 }}>
      {s.map(([v, l, a]) => <Card key={l} padding={20}><Stat value={v} label={l} accent={a} /></Card>)}
    </div>
  );
}

function CandidateCard({ c, onClick }) {
  return (
    <Card padding={16} interactive style={{ cursor: "pointer" }} onClick={onClick}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <Avatar name={c.name} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{c.role}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        <Badge tone="ink">{c.license}</Badge>
        {c.tags.map((t) => <Badge key={t} tone="neutral">{t}</Badge>)}
      </div>
      <ProgressBar value={c.pct} label={STAGES[c.stage]} showValue />
    </Card>
  );
}

function Pipeline({ onSelect }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <Eyebrow>Workforce pipeline</Eyebrow>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, letterSpacing: "-0.02em", margin: "8px 0 0", color: "var(--heading-color)" }}>Every candidate, every stage.</h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Tag active>All</Tag><Tag>Nursing</Tag><Tag>Allied health</Tag>
        </div>
      </div>
      <StatRow />
      <div style={{ marginBottom: 22 }}><StepFlow active={3} /></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {CANDIDATES.map((c) => <CandidateCard key={c.name} c={c} onClick={() => onSelect(c)} />)}
      </div>
    </div>
  );
}

function Drawer({ c, onClose }) {
  if (!c) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(57,30,26,0.35)", backdropFilter: "blur(3px)", display: "flex", justifyContent: "flex-end" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 440, maxWidth: "92%", height: "100%", background: "var(--nm-cream)", boxShadow: "var(--shadow-lg)", padding: 28, overflowY: "auto", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <Avatar name={c.name} size="lg" />
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--font-display)", letterSpacing: "-0.01em", color: "var(--heading-color)" }}>{c.name}</div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)" }}>{c.role} · {c.loc}</div>
            </div>
          </div>
          <IconButton variant="ghost" aria-label="Close" onClick={onClose}>×</IconButton>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "18px 0 22px" }}>
          <Badge tone={stageTone[c.stage]} dot>{STAGES[c.stage]}</Badge>
          <Badge tone="ink">{c.license}</Badge>
          {c.tags.map((t) => <Badge key={t} tone="neutral">{t}</Badge>)}
        </div>
        <Card padding={20} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>Readiness</div>
          <ProgressBar value={c.pct} label="Overall completion" showValue />
          <div style={{ display: "flex", gap: 28, marginTop: 18 }}>
            <Stat value={STAGES[c.stage]} label="Current stage" />
            <Stat value={c.license} label="Licensing body" accent />
          </div>
        </Card>
        <Card padding={20} style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>Compliance</div>
          {[["Degree & transcripts", "Verified"], ["DataFlow", c.pct > 40 ? "Verified" : "In progress"], ["Home-country license", "Verified"], ["Visa", c.stage >= 4 ? "Issued" : "Pending"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border-subtle)", fontSize: 14.5 }}>
              <span>{k}</span>
              <Badge tone={v === "Verified" || v === "Issued" ? "success" : "amber"} dot>{v}</Badge>
            </div>
          ))}
        </Card>
        <div style={{ display: "flex", gap: 12 }}>
          <Button fullWidth>Advance stage</Button>
          <Button variant="outline" fullWidth>Message</Button>
        </div>
      </div>
    </div>
  );
}

function Placeholder({ title }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 420, gap: 14, textAlign: "center" }}>
      <div style={{ opacity: 0.3 }}><Symbol size={56} /></div>
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, margin: 0, color: "var(--heading-color)" }}>{title}</h2>
      <p style={{ color: "var(--text-secondary)", margin: 0, maxWidth: 320 }}>This view is part of the product. The pipeline is the interactive demo.</p>
    </div>
  );
}

function PortalApp() {
  const [view, setView] = React.useState("pipeline");
  const [sel, setSel] = React.useState(null);
  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--nm-cream)", color: "var(--text-primary)", fontFamily: "var(--font-sans)", overflow: "hidden" }}>
      <Sidebar view={view} setView={setView} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar onOpen={() => {}} />
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 60px" }}>
          {view === "pipeline"
            ? <Pipeline onSelect={setSel} />
            : <Placeholder title={{ candidates: "Candidates", requisitions: "Requisitions", compliance: "Compliance", reports: "Reports" }[view]} />}
        </div>
      </div>
      <Drawer c={sel} onClose={() => setSel(null)} />
    </div>
  );
}
window.PortalApp = PortalApp;
