import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import bookAdvisor from "@/assets/book-advisor.jpg";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Call — SMART COVER Insurance" },
      {
        name: "description",
        content:
          "Book a 15-minute call with a licensed SMART COVER advisor. Get a personalised quote for endowment, annuity, life or car insurance.",
      },
      { property: "og:title", content: "Book a Call with SMART COVER" },
      { property: "og:description", content: "Speak with a licensed insurance advisor — no pressure, no jargon." },
      { property: "og:url", content: "/book" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

const faqs = [
  { q: "How long is the call?", a: "About 15 minutes. We respect your time and only run long if you ask us to." },
  { q: "Is it free?", a: "Yes. Every introductory call with a SMART COVER advisor is free and carries no obligation." },
  { q: "What should I prepare?", a: "Just an idea of who depends on you, your monthly budget, and any existing cover you hold." },
  { q: "Can I reschedule?", a: "Of course. You'll receive a confirmation email with a link to reschedule or cancel at any time." },
];

function BookPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero strip */}
      <section className="border-b hairline px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Book a call with <span className="italic font-normal text-muted-foreground">an advisor.</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              15 minutes. No jargon. Walk away with a plan tailored to the people who depend on you — and the future you're building.
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.15fr]">
          {/* Trust panel */}
          <aside className="space-y-8">
            <div className="overflow-hidden rounded-[28px] aspect-[4/5]">
              <img
                src={bookAdvisor}
                alt="SMART COVER advisor"
                loading="lazy"
                width={1024}
                height={1280}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>

            <div className="rounded-3xl border hairline bg-card p-8">
              <p className="font-display text-2xl font-bold leading-snug">
                "We keep sending you cheques <span className="italic font-normal">when others stop."</span>
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Promise we've kept since 1963 — across every annuity, endowment and life policy we've written.
              </p>
              <div className="mt-6 border-t hairline pt-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Your advisor</p>
                <p className="mt-2 font-display text-lg font-bold">Emmanuel Ogbonnaya Okpo</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <a href="tel:+2348024607699" className="hover:text-foreground">0802 460 7699</a>
                  <span className="mx-2 opacity-40">·</span>
                  <a href="tel:+2349131832676" className="hover:text-foreground">0913 183 2676</a>
                </p>
              </div>
            </div>

            <ul className="space-y-4">
              {[
                "Licensed, NAICOM-regulated advisors only.",
                "No pressure — you decide if and when to sign.",
                "Quotes for endowment, annuity, life and car.",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--gold)" }} />
                  {p}
                </li>
              ))}
            </ul>
          </aside>

          {/* CTA card */}
          <div
            className="relative overflow-hidden rounded-[28px] border hairline p-10 shadow-xl md:p-14"
            style={{ backgroundColor: "var(--charcoal)", color: "var(--background)" }}
          >
            <div className="dot-grid absolute inset-0 opacity-20" aria-hidden />
            <div className="relative flex h-full min-h-[520px] flex-col">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--gold)" }} />
                Live now — instant reply
              </span>
              <h2 className="mt-8 font-display text-4xl font-extrabold leading-[1.05] md:text-5xl">
                Book a call. <span className="italic font-normal opacity-70">We’ll reach out.</span>
              </h2>
              <p className="mt-5 max-w-md text-white/70">
                Tap the button below to fill a quick form. Emmanuel will review it and call you back — usually within the same day.
              </p>

              <div className="mt-10 space-y-4">
                <a
                  href="https://wa.link/mvnpxr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-between gap-3 rounded-2xl bg-white px-6 py-5 font-medium text-black transition hover:opacity-90"
                >
                  <span className="inline-flex items-center gap-3">
                    <MessageCircle className="h-5 w-5" />
                    Chat / Book on WhatsApp
                  </span>
                  <span className="text-sm opacity-60 transition group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="tel:+2348024607699"
                  className="group inline-flex w-full items-center justify-between gap-3 rounded-2xl border border-white/15 px-6 py-5 font-medium text-white transition hover:bg-white/5"
                >
                  <span className="inline-flex items-center gap-3">
                    <Phone className="h-5 w-5" />
                    Call 0802 460 7699
                  </span>
                  <span className="text-sm opacity-60 transition group-hover:translate-x-1">→</span>
                </a>
              </div>

              <div className="mt-auto grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                {[
                  { n: "15 min", l: "Avg. call" },
                  { n: "Free", l: "No obligation" },
                  { n: "Same day", l: "Cover active" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="font-display text-2xl font-bold">{s.n}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/50">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t hairline px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">— FAQ</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              Before you book.
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`q-${i}`}>
                <AccordionTrigger className="font-display text-lg font-bold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}