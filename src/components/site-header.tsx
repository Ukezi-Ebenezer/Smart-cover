import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone, Menu, X, ArrowUpRight } from "lucide-react";
import { useMotionPreference } from "@/hooks/use-motion-preference";

const NAV_ITEMS = [
  { id: "home", to: "/#home", label: "Home" },
  { id: "plans", to: "/#plans", label: "Advisory Plans" },
  { id: "story", to: "/#story", label: "Insurance Tips" },
  { id: "why-cover", to: "/#why-cover", label: "Why Cover" },
  { id: "calculator", to: "/#calculator", label: "Calculator" },
  { id: "resources", to: "/#resources", label: "Resources" },
];

export function SiteHeader() {
  const location = useLocation();
  const isBookPage = location.pathname === "/book";
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { motionEnabled, isSystemReduced, toggleMotion } = useMotionPreference();

  useEffect(() => {
    if (isBookPage) {
      setActiveSection("book");
      return;
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      const sections = ["resources", "calculator", "why-cover", "story", "plans", "home"];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }

      if (window.scrollY < 200) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBookPage]);

  return (
    <header className="sticky top-0 z-50 h-20 border-b hairline bg-background/90 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Brand Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span
            className="block h-3.5 w-3.5 rounded-full transition-transform group-hover:scale-125"
            style={{ backgroundColor: "var(--gold)" }}
            aria-hidden="true"
          />
          <span className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-[26px]">
            Smart Cover<span style={{ color: "var(--gold)" }}>.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = !isBookPage && activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.to}
                onClick={() => setActiveSection(item.id)}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-foreground shadow-sm"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Motion Toggle Button */}
          <button
            type="button"
            onClick={toggleMotion}
            aria-pressed={motionEnabled}
            disabled={isSystemReduced}
            aria-label={
              isSystemReduced
                ? "Reduced motion set by device preferences"
                : motionEnabled
                ? "Pause animations"
                : "Play animations"
            }
            title={
              isSystemReduced
                ? "Reduced motion active"
                : motionEnabled
                ? "Pause motion (Reduced motion)"
                : "Play motion"
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border hairline bg-card text-foreground transition-all hover:border-foreground/40 active:scale-95 disabled:opacity-50"
          >
            <span className="text-xs font-mono font-bold" aria-hidden="true">
              {motionEnabled ? "Ⅱ" : "▶"}
            </span>
          </button>

          {/* Quick Call */}
          <a
            href="https://wa.link/mvnpxr"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors sm:inline-flex"
          >
            <Phone className="h-3.5 w-3.5 text-emerald-600" />
            <span className="hidden xl:inline">WhatsApp</span>
          </a>

          {/* Primary CTA */}
          <Link
            to="/book"
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-foreground px-5 py-2 text-xs font-semibold uppercase tracking-wider text-background transition-all hover:opacity-90 active:scale-[0.98]"
          >
            Work with me
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="inline-flex lg:hidden p-2 rounded-lg text-foreground hover:bg-muted"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b hairline bg-background px-6 py-4 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {NAV_ITEMS.map((item) => {
            const isActive = !isBookPage && activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.to}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-foreground/5 text-foreground font-bold border-l-2 border-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-foreground" />}
              </a>
            );
          })}
          <div className="pt-2 border-t hairline flex items-center justify-between px-2">
            <span className="text-xs text-muted-foreground">Animation motion:</span>
            <button
              type="button"
              onClick={toggleMotion}
              className="px-3 py-1 text-xs rounded-full border hairline font-medium"
            >
              {motionEnabled ? "Motion: ON (Pause)" : "Motion: OFF (Play)"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}