"use client"

import { useEffect, useRef } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText, SplitFlapMuteToggle, SplitFlapAudioProvider } from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import { BitmapChevron } from "@/components/bitmap-chevron"
import { useLanguage } from "@/lib/language-context"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function HeroAnimation({ t }: { t: (key: string) => string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Two growth lines rising in lockstep — "you" and "us" grow together.
  const youPts = [
    [20, 150],
    [60, 122],
    [100, 108],
    [140, 68],
    [178, 34],
  ]
  const usPts = [
    [20, 168],
    [60, 142],
    [100, 128],
    [140, 92],
    [178, 60],
  ]
  const toStr = (pts: number[][]) => pts.map((p) => p.join(",")).join(" ")

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const lines = containerRef.current!.querySelectorAll<SVGPolylineElement>(".growth-line")
      const dots = containerRef.current!.querySelectorAll(".growth-dot")
      const links = containerRef.current!.querySelectorAll(".growth-link")
      const dash = 320

      gsap.set(lines, { strokeDasharray: dash, strokeDashoffset: dash })
      gsap.set(dots, { scale: 0, transformOrigin: "center" })
      gsap.set(links, { opacity: 0 })

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.1 })
      // Both lines climb together — perfectly in sync.
      tl.to(lines, { strokeDashoffset: 0, duration: 2.2, ease: "power1.inOut" })
        .to(links, { opacity: 1, duration: 0.5, stagger: 0.08 }, 0.5)
        .fromTo(
          dots,
          { scale: 0 },
          { scale: 1, duration: 0.35, stagger: 0.12, ease: "back.out(2.2)" },
          0.6
        )
        // Hold, then reset for the loop.
        .to({}, { duration: 1 })
        .to([lines, dots, links], { opacity: 0, duration: 0.6 }, ">")
        .set(lines, { strokeDashoffset: dash, opacity: 1 })
        .set(dots, { scale: 0, opacity: 1 })
        .set(links, { opacity: 0 })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="hidden md:flex absolute bottom-16 right-20 lg:bottom-20 lg:right-28 xl:right-36"
      aria-hidden="true"
    >
      <div className="relative w-52 h-52 lg:w-60 lg:h-60">
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 200 200">
          {/* baseline / axis */}
          <line x1="20" y1="182" x2="182" y2="182" className="stroke-border/40" strokeWidth="1" />
          <line x1="20" y1="182" x2="20" y2="24" className="stroke-border/40" strokeWidth="1" />

          {/* vertical links between the two lines (the shared upside) */}
          {youPts.map((p, i) => (
            <line
              key={`link-${i}`}
              className="growth-link stroke-accent/40"
              x1={p[0]}
              y1={p[1]}
              x2={usPts[i][0]}
              y2={usPts[i][1]}
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          ))}

          {/* us line (muted) */}
          <polyline
            className="growth-line stroke-accent/45"
            points={toStr(usPts)}
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* you line (accent) */}
          <polyline
            className="growth-line stroke-accent"
            points={toStr(youPts)}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* vertex dots */}
          {youPts.map((p, i) => (
            <rect
              key={`yd-${i}`}
              className="growth-dot fill-accent"
              x={p[0] - 2.5}
              y={p[1] - 2.5}
              width="5"
              height="5"
            />
          ))}
          {usPts.map((p, i) => (
            <rect
              key={`ud-${i}`}
              className="growth-dot fill-accent/50"
              x={p[0] - 2}
              y={p[1] - 2}
              width="4"
              height="4"
            />
          ))}
        </svg>

        {/* line labels — placed to the right of each line's end point so they never overlap the graph */}
        <span
          className="absolute flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.15em] text-accent"
          style={{ top: "9%", left: "100%", marginLeft: "0.5rem" }}
        >
          <span className="inline-block w-2 h-0.5 bg-accent" aria-hidden="true" />
          {t("hero.anim.you")}
        </span>
        <span
          className="absolute flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.15em] text-accent/60"
          style={{ top: "26%", left: "100%", marginLeft: "0.5rem" }}
        >
          <span className="inline-block w-2 h-0.5 bg-accent/50" aria-hidden="true" />
          {t("hero.anim.us")}
        </span>

        {/* headline label */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80">
            {t("hero.animation.label")}
          </span>
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { language, toggleLanguage, t } = useLanguage()

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center pl-6 md:pl-28 pr-6 md:pr-12">
      <AnimatedNoise opacity={0.03} />

      {/* Language toggle */}
      <button
        onClick={toggleLanguage}
        role="switch"
        aria-checked={language === "en"}
        aria-label={language === "es" ? "Switch to English" : "Cambiar a Español"}
        className="group absolute top-6 right-6 md:top-8 md:right-12 z-50 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest"
      >
        <span
          className={`transition-colors duration-200 ${
            language === "es" ? "text-accent" : "text-muted-foreground/50"
          }`}
        >
          ES
        </span>
        <span className="relative inline-flex h-4 w-8 items-center border border-border/60 transition-colors duration-200 group-hover:border-accent">
          <span
            className={`absolute h-2.5 w-2.5 bg-accent transition-transform duration-200 ${
              language === "es" ? "translate-x-[3px]" : "translate-x-[15px]"
            }`}
          />
        </span>
        <span
          className={`transition-colors duration-200 ${
            language === "en" ? "text-accent" : "text-muted-foreground/50"
          }`}
        >
          EN
        </span>
      </button>

      {/* Main content */}
      <div ref={contentRef} className="flex-1 w-full max-w-4xl">
        <SplitFlapAudioProvider>
          <div className="relative">
            <SplitFlapText text={t("hero.title")} speed={80} key={language} />
            <div className="mt-4">
              <SplitFlapMuteToggle />
            </div>
          </div>
        </SplitFlapAudioProvider>

        <h2 className="font-[var(--font-bebas)] text-muted-foreground/60 text-[clamp(1.5rem,4vw,3rem)] mt-4 tracking-wide uppercase">
          {t("hero.subtitle")}
        </h2>

        <p className="mt-8 max-w-2xl font-sans text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed">
          {t("hero.description")}
        </p>

        {/* Mobile-only subtle value-prop banner */}
        <div className="md:hidden mt-12 flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">
            {t("hero.animation.label")}
          </span>
        </div>

        <div className="mt-8 md:mt-16">
          <a
            href="#apply"
            className="group inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
          >
            <ScrambleTextOnHover text={t("hero.cta")} as="span" duration={0.6} />
            <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
          </a>
        </div>
      </div>

      {/* Animated growth visualization */}
      <HeroAnimation t={t} />
    </section>
  )
}
