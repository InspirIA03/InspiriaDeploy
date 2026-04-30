"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText, SplitFlapMuteToggle, SplitFlapAudioProvider } from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import { BitmapChevron } from "@/components/bitmap-chevron"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

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

      {/* Floating hero image */}
      <div className="hidden md:block absolute bottom-16 right-8 lg:bottom-20 lg:right-16 xl:right-24">
        <div className="relative animate-float">
          {/* Decorative frame */}
          <div className="absolute -inset-3 border border-accent/30" />
          <div className="absolute -inset-6 border border-accent/10" />
          
          {/* Image container */}
          <div className="relative w-48 lg:w-64 xl:w-72 aspect-[3/4] overflow-hidden">
            <Image
              src="/images/hero-person.jpg"
              alt="Emprendedor digital trabajando"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
            {/* Purple overlay */}
            <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
          </div>
          
          {/* Corner accents */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-accent" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-accent" />
        </div>
      </div>

      {/* Floating info tag */}
      <div className="absolute bottom-8 left-6 md:left-28">
        <div className="border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          v.01 / Experimental Build
        </div>
      </div>
    </section>
  )
}
