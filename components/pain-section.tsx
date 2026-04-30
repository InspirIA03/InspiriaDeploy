"use client"

import { useRef, useEffect } from "react"
import { HighlightText } from "@/components/highlight-text"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PainSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const painRef = useRef<HTMLDivElement>(null)
  const opportunityRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !painRef.current || !opportunityRef.current || !lineRef.current) return

    const ctx = gsap.context(() => {
      // Pain text reveal with stagger per word
      const painWords = painRef.current?.querySelectorAll(".pain-word")
      if (painWords) {
        gsap.set(painWords, { y: 100, opacity: 0 })
        gsap.to(painWords, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: painRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Center line grows
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Opportunity text fades in from below
      gsap.fromTo(
        opportunityRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: opportunityRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const painTitle = "Tener conocimiento no es el problema."
  const highlightTitle = "Convertirlo en ingresos sí."

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 md:py-48 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden"
    >
      {/* Background accent line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block">
        <div 
          ref={lineRef} 
          className="w-full h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent origin-top"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Pain statement */}
        <div ref={painRef} className="text-center mb-16 md:mb-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8 block">
            02 / El Problema
          </span>
          
          <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-8xl tracking-tight leading-[1.1]">
            {painTitle.split(" ").map((word, i) => (
              <span key={i} className="pain-word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </h2>
          
          <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-8xl tracking-tight leading-[1.1] mt-2">
            {highlightTitle.split(" ").map((word, i) => (
              <span key={i} className="pain-word inline-block mr-[0.25em]">
                <HighlightText parallaxSpeed={0.4}>{word}</HighlightText>
              </span>
            ))}
          </h2>
        </div>

        {/* Opportunity statement */}
        <div ref={opportunityRef} className="relative">
          <div className="max-w-2xl mx-auto text-center">
            {/* Decorative brackets */}
            <div className="flex items-center justify-center gap-4 md:gap-8">
              <div className="hidden md:block w-8 h-24 border-l-2 border-t-2 border-b-2 border-accent/40" />
              
              <div className="flex-1">
                <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                  Muchos saben mucho, pero no tienen estructura, oferta ni sistema para monetizarlo.
                </p>
                
                <p className="font-sans text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed">
                  Aquí ayudamos a convertir ese conocimiento en un{" "}
                  <span className="text-accent font-medium">producto digital escalable</span>.
                </p>
              </div>
              
              <div className="hidden md:block w-8 h-24 border-r-2 border-t-2 border-b-2 border-accent/40" />
            </div>

            {/* Bottom decorative element */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-border" />
              <div className="w-2 h-2 rotate-45 border border-accent/60" />
              <div className="h-px w-12 bg-border" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
