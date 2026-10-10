import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3 lg:px-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="block h-5 w-5" style={{ backgroundColor: "var(--charcoal)" }} />
            <span className="font-display text-lg font-bold uppercase tracking-[0.18em]">SMART COVER</span>
          </div>
          <p className="mt-5 max-w-xs text-sm text-muted-foreground">
            Life, endowment, annuity and general insurance designed to protect what matters and grow what's yours.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/" className="hover:opacity-70">Home</Link></li>
            <li><a href="/#plans" className="hover:opacity-70">Plans</a></li>
            <li><a href="/#process" className="hover:opacity-70">How it works</a></li>
            <li><a href="https://wa.link/mvnpxr" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">Book a Call (WhatsApp)</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>Emmanuel Ogbonnaya Okpo</li>
            <li><a href="tel:+2348024607699" className="hover:opacity-70">0802 460 7699</a></li>
            <li><a href="tel:+2349131832676" className="hover:opacity-70">0913 183 2676</a></li>
            <li>Nigeria</li>
          </ul>
        </div>
      </div>
      <div className="border-t hairline">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-muted-foreground md:flex-row md:items-center lg:px-10">
          <p>© {new Date().getFullYear()} SMART COVER Insurance. All rights reserved.</p>
          <p className="uppercase tracking-[0.18em]">…stability assured</p>
        </div>
      </div>
    </footer>
  );
}