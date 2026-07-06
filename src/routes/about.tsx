import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Rynex Security" },
      {
        name: "description",
        content:
          "Rynex Security is a small, senior team of offensive and defensive operators. Meet the people behind the engagements.",
      },
      { property: "og:title", content: "About · Rynex Security" },
      {
        property: "og:description",
        content:
          "A small, senior team of offensive and defensive security operators.",
      },
    ],
  }),
  component: About,
});

const team = [
  {
    name: "Elena Voss",
    role: "Founder · Offensive Lead",
    bio: "12 years in adversary simulation. Ex-BlackHat trainer. OSCE³, CRTO. Loves painful Kerberos edge-cases.",
    certs: ["OSCP", "OSCE³", "CRTO"],
  },
  {
    name: "Marcus Idowu",
    role: "SOC Lead",
    bio: "Ran detection engineering at two Fortune 500 SOCs. GCFA, GNFA. Believes alerts should page a human or die.",
    certs: ["GCFA", "GNFA", "GCIH"],
  },
  {
    name: "Priya Rangan",
    role: "Cloud & AppSec Principal",
    bio: "AWS/GCP architect turned attacker. Publishes IAM-abuse research. Speaks fluent Terraform.",
    certs: ["OSWE", "CKS"],
  },
  {
    name: "Jonas Weiss",
    role: "Incident Response",
    bio: "First-responder on 40+ ransomware incidents. Believes the runbook is a lie until you've used it.",
    certs: ["GCFA", "GREM"],
  },
] as const;

const principles = [
  {
    title: "Manual over automated.",
    body: "Scanners are a starting line. Every finding we ship was reproduced by a human who can explain the fix.",
  },
  {
    title: "Small on purpose.",
    body: "We stay senior-only so the person you scoped with is the person doing the work — not a subcontractor.",
  },
  {
    title: "Answer the pager.",
    body: "If we said 24/7, we mean it. Incidents don't get triaged to a queue and forgotten.",
  },
  {
    title: "Reports engineers can act on.",
    body: "Findings include exact reproduction steps, patch guidance, and detection ideas — not just CVSS scores.",
  },
];

function About() {
  return (
    <>
      <section className="relative border-b border-border/70">
        <div className="aurora-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20">
          <div className="chip">About</div>
          <h1 className="mt-6 max-w-4xl font-display text-6xl md:text-7xl">
            A small, senior team of<br />
            <span className="text-gradient">security operators.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Rynex Security was founded in 2019 to fix a pattern we saw across the industry:
            beautifully-formatted pentest reports full of scanner output that nobody could
            act on. Everything we do — offensive, defensive, advisory — is delivered by
            senior practitioners.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="chip">Operating principles</div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {principles.map((p, i) => (
            <div key={p.title} className="panel hover-lift p-8">
              <div className="font-display text-xl text-gradient">0{i + 1}</div>
              <h3 className="mt-4 font-display text-2xl">{p.title}</h3>
              <p className="mt-3 text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28">
        <div className="chip">Team</div>
        <h2 className="mt-6 font-display text-4xl md:text-5xl">
          The people you'll <span className="text-gradient">actually work with.</span>
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {team.map((m) => (
            <div key={m.name} className="panel flex items-start gap-5 p-7">
              <div
                className="grid h-16 w-16 shrink-0 place-items-center font-display text-2xl text-gradient"
                style={{
                  border: "1px solid color-mix(in oklab, var(--color-primary) 40%, var(--color-border))",
                  background: "color-mix(in oklab, var(--color-primary) 8%, transparent)",
                }}
              >
                {m.name.split(" ").map((s) => s[0]).join("")}
              </div>
              <div className="flex-1">
                <div className="font-display text-xl">{m.name}</div>
                <div className="mono-caps text-primary">{m.role}</div>
                <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {m.certs.map((c) => (
                    <span
                      key={c}
                      className="border border-border bg-background/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
