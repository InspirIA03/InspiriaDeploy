"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const audienceKeys = [
  "work.aud.1",
  "work.aud.2",
  "work.aud.3",
  "work.aud.4",
  "work.aud.5",
  "work.aud.6",
  "work.aud.7",
  "work.aud.8",
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const outroRef = useRef<HTMLParagraphElement>(null)
  const { t } = useLanguage()

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
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const items = listRef.current?.querySelectorAll("li")
      if (items && items.length > 0) {
        gsap.set(items, { y: 30, opacity: 0 })
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      gsap.fromTo(
        outroRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: outroRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <div className="max-w-5xl">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{t("work.section")}</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] text-balance max-w-3xl">
            {t("work.title")}
          </h2>
          <p className="mt-6 font-mono text-sm text-muted-foreground">{t("work.intro")}</p>
        </div>

        {/* Audience grid */}
        <ul ref={listRef} className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border/40 border border-border/40">
          {audienceKeys.map((key, index) => (
            <li
              key={key}
              className="group relative flex items-center gap-4 bg-background px-5 py-6 transition-colors duration-300 hover:bg-accent/5"
            >
              <span className="font-mono text-[10px] text-muted-foreground/60 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-[var(--font-bebas)] text-xl md:text-2xl tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
                {t(key)}
              </span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </li>
          ))}
        </ul>

        {/* Outro */}
        <p
          ref={outroRef}
          className="mt-12 max-w-2xl font-sans text-lg md:text-xl leading-relaxed text-pretty text-muted-foreground"
        >
          {t("work.outro").split(/(crear, vender y automatizar|create, sell and automate)/i).map((part, i) =>
            /crear, vender y automatizar|create, sell and automate/i.test(part) ? (
              <span key={i} className="text-accent font-medium">
                {part}
              </span>
            ) : (
              part
            ),
          )}
        </p>
      </div>
    </section>
  )
}
