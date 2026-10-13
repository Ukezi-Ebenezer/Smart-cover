import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Shield,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Heart,
  Sparkles,
  Umbrella,
  Phone,
  Search,
  Leaf,
  Check,
  Calculator,
  SlidersHorizontal,
  X,
  FileText,
  Clock,
  Award,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import founderHeadshot from "@/assets/Professional_Headshot.png";
import heroAdvisor from "@/assets/hero-advisor.jpg";
import bookAdvisor from "@/assets/book-advisor.jpg";
import endowmentWoman from "@/assets/endowment-woman.jpg";
import planFamily from "@/assets/plan-family.jpg";
import planRetirement from "@/assets/plan-retirement.jpg";
import planAnnuity from "@/assets/plan-annuity.jpg";
import planInvestment from "@/assets/plan-investment.jpg";
import planSavings from "@/assets/plan-savings.jpg";
import planCar from "@/assets/plan-car.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart Cover — Protect What Matters. Grow What's Yours." },
      {
        name: "description",
        content:
          "Cinematic insurance advisory by Okpo Emmanuel Ogbonnaya. Flexible endowment, lifetime retirement annuities, capital growth, and family protection plans in Nigeria.",
      },
      { property: "og:title", content: "Smart Cover — Modern Cover for Modern Families" },
      {
        property: "og:description",
        content:
          "Endowment, annuity, life and investment policies built for Nigerian families who want honest numbers and generational security.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const TYPED_HEADLINE = "Grow what's yours.";

function TypedHeadline() {
  const [visibleText, setVisibleText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const headlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = headlineRef.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMotionOff = document.documentElement.classList.contains("motion-off");

    if (reduceMotion || isMotionOff) {
      setVisibleText(TYPED_HEADLINE);
      setIsComplete(true);
      return;
    }

    let delayTimer: number | undefined;
    let typingTimer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        delayTimer = window.setTimeout(() => {
          let characterIndex = 0;
          typingTimer = window.setInterval(() => {
            characterIndex += 1;
            setVisibleText(TYPED_HEADLINE.slice(0, characterIndex));
            if (characterIndex >= TYPED_HEADLINE.length) {
              if (typingTimer) window.clearInterval(typingTimer);
              setIsComplete(true);
            }
          }, 90);
        }, 5000);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (delayTimer) window.clearTimeout(delayTimer);
      if (typingTimer) window.clearInterval(typingTimer);
    };
  }, []);

  return (
    <span
      ref={headlineRef}
      className="typed-headline font-serif italic font-normal text-muted-foreground"
      aria-label={TYPED_HEADLINE}
    >
      <span className="typed-headline-reserve" aria-hidden="true">
        {TYPED_HEADLINE}
      </span>
      <span className="typed-headline-live" aria-hidden="true">
        {visibleText}
        <span className={isComplete ? "typing-caret typing-caret-complete" : "typing-caret"} />
      </span>
    </span>
  );
}

const quoteScenarios = [
  { plan: "Flexible Endowment", age: "35 yrs", coverage: "₦20,000,000", tag: "Flagship" },
  { plan: "Deferred Annuity", age: "42 yrs", coverage: "₦50,000,000", tag: "Popular" },
  { plan: "Immediate Annuity", age: "58 yrs", coverage: "₦75,000,000", tag: "Guaranteed" },
  { plan: "Investment Policy", age: "29 yrs", coverage: "₦12,000,000", tag: "Growth" },
  { plan: "Savings & Protection", age: "26 yrs", coverage: "₦8,000,000", tag: "Starter" },
  { plan: "Comprehensive Auto", age: "33 yrs", coverage: "₦15,000,000", tag: "General" },
];

function FloatingQuoteBar() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % quoteScenarios.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const current = quoteScenarios[index];

  return (
    <div className="mt-8 px-2 sm:px-0">
      <div
        className="mx-auto max-w-5xl rounded-2xl border hairline bg-card p-3 shadow-xl transition-all duration-300"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="grid grid-cols-1 divide-y hairline sm:grid-cols-2 sm:divide-y-0 sm:divide-x md:grid-cols-4">
          {/* Plan Type */}
          <div className="flex flex-col justify-center px-4 py-2.5 sm:px-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Plan Type
              </p>
              <span className="inline-block rounded-full bg-foreground/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-foreground">
                {current.tag}
              </span>
            </div>
            <div key={`plan-${index}`} className="quote-animate mt-1">
              <p className="font-serif text-base font-bold truncate text-foreground">
                {current.plan}
              </p>
            </div>
          </div>

          {/* Your Age */}
          <div className="flex flex-col justify-center px-4 py-2.5 sm:px-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Your Age
            </p>
            <div key={`age-${index}`} className="quote-animate mt-1">
              <p className="font-serif text-base font-bold text-foreground">
                {current.age}
              </p>
            </div>
          </div>

          {/* Coverage */}
          <div className="flex flex-col justify-center px-4 py-2.5 sm:px-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Projected Cover
              </p>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" title="Active calculation" />
            </div>
            <div key={`cov-${index}`} className="quote-animate mt-1">
              <p className="font-serif text-base font-bold text-foreground">
                {current.coverage}
              </p>
            </div>
          </div>

          {/* CTA + Navigation Dots */}
          <div className="flex flex-col justify-center gap-1.5 p-1">
            <Link
              to="/book"
              className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2 text-xs font-semibold uppercase tracking-wider text-background transition hover:opacity-90 active:scale-[0.98]"
            >
              <Search className="h-3.5 w-3.5" /> Get my quote
            </Link>
            <div className="flex items-center justify-center gap-1.5 pb-0.5">
              {quoteScenarios.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Switch to scenario ${i + 1}`}
                  className="min-h-[20px] min-w-[20px] inline-flex items-center justify-center"
                >
                  <span
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-5 bg-foreground" : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const chapters = [
  {
    number: "01",
    label: "01 / The Mission",
    title: "Insurance built on",
    titleEmphasis: "human honesty.",
    body: "Too often in Nigeria, insurance is sold with confusing fine print, aggressive agents, and delayed claims. I founded Smart Cover to bring transparent numbers, direct accountability, and guaranteed protection to everyday families.",
    photo: heroAdvisor,
    backword: "honesty",
  },
  {
    number: "02",
    label: "02 / The Protection",
    title: "Protecting what took",
    titleEmphasis: "years to build.",
    body: "Your children's school fees, your home, and your retirement income shouldn't depend on economic volatility. From flexible endowments to guaranteed lifetime retirement annuities, every contract is backed by audited sovereign reserves.",
    photo: planFamily,
    backword: "security",
  },
  {
    number: "03",
    label: "03 / The Legacy",
    title: "A promise that outlives",
    titleEmphasis: "generations.",
    body: "True wealth isn't just what you earn today—it's what remains intact tomorrow. When the unthinkable happens, our partner institutions disburse funds within 48 hours so your family never loses their peace or dignity.",
    photo: bookAdvisor,
    backword: "legacy",
  },
];

const benefits = [
  { icon: TrendingUp, title: "Great Return", body: "Reversionary bonuses of 4% added every year on qualifying endowment plans." },
  { icon: Shield, title: "Life Cover", body: "Full sum assured paid to your loved ones if the unthinkable happens." },
  { icon: Wallet, title: "Tax Benefits", body: "Premiums and maturity payouts are 100% tax-free under Nigerian law." },
  { icon: Heart, title: "Peace of Mind", body: "Sleep easy knowing your spouse and children are shielded from financial distress." },
  { icon: Sparkles, title: "Secure Your Future", body: "Lock in a guaranteed monthly lifetime income stream you cannot outlive." },
  { icon: ShieldCheck, title: "Institutional Safety", body: "Regulated by NAICOM with 60+ years of unblemished institutional history." },
];

const resources = [
  {
    tag: "01 / RETIREMENT BLUEPRINT",
    title: "The Nigerian Retirement Annuity Guide",
    desc: "How to convert your career savings into guaranteed lifetime monthly payouts that keep up with inflation.",
    readTime: "6 min read",
    linkText: "View Blueprint",
  },
  {
    tag: "02 / SAVINGS COMPARISON",
    title: "Endowment Policy vs. Fixed Deposits",
    desc: "A realistic breakdown of yield, life cover protection, emergency liquidity, and tax advantages.",
    readTime: "8 min read",
    linkText: "View Comparison",
  },
  {
    tag: "03 / FAMILY CHECKLIST",
    title: "Family Wealth Protection Checklist",
    desc: "The 7 critical financial gaps Nigerian families face and how to seal them before emergencies strike.",
    readTime: "5 min read",
    linkText: "View Checklist",
  },
  {
    tag: "04 / TAX STRATEGY",
    title: "Business Owner Tax-Free Cover Strategy",
    desc: "How entrepreneurs legally write off premiums while building massive private executive cash value.",
    readTime: "7 min read",
    linkText: "View Strategy",
  },
];

function Home() {
  const { motionEnabled, isSystemReduced } = useMotionPreference();
  const [activeChapter, setActiveChapter] = useState(0);
  const [calculatorAge, setCalculatorAge] = useState(35);
  const [calculatorBudget, setCalculatorBudget] = useState(50000);
  const [calculatorGoal, setCalculatorGoal] = useState("endowment");
  const [selectedBioOpen, setSelectedBioOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<null | (typeof resources)[0]>(null);
  const [curtainsOpened, setCurtainsOpened] = useState(false);

  const heroSequenceRef = useRef<HTMLDivElement>(null);
  const curtainsContainerRef = useRef<HTMLDivElement>(null);
  const curtainsLeftRef = useRef<HTMLElement>(null);
  const curtainsRightRef = useRef<HTMLElement>(null);
  const portraitTravelRef = useRef<HTMLDivElement>(null);
  const nameFirstRef = useRef<HTMLSpanElement>(null);
  const nameLastRef = useRef<HTMLSpanElement>(null);
  const satellitesRef = useRef<HTMLDivElement>(null);
  const introCopyRef = useRef<HTMLDivElement>(null);
  const introNoteRef = useRef<HTMLDivElement>(null);
  const heroFinalRef = useRef<HTMLDivElement>(null);
  const storySequenceRef = useRef<HTMLDivElement>(null);
  const scrubberRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurtainsOpened(true);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  // Animation Choreography
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMotionOff = document.documentElement.classList.contains("motion-off");

    if (reduceMotion || isMotionOff || !motionEnabled) {
      // Set reading layout directly
      if (curtainsLeftRef.current) gsap.set(curtainsLeftRef.current, { xPercent: -101 });
      if (curtainsRightRef.current) gsap.set(curtainsRightRef.current, { xPercent: 101 });
      if (heroFinalRef.current) gsap.set(heroFinalRef.current, { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 640;

      // Initial States
      gsap.set(heroFinalRef.current, { autoAlpha: 0, y: 40 });
      gsap.set(".hero-horizon", { xPercent: 25, opacity: 0 });

      // Opening Sequence Timeline
      const introTl = gsap.timeline({
        id: "opening-entrance",
        defaults: { ease: "power3.out" },
      });

      introTl
        .fromTo(
          curtainsLeftRef.current,
          { xPercent: 0 },
          { xPercent: -101, duration: 1.25, ease: "power3.inOut" },
          0
        )
        .fromTo(
          curtainsRightRef.current,
          { xPercent: 0 },
          { xPercent: 101, duration: 1.25, ease: "power3.inOut" },
          0
        )
        .fromTo(
          ".hero-portrait-card",
          { y: 80, scale: 0.88, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 1.5 },
          0.1
        )
        .fromTo(
          nameFirstRef.current,
          { xPercent: -50, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 1.5 },
          0.05
        )
        .fromTo(
          nameLastRef.current,
          { xPercent: 50, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 1.5 },
          0.15
        )
        .fromTo(
          ".satellite-one",
          { x: -120, y: 80, scale: 0.4, opacity: 0, rotation: 18 },
          { x: 0, y: 0, scale: 1, opacity: 1, rotation: -7, duration: 1.4 },
          0.3
        )
        .fromTo(
          ".satellite-two",
          { x: 120, y: -80, scale: 0.4, opacity: 0, rotation: -20 },
          { x: 0, y: 0, scale: 1, opacity: 1, rotation: 6, duration: 1.4 },
          0.38
        )
        .fromTo(
          ".satellite-three",
          { y: 60, scale: 0.4, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 1.2 },
          0.5
        )
        .fromTo(
          [introCopyRef.current, introNoteRef.current],
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.9 },
          0.6
        )
        .fromTo(
          [".hero-offer-tag", ".hero-bottom"],
          { opacity: 0 },
          { opacity: 1, duration: 0.7 },
          0.4
        );

      // Hero Scroll Scrub Timeline
      if (heroSequenceRef.current) {
        const heroScrollTl = gsap.timeline({
          id: "hero-scroll",
          scrollTrigger: {
            trigger: heroSequenceRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });

        heroScrollTl
          .to(satellitesRef.current, { scale: 1.85, autoAlpha: 0, duration: 0.35 }, 0)
          .to(".opening-name", { scale: 1.9, autoAlpha: 0, duration: 0.45 }, 0)
          .to([introCopyRef.current, introNoteRef.current], { y: -50, autoAlpha: 0, duration: 0.25 }, 0)
          .to(
            portraitTravelRef.current,
            {
              left: isMobile ? "50%" : "26%",
              top: isMobile ? "32%" : "52%",
              scale: isMobile ? 0.74 : 0.88,
              duration: 0.65,
              ease: "power2.inOut",
            },
            0.05
          )
          .to(heroFinalRef.current, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.28)
          .to(".hero-horizon", { xPercent: -8, opacity: 1, duration: 0.7 }, 0.15)
          .to(".hero-scroll", { opacity: 0, duration: 0.15 }, 0.1)
          .to(".cinema-grid", { scale: 1.6, opacity: 0.15, duration: 1 }, 0);
      }

      // Founder Story Sequence ScrollTrigger (Auto-transitions chapters 01 -> 02 -> 03 as user scrolls)
      if (storySequenceRef.current) {
        ScrollTrigger.create({
          id: "story-scroll",
          trigger: storySequenceRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          onUpdate: (self) => {
            const p = self.progress;
            const newIndex = p < 0.333 ? 0 : p < 0.667 ? 1 : 2;
            setActiveChapter((prev) => (prev !== newIndex ? newIndex : prev));

            if (scrubberRef.current) {
              scrubberRef.current.value = String(Math.round(p * 1000));
              scrubberRef.current.style.setProperty(
                "--story-progress",
                `${(p * 100).toFixed(1)}%`
              );
            }
          },
        });
      }

      // Replay Trigger Listener
      const handleReplay = () => {
        setCurtainsOpened(false);
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        introTl.restart();
        setTimeout(() => {
          setCurtainsOpened(true);
        }, 1300);
      };
      window.addEventListener("smartcover:replay", handleReplay);

      return () => {
        window.removeEventListener("smartcover:replay", handleReplay);
      };
    });

    return () => ctx.revert();
  }, [motionEnabled]);

  // Story sequence chapter switcher & smooth scroll navigation
  const scrollToChapter = (index: number) => {
    setActiveChapter(index);
    if (storySequenceRef.current && motionEnabled) {
      const rect = storySequenceRef.current.getBoundingClientRect();
      const currentScroll = window.scrollY || window.pageYOffset;
      const storyTop = currentScroll + rect.top;
      const totalDist = storySequenceRef.current.offsetHeight - window.innerHeight;
      if (totalDist > 0) {
        const ratios = [0.10, 0.50, 0.90];
        const targetRatio = ratios[index];
        window.scrollTo({
          top: storyTop + totalDist * targetRatio,
          behavior: "smooth",
        });
        if (scrubberRef.current) {
          scrubberRef.current.value = String(Math.round(targetRatio * 1000));
          scrubberRef.current.style.setProperty(
            "--story-progress",
            `${(targetRatio * 100).toFixed(1)}%`
          );
        }
      }
    }
  };

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    const p = Math.max(0, Math.min(1, val / 1000));
    const newIndex = p < 0.333 ? 0 : p < 0.667 ? 1 : 2;
    setActiveChapter((prev) => (prev !== newIndex ? newIndex : prev));

    if (scrubberRef.current) {
      scrubberRef.current.style.setProperty("--story-progress", `${(p * 100).toFixed(1)}%`);
    }

    if (storySequenceRef.current && motionEnabled) {
      const rect = storySequenceRef.current.getBoundingClientRect();
      const currentScroll = window.scrollY || window.pageYOffset;
      const storyTop = currentScroll + rect.top;
      const totalDist = storySequenceRef.current.offsetHeight - window.innerHeight;
      if (totalDist > 0) {
        window.scrollTo({
          top: storyTop + totalDist * p,
          behavior: "instant" as ScrollBehavior,
        });
      }
    }
  };

  // Calculator Estimates
  const calculateOutput = () => {
    if (calculatorGoal === "endowment") {
      const estimatedPayout = calculatorBudget * 12 * 10 * 1.45;
      return {
        planName: "Flexible Endowment Plan",
        tag: "Savings + Investment + Life Cover",
        coverage: `₦${(calculatorBudget * 12 * 12).toLocaleString()}`,
        tenYearReturn: `₦${Math.round(estimatedPayout).toLocaleString()}`,
        highlight: "Includes 4% annual reversionary bonuses and guaranteed partial payouts every 3 years.",
      };
    } else if (calculatorGoal === "annuity") {
      const monthlyLifetime = calculatorBudget * 3.8;
      return {
        planName: "Guaranteed Lifetime Annuity",
        tag: "Tax-Free Retirement Income",
        coverage: `₦${Math.round(monthlyLifetime).toLocaleString()} / month for life`,
        tenYearReturn: "Paid monthly for as long as you live",
        highlight: "100% tax-free under Nigerian law, with optional 5 or 10-year beneficiary guarantees.",
      };
    } else {
      const wealthValue = calculatorBudget * 12 * 8 * 1.6;
      return {
        planName: "Capital Growth Policy",
        tag: "Disciplined Wealth Accumulation",
        coverage: `₦${(calculatorBudget * 12 * 8).toLocaleString()}`,
        tenYearReturn: `₦${Math.round(wealthValue).toLocaleString()}`,
        highlight: "Capital protection floor ensures your principal cannot drop during market downturns.",
      };
    }
  };

  const calculatedResult = calculateOutput();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <SiteHeader />

      {/* ====================================================================
          1. HERO CINEMATIC SEQUENCE (Inspired by Lola Adey & Google Drive Motion)
          ==================================================================== */}
      <section
        id="home"
        ref={heroSequenceRef}
        className="hero-sequence"
        aria-label="Hero opening sequence"
      >
        <div className="hero-stage">
          {/* Split Theatrical Curtains */}
          <div
            ref={curtainsContainerRef}
            className={`hero-curtains ${curtainsOpened ? "is-open" : ""}`}
            aria-hidden="true"
          >
            <i ref={curtainsLeftRef} />
            <i ref={curtainsRightRef} />
          </div>

          {/* Ambient Lighting & Luxury Grid */}
          <div className="hero-glow" aria-hidden="true" />
          <div className="cinema-grid" aria-hidden="true" />
          <div className="hero-aura" aria-hidden="true">
            <div className="hero-aura-ring" />
          </div>

          {/* Giant Editorial Typography Behind Center */}
          <div className="opening-name" aria-hidden="true">
            <span ref={nameFirstRef} className="name-first">
              Okpo
            </span>
            <span ref={nameLastRef} className="name-last">
              Emmanuel<span className="gold-period">.</span>
            </span>
          </div>

          {/* Floating Pill Tag at Top Center */}
          <p className="hero-offer-tag">
            <span aria-hidden="true" /> SMART COVER ADVISORY WITH OKPO EMMANUEL
          </p>

          {/* Center Stage Portrait Travel Card */}
          <div ref={portraitTravelRef} className="portrait-travel">
            <figure className="hero-portrait-card">
              <img
                src={founderHeadshot}
                alt="Okpo Emmanuel Ogbonnaya — Founder of Smart Cover"
                width={1280}
                height={1600}
                fetchPriority="high"
              />
              <figcaption>
                <div className="min-w-0">
                  <span className="founder-caption-name block text-white font-bold leading-tight">
                    Okpo Emmanuel Ogbonnaya
                  </span>
                  <small className="founder-caption-title block text-taupe mt-0.5">
                    Founder of Smart Cover
                  </small>
                </div>
                <div className="text-right">
                  <span className="founder-caption-rule block h-0.5 w-6 bg-gold ml-auto mb-1" aria-hidden="true" />
                  <small className="text-white/80">Stability Assured</small>
                </div>
              </figcaption>
            </figure>
          </div>

          {/* Floating Satellite Cards */}
          <div ref={satellitesRef} className="hero-satellites" aria-hidden="true">
            {/* Satellite 1: Top Left */}
            <a
              href="#plans"
              className="hero-satellite satellite-one"
              aria-label="Explore flexible endowment"
            >
              <div className="satellite-inner">
                <img src={planFamily} alt="" width={600} height={400} />
                <div className="satellite-label">
                  <span>01 / ENDOWMENT</span>
                  <b>↗</b>
                </div>
              </div>
            </a>

            {/* Satellite 2: Bottom Right */}
            <a
              href="#plans"
              className="hero-satellite satellite-two"
              aria-label="Explore retirement annuity"
            >
              <div className="satellite-inner">
                <img src={planRetirement} alt="" width={600} height={400} />
                <div className="satellite-label">
                  <span>02 / RETIREMENT</span>
                  <b>↗</b>
                </div>
              </div>
            </a>

            {/* Satellite 3: Center Bottom Frosted Star */}
            <a
              href="#why-cover"
              className="hero-satellite satellite-three"
              aria-label="Explore generational wealth"
            >
              <div className="satellite-inner">
                <span className="satellite-symbol" aria-hidden="true">
                  ✳
                </span>
                <div className="satellite-label justify-center">
                  <span>03 / LEGACY ↗</span>
                </div>
              </div>
            </a>
          </div>

          {/* Left Editorial Intro Copy */}
          <div ref={introCopyRef} className="hero-intro-copy">
            <p className="eyebrow">Practical protection. Human ambition.</p>
            <h2>
              Smart Cover
              <br />
              <em>Advisory.</em>
            </h2>
            <a
              href="#plans"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:underline"
            >
              Explore the plans <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Right Editorial Intro Note */}
          <div ref={introNoteRef} className="hero-intro-note">
            <p>
              Your family's
              <br />
              <em>next chapter.</em>
            </p>
            <span>
              LET'S SECURE
              <br />
              SOMETHING REAL.
            </span>
          </div>

          {/* Ambient Background Watermark Word */}
          <span className="hero-horizon" aria-hidden="true">
            security.
          </span>

          {/* Hero Final Revealed Offer (Pin & Glided Left Portrait / Right Offer) */}
          <div ref={heroFinalRef} className="hero-final">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border hairline px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Leaf className="h-3 w-3" style={{ color: "var(--gold)" }} />
                Est. 1963 · Stability Assured
              </span>

              <h1 className="font-display text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">
                Protect what matters. <TypedHeadline />
              </h1>

              <p className="max-w-lg text-sm text-muted-foreground sm:text-base leading-relaxed">
                Flexible endowment, lifetime annuities, and capital growth policies built for Nigerian families who want transparent terms, guaranteed payouts, and generational security.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#plans"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-background transition-all hover:opacity-90 active:scale-[0.98]"
                >
                  Find your plan
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedBioOpen(true)}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border hairline bg-card px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:border-foreground/40 active:scale-[0.98]"
                >
                  <span className="h-2 w-2 rounded-full bg-gold animate-ping" />
                  Meet Emmanuel
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-4 pt-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                <span>NAICOM Regulated</span>
                <span className="h-1 w-1 rounded-full bg-gold" />
                <span>₦18B+ Claims Paid</span>
                <span className="h-1 w-1 rounded-full bg-gold" />
                <span>2,000+ Families Covered</span>
              </div>
            </div>
          </div>

          {/* Bottom Navigation & Controls */}
          <div className="hero-bottom">
            <a
              href="#plans"
              className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              Explore the plans <ArrowUpRight className="h-3 w-3" />
            </a>

            <span className="hero-scroll">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce" />
              Scroll. Step into security.
            </span>

            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                  window.dispatchEvent(new Event("smartcover:replay"));
                }, 350);
              }}
              className="hero-replay"
              aria-label="Replay the opening animation"
            >
              <span>Replay</span>
              <span aria-hidden="true">↺</span>
            </button>
          </div>
        </div>
      </section>

      {/* Real-time Scenario Bridge Card */}
      <section className="relative z-20 -mt-10 px-4 sm:px-6 lg:px-10 mb-8 max-w-6xl mx-auto">
        <FloatingQuoteBar />
      </section>

      {/* ====================================================================
          2. CORE ADVISORY PLANS (Inspired by Lola Adey's Intensives Grid)
          ==================================================================== */}
      <section id="plans" className="border-t hairline px-6 py-28 lg:px-10 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b hairline">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                The Smart Cover Advisory
              </p>
              <h2 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl text-foreground">
                Three ways to
                <br />
                <em className="italic font-normal text-gold">protect and grow.</em>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Whether you need guaranteed partial payouts during school years, an unbreakable retirement income, or long-term market-linked wealth creation, our plans are backed by audited legal guarantees.
            </p>
          </div>

          {/* Offer Grid */}
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* Offer 1: Flexible Endowment (Flagship) */}
            <article className="rounded-3xl border hairline bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b hairline">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    01 / Private Advisory
                  </span>
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-charcoal">
                    Flagship
                  </span>
                </div>

                <h3 className="mt-6 font-serif text-3xl font-bold leading-tight">
                  Flexible Endowment
                  <br />
                  <em className="italic font-normal text-gold">Plan</em>
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Savings, investment, and life protection bound together. Guaranteed payouts delivered to you every 3 to 5 years, plus full sum assured for your family.
                </p>

                <div className="my-6 rounded-2xl bg-muted/50 p-4 border hairline flex items-baseline justify-between">
                  <div>
                    <span className="font-serif text-2xl font-bold">From ₦1.8M</span>
                    <span className="text-xs text-muted-foreground"> / year</span>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 font-mono">+ 4% Bonus/yr</span>
                </div>

                <ul className="space-y-2.5 text-xs text-foreground/90 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold shrink-0" />
                    Guaranteed partial payouts during active term
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold shrink-0" />
                    4% annual compound reversionary bonuses
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold shrink-0" />
                    100% Tax-exempt maturity proceeds
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold shrink-0" />
                    Policy loan facility available after 24 months
                  </li>
                </ul>

                <details className="mt-6 text-xs text-muted-foreground border-t hairline pt-4 group">
                  <summary className="cursor-pointer font-semibold uppercase tracking-wider text-foreground flex items-center justify-between">
                    Inside your endowment policy
                    <span className="group-open:rotate-180 transition-transform">↓</span>
                  </summary>
                  <p className="mt-2 leading-relaxed">
                    Designed for business owners and executives funding children's school milestones. Even if the policyholder passes, all future premiums are waived, and the full maturity benefit is still disbursed on schedule.
                  </p>
                </details>
              </div>

              <div className="pt-8">
                <Link
                  to="/book"
                  className="w-full inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-background transition hover:opacity-90 active:scale-[0.98]"
                >
                  Book consultation on this plan
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>

            {/* Offer 2: Retirement Annuity (Guaranteed Lifetime) */}
            <article className="rounded-3xl border hairline bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b hairline">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    02 / Guaranteed Income
                  </span>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Lifetime
                  </span>
                </div>

                <h3 className="mt-6 font-serif text-3xl font-bold leading-tight">
                  Deferred & Immediate
                  <br />
                  <em className="italic font-normal text-gold">Annuities</em>
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Convert your career savings into guaranteed income that arrives like clockwork every month. Sleep easy knowing you can never outlive your financial cover.
                </p>

                <div className="my-6 rounded-2xl bg-muted/50 p-4 border hairline flex items-baseline justify-between">
                  <div>
                    <span className="font-serif text-2xl font-bold">Custom Cover</span>
                    <span className="text-xs text-muted-foreground"> / month</span>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 font-mono">Guaranteed For Life</span>
                </div>

                <ul className="space-y-2.5 text-xs text-foreground/90 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold shrink-0" />
                    Monthly income deposited directly to your bank
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold shrink-0" />
                    5, 10, or 15-year guaranteed payout terms
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold shrink-0" />
                    Escalating annuity options to beat inflation
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold shrink-0" />
                    Shielded from market crashes or banking failures
                  </li>
                </ul>

                <details className="mt-6 text-xs text-muted-foreground border-t hairline pt-4 group">
                  <summary className="cursor-pointer font-semibold uppercase tracking-wider text-foreground flex items-center justify-between">
                    Inside your annuity contract
                    <span className="group-open:rotate-180 transition-transform">↓</span>
                  </summary>
                  <p className="mt-2 leading-relaxed">
                    Under Nigerian PenCom and NAICOM regulations, annuity contracts have statutory senior priority over all corporate liabilities. Your monthly income is legally safeguarded for the entirety of your retirement.
                  </p>
                </details>
              </div>

              <div className="pt-8">
                <Link
                  to="/book"
                  className="w-full inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-background transition hover:opacity-90 active:scale-[0.98]"
                >
                  Calculate my retirement annuity
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>

            {/* Offer 3: Capital Growth Policy */}
            <article className="rounded-3xl border hairline bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b hairline">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    03 / Capital Growth
                  </span>
                  <span className="rounded-full bg-foreground/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground">
                    Wealth
                  </span>
                </div>

                <h3 className="mt-6 font-serif text-3xl font-bold leading-tight">
                  Investment Savings
                  <br />
                  <em className="italic font-normal text-gold">Policy</em>
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Disciplined wealth creation with a guaranteed capital protection floor. Let compound returns work for your family while keeping life cover active.
                </p>

                <div className="my-6 rounded-2xl bg-muted/50 p-4 border hairline flex items-baseline justify-between">
                  <div>
                    <span className="font-serif text-2xl font-bold">From ₦25,000</span>
                    <span className="text-xs text-muted-foreground"> / month</span>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 font-mono">Floor Protection</span>
                </div>

                <ul className="space-y-2.5 text-xs text-foreground/90 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold shrink-0" />
                    Market-linked upside with zero negative principal
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold shrink-0" />
                    Emergency partial withdrawals permitted
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold shrink-0" />
                    Life cover embedded without medical examination
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold shrink-0" />
                    Annual loyalty compounding bonuses
                  </li>
                </ul>

                <details className="mt-6 text-xs text-muted-foreground border-t hairline pt-4 group">
                  <summary className="cursor-pointer font-semibold uppercase tracking-wider text-foreground flex items-center justify-between">
                    Inside your investment policy
                    <span className="group-open:rotate-180 transition-transform">↓</span>
                  </summary>
                  <p className="mt-2 leading-relaxed">
                    Ideal for young parents, professionals, and entrepreneurs seeking higher growth than bank deposits, while insulating their capital against currency devaluation and stock market crashes.
                  </p>
                </details>
              </div>

              <div className="pt-8">
                <Link
                  to="/book"
                  className="w-full inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-background transition hover:opacity-90 active:scale-[0.98]"
                >
                  Start my wealth plan
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. INSTITUTIONAL STANDING (Lola Adey Recognition Row)
          ==================================================================== */}
      <section className="border-t hairline px-6 py-16 lg:px-10 bg-card">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground text-center sm:text-left mb-8">
            A little context. Six decades of keeping promises.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-l-2 border-gold pl-4">
              <span className="font-serif text-3xl sm:text-4xl font-bold">60+ Years</span>
              <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">
                Institutional stability since 1963
              </p>
            </div>

            <div className="border-l-2 border-gold pl-4">
              <span className="font-serif text-3xl sm:text-4xl font-bold">₦18B+</span>
              <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">
                Paid in verified policy claims
              </p>
            </div>

            <div className="border-l-2 border-gold pl-4">
              <span className="font-serif text-3xl sm:text-4xl font-bold">98% Ratio</span>
              <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">
                Flawless settlement track record
              </p>
            </div>

            <div className="border-l-2 border-gold pl-4">
              <span className="font-serif text-3xl sm:text-4xl font-bold">NAICOM</span>
              <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">
                Regulated & audited compliance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. THE FOUNDER STORY CINEMA SEQUENCE (Dark Theater with Interactive Scrubber)
          ==================================================================== */}
      <section
        id="story"
        ref={storySequenceRef}
        className="story-sequence"
        aria-label="Founder Story Cinema Sequence"
      >
        <div className="chapter-stage">
          {/* Top Bar Readout */}
          <div className="chapter-top">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              02 / The Person Behind The Work
            </p>
            <div className="flex items-center gap-2">
              <span className="chapter-pulse-dot" aria-hidden="true" />
              <span className="text-xs text-white/90 font-mono tracking-wider font-semibold">
                {chapters[activeChapter].label}
              </span>
            </div>
          </div>

          {/* Render 3 Story Scenes */}
          {chapters.map((chap, idx) => (
            <div
              key={chap.number}
              className={`story-scene ${idx === activeChapter ? "is-current" : ""}`}
              aria-hidden={idx !== activeChapter}
            >
              {/* Photo Background with Scrim */}
              <figure className="scene-photo">
                <img
                  src={chap.photo}
                  alt={`Smart Cover — ${chap.title}`}
                  loading="lazy"
                />
              </figure>

              {/* Watermark Backword */}
              <span className="scene-backword" aria-hidden="true">
                {chap.backword}
              </span>

              {/* Copy Box */}
              <div className="scene-copy">
                <span className="scene-number">{chap.number}</span>
                <h3>
                  {chap.title}
                  <br />
                  <em>{chap.titleEmphasis}</em>
                </h3>
                <p>{chap.body}</p>

                <div className="scene-cta flex items-center gap-4">
                  <Link
                    to="/book"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold hover:text-white transition-colors"
                  >
                    Discuss your family goals <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom Controls Bar: Chapter Dots + Scrub Slider */}
          <div className="chapter-bottom">
            {/* Chapter Dots */}
            <div className="chapter-dots" role="tablist" aria-label="Select Story Chapter">
              {chapters.map((c, i) => (
                <button
                  key={c.number}
                  role="tab"
                  aria-selected={i === activeChapter}
                  aria-pressed={i === activeChapter}
                  onClick={() => scrollToChapter(i)}
                >
                  {c.number}
                </button>
              ))}
            </div>

            {/* Interactive Drag Scrubber */}
            <div className="chapter-scrub">
              <div className="flex items-center justify-between text-[10px] text-white/70 uppercase tracking-wider">
                <span className="chapter-scrub-text">Drag to explore chapters</span>
                <span className="chapter-scrub-readout">0{activeChapter + 1} / 03</span>
              </div>
              <input
                ref={scrubberRef}
                type="range"
                id="story-scrubber"
                min="0"
                max="1000"
                step="1"
                defaultValue="100"
                style={{
                  ["--story-progress" as any]: `${
                    activeChapter === 0 ? "10%" : activeChapter === 1 ? "50%" : "90%"
                  }`,
                }}
                onInput={handleScrubberChange}
                onChange={handleScrubberChange}
                aria-label="Explore founder story timeline"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. ADVISOR PROFILE: IN HIS OWN WORDS
          ==================================================================== */}
      <section className="border-t hairline px-6 py-28 lg:px-10 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Portrait Frame */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="overflow-hidden rounded-3xl border hairline bg-card aspect-[4/5] shadow-2xl">
                <img
                  src={founderHeadshot}
                  alt="Okpo Emmanuel Ogbonnaya portrait"
                  width={1280}
                  height={1600}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* In His Words Copy */}
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                In his own words
              </p>

              <h2 className="font-serif text-4xl sm:text-5xl font-bold leading-tight">
                The advisor.
                <br />
                <em className="italic font-normal text-gold">The philosophy.</em>
              </h2>

              <p className="text-base text-muted-foreground leading-relaxed">
                "I don't believe in pressure sales or confusing technical jargon. My life's work is sitting down with Nigerian breadwinners, listening to what they are building, and ensuring their family has a financial fortress that no crisis can break."
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Whether you need advice on structuring an educational trust, locking in a lifetime retirement income stream, or insulating your estate from taxation, Emmanuel handles your portfolio with confidential advisory care.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/book"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-background transition-all hover:opacity-90 active:scale-[0.98]"
                >
                  Schedule a 1:1 conversation
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <a
                  href="https://wa.link/mvnpxr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border hairline bg-card px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-muted transition-colors"
                >
                  <Phone className="h-4 w-4 text-emerald-600" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. SIX PILLARS OF LIFE COVER (Why Life Insurance)
          ==================================================================== */}
      <section id="why-cover" className="border-t hairline px-6 py-28 lg:px-10 bg-card">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              — Why Life Cover
            </p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold leading-tight">
              Six reasons families choose
              <br />
              <em className="italic font-normal text-gold">to be protected.</em>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-3xl border hairline bg-background p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl mb-6"
                  style={{
                    backgroundColor: "color-mix(in oklab, var(--gold) 15%, transparent)",
                  }}
                >
                  <b.icon className="h-6 w-6" style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. INTERACTIVE COVERAGE CALCULATOR
          ==================================================================== */}
      <section id="calculator" className="border-t hairline px-6 py-28 lg:px-10 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Form Column */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border hairline px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  <Calculator className="h-3.5 w-3.5" style={{ color: "var(--gold)" }} />
                  Real-Time Scenario Simulator
                </span>
                <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-bold leading-tight">
                  Design your
                  <br />
                  <em className="italic font-normal text-gold">coverage estimate.</em>
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Adjust your parameters below to see projected maturity values, bonus accumulations, and recommended policy models.
                </p>
              </div>

              {/* Goal Selector */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Select Your Primary Objective:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "endowment", label: "Endowment Payouts" },
                    { id: "annuity", label: "Retirement Annuity" },
                    { id: "growth", label: "Wealth Growth" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setCalculatorGoal(tab.id)}
                      className={`p-3 rounded-2xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                        calculatorGoal === tab.id
                          ? "bg-foreground text-background border-foreground shadow-sm"
                          : "bg-card text-muted-foreground border-border hover:text-foreground"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider">
                  <span>Current Age</span>
                  <span className="font-mono text-gold">{calculatorAge} years</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="65"
                  value={calculatorAge}
                  onChange={(e) => setCalculatorAge(parseInt(e.target.value, 10))}
                  className="w-full accent-gold h-2 bg-muted rounded-lg cursor-pointer"
                />
              </div>

              {/* Budget Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider">
                  <span>Target Monthly Investment</span>
                  <span className="font-mono text-gold">₦{calculatorBudget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="15000"
                  max="500000"
                  step="5000"
                  value={calculatorBudget}
                  onChange={(e) => setCalculatorBudget(parseInt(e.target.value, 10))}
                  className="w-full accent-gold h-2 bg-muted rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Output Column Card */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border hairline bg-card p-8 lg:p-10 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-6 border-b hairline">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Estimated Projection
                  </span>
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-charcoal">
                    {calculatedResult.tag}
                  </span>
                </div>

                <div className="py-8 space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      Recommended Policy Structure
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-foreground mt-1">
                      {calculatedResult.planName}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-muted/40 p-4 border hairline">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                        Full Sum Assured
                      </span>
                      <span className="font-serif text-xl sm:text-2xl font-bold text-foreground mt-1 block">
                        {calculatedResult.coverage}
                      </span>
                    </div>

                    <div className="rounded-2xl bg-muted/40 p-4 border hairline">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                        Est. Payout / Return
                      </span>
                      <span className="font-serif text-xl sm:text-2xl font-bold text-emerald-600 mt-1 block">
                        {calculatedResult.tenYearReturn}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    {calculatedResult.highlight}
                  </p>
                </div>

                <div className="pt-6 border-t hairline flex items-center justify-between">
                  <Link
                    to="/book"
                    className="w-full inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 text-xs font-semibold uppercase tracking-wider text-background transition hover:opacity-90 active:scale-[0.98]"
                  >
                    Lock in this scenario with Emmanuel
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. FREE ADVISORY RESOURCES (Notion-Styled Guides)
          ==================================================================== */}
      <section id="resources" className="border-t hairline px-6 py-28 lg:px-10 bg-card">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b hairline">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                06 / Free Advisory Guides
              </p>
              <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-bold leading-tight">
                Clear knowledge.
                <br />
                <em className="italic font-normal text-gold">A place to begin.</em>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Practical guides compiled from six decades of advisory practice to help you understand your rights, policy structures, and wealth options.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((res) => (
              <div
                key={res.title}
                className="rounded-3xl border hairline bg-background p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground block">
                    {res.tag}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-foreground mt-3 leading-snug">
                    {res.title}
                  </h3>
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    {res.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t hairline flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-mono">{res.readTime}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedResource(res)}
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-foreground hover:underline"
                  >
                    Open guide <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. CLOSING MARQUEE & GRAND CALL TO ACTION
          ==================================================================== */}
      <section className="closing">
        {/* Animated Marquee Ribbon */}
        <div className="closing-marquee" aria-hidden="true">
          <div className="closing-marquee-track">
            <span className="font-serif text-lg font-bold tracking-widest uppercase">
              Protect what matters · Grow what's yours · Stability assured · Over ₦18B paid in claims · Protect what matters · Grow what's yours · Stability assured · Over ₦18B paid in claims
            </span>
          </div>
        </div>

        {/* Closing Copy Block */}
        <div className="px-6 py-28 lg:px-10 text-center max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Your family's security starts with a conversation.
          </p>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
            What will your legacy
            <br />
            <em className="italic font-normal text-gold">look like tomorrow?</em>
          </h2>

          <p className="mt-6 max-w-xl mx-auto text-base text-muted-foreground leading-relaxed">
            Bring your family goals, educational milestones, and retirement timeline. We’ll design the exact financial shield you need.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-foreground px-8 py-3 text-xs font-semibold uppercase tracking-wider text-background transition-all hover:opacity-90 active:scale-[0.98] shadow-lg"
            >
              Book a 1:1 Consultation with Emmanuel
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <a
              href="https://wa.link/mvnpxr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border hairline bg-card px-6 py-3 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-muted transition-colors"
            >
              <Phone className="h-4 w-4 text-emerald-600" />
              WhatsApp Direct
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. BIO & RESOURCE DIALOG MODALS
          ==================================================================== */}
      {/* Advisor Bio Modal */}
      {selectedBioOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl border hairline bg-background p-8 shadow-2xl space-y-5">
            <button
              type="button"
              onClick={() => setSelectedBioOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-muted-foreground hover:text-foreground"
              aria-label="Close bio"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={founderHeadshot}
                alt="Okpo Emmanuel Ogbonnaya"
                className="h-16 w-16 rounded-2xl object-cover border hairline"
              />
              <div>
                <h3 className="font-serif text-2xl font-bold">Okpo Emmanuel Ogbonnaya</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Founder & Senior Advisor · Smart Cover
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Emmanuel Ogbonnaya Okpo has spent decades in the Nigerian insurance advisory space, championing policyholder transparency and swift claims settlement. As the founder of Smart Cover, he bridges the gap between institutional insurance capacity and the real financial needs of modern Nigerian families.
            </p>

            <div className="border-t hairline pt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-mono">0802 460 7699</span>
              <a
                href="https://wa.link/mvnpxr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-600 hover:underline"
              >
                Chat on WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Resource Guide Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl border hairline bg-background p-8 shadow-2xl space-y-5">
            <button
              type="button"
              onClick={() => setSelectedResource(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-muted-foreground hover:text-foreground"
              aria-label="Close guide preview"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gold">
                {selectedResource.tag}
              </span>
              <h3 className="font-serif text-3xl font-bold mt-1 text-foreground">
                {selectedResource.title}
              </h3>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {selectedResource.desc}
            </p>

            <div className="rounded-2xl bg-muted/50 p-4 border hairline text-xs text-muted-foreground space-y-2">
              <p className="font-medium text-foreground">Key Takeaways in this Guide:</p>
              <p>• Statutory policy protections under the Insurance Act of Nigeria.</p>
              <p>• Calculating real returns after inflation and administrative fees.</p>
              <p>• The exact paperwork required to guarantee same-week claims payment.</p>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <Link
                to="/book"
                onClick={() => setSelectedResource(null)}
                className="w-full inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-foreground px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-background"
              >
                Discuss this guide with an advisor
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
