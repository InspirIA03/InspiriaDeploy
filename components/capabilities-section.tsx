"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  GraduationCap,
  Users,
  Filter,
  FileInput,
  Workflow,
  GitBranch,
  UserSearch,
  Tags,
  Bot,
  CalendarDays,
  Share2,
  Database,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
  { key: "cap.1", Icon: GraduationCap },
  { key: "cap.2", Icon: Users },
  { key: "cap.3", Icon: Filter },
  { key: "cap.4", Icon: FileInput },
  { key: "cap.5", Icon: Workflow },
  { key: "cap.6", Icon: GitBranch },
  { key: "cap.7", Icon: UserSearch },
  { key: "cap.8", Icon: Tags },
  { key: "cap.9", Icon: Bot },
  { key: "cap.10", Icon: CalendarDays },
  { key: "cap.11", Icon: Share2, detailKey: "cap.11.detail" },
  { key: "cap.12", Icon: Database },
]

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState<number | null>(null)
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

      const rows = listRef.current?.querySelectorAll(".cap-row")
      if (rows) {
        gsap.fromTo(
          rows,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: listRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const displayIndex = active !== null ? active : null
  const ghostNumber = displayIndex !== null ? String(displayIndex + 1).padStart(2, "0") : "12"

  return (
    <section id="capabilities" ref={sectionRef} className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden">
      {/* Giant ghost number in the background that reacts to hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 md:right-8 top-1/2 -translate-y-1/2 select-none"
      >
        <span
          key={ghostNumber}
          className="block font-[var(--font-bebas)] leading-none text-[40vw] md:text-[28vw] text-transparent transition-all duration-500"
          style={{
            WebkitTextStroke: "1px var(--color-border)",
            opacity: active !== null ? 0.5 : 0.18,
          }}
        >
          {ghostNumber}
        </span>
      </div>

      {/* Header */}
      <div ref={headerRef} className="relative z-10 mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{t("cap.subtitle")}</span>
        <h2 className="mt-4 max-w-4xl font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight leading-[0.95] text-balance">
          {t("cap.title")}
        </h2>
        <div className="mt-6 flex items-center gap-3">
          <span className="font-mono text-xs text-accent tabular-nums">{ghostNumber}</span>
          <span className="h-px w-10 bg-border" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            12 {t("cap.counter")}
          </span>
        </div>
      </div>

      {/* Interactive index list */}
      <ul ref={listRef} className="relative z-10 border-t border-border/40">
        {capabilities.map((cap, index) => {
          const isActive = active === index
          return (
            <li
              key={cap.key}
              className="cap-row border-b border-border/40"
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
            >
              <button
                type="button"
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                className="group relative flex w-full items-center gap-4 md:gap-8 py-5 md:py-7 text-left"
              >
                {/* Accent sweep fill */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-y-0 left-0 -z-10 bg-accent/10 transition-all duration-500 ease-out",
                    isActive ? "w-full" : "w-0",
                  )}
                />

                {/* Index */}
                <span
                  className={cn(
                    "font-mono text-[10px] md:text-xs tabular-nums tracking-widest transition-colors duration-300 shrink-0 w-7",
                    isActive ? "text-accent" : "text-muted-foreground",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <cap.Icon
                  className={cn(
                    "w-5 h-5 md:w-6 md:h-6 shrink-0 transition-colors duration-300",
                    isActive ? "text-accent" : "text-muted-foreground/70",
                  )}
                  strokeWidth={1.5}
                />

                {/* Title + optional detail */}
                <span className="flex flex-col min-w-0">
                  <span
                    className={cn(
                      "font-[var(--font-bebas)] text-2xl md:text-4xl tracking-tight leading-none transition-all duration-300",
                      isActive ? "text-accent md:translate-x-2" : "text-foreground",
                    )}
                  >
                    {t(cap.key)}
                  </span>
                  {cap.detailKey && (
                    <span
                      className={cn(
                        "font-mono text-[10px] md:text-xs text-muted-foreground tracking-wide overflow-hidden transition-all duration-500",
                        isActive ? "max-h-8 mt-2 opacity-100" : "max-h-0 opacity-0 md:max-h-0 md:opacity-0",
                      )}
                    >
                      {t(cap.detailKey)}
                    </span>
                  )}
                </span>

                {/* Arrow */}
                <span
                  className={cn(
                    "ml-auto shrink-0 font-mono text-lg transition-all duration-300",
                    isActive ? "text-accent translate-x-0 opacity-100" : "text-muted-foreground/40 -translate-x-2 opacity-0",
                  )}
                >
                  →
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
