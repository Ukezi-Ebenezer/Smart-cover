import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const percentage = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollPercentage(percentage);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-charcoal via-gold to-gold transition-all duration-75 ease-out shadow-[0_0_8px_rgba(212,175,55,0.6)]"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
}

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      setIsVisible(scrollTop > 280);

      if (docHeight > 0) {
        const percentage = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollPercentage(percentage);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG Circular progress math (radius: 18, circumference: 2 * PI * 18 ≈ 113.1)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-card border hairline shadow-xl backdrop-blur transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:border-gold active:scale-95"
      >
        {/* SVG Progress Ring */}
        <svg
          className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none"
          viewBox="0 0 44 44"
        >
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-muted-foreground/15"
            strokeWidth="2.5"
            fill="transparent"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="transition-all duration-100 ease-out"
            stroke="var(--gold)"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Arrow Icon */}
        <ArrowUp className="h-5 w-5 text-foreground transition-transform duration-300 group-hover:-translate-y-0.5" />

        {/* Hover Tooltip */}
        <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-charcoal px-2.5 py-1 text-[11px] font-medium text-white shadow-md opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100">
          Top {Math.round(scrollPercentage)}%
        </span>
      </button>
    </div>
  );
}
