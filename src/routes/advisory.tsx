import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/advisory")({
  head: () => ({
    meta: [
      { title: "Advisory · Rynex Security" },
      {
        name: "description",
        content:
          "Coordinated disclosure and advisory services from the Rynex Security intel team.",
      },
      { property: "og:title", content: "Advisory · Rynex Security" },
      { property: "og:description", content: "Coordinated disclosure and advisory services." },
    ],
  }),
  component: Advisory,
});

function Advisory() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-24 pb-28">
      <div className="chip fade-up">Advisory</div>
      <h1 className="mt-6 max-w-4xl font-display text-5xl md:text-6xl">Coordinated disclosure and advisory</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Our advisory practice pairs vulnerability disclosure with remediation guidance
        and detection advice. If you have a security finding you'd like to disclose,
        please use our contact form and mark the submission as an advisory.
      </p>
    </section>
  );
}
