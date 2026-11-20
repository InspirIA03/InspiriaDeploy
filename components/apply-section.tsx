"use client"

import { useRef, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ApplySection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const lineLeftRef = useRef<HTMLDivElement>(null)
  const lineRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !formRef.current) return

    const ctx = gsap.context(() => {
      // Header animation - words stagger in
      const titleWords = headerRef.current?.querySelectorAll(".title-word")
      if (titleWords) {
        gsap.fromTo(
          titleWords,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Decorative lines
      if (lineLeftRef.current) {
        gsap.fromTo(
          lineLeftRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      if (lineRightRef.current) {
        gsap.fromTo(
          lineRightRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Form container animation
      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="apply"
      className="relative py-32 px-6 md:px-12 lg:px-28"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      {/* Section number */}
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8 block">
        {t("apply.section")}
      </span>

      {/* Header */}
      <div ref={headerRef} className="relative max-w-4xl mx-auto text-center mb-16">
        {/* Decorative line left */}
        <div
          ref={lineLeftRef}
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-16 h-px bg-accent/60 origin-left"
        />

        {/* Decorative line right */}
        <div
          ref={lineRightRef}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-16 h-px bg-accent/60 origin-right"
        />

        {/* Main title */}
        <h2 className="font-[family-name:var(--font-bebas)] text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-6">
          {t("apply.title").split(" ").map((word, index) => {
            const clean = word.toLowerCase().replace(/[.,]/g, "")
            return (
              <span key={index} className="title-word inline-block mr-[0.3em]">
                {["crear", "vender", "escalar", "create", "sell", "scale"].includes(clean) ? (
                  <span className="text-accent">{word}</span>
                ) : (
                  word
                )}
              </span>
            )
          })}
        </h2>

        {/* Subtitle */}
        <p className="font-mono text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
          {t("apply.subtitle").split(" ").map((word, index) => (
            <span key={index} className="title-word inline-block mr-[0.3em]">
              {["plataforma", "platform", "acceso", "access"].includes(word.toLowerCase()) ? (
                <span className="text-accent">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
        </p>
      </div>

      {/* Form container */}
      <div
        ref={formRef}
        className="relative max-w-2xl mx-auto"
      >
        {/* Decorative corners */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-accent/40" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-accent/40" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-accent/40" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-accent/40" />

        {/* Form wrapper with border */}
        <div className="relative border border-border/50 bg-card/50 backdrop-blur-sm p-4 md:p-8">
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/hpe2djMprYxh80mKeeYD"
            allow="payment"
            style={{ width: "100%", height: "800px", border: "none" }}
            loading="lazy"
            id="hpe2djMprYxh80mKeeYD_1795126957177"
            title="Booking"
          />
        </div>
      </div>
    </section>
  )
}
