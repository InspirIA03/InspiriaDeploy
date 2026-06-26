"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { PencilRuler, TrendingUp, Workflow, Rocket } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  { key: "p1", Icon: PencilRuler },
  { key: "p2", Icon: TrendingUp },
  { key: "p3", Icon: Workflow },
  { key: "p4", Icon: Rocket },
]

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { t } = useLanguage()

  // Header + rows entrance animation
  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        },
      )

      const rows = listRef.current?.querySelectorAll(".pillar-row")
      if (rows) {
        gsap.fromTo(
          rows,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: listRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Animate the detail panel content whenever the active pillar changes
  useEffect(() => {
    if (!panelRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current!.querySelectorAll(".panel-anim"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" },
      )
    }, panelRef)
    return () => ctx.revert()
  }, [active])

  const activePillar = pillars[active]
  const ghostNumber = String(active + 1).padStart(2, "0")
  const items = t(`cap.${activePillar.key}.items`).split("|")

  return (
    <section id="capabilities" ref={sectionRef} className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden">
      {/* Giant ghost number in the background that reacts to the active pillar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 md:right-8 top-1/2 -translate-y-1/2 select-none"
      >
        <span
          key={ghostNumber}
          className="block font-[var(--font-bebas)] leading-none text-[40vw] md:text-[26vw] text-transparent"
          style={{ WebkitTextStroke: "1px var(--color-border)", opacity: 0.4 }}
        >
          {ghostNumber}
        </span>
      </div>

      {/* Header */}
      <div ref={headerRef} className="relative z-10 mb-14">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{t("cap.subtitle")}</span>
        <h2 className="mt-4 max-w-4xl font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight leading-[0.95] text-balance">
          {t("cap.title")}
        </h2>
        <p className="mt-5 max-w-xl text-muted-foreground leading-relaxed text-pretty">{t("cap.intro")}</p>
        <div className="mt-6 flex items-center gap-3">
          <span className="font-mono text-xs text-accent tabular-nums">{ghostNumber}</span>
          <span className="h-px w-10 bg-border" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            4 {t("cap.counter")}
          </span>
        </div>
      </div>

      {/* Interactive pillars + detail panel */}
      <div className="relative z-10 grid md:grid-cols-2 gap-px bg-border/40 border border-border/40">
        {/* Pillar selector */}
        <ul ref={listRef} className="bg-background">
          {pillars.map((pillar, index) => {
            const isActive = active === index
            return (
              <li key={pillar.key} className="pillar-row border-b border-border/40 last:border-b-0">
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-pressed={isActive}
                  className="group relative flex w-full items-center gap-4 md:gap-6 py-6 md:py-8 px-5 md:px-8 text-left"
                >
                  {/* Accent sweep fill */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-y-0 left-0 -z-10 bg-accent/10 transition-all duration-500 ease-out",
                      isActive ? "w-full" : "w-0",
                    )}
                  />
                  {/* Active left bar */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-0 inset-y-0 w-[3px] bg-accent transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />

                  <span
                    className={cn(
                      "font-mono text-[10px] md:text-xs tabular-nums tracking-widest transition-colors duration-300 shrink-0 w-7",
                      isActive ? "text-accent" : "text-muted-foreground",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <pillar.Icon
                    className={cn(
                      "w-5 h-5 md:w-6 md:h-6 shrink-0 transition-colors duration-300",
                      isActive ? "text-accent" : "text-muted-foreground/70",
                    )}
                    strokeWidth={1.5}
                  />

                  <span
                    className={cn(
                      "font-[var(--font-bebas)] text-3xl md:text-5xl tracking-tight leading-none transition-all duration-300",
                      isActive ? "text-accent md:translate-x-1" : "text-foreground",
                    )}
                  >
                    {t(`cap.${pillar.key}.name`)}
                  </span>

                  <span
                    className={cn(
                      "ml-auto shrink-0 font-mono text-lg transition-all duration-300",
                      isActive
                        ? "text-accent translate-x-0 opacity-100"
                        : "text-muted-foreground/40 -translate-x-2 opacity-0",
                    )}
                  >
                    →
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        {/* Detail panel */}
        <div ref={panelRef} className="bg-background p-6 md:p-10 flex flex-col">
          <div className="panel-anim flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {t("cap.allowsLabel")}
            </span>
            <span className="h-px flex-1 bg-border/60" />
          </div>

          {/* Capability chips */}
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {items.map((item, i) => (
              <li
                key={`${activePillar.key}-${i}`}
                className="panel-anim flex items-center gap-2 border border-border/60 bg-card/40 px-3.5 py-2"
              >
                <span className="h-1.5 w-1.5 rotate-45 bg-accent shrink-0" aria-hidden="true" />
                <span className="text-sm text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>

          {/* Objective */}
          <div className="panel-anim mt-auto pt-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{t("cap.objLabel")}</span>
            <p className="mt-3 font-[var(--font-bebas)] text-2xl md:text-3xl leading-[1.05] tracking-tight text-balance">
              {t(`cap.${activePillar.key}.obj`)}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
