import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { id: "home", to: "/#home", label: "Home" },
  { id: "plans", to: "/#plans", label: "Plans" },
  { id: "about", to: "/#about", label: "About" },
  { id: "process", to: "/#process", label: "Process" },
];

export function SiteHeader() {
  const location = useLocation();
  const isBookPage = location.pathname === "/book";
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isBookPage) {
      setActiveSection("book");
      return;
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      const sections = ["process", "plans", "about", "home"];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height + 100) {
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
    <header className="sticky top-0 z-50 h-20 border-b hairline bg-white/95 backdrop-blur-[10px]">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="block h-5 w-5 bg-charcoal transition-transform group-hover:scale-110" style={{ backgroundColor: "var(--charcoal)" }} />
          <span className="font-display text-lg font-bold uppercase tracking-[0.18em]">
            SMART COVER
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = !isBookPage && activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.to}
                onClick={() => setActiveSection(item.id)}
                className={`relative py-1.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-blue-600 font-bold"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full bg-blue-600 shadow-[0_1px_6px_rgba(37,99,235,0.4)]"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <a
            href="https://wa.link/mvnpxr"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 text-sm font-medium sm:inline-flex text-charcoal hover:text-blue-600 transition-colors"
          >
            <Phone className="h-4 w-4 text-emerald-600" />
            Book a Call
          </a>

          <Link
            to="/book"
            className={`inline-flex items-center justify-center rounded-[12px] px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
              isBookPage
                ? "bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2"
                : "bg-foreground text-background hover:opacity-90"
            }`}
          >
            Get a Quote
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="inline-flex md:hidden p-2 rounded-lg text-charcoal hover:bg-muted"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b hairline bg-background px-6 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
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
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-bold border-l-4 border-blue-600"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                )}
              </a>
            );
          })}
          <div className="pt-2 border-t hairline">
            <a
              href="https://wa.link/mvnpxr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 text-base font-medium text-charcoal hover:bg-muted rounded-xl"
            >
              <Phone className="h-4 w-4 text-emerald-600" />
              Book a Call (WhatsApp)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}