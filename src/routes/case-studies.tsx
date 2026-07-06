import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies · Rynex Security" },
      {
        name: "description",
        content:
          "Sanitized summaries of recent Rynex Security engagements — red team, SOC, and cloud hardening.",
      },
      { property: "og:title", content: "Case Studies · Rynex Security" },
      {
        property: "og:description",
        content: "Real engagements, sanitized. Attack path, impact, remediation.",
      },
    ],
  }),
  component: CaseStudies,
});

const cases = [
  {
    sector: "Fintech · Series C",
    duration: "3 weeks · red team",
    title: "Domain admin from a forgotten JIRA link",
    summary:
      "External red team scoped to the corporate perimeter. Chained a leaked JIRA attachment → SSO token replay → on-prem AD compromise in nine days.",
    impact: [
      "Full DA in an environment that had passed two prior pentests",
      "3 previously-unknown SaaS tokens exposed on public internet",
      "12 detections written from the engagement now shipping in the client SOC",
    ],
  },
  {
    sector: "Healthcare · 800 beds",
    duration: "Retainer · SOC + IR",
    title: "Ransomware pre-cursor caught at hour six",
    summary:
      "Custom detection for anomalous SMB share enumeration fired on a foothold. Analysts isolated, contained, and eradicated the operator before staging began.",
    impact: [
      "0 encrypted endpoints, 0 hours of clinical downtime",
      "Root cause traced to a stale VPN account (12 months post-departure)",
      "Client's cyber insurance premium renegotiated based on IR log",
    ],
  },
  {
    sector: "SaaS · public",
    duration: "6 weeks · cloud hardening",
    title: "AWS blast-radius cut by 74%",
    summary:
      "IAM refactor plus organization-wide SCP rollout. Removed 231 unused permissions across 42 accounts without breaking a single deploy pipeline.",
    impact: [
      "Estimated blast radius of any single compromised principal reduced 74%",
      "Cross-account role sprawl reduced from 118 to 24",
      "New guardrails wired into Terraform CI — regressions blocked at PR",
    ],
  },
] as const;

function CaseStudies() {
  return (
    <>
      <section className="relative border-b border-border/70">
        <div className="aurora-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20">
          <div className="chip">Case studies</div>
          <h1 className="mt-6 max-w-4xl font-display text-6xl md:text-7xl">
            Sanitized engagements.<br />
            <span className="text-gradient">Real attack paths.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Client details are redacted, but the tradecraft is not. Every case study below
            is drawn from a real Rynex engagement in the last 18 months.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="space-y-6">
          {cases.map((c, i) => (
            <article
              key={c.title}
              className="panel grid gap-8 p-10 md:grid-cols-[240px_1fr] md:gap-12 md:p-12"
            >
              <div>
                <div className="font-display text-3xl text-gradient">
                  Case 0{i + 1}
                </div>
                <div className="mt-5 font-mono text-sm text-foreground">{c.sector}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{c.duration}</div>
              </div>
              <div>
                <h3 className="font-display text-3xl">{c.title}</h3>
                <p className="mt-4 text-muted-foreground">{c.summary}</p>
                <div className="mt-8 mono-caps text-muted-foreground">Impact</div>
                <ul className="mt-4 space-y-2.5">
                  {c.impact.map((p) => (
                    <li key={p} className="tick-marker text-sm text-foreground/90">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 border border-dashed border-border bg-surface-1/40 p-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Additional references available under mutual NDA on request.
        </div>
      </section>
    </>
  );
}
