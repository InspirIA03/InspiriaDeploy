"use client"

import { useEffect, useRef } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText, SplitFlapMuteToggle, SplitFlapAudioProvider } from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import { BitmapChevron } from "@/components/bitmap-chevron"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !barsRef.current) return

    const bars = barsRef.current.querySelectorAll(".growth-bar")
    const numbers = containerRef.current.querySelectorAll(".counter-number")

    const ctx = gsap.context(() => {
      // Animate bars growing
      gsap.fromTo(
        bars,
        { scaleY: 0.1 },
        {
          scaleY: 1,
          duration: 2,
          stagger: 0.15,
          ease: "power2.out",
          repeat: -1,
          repeatDelay: 1.5,
          yoyo: true,
        }
      )

      // Animate numbers counting
      numbers.forEach((num, i) => {
        const target = [1, 2, 3, 4, 5][i] * 1000
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2.5,
          delay: i * 0.2,
          repeat: -1,
          repeatDelay: 2,
          ease: "power1.inOut",
          onUpdate: function() {
            num.textContent = "$" + Math.floor(this.targets()[0].val).toLocaleString()
          }
        })
      })

      // Pulse effect on the frame
      gsap.to(containerRef.current?.querySelector(".pulse-ring"), {
        scale: 1.1,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power1.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={containerRef}
      className="hidden md:flex absolute bottom-20 right-8 lg:bottom-24 lg:right-16 xl:right-24 flex-col items-end gap-6"
    >
      {/* Decorative frame with pulse */}
      <div className="relative">
        <div className="pulse-ring absolute -inset-4 border border-accent/40 rounded-sm" />
        <div className="absolute -inset-2 border border-accent/20" />
        
        {/* Growth bars visualization */}
        <div ref={barsRef} className="flex items-end gap-2 p-6 bg-background/50 backdrop-blur-sm border border-border/50">
          {[0.4, 0.6, 0.5, 0.8, 1].map((height, i) => (
            <div
              key={i}
              className="growth-bar w-3 lg:w-4 bg-accent/80 origin-bottom"
              style={{ height: `${height * 80}px` }}
            />
          ))}
        </div>

        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-accent" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-accent" />
      </div>

      {/* Animated counter */}
      <div className="flex flex-col items-end gap-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Potencial mensual
        </span>
        <div className="flex gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="counter-number font-[var(--font-bebas)] text-lg lg:text-xl text-accent tabular-nums"
            >
              $0
            </span>
          ))}
        </div>
      </div>

      {/* Decorative line */}
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
    </div>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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

      {/* Left vertical labels */}
      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block whitespace-nowrap">
          SIGNAL
        </span>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="flex-1 w-full max-w-4xl">
        <SplitFlapAudioProvider>
          <div className="relative">
            <SplitFlapText text="MONETIZA" speed={80} />
            <div className="mt-4">
              <SplitFlapMuteToggle />
            </div>
          </div>
        </SplitFlapAudioProvider>

        <h2 className="font-[var(--font-bebas)] text-muted-foreground/60 text-[clamp(1.5rem,4vw,3rem)] mt-4 tracking-wide uppercase">
          Tu Conocimiento Digital
        </h2>

        <p className="mt-8 max-w-2xl font-sans text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed">
          Convierte tu conocimiento en un producto digital y genera tus primeros $1,000 a $5,000 con una plataforma diseñada para ayudarte a monetizarlo.
        </p>

        <div className="mt-16 flex items-center gap-8">
          <a
            href="#work"
            className="group inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
          >
            <ScrambleTextOnHover text="View Experiments" as="span" duration={0.6} />
            <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
          </a>
          <a
            href="#signals"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Latest Signals
          </a>
        </div>
      </div>

      {/* Animated growth visualization */}
      <HeroAnimation />

      {/* Floating info tag */}
      <div className="absolute bottom-8 left-6 md:left-28">
        <div className="border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          v.01 / Experimental Build
        </div>
      </div>
    </section>
  )
}
