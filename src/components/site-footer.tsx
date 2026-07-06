import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/70">
      <div className="relative overflow-hidden">
        <div className="aurora-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/rynex-logo.png" alt="Rynex Security" className="h-10 w-10 object-contain" />
              <div className="font-heritage text-2xl tracking-[0.14em]">
                Rynex Security
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Offensive security, detection engineering, and 24/7 SOC for
              organizations that treat security as an operating discipline —
              not a checkbox.
            </p>
            <p className="mt-4 font-heritage italic text-xs tracking-[0.2em] text-muted-foreground/70">
              — Vigilantia · Since MMXXIV —
            </p>
            <div className="mt-8 chip">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-primary text-primary" />
              SOC · Operational
            </div>
          </div>

          <div>
            <h4 className="mono-caps text-muted-foreground">Practice</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/red-team" className="text-foreground/80 transition hover:text-foreground">Red Team</Link></li>
              <li><Link to="/pentest-vapt" className="text-foreground/80 transition hover:text-foreground">Pentest & VAPT</Link></li>
              <li><Link to="/services" className="text-foreground/80 transition hover:text-foreground">24/7 SOC</Link></li>
              <li><Link to="/advisory" className="text-foreground/80 transition hover:text-foreground">Advisory</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mono-caps text-muted-foreground">Company</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/about" className="text-foreground/80 transition hover:text-foreground">About</Link></li>
              <li><Link to="/case-studies" className="text-foreground/80 transition hover:text-foreground">Case studies</Link></li>
              <li><Link to="/contact" className="text-foreground/80 transition hover:text-foreground">Contact</Link></li>
              <li><span className="text-muted-foreground/60">Careers · soon</span></li>
            </ul>
          </div>

          <div>
            <h4 className="mono-caps text-muted-foreground">Tools</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/score" className="text-foreground/80 transition hover:text-foreground">RynexScore</Link></li>
              <li><span className="text-muted-foreground/60">RynexPortal · Q3</span></li>
              <li><span className="text-muted-foreground/60">RynexOps · Q4</span></li>
            </ul>
          </div>
        </div>

        <div className="relative border-t border-border/70">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:flex-row">
            <span>© {new Date().getFullYear()} Rynex Security · All rights reserved</span>
            <span>Confidential engagements · Responsible disclosure welcome</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
