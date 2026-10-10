import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Award,
  Bed,
  Heart,
  Leaf,
  PiggyBank,
  Search,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Umbrella,
  Wallet,
  Clock,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import founderHeadshot from "@/assets/Professional_Headshot.png";
import endowmentWoman from "@/assets/endowment-woman.jpg";
import planFamily from "@/assets/plan-family.jpg";
import planRetirement from "@/assets/plan-retirement.jpg";
import planAnnuity from "@/assets/plan-annuity.jpg";
import planInvestment from "@/assets/plan-investment.jpg";
import planSavings from "@/assets/plan-savings.jpg";
import planCar from "@/assets/plan-car.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SMART COVER Insurance — Protect what matters. Grow what's yours." },
      {
        name: "description",
        content:
          "Endowment, annuity, life and general insurance plans. Guaranteed payouts, lifetime income and protection for your family.",
      },
      { property: "og:title", content: "SMART COVER Insurance — Modern cover for modern families" },
      {
        property: "og:description",
        content: "Endowment, annuity, life and general insurance plans built around you.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const plans = [
  {
    img: planFamily,
    badge: "Flagship",
    name: "Flexible Endowment Plan",
    tagline: "Savings, investment and protection in one policy.",
    price: "From ₦1.8M / yr",
    specs: ["6–15 yr term", "Partial payouts", "4% bonus"],
  },
  {
    img: planRetirement,
    badge: "Popular",
    name: "Deferred Annuity",
    tagline: "Save today, earn a guaranteed income at retirement.",
    price: "Custom premium",
    specs: ["Retire at 50–70", "Tax-free", "Lifetime income"],
  },
  {
    img: planAnnuity,
    badge: "New",
    name: "Immediate Annuity",
    tagline: "Convert a lump sum into income that arrives every month.",
    price: "Lump sum based",
    specs: ["Pays for life", "5/10 yr guarantee", "Escalating option"],
  },
  {
    img: planInvestment,
    badge: "Growth",
    name: "Investment Policy",
    tagline: "Let your money work as hard as you do.",
    price: "From ₦25k / mo",
    specs: ["Wealth growth", "Flexible terms", "Loyalty bonus"],
  },
  {
    img: planSavings,
    badge: "Starter",
    name: "Savings Plan",
    tagline: "Disciplined saving with built-in life cover.",
    price: "From ₦10k / mo",
    specs: ["Goal-based", "Life cover", "Withdrawals"],
  },
  {
    img: planCar,
    badge: "General",
    name: "Car Insurance",
    tagline: "Third-party or comprehensive cover for any vehicle.",
    price: "From ₦15k / yr",
    specs: ["Third-party", "Comprehensive", "24/7 claims"],
  },
];

const benefits = [
  { icon: TrendingUp, title: "Great Return", body: "Reversionary bonuses of 4% added every year on qualifying plans." },
  { icon: Shield, title: "Life Cover", body: "Full sum assured paid to your loved ones if the unthinkable happens." },
  { icon: Wallet, title: "Tax Benefits", body: "Premiums and benefits are tax-free under Nigerian insurance law." },
  { icon: Heart, title: "Peace of Mind", body: "Sleep easy knowing the people you love are protected." },
  { icon: Sparkles, title: "Secure Your Future", body: "Lock in a lifetime income stream you cannot outlive." },
  { icon: ShieldCheck, title: "Financial Safety", body: "A regulated, decades-old insurer behind every promise." },
];

const delays = [
  { n: "01", title: "Higher premiums", body: "Every year you wait, the price of cover goes up." },
  { n: "02", title: "Increased health risks", body: "New conditions can disqualify you from preferred rates." },
  { n: "03", title: "Possible exclusions", body: "Insurers exclude pre-existing conditions discovered later." },
  { n: "04", title: "Missed protection", body: "A claim that happens before you sign up is never paid." },
];

const steps = [
  { n: "01", title: "Tell us about you", body: "Share your goals, age and the people who depend on you." },
  { n: "02", title: "Compare plans", body: "We match you with two or three plans built for your life." },
  { n: "03", title: "Book a call", body: "A licensed advisor walks you through the details — no pressure." },
  { n: "04", title: "Get covered", body: "Sign digitally and your cover is active the same day." },
];

const advantages = [
  "A guaranteed regular income for the rest of your life.",
  "Premiums and benefits are completely tax-free.",
  "Your investments are professionally managed — sit back and enjoy retirement.",
  "Live long and prosper — annuity pays for as long as you do.",
];

const TYPED_HEADLINE = "Grow what's yours.";

function TypedHeadline() {
  const [visibleText, setVisibleText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const headlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = headlineRef.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
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
    <span ref={headlineRef} className="typed-headline italic font-normal text-muted-foreground" aria-label={TYPED_HEADLINE}>
      <span className="typed-headline-reserve" aria-hidden="true">{TYPED_HEADLINE}</span>
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
    <div className="mt-8 px-4 sm:px-6 lg:absolute lg:inset-x-0 lg:-bottom-0 lg:mt-0 lg:px-10">
      <div
        className="mx-auto max-w-6xl rounded-2xl border hairline bg-card p-3 shadow-xl transition-all duration-300"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="grid grid-cols-1 divide-y hairline sm:grid-cols-2 sm:divide-y-0 sm:divide-x md:grid-cols-4">
          {/* Plan Type */}
          <div className="flex flex-col justify-center px-4 py-3 sm:px-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Plan Type
              </p>
              <span className="inline-block rounded-full bg-foreground/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-foreground">
                {current.tag}
              </span>
            </div>
            <div key={`plan-${index}`} className="quote-animate mt-1">
              <p className="font-display text-base font-bold truncate text-foreground">
                {current.plan}
              </p>
            </div>
          </div>

          {/* Your Age */}
          <div className="flex flex-col justify-center px-4 py-3 sm:px-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Your Age
            </p>
            <div key={`age-${index}`} className="quote-animate mt-1">
              <p className="font-display text-base font-bold text-foreground">
                {current.age}
              </p>
            </div>
          </div>

          {/* Coverage */}
          <div className="flex flex-col justify-center px-4 py-3 sm:px-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Coverage
              </p>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" title="Active real-time quote" />
            </div>
            <div key={`cov-${index}`} className="quote-animate mt-1">
              <p className="font-display text-base font-bold text-foreground">
                {current.coverage}
              </p>
            </div>
          </div>

          {/* CTA + Navigation Dots */}
          <div className="flex flex-col justify-center gap-2 p-1">
            <Link
              to="/book"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background transition hover:opacity-90 active:scale-[0.98]"
            >
              <Search className="h-4 w-4" /> Get my quote
            </Link>
            <div className="flex items-center justify-center gap-1.5 pb-0.5">
              {quoteScenarios.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Switch to quote preview ${i + 1}`}
                  className={`min-h-[24px] min-w-[24px] inline-flex items-center justify-center`}
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

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section id="home" className="relative px-4 pb-12 pt-6 sm:px-6 lg:px-10 lg:pb-44 lg:pt-10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border hairline px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <Leaf className="h-3.5 w-3.5" style={{ color: "var(--gold)" }} />
              Est. 1963 — Stability assured
            </span>
            <h1 className="mt-7 font-display text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Protect what matters.{" "}
              <TypedHeadline />
            </h1>
            <p className="mt-6 max-w-lg text-base text-muted-foreground sm:text-lg">
              Endowment, annuity, life and general insurance built for Nigerian families who want their money to do more than just sit still.
            </p>

            <div className="mt-10 flex items-center gap-5">
              <div className="flex -space-x-3">
                {[planFamily, planRetirement, planAnnuity].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="h-10 w-10 rounded-full border-2 border-background object-cover"
                  />
                ))}
                <div className="flex h-10 items-center rounded-full border-2 border-background bg-foreground px-3 text-xs font-medium text-background">
                  +2k
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Families covered.<br />Generations protected.
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-2xl shadow-xl aspect-[4/5] sm:rounded-[28px]">
              <img
                src={founderHeadshot}
                alt="Okpo Emmanuel Ogbonnaya — Founder of Smart Cover"
                width={1280}
                height={1600}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
            <div className="founder-caption mt-6 flex items-center gap-4" aria-label="Founder">
              <span className="founder-caption-rule block h-12 w-0.5 shrink-0 bg-gold" aria-hidden="true" />
              <div className="min-w-0">
                <p className="founder-caption-name font-display text-xl font-bold leading-snug text-foreground sm:text-2xl">
                  Okpo Emmanuel Ogbonnaya
                </p>
                <p className="founder-caption-title mt-1 text-sm font-medium text-muted-foreground">
                  Founder of Smart Cover
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Quote Bar */}
        <FloatingQuoteBar />
      </section>

      {/* ABOUT + STATS */}
      <section id="about" className="px-6 pt-40 pb-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                — About SMART COVER
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
                Six decades of <span className="italic font-normal">keeping promises.</span>
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[
                { n: "40+", l: "Years experience" },
                { n: "₦18B", l: "Paid in claims" },
                { n: "98%", l: "Claim success" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-3xl font-bold md:text-4xl">{s.n}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { icon: ShieldCheck, t: "Trust", b: "Regulated by NAICOM, audited by global firms. Your premium is safer with us." },
              { icon: Umbrella, t: "Stability", b: "An asset book that has weathered every Nigerian market cycle since 1963." },
              { icon: Award, t: "Flexibility", b: "Plans you can pause, top up, borrow against, or convert as life changes." },
            ].map((c) => (
              <div key={c.t} className="group rounded-3xl border hairline bg-card p-8 transition hover:shadow-lg">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-muted transition group-hover:bg-foreground group-hover:text-background">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-bold">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY LIFE INSURANCE */}
      <section className="border-t hairline px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">— Why life insurance</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              Six reasons people choose to be covered.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-3xl border hairline bg-card p-8">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: "color-mix(in oklab, var(--gold) 18%, transparent)" }}>
                  <b.icon className="h-5 w-5" style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PLANS */}
      <section id="plans" className="border-t hairline px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">— Featured plans</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
                A plan for every <span className="italic font-normal">chapter.</span>
              </h2>
            </div>
            <Link to="/book" className="inline-flex items-center gap-2 text-sm font-medium">
              Speak with an advisor <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => (
              <article key={p.name} className="group rounded-3xl border hairline bg-card p-3">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] backdrop-blur">
                    {p.badge}
                  </span>
                  <Link
                    to="/book"
                    className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-3 py-1.5 text-[11px] font-semibold text-foreground backdrop-blur transition-all duration-200 hover:bg-foreground hover:text-background hover:scale-105 shadow-sm"
                  >
                    Quick Quote
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="px-3 pb-3 pt-5">
                  <h3 className="font-display text-xl font-bold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                  <p className="mt-4 font-display text-lg font-bold" style={{ color: "var(--charcoal)" }}>{p.price}</p>
                  <div className="mt-4 flex flex-wrap gap-4 border-t hairline pt-4 text-xs text-muted-foreground">
                    {p.specs.map((s) => (
                      <span key={s} className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-gold" />{s}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ENDOWMENT SPOTLIGHT */}
      <section className="border-t hairline px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[28px] aspect-[4/5]">
            <img
              src={endowmentWoman}
              alt="Reviewing a SMART COVER endowment plan"
              loading="lazy"
              width={1024}
              height={1280}
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">— Spotlight: Flexible Endowment Plan</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              More than insurance. <span className="italic font-normal">A combination.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Savings + Investment + Protection. Receive 25% of your sum assured at one-third of the term, another 25% at two-thirds, and the full 100% at maturity — plus a 4% annual reversionary bonus.
            </p>

            <div className="mt-8 overflow-x-auto rounded-2xl border hairline">
              <table className="w-full min-w-[340px] text-sm">
                <thead className="bg-muted/60 text-left text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3">Term</th>
                    <th className="px-5 py-3">Annual Premium</th>
                    <th className="px-5 py-3">Maturity Benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y hairline">
                  {[
                    ["6 yrs", "₦5,278,800", "₦34,800,000"],
                    ["9 yrs", "₦3,160,800", "₦37,200,000"],
                    ["12 yrs", "₦2,322,600", "₦39,600,000"],
                    ["15 yrs", "₦1,825,800", "₦42,000,000"],
                  ].map((row) => (
                    <tr key={row[0]}>
                      {row.map((c, i) => (
                        <td key={i} className={`px-5 py-3 ${i === 0 ? "font-display font-bold" : ""}`}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Illustration based on ₦20,000,000 sum assured, age 35. Real numbers depend on your profile.</p>
          </div>
        </div>
      </section>

      {/* COST OF DELAYING — dark band */}
      <section className="px-6 lg:px-10">
        <div
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] px-8 py-20 text-background dot-grid md:px-14"
          style={{ backgroundColor: "var(--charcoal)" }}
        >
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-[0.22em] opacity-60">— The cost of delaying</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight md:text-5xl">
              The best time was yesterday. <span className="italic font-normal opacity-70">The next best time is now.</span>
            </h2>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {delays.map((d) => (
                <div key={d.n} className="relative overflow-hidden rounded-2xl border border-white/10 p-7">
                  <span className="absolute right-4 top-3 font-display text-5xl font-extrabold opacity-15">{d.n}</span>
                  <Clock className="h-5 w-5" style={{ color: "var(--gold)" }} />
                  <h3 className="mt-6 font-display text-xl font-bold">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed opacity-70">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="process" className="px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">— How it works</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              From quote to cover in four steps.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="relative overflow-hidden rounded-3xl bg-muted/60 p-10">
                <span className="absolute right-5 top-3 font-display text-6xl font-extrabold text-foreground/10">{s.n}</span>
                <PiggyBank className="h-6 w-6" style={{ color: "var(--gold)" }} />
                <h3 className="mt-8 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES OF ANNUITY */}
      <section className="border-t hairline px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">— Why annuities</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              We keep sending you cheques <span className="italic font-normal">when others stop.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Annuities turn the savings you built during your working years into a regular pay-check you cannot outlive.
            </p>
          </div>
          <ul className="space-y-5">
            {advantages.map((a, i) => (
              <li key={a} className="flex items-start gap-5 rounded-2xl border hairline bg-card p-6">
                <span className="font-display text-3xl font-extrabold" style={{ color: "var(--gold)" }}>
                  0{i + 1}
                </span>
                <p className="text-base">{a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 lg:px-10">
        <div
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] px-8 py-20 text-background dot-grid md:px-14"
          style={{ backgroundColor: "var(--charcoal)" }}
        >
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] opacity-60">— Let's talk</p>
              <h2 className="mt-4 font-display text-5xl font-bold leading-tight md:text-6xl">
                Let's talk about your cover.
              </h2>
              <p className="mt-5 max-w-md opacity-70">
                A 15-minute call with a licensed advisor. No pressure, no jargon — just a plan that fits.
              </p>
            </div>

            <div className="rounded-3xl bg-card p-10 text-foreground shadow-2xl">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                — Your advisor
              </p>
              <p className="mt-3 font-display text-2xl font-bold">Emmanuel Ogbonnaya Okpo</p>
              <p className="mt-1 text-sm text-muted-foreground">Licensed SMART COVER advisor · NAICOM regulated</p>

              <div className="mt-8 space-y-3">
                <a
                  href="https://wa.link/mvnpxr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-between gap-3 rounded-2xl bg-foreground px-6 py-5 font-medium text-background transition hover:opacity-90"
                >
                  <span className="inline-flex items-center gap-3">
                    <Send className="h-5 w-5" />
                    Book a Call (WhatsApp)
                  </span>
                  <span className="text-sm opacity-60 transition group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="tel:+2348024607699"
                  className="group inline-flex w-full items-center justify-between gap-3 rounded-2xl border hairline px-6 py-5 font-medium transition hover:bg-muted/60"
                >
                  <span className="inline-flex items-center gap-3">
                    <PiggyBank className="h-5 w-5" style={{ color: "var(--gold)" }} />
                    Call 0802 460 7699
                  </span>
                  <span className="text-sm opacity-50 transition group-hover:translate-x-1">→</span>
                </a>
              </div>

              <div className="mt-8 flex items-center gap-2 border-t hairline pt-5 text-xs text-muted-foreground">
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "var(--gold)" }} />
                Replies within minutes · Mon–Sat
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
