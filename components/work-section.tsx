"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Check } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const audienceData = [
  { labelKey: "work.aud.1", index: "01", span: "col-span-2 row-span-2" },
  { labelKey: "work.aud.2", index: "02", span: "col-span-1 row-span-1" },
  { labelKey: "work.aud.3", index: "03", span: "col-span-1 row-span-2" },
  { labelKey: "work.aud.4", index: "04", span: "col-span-2 row-span-1" },
  { labelKey: "work.aud.5", index: "05", span: "col-span-1 row-span-1" },
  { labelKey: "work.aud.6", index: "06", span: "col-span-1 row-span-1" },
  { labelKey: "work.aud.7", index: "07", span: "col-span-1 row-span-1" },
  { labelKey: "work.aud.8", index: "08", span: "col-span-1 row-span-1" },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const outroRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in from left
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      const cards = gridRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 60, opacity: 0 })
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }

      if (outroRef.current) {
        gsap.fromTo(
          outroRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: outroRef.current,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-10 max-w-4xl">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{t("work.section")}</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight text-balance leading-[0.95]">
          {t("work.title")}
        </h2>
      </div>

      <p ref={introRef} className="mb-12 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
        {t("work.intro")}
      </p>

      {/* Asymmetric grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[160px] md:auto-rows-[190px]"
      >
        {audienceData.map((audience, index) => (
          <AudienceCard key={index} audience={audience} persistHover={index === 0} t={t} />
        ))}
      </div>

      {/* Outro */}
      <div ref={outroRef} className="mt-16 max-w-3xl border-l-2 border-accent pl-6">
        <p className="font-[var(--font-bebas)] text-2xl md:text-4xl tracking-tight leading-tight text-pretty">
          {t("work.outro")}
        </p>
      </div>
    </section>
  )
}

function AudienceCard({
  audience,
  persistHover = false,
  t,
}: {
  audience: {
    labelKey: string
    index: string
    span: string
  }
  persistHover?: boolean
  t: (key: string) => string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const [isScrollActive, setIsScrollActive] = useState(false)

  useEffect(() => {
    if (!persistHover || !cardRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 80%",
        onEnter: () => setIsScrollActive(true),
      })
    }, cardRef)

    return () => ctx.revert()
  }, [persistHover])

  const isActive = isHovered || isScrollActive

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative border border-border/40 p-5 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden",
        audience.span,
        isActive && "border-accent/60",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background layer */}
      <div
        className={cn(
          "absolute inset-0 bg-accent/5 transition-opacity duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Content */}
      <div className="relative z-10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{audience.index}</span>
      </div>

      <div className="relative z-10">
        <h3
          className={cn(
            "font-[var(--font-bebas)] text-2xl md:text-4xl tracking-tight transition-colors duration-300 leading-[0.95]",
            isActive ? "text-accent" : "text-foreground",
          )}
        >
          {t(audience.labelKey)}
        </h3>
      </div>

      {/* Checkmark indicator */}
      <div
        className={cn(
          "absolute bottom-4 right-4 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300",
          isActive ? "border-accent bg-accent/20" : "border-muted-foreground/40 bg-transparent",
        )}
      >
        <Check
          className={cn(
            "w-3 h-3 transition-colors duration-300",
            isActive ? "text-accent" : "text-muted-foreground/40",
          )}
        />
      </div>

      {/* Corner line */}
      <div
        className={cn(
          "absolute top-0 right-0 w-12 h-12 transition-all duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}
