"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useMemo, useState, useCallback, useEffect, useRef, createContext, useContext } from "react"
import { Volume2, VolumeX } from "lucide-react"

interface AudioContextType {
  isMuted: boolean
  toggleMute: () => void
  playClick: () => void
}

const SplitFlapAudioContext = createContext<AudioContextType | null>(null)

function useSplitFlapAudio() {
  return useContext(SplitFlapAudioContext)
}

export function SplitFlapAudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true)
  const audioContextRef = useRef<AudioContext | null>(null)

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (AudioContextClass) {
        audioContextRef.current = new AudioContextClass()
      }
    }
    return audioContextRef.current
  }, [])

  const triggerHaptic = useCallback(() => {
    if (isMuted) return
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(10)
    }
  }, [isMuted])

  const playClick = useCallback(() => {
    if (isMuted) return

    triggerHaptic()

    try {
      const ctx = getAudioContext()
      if (!ctx) return

      if (ctx.state === "suspended") {
        ctx.resume()
      }

      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      const filter = ctx.createBiquadFilter()
      const lowpass = ctx.createBiquadFilter()

      oscillator.type = "square"
      oscillator.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.015)

      filter.type = "bandpass"
      filter.frequency.setValueAtTime(1200, ctx.currentTime)
      filter.Q.setValueAtTime(0.8, ctx.currentTime)

      lowpass.type = "lowpass"
      lowpass.frequency.value = 2500
      lowpass.Q.value = 0.5

      gainNode.gain.setValueAtTime(0.05, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02)

      oscillator.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(lowpass)
      lowpass.connect(ctx.destination)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.02)
    } catch {
      // Audio not supported
    }
  }, [isMuted, getAudioContext, triggerHaptic])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
    if (isMuted) {
      try {
        const ctx = getAudioContext()
        if (ctx && ctx.state === "suspended") {
          ctx.resume()
        }
      } catch {
        // Audio not supported
      }
    }
  }, [isMuted, getAudioContext])

  const value = useMemo(() => ({ isMuted, toggleMute, playClick }), [isMuted, toggleMute, playClick])

  return <SplitFlapAudioContext.Provider value={value}>{children}</SplitFlapAudioContext.Provider>
}

export function SplitFlapMuteToggle({ className = "" }: { className?: string }) {
  const audio = useSplitFlapAudio()
  if (!audio) return null

  return (
    <button
      onClick={audio.toggleMute}
      className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 ${className}`}
      aria-label={audio.isMuted ? "Unmute sound effects" : "Mute sound effects"}
    >
      {audio.isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      <span>{audio.isMuted ? "Sound Off" : "Sound On"}</span>
    </button>
  )
}

interface SplitFlapTextProps {
  text: string
  className?: string
  speed?: number
}

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("")
const NUMBERS = "0123456789".split("")

function SplitFlapTextInner({ text, className = "", speed = 50 }: SplitFlapTextProps) {
  const words = useMemo(() => text.split(" "), [text])
  const [animationKey, setAnimationKey] = useState(0)
  const [hasInitialized, setHasInitialized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const audio = useSplitFlapAudio()

  const handleMouseEnter = useCallback(() => {
    setAnimationKey((prev) => prev + 1)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasInitialized(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  let globalIndex = 0

  return (
    <div
      className={`flex flex-wrap gap-x-[0.5em] md:gap-x-[1.1em] gap-y-2 items-center cursor-pointer ${className}`}
      aria-label={text}
      onMouseEnter={handleMouseEnter}
      style={{ perspective: "1000px" }}
    >
      {words.map((word, wordIndex) => {
        // Long words (e.g. "AUTOMATIZA") get a slightly smaller font ONLY on mobile so they fit on
        // one line. On desktop every word matches the rest of the animation.
        const fontSize =
          isMobile && word.length >= 9 ? "clamp(2.7rem, 9.8vw, 14rem)" : "clamp(3.2rem, 11vw, 14rem)"
        return (
          <div key={wordIndex} className="inline-flex gap-[0.08em] items-center">
            {word.split("").map((char) => {
              const index = globalIndex++
              return (
                <SplitFlapChar
                  key={index}
                  char={char.toUpperCase()}
                  index={index}
                  animationKey={animationKey}
                  skipEntrance={hasInitialized}
                  speed={speed}
                  playClick={audio?.playClick}
                  fontSize={fontSize}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export function SplitFlapText(props: SplitFlapTextProps) {
  return <SplitFlapTextInner {...props} />
}

interface SplitFlapCharProps {
  char: string
  index: number
  animationKey: number
  skipEntrance: boolean
  speed: number
  playClick?: () => void
  fontSize?: string
}

function SplitFlapChar({ char, index, animationKey, skipEntrance, speed, playClick, fontSize = "clamp(3.2rem, 11vw, 14rem)" }: SplitFlapCharProps) {
  const displayChar = CHARSET.includes(char) ? char : " "
  const isSpace = char === " "
  const [currentChar, setCurrentChar] = useState(skipEntrance ? displayChar : " ")
  const [isSettled, setIsSettled] = useState(skipEntrance)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const tileDelay = 0.15 * index

  const bgColor = isSettled ? "hsl(0, 0%, 0%)" : "rgba(169, 0, 227, 0.2)"
  const textColor = isSettled ? "#ffffff" : "#A900E3"

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    if (isSpace) {
      setCurrentChar(" ")
      setIsSettled(true)
      return
    }

    setIsSettled(false)
    setCurrentChar(NUMBERS[Math.floor(Math.random() * NUMBERS.length)])

    const numberFlips = 12 // Number of flips showing only numbers
    const baseFlips = 8
    const startDelay = skipEntrance ? tileDelay * 400 : tileDelay * 800
    let flipIndex = 0
    let hasStartedSettling = false

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        const settleThreshold = numberFlips + baseFlips + index * 3

        if (flipIndex >= settleThreshold && !hasStartedSettling) {
          hasStartedSettling = true
          if (intervalRef.current) clearInterval(intervalRef.current)
          setCurrentChar(displayChar)
          setIsSettled(true)
          if (playClick) playClick()
          return
        }
        
        // First show only numbers, then transition to letters
        if (flipIndex < numberFlips) {
          setCurrentChar(NUMBERS[Math.floor(Math.random() * NUMBERS.length)])
        } else {
          setCurrentChar(CHARSET[Math.floor(Math.random() * CHARSET.length)])
        }
        
        if (flipIndex % 2 === 0 && playClick) playClick()
        flipIndex++
      }, speed)
    }, startDelay)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [displayChar, isSpace, tileDelay, animationKey, skipEntrance, index, speed, playClick])

  if (isSpace) {
    return (
      <div
        style={{
          width: "0.3em",
          fontSize,
        }}
      />
    )
  }

  return (
    <motion.div
      initial={skipEntrance ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: tileDelay, duration: 0.3, ease: "easeOut" }}
      className="relative overflow-hidden flex items-center justify-center font-[family-name:var(--font-bebas)]"
      style={{
        fontSize,
        width: "0.65em",
        height: "1.05em",
        backgroundColor: bgColor,
        transformStyle: "preserve-3d",
        transition: "background-color 0.15s ease",
      }}
    >
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/20 pointer-events-none z-10" />

      <div className="absolute inset-x-0 top-0 bottom-1/2 flex items-end justify-center overflow-hidden">
        <span
          className="block translate-y-[0.52em] leading-none transition-colors duration-150"
          style={{ color: textColor }}
        >
          {currentChar}
        </span>
      </div>

      <div className="absolute inset-x-0 top-1/2 bottom-0 flex items-start justify-center overflow-hidden">
        <span
          className="-translate-y-[0.52em] leading-none transition-colors duration-150"
          style={{ color: textColor }}
        >
          {currentChar}
        </span>
      </div>

      <motion.div
        key={`${animationKey}-${isSettled}`}
        initial={{ rotateX: -90 }}
        animate={{ rotateX: 0 }}
        transition={{
          delay: skipEntrance ? tileDelay * 0.5 : tileDelay + 0.15,
          duration: 0.25,
          ease: [0.22, 0.61, 0.36, 1],
        }}
        className="absolute inset-x-0 top-0 bottom-1/2 origin-bottom overflow-hidden"
        style={{
          backgroundColor: bgColor,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          transition: "background-color 0.15s ease",
        }}
      >
        <div className="flex h-full items-end justify-center">
          <span
            className="translate-y-[0.52em] leading-none transition-colors duration-150"
            style={{ color: textColor }}
          >
            {currentChar}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
