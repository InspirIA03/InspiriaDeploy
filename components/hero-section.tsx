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

  useEffect(() => {
    if (!containerRef.current) return

    const nodes = containerRef.current.querySelectorAll(".node")
    const lines = containerRef.current.querySelectorAll(".connection-line")
    const centerNode = containerRef.current.querySelector(".center-node")
    const orbitNodes = containerRef.current.querySelectorAll(".orbit-node")

    const ctx = gsap.context(() => {
      // Nodes pulse in sequence
      gsap.fromTo(
        nodes,
        { scale: 0.8, opacity: 0.3 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          stagger: 0.3,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        }
      )

      // Lines draw and fade
      gsap.fromTo(
        lines,
        { strokeDashoffset: 100, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 0.6,
          duration: 2,
          stagger: 0.2,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        }
      )

      // Center node pulses
      gsap.to(centerNode, {
        scale: 1.2,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      })

      // Orbit nodes rotate around center
      orbitNodes.forEach((node, i) => {
        const angle = (i * 72) * (Math.PI / 180) // 5 nodes, 72 degrees apart
        const radius = 60
        
        gsap.to(node, {
          motionPath: {
            path: [
              { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius },
              { x: Math.cos(angle + Math.PI) * radius, y: Math.sin(angle + Math.PI) * radius },
              { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius },
            ],
            curviness: 1.5,
          },
          duration: 8 + i,
          repeat: -1,
          ease: "none",
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={containerRef}
      className="hidden md:flex absolute bottom-16 right-8 lg:bottom-20 lg:right-16 xl:right-24"
    >
      <div className="relative w-48 h-48 lg:w-56 lg:h-56">
        {/* SVG connections */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          {/* Connection lines from center to orbit */}
          {[0, 1, 2, 3, 4].map((i) => {
            const angle = (i * 72 - 90) * (Math.PI / 180)
            const x2 = 100 + Math.cos(angle) * 60
            const y2 = 100 + Math.sin(angle) * 60
            return (
              <line
                key={i}
                className="connection-line stroke-accent"
                x1="100"
                y1="100"
                x2={x2}
                y2={y2}
                strokeWidth="1"
                strokeDasharray="100"
                fill="none"
              />
            )
          })}
          
          {/* Outer ring */}
          <circle
            cx="100"
            cy="100"
            r="70"
            className="stroke-accent/20"
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r="85"
            className="stroke-border/30"
            strokeWidth="1"
            strokeDasharray="4 4"
            fill="none"
          />
        </svg>

        {/* Center node - represents knowledge transforming */}
        <div className="center-node absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10">
          <div className="absolute inset-0 border-2 border-accent rotate-45" />
          <div className="absolute inset-1 bg-accent/20" />
        </div>

        {/* Orbit nodes - represent digital products/outcomes */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * 72 - 90) * (Math.PI / 180)
          const x = 50 + Math.cos(angle) * 30 // percentage
          const y = 50 + Math.sin(angle) * 30
          return (
            <div
              key={i}
              className="orbit-node node absolute w-3 h-3 lg:w-4 lg:h-4"
              style={{ top: `${y}%`, left: `${x}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="w-full h-full border border-accent/60 bg-accent/10" />
            </div>
          )
        })}

        {/* Label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
            Conocimiento → Producto
          </span>
        </div>
      </div>
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

        <div className="mt-16">
          <a
            href="#apply"
            className="group inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
          >
            <ScrambleTextOnHover text="Aplicar Ahora" as="span" duration={0.6} />
            <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
          </a>
        </div>
      </div>

      {/* Animated growth visualization */}
      <HeroAnimation />
    </section>
  )
}
