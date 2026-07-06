import { createFileRoute, Link } from "@tanstack/react-router";
import { Swords, Radar, ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services · VAPT, SOC & Advisory · Rynex Security" },
      {
        name: "description",
        content:
          "Rynex delivers penetration testing, red team, 24/7 SOC monitoring, and security advisory engagements built for engineering teams.",
      },
      { property: "og:title", content: "Rynex Security · Services" },
      {
        property: "og:description",
        content:
          "Offensive security, 24/7 SOC, and hardening engagements. See what we do.",
      },
    ],
  }),
  component: Services,
});

const services = [
  {
    icon: Swords,
    tag: "01 · Offensive",
    title: "VAPT & Red Team",
    lead: "Adversary simulation, from the perimeter to the crown jewels.",
    body: "Every engagement is scoped and manually driven. We chain findings the way real intruders do — no scanner-in-a-suit reports.",
    points: [
      "External & internal network penetration testing",
      "Web, API, and mobile application assessments",
      "Cloud (AWS / GCP / Azure) configuration review",
      "Full-scope red team with C2 tradecraft & OPSEC",
    ],
  },
  {
    icon: Radar,
    tag: "02 · Defensive",
    title: "24/7 SOC & Detection Engineering",
    lead: "Real analysts, tuned detections, honest paging.",
    body: "We deploy on your existing stack (SIEM, EDR, cloud logs), write detections that fire on behavior — not vendor buzzwords — and stay on the line during incidents.",
    points: [
      "Continuous monitoring with analyst-in-the-loop triage",
      "Detection engineering for MITRE ATT&CK coverage",
      "Incident response retainer with defined SLAs",
      "Weekly tuning reports — no dashboards left to rot",
    ],
  },
  {
    icon: ShieldCheck,
    tag: "03 · Strategic",
    title: "Advisory & Hardening",
    lead: "Embed with the team until the change actually ships.",
    body: "We work alongside your engineers on architecture, IAM, secure SDLC, and compliance-adjacent hardening. Deliverables are pull requests, not slide decks.",
    points: [
      "Cloud & Kubernetes architecture review",
      "Identity, IAM, and secrets hygiene",
      "Purple team programs & tabletop exercises",
      "SOC 2 / ISO 27001 technical readiness support",
    ],
  },
] as const;

function Services() {
  return (
    <>
      <section className="relative border-b border-border/70">
        <div className="aurora-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20">
          <div className="chip">Capabilities</div>
          <h1 className="mt-6 max-w-4xl font-display text-6xl md:text-7xl">
            Offensive. Defensive.<br />
            <span className="text-gradient">Strategic.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            We deliberately keep the practice narrow: three lines of work, all staffed by
            senior operators. No juniors shadowing the engagement, no white-labeled
            subcontractors, no compliance-only pentests.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="space-y-6">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="panel grid gap-8 p-10 md:grid-cols-[240px_1fr] md:p-12"
            >
              <div>
                <s.icon className="h-9 w-9 text-primary" />
                <div className="mt-6 mono-caps text-muted-foreground">{s.tag}</div>
                <div className="mt-2 font-display text-3xl">{s.title}</div>
                <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  0{i + 1} / 03
                </div>
              </div>
              <div>
                <p className="text-xl text-foreground">{s.lead}</p>
                <p className="mt-4 text-muted-foreground">{s.body}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li key={p} className="tick-marker text-sm text-foreground/90">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-border/70 pt-10 md:flex-row md:items-center">
          <p className="max-w-lg text-muted-foreground">
            Not sure which engagement fits? Start with a free RynexScore, or talk to us —
            we'll say so if you don't need us yet.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/score" className="btn-primary">
              Run RynexScore <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Scope an engagement
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
