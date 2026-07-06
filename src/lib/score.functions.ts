import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// ── Types ────────────────────────────────────────────────────────────────────
export type CheckStatus = "pass" | "partial" | "fail" | "error";

export interface CheckDetail {
  name: string;
  status: CheckStatus;
  score: number; // 0..1
  summary: string;
  findings: { label: string; ok: boolean; detail?: string }[];
}

export interface ScoreResult {
  domain: string;
  grade: "A" | "B" | "C" | "D" | "F";
  score: number; // 0..100
  checks: CheckDetail[];
  scannedAt: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function normalizeDomain(input: string): string | null {
  let s = input.trim().toLowerCase();
  if (!s) return null;
  s = s.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(s)) return null;
  return s;
}

async function dohQuery(name: string, type: "TXT" | "MX" | "A"): Promise<string[]> {
  try {
    const res = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`,
      { headers: { accept: "application/dns-json" } },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { Answer?: { data: string }[] };
    return (data.Answer ?? []).map((a) => a.data.replace(/^"|"$/g, "").replace(/"\s*"/g, ""));
  } catch {
    return [];
  }
}

async function checkEmailRecords(domain: string): Promise<CheckDetail> {
  const [txt, mx, dmarc] = await Promise.all([
    dohQuery(domain, "TXT"),
    dohQuery(domain, "MX"),
    dohQuery(`_dmarc.${domain}`, "TXT"),
  ]);

  const spf = txt.find((r) => r.toLowerCase().startsWith("v=spf1"));
  const dmarcRec = dmarc.find((r) => r.toLowerCase().startsWith("v=dmarc1"));
  const hasMx = mx.length > 0;

  const spfStrong = spf ? /(-all|~all)\s*$/i.test(spf) : false;
  const dmarcPolicy = dmarcRec ? /p=(reject|quarantine)/i.exec(dmarcRec)?.[1] : undefined;
  const dmarcStrong = dmarcPolicy === "reject" || dmarcPolicy === "quarantine";

  const findings = [
    {
      label: "SPF record",
      ok: !!spf,
      detail: spf
        ? spfStrong
          ? `Present with strict enforcement (${spf.match(/[-~]all/)?.[0]}).`
          : "Present, but does not end with -all or ~all — spoofers may still deliver."
        : "No SPF record found. Attackers can spoof mail from your domain.",
    },
    {
      label: "DMARC policy",
      ok: dmarcStrong,
      detail: dmarcRec
        ? `Policy p=${dmarcPolicy ?? "none"}. ${
            dmarcStrong ? "Enforced." : "Monitor-only — spoofed mail is not blocked."
          }`
        : "No DMARC record at _dmarc." + domain + ". Email spoofing goes undetected.",
    },
    {
      label: "MX records",
      ok: hasMx,
      detail: hasMx ? `${mx.length} MX record${mx.length > 1 ? "s" : ""} configured.` : "No MX records — domain does not receive mail.",
    },
  ];

  const passed = findings.filter((f) => f.ok).length;
  const score = passed / findings.length;
  const status: CheckStatus = score === 1 ? "pass" : score >= 0.5 ? "partial" : "fail";

  return {
    name: "Email security records",
    status,
    score,
    summary:
      status === "pass"
        ? "SPF, DMARC, and mail routing are properly configured."
        : status === "partial"
        ? "Some email authentication controls are missing or weak."
        : "Email authentication is largely absent — high spoofing risk.",
    findings,
  };
}

async function checkTls(domain: string): Promise<CheckDetail> {
  let ok = false;
  let redirects = false;
  let httpOnlyStatus: number | null = null;

  try {
    const res = await fetch(`https://${domain}/`, {
      method: "GET",
      redirect: "manual",
      signal: AbortSignal.timeout(8000),
    });
    ok = true;
    redirects = res.status >= 300 && res.status < 400;
  } catch {
    ok = false;
  }

  try {
    const res = await fetch(`http://${domain}/`, {
      method: "GET",
      redirect: "manual",
      signal: AbortSignal.timeout(6000),
    });
    httpOnlyStatus = res.status;
  } catch {
    httpOnlyStatus = null;
  }

  const httpRedirects =
    httpOnlyStatus !== null && httpOnlyStatus >= 300 && httpOnlyStatus < 400;

  const findings = [
    {
      label: "Valid HTTPS certificate",
      ok,
      detail: ok
        ? "HTTPS handshake succeeded with a valid, trusted certificate chain."
        : "HTTPS request failed — certificate may be invalid, expired, or the host is unreachable.",
    },
    {
      label: "HTTP → HTTPS redirect",
      ok: httpRedirects || (httpOnlyStatus === null && ok),
      detail:
        httpOnlyStatus === null
          ? "Plain HTTP is unreachable — traffic cannot downgrade."
          : httpRedirects
          ? "Plain HTTP requests are redirected to HTTPS."
          : `Plain HTTP responds with ${httpOnlyStatus} — users can browse unencrypted.`,
    },
  ];

  const passed = findings.filter((f) => f.ok).length;
  const score = passed / findings.length;
  const status: CheckStatus = score === 1 ? "pass" : score >= 0.5 ? "partial" : "fail";

  return {
    name: "TLS / SSL configuration",
    status,
    score,
    summary:
      status === "pass"
        ? "Certificate is valid and transport is encrypted end-to-end."
        : status === "partial"
        ? "Certificate works but transport hygiene is incomplete."
        : "TLS could not be verified — connection may be insecure or unreachable.",
    findings,
  };
}

const REQUIRED_HEADERS: { header: string; label: string; why: string }[] = [
  { header: "strict-transport-security", label: "Strict-Transport-Security", why: "Locks browsers to HTTPS to block downgrade attacks." },
  { header: "content-security-policy", label: "Content-Security-Policy", why: "Limits which scripts and origins can execute on your pages." },
  { header: "x-frame-options", label: "X-Frame-Options", why: "Blocks clickjacking via hostile iframes." },
  { header: "x-content-type-options", label: "X-Content-Type-Options", why: "Prevents MIME sniffing that can turn uploads into scripts." },
  { header: "referrer-policy", label: "Referrer-Policy", why: "Controls how much URL data leaks to third parties." },
];

async function checkHeaders(domain: string): Promise<CheckDetail> {
  let headers: Headers | null = null;
  try {
    const res = await fetch(`https://${domain}/`, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });
    headers = res.headers;
  } catch {
    return {
      name: "HTTP security headers",
      status: "error",
      score: 0,
      summary: "Could not fetch the site to inspect headers.",
      findings: REQUIRED_HEADERS.map((h) => ({
        label: h.label,
        ok: false,
        detail: "Not evaluated — request failed.",
      })),
    };
  }

  const findings = REQUIRED_HEADERS.map((h) => {
    const value = headers!.get(h.header);
    return {
      label: h.label,
      ok: !!value,
      detail: value ? `Present · ${value.slice(0, 90)}${value.length > 90 ? "…" : ""}` : h.why,
    };
  });

  const passed = findings.filter((f) => f.ok).length;
  const score = passed / findings.length;
  const status: CheckStatus =
    score >= 0.8 ? "pass" : score >= 0.4 ? "partial" : "fail";

  return {
    name: "HTTP security headers",
    status,
    score,
    summary:
      status === "pass"
        ? "Modern browser-hardening headers are in place."
        : status === "partial"
        ? "Some hardening headers are missing — reduce defense-in-depth."
        : "Response is missing critical browser-hardening headers.",
    findings,
  };
}

function toGrade(score: number): ScoreResult["grade"] {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 45) return "D";
  return "F";
}

// ── Public server function: run scan (no lead capture) ───────────────────────
export const runScoreScan = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({ domain: z.string().min(3).max(253) }).parse(data),
  )
  .handler(async ({ data }): Promise<ScoreResult> => {
    const domain = normalizeDomain(data.domain);
    if (!domain) throw new Error("Please enter a valid domain (example.com).");

    const [email, tls, headers] = await Promise.all([
      checkEmailRecords(domain),
      checkTls(domain),
      checkHeaders(domain),
    ]);

    const checks = [email, tls, headers];
    const score = Math.round(
      (checks.reduce((sum, c) => sum + c.score, 0) / checks.length) * 100,
    );
    const grade = toGrade(score);

    return {
      domain,
      grade,
      score,
      checks,
      scannedAt: new Date().toISOString(),
    };
  });

// ── Lead capture (email-gated detail view) ───────────────────────────────────
export const submitScoreLead = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        email: z.string().email("Enter a valid email address."),
        companyName: z.string().max(200).optional(),
        result: z.object({
          domain: z.string(),
          grade: z.string(),
          score: z.number(),
          checks: z.array(z.any()),
          scannedAt: z.string(),
        }),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("leads" as never).insert({
      email: data.email,
      company_name: data.companyName ?? null,
      domain: data.result.domain,
      grade: data.result.grade,
      score: data.result.score,
      results: data.result,
      source: "score",
    } as never);

    if (error) {
      console.error("Failed to store lead", error);
      throw new Error("We couldn't record that submission. Please try again.");
    }

    // Fire-and-forget Discord notification (optional)
    const webhook = process.env.DISCORD_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            username: "RynexScore",
            embeds: [
              {
                title: `New RynexScore lead · ${data.result.domain}`,
                color: 0x00d494,
                fields: [
                  { name: "Email", value: data.email, inline: true },
                  {
                    name: "Company",
                    value: data.companyName || "—",
                    inline: true,
                  },
                  { name: "Grade", value: data.result.grade, inline: true },
                  {
                    name: "Score",
                    value: `${data.result.score} / 100`,
                    inline: true,
                  },
                ],
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });
      } catch (e) {
        console.warn("Discord webhook failed", e);
      }
    }

    return { ok: true as const };
  });
