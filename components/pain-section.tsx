"use client"

import { useRef, useEffect } from "react"
import { HighlightText } from "@/components/highlight-text"
import { useLanguage } from "@/lib/language-context"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PainSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Title reveal with stagger per word
      const titleWords = titleRef.current?.querySelectorAll(".pain-word")
      if (titleWords) {
        gsap.set(titleWords, { y: 100, opacity: 0 })
        gsap.to(titleWords, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Intro fades in
      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      // Vertical line grows alongside the list
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 80%",
              end: "bottom 70%",
              scrub: 1,
            },
          },
        )
      }

      // Pain points reveal one by one
      const items = listRef.current?.querySelectorAll(".pain-item")
      if (items) {
        gsap.set(items, { x: -40, opacity: 0 })
        gsap.to(items, {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const titleWords = [
    { key: "pain.title.1", highlight: false },
    { key: "pain.title.2", highlight: false },
    { key: "pain.title.3", highlight: false },
    { key: "pain.title.4", highlight: true },
  ]

  const points = [
    "pain.point.1",
    "pain.point.2",
    "pain.point.3",
    "pain.point.4",
    "pain.point.5",
    "pain.point.6",
    "pain.point.7",
  ]

  return (
    <section
      ref={sectionRef}
      id="pain"
      className="relative py-32 md:py-48 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section label */}
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8 block">
          {t("pain.section")}
        </span>

        {/* Title */}
        <div ref={titleRef} className="max-w-4xl">
          <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]">
            {titleWords.map((word, i) => (
              <span key={i} className="pain-word inline-block mr-[0.25em]">
                {word.highlight ? <HighlightText parallaxSpeed={0.4}>{t(word.key)}</HighlightText> : t(word.key)}
              </span>
            ))}
          </h2>
        </div>

        {/* Intro */}
        <p
          ref={introRef}
          className="mt-10 md:mt-14 max-w-xl font-sans text-lg md:text-xl text-foreground/80 leading-relaxed"
        >
          {t("pain.intro")}
        </p>

        {/* Pain points diagnostic list */}
        <div className="relative mt-12 md:mt-16 pl-6 md:pl-10">
          {/* Growing vertical line */}
          <div
            ref={lineRef}
            className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-accent/30 to-transparent origin-top"
          />

          <ul ref={listRef} className="flex flex-col">
            {points.map((point, i) => (
              <li
                key={point}
                className="pain-item group relative flex items-start gap-4 md:gap-6 py-5 md:py-6 border-b border-border/40"
              >
                {/* Number */}
                <span className="font-mono text-[11px] md:text-xs text-muted-foreground/60 pt-1.5 tabular-nums w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Problem marker */}
                <span
                  aria-hidden="true"
                  className="mt-2 md:mt-2.5 h-3 w-3 shrink-0 rotate-45 border border-accent/50 transition-colors duration-300 group-hover:bg-accent/20"
                />

                {/* Text */}
                <p className="font-sans text-lg md:text-2xl text-foreground/90 leading-snug text-pretty transition-colors duration-300 group-hover:text-foreground">
                  {t(point)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
