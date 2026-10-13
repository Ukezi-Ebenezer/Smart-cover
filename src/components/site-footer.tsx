import { Link } from "@tanstack/react-router";
import { useMotionPreference } from "@/hooks/use-motion-preference";

export function SiteFooter() {
  const { motionEnabled, isSystemReduced, toggleMotion } = useMotionPreference();

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.dispatchEvent(new Event("smartcover:replay"));
    }, 400);
  };

  return (
    <footer className="border-t hairline bg-background text-foreground transition-colors">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <span
                className="block h-3.5 w-3.5 rounded-full"
                style={{ backgroundColor: "var(--gold)" }}
                aria-hidden="true"
              />
              <span className="font-serif text-2xl font-bold tracking-tight">
                Smart Cover<span style={{ color: "var(--gold)" }}>.</span>
              </span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              A modern, human-first insurance advisory built for Nigerian families who want transparent terms, guaranteed lifetime annuities, and disciplined wealth creation.
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              Stability Assured · NAICOM Regulated Partner
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href="/#home" className="hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/#plans" className="hover:text-foreground transition-colors">
                  Advisory Plans
                </a>
              </li>
              <li>
                <a href="/#story" className="hover:text-foreground transition-colors">
                  Insurance Tips
                </a>
              </li>
              <li>
                <a href="/#calculator" className="hover:text-foreground transition-colors">
                  Coverage Calculator
                </a>
              </li>
              <li>
                <a href="/#resources" className="hover:text-foreground transition-colors">
                  Free Advisory Guides
                </a>
              </li>
              <li>
                <Link to="/book" className="hover:text-foreground transition-colors">
                  Book Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Advisor Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">Direct Advisor</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li className="font-medium text-foreground">Okpo Emmanuel Ogbonnaya</li>
              <li className="text-xs text-muted-foreground">Founder & Licensed Insurance Advisor</li>
              <li>
                <a href="tel:+2348024607699" className="hover:text-foreground transition-colors">
                  +234 802 460 7699
                </a>
              </li>
              <li>
                <a href="tel:+2349131832676" className="hover:text-foreground transition-colors">
                  +234 913 183 2676
                </a>
              </li>
              <li>
                <a
                  href="https://wa.link/mvnpxr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-600 font-medium hover:underline"
                >
                  WhatsApp Direct ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Controls Bar */}
        <div className="mt-14 pt-8 border-t hairline flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Smart Cover. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            {/* Motion Toggle Button */}
            <button
              type="button"
              onClick={toggleMotion}
              disabled={isSystemReduced}
              aria-pressed={motionEnabled}
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors disabled:opacity-50"
            >
              <span aria-hidden="true">◐</span>
              <span>
                {isSystemReduced
                  ? "Reduced motion (Device default)"
                  : motionEnabled
                  ? "Motion on"
                  : "Motion off"}
              </span>
            </button>

            {/* Replay Opening */}
            <button
              type="button"
              onClick={handleReplay}
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <span>Replay opening</span>
              <span aria-hidden="true">↺</span>
            </button>

            {/* Back to top */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-foreground transition-colors"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}