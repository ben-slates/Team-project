import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/services", label: "Services" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/score", label: "RynexScore" },
  { to: "/about", label: "About" },
] as const;

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative">
            <img
              src="/rynex-logo.png"
              alt="Rynex Security"
              className="h-10 w-10 object-contain"
            />
            <div className="pointer-events-none absolute inset-0 -z-10 blur-xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 55%, transparent), transparent 70%)",
              }}
            />
          </div>
          <div className="leading-none">
            <div className="font-heritage text-2xl tracking-[0.14em] text-foreground">
              Rynex Security
            </div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
              Detect · Exploit · Secure
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition hover:text-foreground [&.active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition hover:text-foreground [&.active]:text-foreground"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/score" className="hidden btn-primary md:inline-flex">
            Start audit
            <span className="text-primary">→</span>
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background text-foreground transition hover:border-primary md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-border/70 bg-background/95 px-6 pb-6 md:hidden">
          <div className="space-y-3 pt-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-4 py-3 font-mono text-sm uppercase tracking-[0.22em] text-foreground transition hover:bg-surface-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl border border-border/80 px-4 py-3 text-center font-mono text-sm uppercase tracking-[0.22em] text-foreground transition hover:border-primary"
            >
              Contact
            </Link>
            <Link
              to="/score"
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl bg-primary px-4 py-3 text-center font-mono text-sm uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-primary/90"
            >
              Start audit
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
