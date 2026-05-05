"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Script from "next/script"

gsap.registerPlugin(ScrollTrigger)

export function ApplySection() {
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

  const titleText = "Si tienes conocimiento valioso y quieres convertirlo en un activo digital rentable"
  const subtitleText = "Este es tu punto de partida. Buscamos socios reales."

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
        05 / Aplicar
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
        <h2 className="font-[var(--font-bebas)] text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-6">
          {titleText.split(" ").map((word, index) => (
            <span key={index} className="title-word inline-block mr-[0.3em]">
              {word === "conocimiento" || word === "activo" || word === "rentable" ? (
                <span className="text-accent">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
        </h2>

        {/* Subtitle */}
        <p className="font-mono text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
          {subtitleText.split(" ").map((word, index) => (
            <span key={index} className="title-word inline-block mr-[0.3em]">
              {word === "socios" || word === "reales." ? (
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
            src="https://api.leadconnectorhq.com/widget/form/crqSompPxlH2fcaa9Y36"
            style={{ width: "100%", height: "1120px", border: "none", borderRadius: "3px" }}
            id="inline-crqSompPxlH2fcaa9Y36"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Form landing page"
            data-height="1120"
            data-layout-iframe-id="inline-crqSompPxlH2fcaa9Y36"
            data-form-id="crqSompPxlH2fcaa9Y36"
            title="Form landing page"
          />
        </div>
      </div>

      {/* External script for form */}
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </section>
  )
}
