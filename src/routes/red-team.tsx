import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/red-team")({
  head: () => ({
    meta: [
      { title: "Red Team · Rynex Security" },
      {
        name: "description",
        content:
          "Rynex Security red team engagements simulate real threat actors to test detection and response.",
      },
      { property: "og:title", content: "Red Team · Rynex Security" },
      {
        property: "og:description",
        content:
          "Realistic adversary simulation, tradecraft, and detection testing from Rynex Security.",
      },
    ],
  }),
  component: RedTeam,
});

function RedTeam() {
  return (
    <section className="relative mx-auto max-w-4xl px-6 py-28">
      <div className="chip fade-up">Red Team</div>
      <div className="mt-8 flex items-center gap-4 text-foreground/90">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <div className="font-display text-4xl">Adversary simulation that defeats detection assumptions.</div>
      </div>
      <p className="mt-8 text-lg text-muted-foreground">
        Our red team engagements are built to expose gaps in people, process, and tooling. We exercise end-to-end attack paths,
        chain findings across environments, and validate whether your team and SOC can detect real tradecraft.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="panel hover-lift p-8">
          <h2 className="font-display text-2xl">Goals</h2>
          <ul className="mt-4 space-y-3 text-sm text-foreground/90">
            <li>Expose control failures across network, identity, and application layers.</li>
            <li>Validate detection logic under real operator techniques.</li>
            <li>Test incident response workflows and escalation paths.</li>
          </ul>
        </div>
        <div className="panel hover-lift p-8">
          <h2 className="font-display text-2xl">Deliverables</h2>
          <ul className="mt-4 space-y-3 text-sm text-foreground/90">
            <li>High-fidelity attack narrative with adversary tradecraft mapped to MITRE ATT&CK.</li>
            <li>Detection gaps, priority findings, and practical remediation guidance.</li>
            <li>Operational after-action recommendations for SOC and IR teams.</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/contact" className="btn-primary">Talk to a Red Team lead</Link>
        <Link to="/services" className="btn-ghost">See services overview</Link>
      </div>
    </section>
  );
}
