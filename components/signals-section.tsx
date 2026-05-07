"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const beneficiosData = [
  { icon: "01", titleKey: "signals.item1.title", noteKey: "signals.item1.desc" },
  { icon: "02", titleKey: "signals.item2.title", noteKey: "signals.item2.desc" },
  { icon: "03", titleKey: "signals.item3.title", noteKey: "signals.item3.desc" },
  { icon: "04", titleKey: "signals.item4.title", noteKey: "signals.item4.desc" },
  { icon: "05", titleKey: "signals.item5.title", noteKey: "signals.item5.desc" },
]

export function SignalsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const { t } = useLanguage()

  // Cursor effect
  useEffect(() => {
    if (!sectionRef.current || !cursorRef.current) return

    const section = sectionRef.current
    const cursor = cursorRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    section.addEventListener("mousemove", handleMouseMove)
    section.addEventListener("mouseenter", handleMouseEnter)
    section.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      section.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseenter", handleMouseEnter)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Header animation
  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return

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
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Infinite scroll animation
  useEffect(() => {
    if (!trackRef.current) return

    const track = trackRef.current
    const cards = track.querySelectorAll(".beneficio-card")
    const cardWidth = 320 + 32 // card width + gap
    const totalWidth = cardWidth * beneficios.length

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 })
      
      tl.to(track, {
        x: -totalWidth,
        duration: 25,
        ease: "none",
      })
    }, track)

    // Pause/resume on hover
    const handleMouseEnter = () => {
      setIsPaused(true)
      gsap.to(track, { timeScale: 0, duration: 0.5 })
    }
    
    const handleMouseLeave = () => {
      setIsPaused(false)
      gsap.to(track, { timeScale: 1, duration: 0.5 })
    }

    track.addEventListener("mouseenter", handleMouseEnter)
    track.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      ctx.revert()
      track.removeEventListener("mouseenter", handleMouseEnter)
      track.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <section id="signals" ref={sectionRef} className="relative py-32 pl-6 md:pl-28">
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50",
          "w-12 h-12 rounded-full border-2 border-accent bg-accent",
          "transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Section header */}
      <div ref={headerRef} className="mb-16 pr-6 md:pr-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{t("signals.section")}</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">{t("signals.title")}</h2>
      </div>

      {/* Infinite scroll container */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-8 pb-8"
        >
          {/* Original cards */}
          {beneficiosData.map((beneficio, index) => (
            <BeneficioCard key={`original-${index}`} beneficio={beneficio} index={index} t={t} />
          ))}
          {/* Duplicated cards for seamless loop */}
          {beneficiosData.map((beneficio, index) => (
            <BeneficioCard key={`duplicate-${index}`} beneficio={beneficio} index={index} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BeneficioCard({
  beneficio,
  index,
  t,
}: {
  beneficio: { icon: string; titleKey: string; noteKey: string }
  index: number
  t: (key: string) => string
}) {
  return (
    <article
      className={cn(
        "beneficio-card group relative flex-shrink-0 w-72 md:w-80",
        "transition-transform duration-500 ease-out",
        "hover:-translate-y-2",
      )}
    >
      {/* Card with paper texture effect */}
      <div className="relative bg-card border border-border/50 md:border-t md:border-l md:border-r-0 md:border-b-0 p-6 md:p-8">
        {/* Top torn edge effect */}
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        {/* Issue number - editorial style */}
        <div className="flex items-baseline justify-between mb-6 md:mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Beneficio {beneficio.icon}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-[var(--font-bebas)] text-3xl md:text-4xl tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
          {t(beneficio.titleKey)}
        </h3>

        {/* Divider line */}
        <div className="w-12 h-px bg-accent/60 mb-4 md:mb-6 group-hover:w-full transition-all duration-500" />

        {/* Description */}
        <p className="font-mono text-xs text-muted-foreground leading-relaxed">{t(beneficio.noteKey)}</p>

        {/* Bottom right corner fold effect */}
        <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-background rotate-45 translate-x-4 translate-y-4 border-t border-l border-border/30" />
        </div>
      </div>

      {/* Shadow/depth layer */}
      <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  )
}
