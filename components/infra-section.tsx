"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { GraduationCap, Users, Workflow, CreditCard, Megaphone } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Node = {
  key: string
  labelKey: string
  Icon: typeof GraduationCap
  // Scattered (fragmented) position in % of the stage
  scattered: { x: number; y: number }
  // Orbit angle (degrees) when unified
  angle: number
}

const NODES: Node[] = [
  { key: "courses", labelKey: "infra.node.courses", Icon: GraduationCap, scattered: { x: 14, y: 16 }, angle: -90 },
  { key: "crm", labelKey: "infra.node.crm", Icon: Users, scattered: { x: 84, y: 14 }, angle: -18 },
  { key: "automation", labelKey: "infra.node.automation", Icon: Workflow, scattered: { x: 86, y: 78 }, angle: 54 },
  { key: "payments", labelKey: "infra.node.payments", Icon: CreditCard, scattered: { x: 16, y: 82 }, angle: 126 },
  { key: "marketing", labelKey: "infra.node.marketing", Icon: Megaphone, scattered: { x: 48, y: 90 }, angle: 198 },
]

const ORBIT_RADIUS = 40 // in % of stage

function polar(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180
  return { x: 50 + radius * Math.cos(rad), y: 50 + radius * Math.sin(rad) }
}

export function InfraSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  const [unified, setUnified] = useState(false)

  // Scroll-in animations
  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        },
      )
      gsap.fromTo(
        stageRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: stageRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        },
      )
      const lines = copyRef.current?.querySelectorAll(".infra-copy-block")
      if (lines && lines.length) {
        gsap.fromTo(
          lines,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: copyRef.current, start: "top 85%", toggleActions: "play none none reverse" },
          },
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Auto-toggle once when stage enters viewport, to reveal the interaction
  useEffect(() => {
    if (!stageRef.current) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stageRef.current,
        start: "top 65%",
        once: true,
        onEnter: () => {
          const timer = setTimeout(() => setUnified(true), 900)
          return () => clearTimeout(timer)
        },
      })
    }, stageRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="infra" className="relative py-32 md:py-48 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden">
      {/* Section header */}
      <div ref={headerRef} className="max-w-4xl mb-16 md:mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{t("infra.section")}</span>
        <h2 className="mt-5 font-[var(--font-bebas)] text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95]">
          {t("infra.title.1")}{" "}
          <span className="relative inline-block text-accent">
            {t("infra.title.2")}
            <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-accent/40" aria-hidden="true" />
          </span>{" "}
          {t("infra.title.3")}
        </h2>
        <p className="mt-8 max-w-2xl font-sans text-lg md:text-xl text-foreground/80 leading-relaxed">
          {t("infra.intro")}
        </p>
      </div>

      {/* Interactive layout */}
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        {/* The animated stage */}
        <div className="flex flex-col gap-6">
          {/* State toggle */}
          <StateToggle unified={unified} setUnified={setUnified} t={t} />

          <div
            ref={stageRef}
            className="relative w-full aspect-square max-w-[560px] mx-auto border border-border/40 bg-card/30"
          >
            {/* internal grid */}
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
              aria-hidden="true"
            />

            {/* Connecting lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {NODES.map((node) => {
                const pos = unified ? polar(node.angle, ORBIT_RADIUS) : node.scattered
                return (
                  <line
                    key={node.key}
                    x1="50"
                    y1="50"
                    x2={pos.x}
                    y2={pos.y}
                    stroke="var(--color-accent)"
                    strokeWidth={unified ? 0.4 : 0.25}
                    strokeDasharray={unified ? "0" : "1.5 1.5"}
                    className="transition-all duration-700 ease-in-out"
                    style={{ opacity: unified ? 0.7 : 0.12 }}
                  />
                )
              })}
            </svg>

            {/* Core node */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out z-20"
              style={{ transform: `translate(-50%, -50%) scale(${unified ? 1 : 0.82})` }}
            >
              <div
                className={cn(
                  "relative flex items-center justify-center w-24 h-24 md:w-28 md:h-28 border transition-all duration-700",
                  unified ? "border-accent bg-accent/15" : "border-border bg-card",
                )}
              >
                {unified && (
                  <span className="absolute inset-0 animate-ping bg-accent/10" style={{ animationDuration: "2.5s" }} aria-hidden="true" />
                )}
                <span className="relative font-[var(--font-bebas)] text-xl md:text-2xl tracking-tight text-center leading-none px-2">
                  {t("infra.core")}
                </span>
              </div>
            </div>

            {/* Tool nodes */}
            {NODES.map((node, i) => {
              const pos = unified ? polar(node.angle, ORBIT_RADIUS) : node.scattered
              return (
                <div
                  key={node.key}
                  className="absolute z-10 transition-all duration-700 ease-in-out"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)",
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  <div
                    className={cn(
                      "group flex flex-col items-center gap-2 transition-all duration-700",
                      !unified && "animate-float",
                    )}
                    style={{ animationDelay: `${i * 0.4}s` }}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-12 h-12 md:w-14 md:h-14 border transition-all duration-500",
                        unified
                          ? "border-accent/60 bg-accent/10 text-accent"
                          : "border-border bg-card text-muted-foreground",
                      )}
                    >
                      <node.Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                    </div>
                    <span
                      className={cn(
                        "font-mono text-[9px] md:text-[10px] uppercase tracking-widest whitespace-nowrap transition-colors duration-500",
                        unified ? "text-foreground" : "text-muted-foreground/70",
                      )}
                    >
                      {t(node.labelKey)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Explanatory copy */}
        <div ref={copyRef} className="flex flex-col gap-8 max-w-xl">
          <div className="infra-copy-block relative pl-6 border-l-2 border-border">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 mb-3 block">
              {t("infra.fragmented.label")}
            </span>
            <p className="font-sans text-base md:text-lg text-foreground/75 leading-relaxed">{t("infra.problem")}</p>
          </div>

          <div className="infra-copy-block relative pl-6 border-l-2 border-accent">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3 block">
              {t("infra.unified.label")}
            </span>
            <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed text-pretty">
              {t("infra.solution")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function StateToggle({
  unified,
  setUnified,
  t,
}: {
  unified: boolean
  setUnified: (v: boolean) => void
  t: (key: string) => string
}) {
  return (
    <div className="flex items-center gap-4 self-center">
      <span
        className={cn(
          "font-mono text-[10px] uppercase tracking-widest transition-colors duration-300",
          !unified ? "text-foreground" : "text-muted-foreground/50",
        )}
      >
        {t("infra.fragmented.label")}
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={unified}
        aria-label={t("infra.toggle.hint")}
        onClick={() => setUnified(!unified)}
        className={cn(
          "relative h-7 w-14 border transition-colors duration-300 cursor-pointer",
          unified ? "border-accent bg-accent/20" : "border-border bg-card",
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 -translate-y-1/2 h-5 w-5 transition-all duration-300",
            unified ? "left-[calc(100%-1.5rem)] bg-accent" : "left-1 bg-muted-foreground",
          )}
        />
      </button>

      <span
        className={cn(
          "font-mono text-[10px] uppercase tracking-widest transition-colors duration-300",
          unified ? "text-accent" : "text-muted-foreground/50",
        )}
      >
        {t("infra.unified.label")}
      </span>
    </div>
  )
}
