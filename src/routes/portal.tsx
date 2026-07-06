import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "RynexPortal · Coming soon" },
      { name: "description", content: "The Rynex client portal for engagement visibility and reporting is in development." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Portal,
});

function Portal() {
  return (
    <section className="relative mx-auto max-w-3xl px-6 py-40 text-center">
      <div className="aurora-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative">
        <div
          className="mx-auto grid h-16 w-16 place-items-center rounded-full"
          style={{
            border: "1px solid color-mix(in oklab, var(--color-primary) 40%, var(--color-border))",
            background: "color-mix(in oklab, var(--color-primary) 8%, transparent)",
          }}
        >
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <div className="mt-8 chip mx-auto fade-up">RynexPortal · Reserved</div>
        <h1 className="mt-6 font-display text-6xl">
          Client portal —<br />
          <span className="text-gradient">in development.</span>
        </h1>
        <p className="mt-6 text-muted-foreground">
          RynexPortal will give active clients live visibility into engagements, findings,
          and SOC alerts. Ships in Phase 3 alongside the shared authentication layer.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn-primary">
            Ask about early access
          </Link>
          <Link to="/" className="btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
