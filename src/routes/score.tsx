import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { runScoreScan, submitScoreLead, type ScoreResult, type CheckStatus } from "@/lib/score.functions";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Activity, ArrowRight, CheckCircle2, AlertTriangle, XCircle, Loader2, Lock } from "lucide-react";

export const Route = createFileRoute("/score")({
  head: () => ({
    meta: [
      { title: "RynexScore · Free security grade for your domain" },
      {
        name: "description",
        content:
          "Run a free, passive security scan of any domain — SPF/DMARC, TLS, and HTTP hardening headers. Get a letter grade in seconds.",
      },
      { property: "og:title", content: "RynexScore · Free security grade" },
      {
        property: "og:description",
        content: "Grade your external attack surface in 30 seconds. No agents, no logins.",
      },
    ],
  }),
  component: ScorePage,
});

function ScorePage() {
  const scan = useServerFn(runScoreScan);
  const submitLead = useServerFn(submitScoreLead);

  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onScan(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!domain.trim()) return;
    setLoading(true);
    setResult(null);
    setUnlocked(false);
    try {
      const r = await scan({ data: { domain } });
      setResult(r);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Scan failed.");
    } finally {
      setLoading(false);
    }
  }

  async function onUnlock(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!result) return;
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      await submitLead({
        data: {
          email: String(fd.get("email") || ""),
          companyName: String(fd.get("company") || "") || undefined,
          result,
        },
      });
      setUnlocked(true);
      toast.success("Detailed report unlocked.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Toaster />
      <section className="relative border-b border-border/70">
        <div className="aurora-bg pointer-events-none absolute inset-0 opacity-50" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-16">
          <div className="chip">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-primary text-primary" />
            RynexScore · v1
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-6xl md:text-7xl">
            Grade your attack surface —<br />
            <span className="text-gradient">free, in 30 seconds.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Passive, non-intrusive checks against SPF/DMARC, TLS, and HTTP hardening headers.
            No agents, no logins, no touching your infrastructure.
          </p>

          <form onSubmit={onScan} className="mt-12 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <div
              className="flex flex-1 items-center gap-3 rounded-full border bg-surface-1/70 px-6"
              style={{ borderColor: "color-mix(in oklab, var(--color-primary) 35%, var(--color-border))" }}
            >
              <span className="font-mono text-sm text-primary">https://</span>
              <input
                autoFocus
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="w-full bg-transparent py-4 font-mono text-base text-foreground outline-none placeholder:text-muted-foreground/50"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Scanning...</>
              ) : (
                <><Activity className="h-4 w-4" /> Run scan</>
              )}
            </button>
          </form>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Passive · read-only · complete in ~10s
          </p>
        </div>
      </section>

      {loading && <ScanningState domain={domain} />}
      {result && !loading && (
        <ResultView
          result={result}
          unlocked={unlocked}
          onUnlock={onUnlock}
          submitting={submitting}
        />
      )}

      {!result && !loading && <BeforeScanInfo />}
    </>
  );
}

function BeforeScanInfo() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mono-caps text-muted-foreground fade-up">What we check</div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          {
            n: "01",
            title: "Email authentication",
            body: "SPF, DMARC, MX. Are attackers able to spoof mail from your domain?",
          },
          {
            n: "02",
            title: "TLS transport",
            body: "Certificate validity and HTTP → HTTPS redirect hygiene at the edge.",
          },
          {
            n: "03",
            title: "Browser hardening",
            body: "HSTS, CSP, X-Frame-Options, referrer & MIME sniffing controls.",
          },
        ].map((s, i) => (
          <div
            key={s.n}
            className="panel p-6 hover-lift fade-up"
            style={{ animationDelay: `${0.05 + i * 0.08}s` }}
          >
            <div className="mono-caps text-primary">{s.n}</div>
            <div className="mt-2 font-mono text-lg">{s.title}</div>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>

      {/* Scoring model — replaces the previously empty placeholder box */}
      <div className="mt-16 grid gap-10 md:grid-cols-[1.05fr_1fr] md:items-start">
        <div className="fade-up">
          <div className="mono-caps text-muted-foreground">Scoring model</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            A letter grade you can <span className="text-gradient">actually act on.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Each check contributes weighted points across authentication, transport, and
            browser hardening. Findings roll up into a single letter grade so engineering
            and leadership see the same picture — no dashboards to interpret.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-foreground/90">
            <li className="tick-marker">Passive, read-only — nothing sent to your infrastructure.</li>
            <li className="tick-marker">Evidence attached to every finding, not just a score.</li>
            <li className="tick-marker">Prioritised remediation, ranked by real exploit impact.</li>
          </ul>
        </div>

        <div className="panel p-8 fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="space-y-4">
            {[
              { label: "A", range: "90 – 100", note: "Hardened. Publish it." },
              { label: "B", range: "75 – 89", note: "Solid — a few small gaps." },
              { label: "C", range: "60 – 74", note: "Meaningful weaknesses." },
              { label: "D", range: "45 – 59", note: "Attackers will notice." },
              { label: "F", range: "0 – 44", note: "Do not wait." },
            ].map((g) => (
              <div
                key={g.label}
                className="flex items-center gap-5 border-b border-border/60 pb-4 last:border-0 last:pb-0"
              >
                <div
                  className="grid h-14 w-14 place-items-center font-display text-2xl text-primary"
                  style={{
                    border:
                      "1px solid color-mix(in oklab, var(--color-primary) 40%, var(--color-border))",
                    background: "color-mix(in oklab, var(--color-primary) 8%, transparent)",
                  }}
                >
                  {g.label}
                </div>
                <div className="flex-1">
                  <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    {g.range}
                  </div>
                  <div className="mt-1 text-foreground">{g.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-report deliverables — replaces the empty dashed placeholder */}
      <div className="mt-16">
        <div className="mono-caps text-muted-foreground fade-up">Inside the full report</div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Engineer-readable findings",
              body: "Every gap comes with the exact header, record, or config to change — with copy-pasteable evidence.",
            },
            {
              title: "Risk-ranked remediation",
              body: "Fixes ordered by real exploit impact, not scanner severity. Ship the high-value ones this sprint.",
            },
            {
              title: "Re-scan verification",
              body: "Re-run the scan after remediation to confirm the grade moves. Free, unlimited, no logins.",
            },
          ].map((s, i) => (
            <div
              key={s.title}
              className="panel p-6 hover-lift fade-up"
              style={{ animationDelay: `${0.05 + i * 0.08}s` }}
            >
              <div className="font-mono text-base text-foreground">{s.title}</div>
              <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScanningState({ domain }: { domain: string }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <div className="panel p-8">
        <div className="mono-caps text-primary">scanning · {domain}</div>
        <div className="mt-6 space-y-3 font-mono text-sm">
          <ScanLine label="dns · SPF / DMARC / MX" delay={0} />
          <ScanLine label="tls · certificate chain · redirects" delay={0.3} />
          <ScanLine label="http · security headers" delay={0.6} />
        </div>
      </div>
    </section>
  );
}

function ScanLine({ label, delay }: { label: string; delay: number }) {
  return (
    <div className="flex items-center gap-3 text-muted-foreground" style={{ animationDelay: `${delay}s` }}>
      <Loader2 className="h-4 w-4 animate-spin text-primary" />
      <span>{label}</span>
      <div className="ml-auto flex gap-1">
        <span className="h-1 w-1 rounded-full bg-primary/70 live-dot" />
      </div>
    </div>
  );
}

const gradeColor: Record<ScoreResult["grade"], string> = {
  A: "text-gradient",
  B: "text-gradient",
  C: "text-warning",
  D: "text-accent",
  F: "text-destructive",
};

const statusIcon: Record<CheckStatus, React.ComponentType<{ className?: string }>> = {
  pass: CheckCircle2,
  partial: AlertTriangle,
  fail: XCircle,
  error: XCircle,
};

const statusColor: Record<CheckStatus, string> = {
  pass: "text-success",
  partial: "text-warning",
  fail: "text-accent",
  error: "text-destructive",
};

function ResultView({
  result,
  unlocked,
  onUnlock,
  submitting,
}: {
  result: ScoreResult;
  unlocked: boolean;
  onUnlock: (e: React.FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      {/* Grade card */}
      <div className="panel-glow grid gap-8 p-10 md:grid-cols-[280px_1fr] md:p-12">
        <div className="flex flex-col items-start">
          <div className="mono-caps text-muted-foreground">Grade</div>
          <div className={`mt-3 font-display text-[10rem] leading-[0.85] text-glow ${gradeColor[result.grade]}`}>
            {result.grade}
          </div>
          <div className="mt-3 font-display text-3xl text-foreground">
            {result.score}
            <span className="text-lg text-muted-foreground">/100</span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mono-caps text-muted-foreground">scanned</div>
          <div className="mt-1 font-mono text-lg text-foreground">{result.domain}</div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {result.checks.map((c) => {
              const Icon = statusIcon[c.status];
              return (
                <div key={c.name} className="border border-border bg-background/40 p-4">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${statusColor[c.status]}`} />
                    <span className="mono-caps text-muted-foreground">{c.status}</span>
                  </div>
                  <div className="mt-2 font-mono text-sm text-foreground">{c.name}</div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            {result.grade === "A" || result.grade === "B"
              ? "Solid posture. Read the full breakdown to see where the marginal gains are."
              : "There are meaningful gaps below. Unlock the full report to see exact findings and how to fix them."}
          </p>
        </div>
      </div>

      {/* Detail — locked or unlocked */}
      <div className="mt-8">
        <div className="flex items-end justify-between border-b border-border pb-4">
          <div>
            <div className="mono-caps text-primary">detailed findings</div>
            <h2 className="mt-2 font-mono text-2xl">Check breakdown</h2>
          </div>
          {!unlocked && (
            <div className="mono-caps text-muted-foreground">
              <Lock className="mr-1.5 inline h-3.5 w-3.5" /> Locked
            </div>
          )}
        </div>

        <div className="relative mt-6">
          <div className={unlocked ? "" : "pointer-events-none blur-[6px] select-none"} aria-hidden={!unlocked}>
            <div className="space-y-4">
              {result.checks.map((c) => {
                const Icon = statusIcon[c.status];
                return (
                  <div key={c.name} className="panel p-6">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${statusColor[c.status]}`} />
                      <h3 className="font-mono text-lg">{c.name}</h3>
                      <span className={`ml-auto mono-caps ${statusColor[c.status]}`}>{c.status}</span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{c.summary}</p>
                    <ul className="mt-5 space-y-2">
                      {c.findings.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 border-l-2 pl-3"
                          style={{
                            borderColor: f.ok
                              ? "var(--color-primary)"
                              : "var(--color-accent)",
                          }}
                        >
                          <div className="flex-1">
                            <div className="font-mono text-sm text-foreground">
                              {f.label}{" "}
                              <span className={`font-mono text-[11px] uppercase tracking-widest ${f.ok ? "text-primary" : "text-accent"}`}>
                                {f.ok ? "· pass" : "· gap"}
                              </span>
                            </div>
                            {f.detail && (
                              <div className="mt-1 text-xs text-muted-foreground">{f.detail}</div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {!unlocked && (
            <div className="absolute inset-0 grid place-items-center">
              <form onSubmit={onUnlock} className="panel-glow w-full max-w-lg p-10">
                <div className="chip">Unlock report</div>
                <h3 className="mt-4 font-display text-3xl">See the full findings</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  We'll email the engineer-readable breakdown for {result.domain} and notify
                  our team so we can help you close the gaps if you want.
                </p>
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="mono-caps text-muted-foreground">Work email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="mt-2 w-full rounded-md border border-input bg-background/60 px-4 py-3 font-mono text-sm text-foreground focus:border-primary focus:outline-none"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="mono-caps text-muted-foreground">Company (optional)</label>
                    <input
                      name="company"
                      defaultValue={result.domain.split(".")[0].replace(/^./, (c) => c.toUpperCase())}
                      className="mt-2 w-full rounded-md border border-input bg-background/60 px-4 py-3 font-mono text-sm text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary mt-6 w-full justify-center disabled:opacity-60"
                >
                  {submitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Unlocking...</>
                  ) : (
                    <>Reveal full report <ArrowRight className="h-4 w-4" /></>
                  )}
                </button>
                <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  One email · no mailing list · unsubscribe any time
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
