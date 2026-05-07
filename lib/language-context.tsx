"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Hero
    "hero.title": "MONETIZA",
    "hero.subtitle": "Tu Conocimiento Digital",
    "hero.description": "Convierte tu conocimiento en un producto digital y genera tus primeros $1,000 a $5,000 con una plataforma diseñada para ayudarte a monetizarlo.",
    "hero.cta": "Aplicar Ahora",
    "hero.animation.label": "Conocimiento → Producto",
    
    // Navigation
    "nav.inicio": "Inicio",
    "nav.parati": "Para Ti",
    "nav.problema": "El Problema",
    "nav.proceso": "Proceso",
    "nav.beneficios": "Beneficios",
    "nav.aplicar": "Aplicar",
    
    // Work Section (Para Ti)
    "work.section": "01 / Para Ti",
    "work.title": "ESTO ES PARA TI SI...",
    "work.item1.title": "Conocimiento Valioso",
    "work.item1.desc": "Tienes experiencia o expertise en un tema que otros quieren aprender.",
    "work.item2.title": "Ingresos Extra",
    "work.item2.desc": "Quieres crear ingresos extra o reemplazar tu ingreso actual.",
    "work.item3.title": "Algo Propio",
    "work.item3.desc": "Quieres construir algo propio y dejar de depender de terceros.",
    "work.item4.title": "Ejecutar",
    "work.item4.desc": "Estás dispuesto a tomar acción y ejecutar el plan.",
    
    // Pain Section
    "pain.section": "02 / El Problema",
    "pain.title.1": "Tener",
    "pain.title.2": "conocimiento",
    "pain.title.3": "no es el problema.",
    "pain.title.4": "Convertirlo",
    "pain.title.5": "en",
    "pain.title.6": "ingresos",
    "pain.title.7": "sí.",
    "pain.description": "Muchos saben mucho, pero no tienen estructura, oferta ni sistema para monetizarlo. Aquí ayudamos a convertir ese conocimiento en un producto digital escalable.",
    
    // Principles Section (Proceso)
    "principles.section": "03 / Proceso",
    "principles.title": "CÓMO FUNCIONA",
    "principles.step1.title": "APLICAS",
    "principles.step1.desc": "Completa tu aplicación y cuéntanos sobre tu conocimiento y experiencia.",
    "principles.step2.title": "REVISAMOS TU PERFIL",
    "principles.step2.desc": "Analizamos tu aplicación para asegurarnos de que eres un buen fit para el programa.",
    "principles.step3.title": "ACCEDES A LA PLATAFORMA",
    "principles.step3.desc": "Si calificas, obtienes acceso inmediato a todos los recursos y herramientas.",
    "principles.step4.title": "CONSTRUIMOS TU OFERTA",
    "principles.step4.desc": "Juntos creamos tu producto digital y activamos el sistema de monetización.",
    
    // Signals Section (Beneficios)
    "signals.section": "04 / Beneficios",
    "signals.title": "QUÉ OBTIENES SI ERES SELECCIONADO",
    "signals.item1.title": "Estructura para Monetizar",
    "signals.item1.desc": "Un sistema probado para convertir tu conocimiento en un producto digital rentable.",
    "signals.item2.title": "Plataforma Propia",
    "signals.item2.desc": "Acceso completo a una plataforma diseñada para tu negocio digital.",
    "signals.item3.title": "Curso y Acompañamiento",
    "signals.item3.desc": "Formación paso a paso con soporte y mentoría personalizada.",
    "signals.item4.title": "Sistema de Automatización",
    "signals.item4.desc": "Herramientas de automatización y ventas para escalar tu negocio.",
    "signals.item5.title": "Revenue Share",
    "signals.item5.desc": "Modelo de colaboración donde crecemos juntos con participación en ingresos.",
    
    // Apply Section
    "apply.section": "05 / Aplicar",
    "apply.title": "Si tienes conocimiento valioso y quieres convertirlo en un activo digital rentable, este es tu punto de partida.",
    "apply.subtitle": "Buscamos socios reales",
    
    // Colophon
    "colophon.title": "INSPIRIA",
    "colophon.description": "Transformando conocimiento en productos digitales rentables.",
    "colophon.rights": "Todos los derechos reservados.",
  },
  en: {
    // Hero
    "hero.title": "MONETIZE",
    "hero.subtitle": "Your Digital Knowledge",
    "hero.description": "Turn your knowledge into a digital product and generate your first $1,000 to $5,000 with a platform designed to help you monetize it.",
    "hero.cta": "Apply Now",
    "hero.animation.label": "Knowledge → Product",
    
    // Navigation
    "nav.inicio": "Home",
    "nav.parati": "For You",
    "nav.problema": "The Problem",
    "nav.proceso": "Process",
    "nav.beneficios": "Benefits",
    "nav.aplicar": "Apply",
    
    // Work Section (For You)
    "work.section": "01 / For You",
    "work.title": "THIS IS FOR YOU IF...",
    "work.item1.title": "Valuable Knowledge",
    "work.item1.desc": "You have experience or expertise in a topic others want to learn.",
    "work.item2.title": "Extra Income",
    "work.item2.desc": "You want to create extra income or replace your current income.",
    "work.item3.title": "Something of Your Own",
    "work.item3.desc": "You want to build something of your own and stop depending on others.",
    "work.item4.title": "Execute",
    "work.item4.desc": "You are willing to take action and execute the plan.",
    
    // Pain Section
    "pain.section": "02 / The Problem",
    "pain.title.1": "Having",
    "pain.title.2": "knowledge",
    "pain.title.3": "is not the problem.",
    "pain.title.4": "Turning it",
    "pain.title.5": "into",
    "pain.title.6": "income",
    "pain.title.7": "is.",
    "pain.description": "Many know a lot, but lack structure, offer, or system to monetize it. Here we help turn that knowledge into a scalable digital product.",
    
    // Principles Section (Process)
    "principles.section": "03 / Process",
    "principles.title": "HOW IT WORKS",
    "principles.step1.title": "YOU APPLY",
    "principles.step1.desc": "Complete your application and tell us about your knowledge and experience.",
    "principles.step2.title": "WE REVIEW YOUR PROFILE",
    "principles.step2.desc": "We analyze your application to make sure you're a good fit for the program.",
    "principles.step3.title": "ACCESS THE PLATFORM",
    "principles.step3.desc": "If you qualify, you get immediate access to all resources and tools.",
    "principles.step4.title": "WE BUILD YOUR OFFER",
    "principles.step4.desc": "Together we create your digital product and activate the monetization system.",
    
    // Signals Section (Benefits)
    "signals.section": "04 / Benefits",
    "signals.title": "WHAT YOU GET IF SELECTED",
    "signals.item1.title": "Monetization Structure",
    "signals.item1.desc": "A proven system to turn your knowledge into a profitable digital product.",
    "signals.item2.title": "Your Own Platform",
    "signals.item2.desc": "Full access to a platform designed for your digital business.",
    "signals.item3.title": "Course & Support",
    "signals.item3.desc": "Step-by-step training with personalized support and mentoring.",
    "signals.item4.title": "Automation System",
    "signals.item4.desc": "Automation and sales tools to scale your business.",
    "signals.item5.title": "Revenue Share",
    "signals.item5.desc": "A collaboration model where we grow together with revenue sharing.",
    
    // Apply Section
    "apply.section": "05 / Apply",
    "apply.title": "If you have valuable knowledge and want to turn it into a profitable digital asset, this is your starting point.",
    "apply.subtitle": "We're looking for real partners",
    
    // Colophon
    "colophon.title": "INSPIRIA",
    "colophon.description": "Transforming knowledge into profitable digital products.",
    "colophon.rights": "All rights reserved.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"))
  }, [])

  const t = useCallback(
    (key: string) => {
      return translations[language][key] || key
    },
    [language]
  )

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
