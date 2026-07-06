import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitContact } from "@/lib/contact.functions";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Mail, MapPin, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · Rynex Security" },
      {
        name: "description",
        content:
          "Scope a pentest, add SOC coverage, or send us a responsible-disclosure report. Rynex Security replies in-hour.",
      },
      { property: "og:title", content: "Contact · Rynex Security" },
      {
        property: "og:description",
        content: "Scope an engagement or report a disclosure. We reply in-hour.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const send = useServerFn(submitContact);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSending(true);
    try {
      await send({
        data: {
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          company: String(fd.get("company") || "") || undefined,
          message: String(fd.get("message") || ""),
        },
      });
      setSent(true);
      toast.success("Message received. We'll reply within one business hour.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Toaster />
      <section className="relative border-b border-border/70">
        <div className="aurora-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20">
          <div className="chip">Contact</div>
          <h1 className="mt-6 max-w-4xl font-display text-6xl md:text-7xl">
            Tell us what you're<br />
            <span className="text-gradient">worried about.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Scope a pentest, add SOC coverage, or send a responsible-disclosure report.
            Every message hits our sales channel instantly — a senior engineer replies
            within one business hour.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1fr_1.4fr]">
        <aside className="space-y-6">
          <div className="panel hover-lift p-6">
            <Mail className="h-5 w-5 text-primary" />
            <div className="mt-3 mono-caps text-muted-foreground">general</div>
            <div className="mt-1 font-mono">hello@rynex.security</div>
          </div>
          <div className="panel hover-lift p-6">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <div className="mt-3 mono-caps text-muted-foreground">disclosure</div>
            <div className="mt-1 font-mono">security@rynex.security</div>
            <p className="mt-2 text-xs text-muted-foreground">
              PGP key on request. 90-day coordinated disclosure.
            </p>
          </div>
          <div className="panel hover-lift p-6">
            <MapPin className="h-5 w-5 text-primary" />
            <div className="mt-3 mono-caps text-muted-foreground">operations</div>
            <div className="mt-1 font-mono">Remote-first · EU + NA coverage</div>
          </div>
        </aside>

        <div className="panel hover-lift p-8 md:p-10">
          {sent ? (
            <div className="flex flex-col items-start gap-4">
              <div className="chip">Received</div>
              <h2 className="font-display text-3xl">Message queued to the SOC channel.</h2>
              <p className="text-muted-foreground">
                A senior engineer will reply from a real inbox within one business hour.
                For active incidents, forward this receipt to security@rynex.security.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="name" label="Name" required />
                <Field name="email" label="Work email" required type="email" />
              </div>
              <Field name="company" label="Company (optional)" />
              <div>
                <label className="mono-caps text-muted-foreground">Message</label>
                <textarea
                  name="message"
                  required
                  minLength={10}
                  rows={6}
                  className="mt-2 w-full rounded-md border border-input bg-background/60 px-4 py-3 font-mono text-sm text-foreground focus:border-primary focus:outline-none"
                  placeholder="Scope, timelines, or what you're worried about..."
                />
              </div>
              <button type="submit" disabled={sending} className="btn-primary disabled:opacity-60">
                {sending ? "Transmitting..." : "Send message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Field({
  name,
  label,
  required,
  type = "text",
}: {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="mono-caps text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-md border border-input bg-background/60 px-4 py-3 font-mono text-sm text-foreground focus:border-primary focus:outline-none"
      />
    </div>
  );
}
