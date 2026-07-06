import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Radar,
  ShieldCheck,
  Swords,
  Terminal,
  Activity,
  Cpu,
  Cloud,
  Fingerprint,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

const capabilities = [
  {
    icon: Swords,
    tag: "01 · OFFENSIVE",
    title: "Red Teaming",
    body: "Full-scope adversary simulation: people, process, and physical. We reach the crown jewels the way real intruders do.",
  },
  {
    icon: Cpu,
    tag: "02 · APPSEC",
    title: "Web & API Pentest",
    body: "Manual, chained-exploit testing of enterprise applications and APIs. Written for engineers, not compliance decks.",
  },
  {
    icon: Cloud,
    tag: "03 · CLOUD",
    title: "Cloud Security",
    body: "AWS, GCP, and Azure configuration review with continuous drift detection. IAM refactor to shrink blast radius.",
  },
  {
    icon: Fingerprint,
    tag: "04 · REVIEW",
    title: "Secure Code Review",
    body: "Static + human review of critical repos. We flag the CVE-shaped holes before they ship to production.",
  },
  {
    icon: Radar,
    tag: "05 · DEFENSIVE",
    title: "24/7 SOC & Detection",
    body: "Real analysts, tuned detections, honest paging. Deployed on your existing SIEM, EDR, and cloud logs.",
  },
  {
    icon: ShieldCheck,
    tag: "06 · STRATEGIC",
    title: "Advisory & Hardening",
    body: "Architecture review, purple team programs, and secure SDLC embedded until the change actually ships.",
  },
] as const;

const trusted = [
  "NORTHWIND", "ORION LABS", "AEGIS FINANCIAL", "HELIX CLOUD",
  "STRATOS", "MERIDIAN", "CIPHER MED", "NOVA GRID",
];

const stats = [
  { k: "127", v: "Engagements delivered" },
  { k: "4.6h", v: "Median alert triage" },
  { k: "38", v: "0-day disclosures published" },
  { k: "0", v: "Breaches on active SOC" },
];

function Home() {
  return (
    <>
      {/* HERO — cinematic centered */}
      <section className="relative overflow-hidden border-b border-border/70">
        <div className="aurora-bg pointer-events-none absolute inset-0" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />

        <div className="scanlines-bg pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-32 text-center">
          <div className="mx-auto chip fade-up">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-primary text-primary" />
            Global Threat Defense
          </div>

          <div className="fade-up mt-8 font-heritage text-xs italic tracking-[0.35em] text-muted-foreground/80" style={{ animationDelay: "0.04s" }}>
            ~ Rynex Security · Vigilantia Perpetua ~
          </div>

          <h1 className="fade-up mx-auto mt-4 max-w-5xl font-display text-[clamp(3rem,9vw,7.5rem)]" style={{ animationDelay: "0.08s" }}>
            <span className="block text-foreground">Securing The</span>
            <span className="block text-gradient text-glow">Digital Frontier.</span>
          </h1>

          <p className="fade-up mx-auto mt-8 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: "0.16s" }}>
            Professional offensive security engineering, adversarial simulation, and 24/7
            SOC coverage for organizations that demand military-grade defense.
          </p>

          <div className="fade-up mt-12 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "0.22s" }}>
            <Link to="/score" className="btn-primary">
              Get RynexScore <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to="/services" className="btn-ghost">
              View Capabilities
            </Link>
          </div>

          {/* Small terminal preview inline */}
          <div className="fade-up mx-auto mt-20 max-w-3xl" style={{ animationDelay: "0.3s" }}>
            <div className="panel-glow scan-beam relative text-left">
              <div className="flex items-center justify-between border-b border-border/60 bg-surface-2/60 px-5 py-3">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  <Terminal className="h-3.5 w-3.5" />
                  rynexscore · secure_session_0xA1F3
                </div>
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </div>
              </div>
              <div className="p-7 font-mono text-sm">
                <div className="text-muted-foreground">
                  <span className="text-primary">rynex</span>@ops:~$ score --target <span className="text-foreground">acme.com</span>
                </div>
                <div className="mt-4 space-y-1.5 text-foreground/85">
                  <div><span className="text-success">[✓]</span> DNS · SPF present, DMARC p=reject</div>
                  <div><span className="text-success">[✓]</span> TLS · valid chain · HSTS enabled</div>
                  <div><span className="text-accent">[!]</span> Headers · missing CSP, X-Frame-Options</div>
                </div>
                <div className="mt-6 grid grid-cols-3 items-end gap-4 border-t border-border/50 pt-5">
                  <div>
                    <div className="mono-caps text-muted-foreground">Grade</div>
                    <div className="mt-1 font-display text-6xl text-gradient text-glow">B</div>
                  </div>
                  <div>
                    <div className="mono-caps text-muted-foreground">Score</div>
                    <div className="mt-1 font-display text-3xl">78<span className="text-muted-foreground text-lg">/100</span></div>
                  </div>
                  <div className="text-right">
                    <div className="mono-caps text-muted-foreground">Duration</div>
                    <div className="mt-1 font-mono text-lg text-foreground">08.2s</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="border-b border-border/70 bg-surface-1/40">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="text-center mono-caps text-muted-foreground/70">
            Trusted by security teams across
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
            {trusted.map((t) => (
              <span
                key={t}
                className="font-display text-xl tracking-[0.2em] text-muted-foreground/60 transition hover:text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES GRID */}
      <section className="relative mx-auto max-w-7xl px-6 py-28">
        <div className="max-w-3xl">
          <div className="chip">Global Capabilities</div>
          <h2 className="mt-6 font-display text-5xl md:text-6xl">
            Six disciplines. <span className="text-gradient">One team you can page.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Our methodology follows international standards — OSSTMM, PTES, NIST, and the
            MITRE ATT&amp;CK framework — delivered by senior operators, not scanners.
          </p>
        </div>

        <div className="mt-14 grid gap-px bg-border/70 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((s) => (
            <div
              key={s.title}
              className="group relative flex flex-col bg-background p-8 transition hover:bg-surface-1/60"
            >
              <div className="flex items-center justify-between">
                <div
                  className="grid h-11 w-11 place-items-center border border-border transition group-hover:border-primary/50"
                  style={{
                    background: "color-mix(in oklab, var(--color-primary) 8%, transparent)",
                  }}
                >
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="mono-caps text-muted-foreground">{s.tag}</div>
              </div>
              <h3 className="mt-8 font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
              <Link
                to="/services"
                className="mt-8 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-primary opacity-70 transition group-hover:opacity-100"
              >
                Explore capability <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* STATS BAND */}
      <section className="relative border-y border-border/70">
        <div className="aurora-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden bg-border/70 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.v} className="bg-background/80 p-10 backdrop-blur">
              <div className="font-display text-6xl text-gradient text-glow">{s.k}</div>
              <div className="mt-3 text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SCORE PROMO */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-14 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <div className="chip">RynexScore v1</div>
            <h2 className="mt-6 font-display text-5xl md:text-6xl">
              Your attack surface,<br />
              <span className="text-gradient">graded in 30 seconds.</span>
            </h2>
            <p className="mt-6 text-muted-foreground">
              RynexScore runs passive, non-intrusive checks against any domain — no agents,
              no permissions, no touching your infrastructure. Get a letter grade in the
              browser and a full engineer-readable breakdown by email.
            </p>

            <ul className="mt-10 space-y-3 text-sm text-foreground/90">
              <li className="tick-marker">Email authentication — SPF, DKIM, DMARC posture</li>
              <li className="tick-marker">TLS transport — certificate validity &amp; redirect hygiene</li>
              <li className="tick-marker">Browser hardening — CSP, HSTS, frame &amp; MIME controls</li>
            </ul>

            <div className="mt-10">
              <Link to="/score" className="btn-primary">
                <Activity className="h-4 w-4" /> Scan my domain
              </Link>
            </div>
          </div>

          <div className="panel hover-lift p-8">
            <div className="mono-caps text-muted-foreground">scoring model</div>
            <div className="mt-6 space-y-4">
              {[
                { label: "A", range: "90 – 100", note: "Hardened. Publish it." },
                { label: "B", range: "75 – 89", note: "Solid — a few small gaps." },
                { label: "C", range: "60 – 74", note: "Meaningful weaknesses." },
                { label: "D", range: "45 – 59", note: "Attackers will notice." },
                { label: "F", range: "0 – 44", note: "Do not wait." },
              ].map((g) => (
                <div key={g.label} className="flex items-center gap-5 border-b border-border/60 pb-4 last:border-0 last:pb-0">
                  <div
                    className="grid h-14 w-14 place-items-center font-display text-2xl text-primary"
                    style={{
                      border: "1px solid color-mix(in oklab, var(--color-primary) 40%, var(--color-border))",
                      background: "color-mix(in oklab, var(--color-primary) 8%, transparent)",
                    }}
                  >
                    {g.label}
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{g.range}</div>
                    <div className="mt-1 text-foreground">{g.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-28">
        <div className="panel-glow relative overflow-hidden p-12 md:p-16">
          <div className="aurora-bg pointer-events-none absolute inset-0 opacity-60" />
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
            <div>
              <div className="chip">Engage</div>
              <h3 className="mt-6 max-w-2xl font-display text-4xl md:text-5xl">
                Ready for a real conversation about your <span className="text-gradient">security posture?</span>
              </h3>
              <p className="mt-5 max-w-xl text-muted-foreground">
                Scope a red team engagement, add SOC coverage, or ask us anything. We reply
                within one business hour.
              </p>
            </div>
            <Link to="/contact" className="btn-primary shrink-0">
              Contact the team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
