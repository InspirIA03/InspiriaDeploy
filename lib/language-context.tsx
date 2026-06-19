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
    "hero.title": "CREA VENDE AUTOMATIZA",
    "hero.subtitle": "Tu Negocio Digital En Un Solo Lugar",
    "hero.description": "Una plataforma todo en uno para crear productos digitales, lanzar ofertas, automatizar ventas y escalar con marketing, CRM e inteligencia artificial integrada.",
    "hero.cta": "Aplicar Ahora",
    "hero.animation.label": "Conocimiento → Producto",
    
    // Navigation
    "nav.inicio": "Inicio",
    "nav.parati": "Para Ti",
    "nav.problema": "El Problema",
    "nav.solucion": "La Solución",
    "nav.proceso": "Proceso",
    "nav.beneficios": "Beneficios",
    "nav.dentro": "Dentro",
    "nav.aplicar": "Aplicar",
    
    // Work Section (Para Ti)
    "work.section": "03 / Para Ti",
    "work.title": "DISEÑADA PARA QUIENES QUIEREN CONSTRUIR NEGOCIOS DIGITALES DE VERDAD",
    "work.intro": "Esta plataforma es ideal para:",
    "work.aud.1": "Creadores de contenido",
    "work.aud.2": "Coaches y mentores",
    "work.aud.3": "Expertos en cualquier industria",
    "work.aud.4": "Agencias digitales",
    "work.aud.5": "Consultores",
    "work.aud.6": "Infoproductores",
    "work.aud.7": "Educadores",
    "work.aud.8": "Equipos que venden online",
    "work.outro": "Si tu objetivo es crear, vender y automatizar en internet, este sistema fue pensado para ti.",
    
    // Pain Section
    "pain.section": "01 / El Problema",
    "pain.title.1": "Tu negocio no necesita",
    "pain.title.2": "más herramientas.",
    "pain.title.3": "Necesita un",
    "pain.title.4": "sistema.",
    "pain.intro": "Si estás construyendo un negocio digital, seguramente ya has vivido esto:",
    "pain.point.1": "No tienes un lugar central para operar todo.",
    "pain.point.2": "Pierdes leads por falta de seguimiento.",
    "pain.point.3": "Tus automatizaciones están desconectadas.",
    "pain.point.4": "Tu contenido no se convierte en ventas de forma consistente.",
    "pain.point.5": "Tu equipo trabaja en demasiadas plataformas al mismo tiempo.",
    "pain.point.6": "Cada nuevo lanzamiento te obliga a empezar casi desde cero.",
    "pain.point.7": "No eres dueño ni tienes control sobre los datos de tus clientes.",

    // Infrastructure Section
    "infra.section": "02 / La Solución",
    "infra.title.1": "La nueva",
    "infra.title.2": "infraestructura",
    "infra.title.3": "para negocios digitales modernos",
    "infra.intro": "Hoy la mayoría de negocios digitales está fragmentada.",
    "infra.fragmented.label": "Fragmentado",
    "infra.unified.label": "Unificado",
    "infra.toggle.hint": "Activa para unificar",
    "infra.node.courses": "Cursos",
    "infra.node.crm": "CRM",
    "infra.node.automation": "Automatización",
    "infra.node.payments": "Pagos",
    "infra.node.marketing": "Marketing",
    "infra.core": "Tu Sistema",
    "infra.problem": "Una herramienta para los cursos. Otra para el CRM. Otra para automatizaciones. Otra para los pagos. Otra para el marketing. Eso complica el crecimiento, aumenta los costos y hace que vender dependa demasiado de procesos manuales.",
    "infra.solution": "Nuestra plataforma reúne todo en un solo sistema para que puedas crear, vender y automatizar sin fricción.",
    
    // Principles Section (Proceso)
    "principles.section": "04 / Proceso",
    "principles.title": "CÓMO FUNCIONA",
    "principles.step1.title": "APLICAS",
    "principles.step1.desc": "Completa tu aplicación y cuéntanos sobre tu conocimiento y experiencia.",
    "principles.step2.title": "REVISAMOS TU PERFIL",
    "principles.step2.desc": "Analizamos tu aplicación para asegurarnos de que eres un buen fit para el programa.",
    "principles.step3.title": "ACCEDES A LA PLATAFORMA",
    "principles.step3.desc": "Si calificas, obtienes acceso inmediato a todos los recursos y herramientas.",
    "principles.step4.title": "CONSTRUYE Y ESCALA CON IA",
    "principles.step4.desc": "Construye tu oferta, arma tu sistema y deja que la inteligencia artificial automatice y escale tu negocio.",
    
    // Signals Section (Beneficios)
    "signals.section": "05 / Beneficios",
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
    
    // Capabilities Section (Lo que podrás hacer dentro)
    "cap.section": "06 / Dentro",
    "cap.title": "Todo lo que puedes construir dentro de la plataforma",
    "cap.subtitle": "Lo que podrás hacer dentro",
    "cap.1": "Cursos y áreas privadas",
    "cap.2": "Membresías y comunidades de pago",
    "cap.3": "Funnels de venta",
    "cap.4": "Formularios y aplicaciones",
    "cap.5": "Automatizaciones",
    "cap.6": "Pipelines de ventas",
    "cap.7": "Seguimiento de clientes",
    "cap.8": "Segmentación por intereses",
    "cap.9": "Agentes y flujos impulsados por IA",
    "cap.10": "Calendarios",
    "cap.11": "Integración a tus redes sociales",
    "cap.12": "Base de datos de clientes propia",
    "cap.11.detail": "IG · TikTok · Facebook · YouTube · Google Business",
    "cap.counter": "Módulos",

    // Apply Section
    "apply.section": "07 / Aplicar",
    "apply.title": "Si estás listo para crear, vender y automatizar tu negocio digital en un solo sistema, este es tu punto de partida.",
    "apply.subtitle": "Solicita tu acceso a la plataforma",
    
    // Colophon
    "colophon.title": "INSPIRIA",
    "colophon.description": "Transformando conocimiento en productos digitales rentables.",
    "colophon.rights": "Todos los derechos reservados.",
  },
  en: {
    // Hero
    "hero.title": "CREATE SELL AUTOMATE",
    "hero.subtitle": "Your Digital Business In One Place",
    "hero.description": "An all-in-one platform to create digital products, launch offers, automate sales and scale with marketing, CRM and integrated artificial intelligence.",
    "hero.cta": "Apply Now",
    "hero.animation.label": "Knowledge → Product",
    
    // Navigation
    "nav.inicio": "Home",
    "nav.parati": "For You",
    "nav.problema": "The Problem",
    "nav.solucion": "The Solution",
    "nav.proceso": "Process",
    "nav.beneficios": "Benefits",
    "nav.dentro": "Inside",
    "nav.aplicar": "Apply",
    
    // Work Section (For You)
    // Work Section (For You)
    "work.section": "03 / For You",
    "work.title": "BUILT FOR THOSE WHO WANT TO BUILD REAL DIGITAL BUSINESSES",
    "work.intro": "This platform is ideal for:",
    "work.aud.1": "Content creators",
    "work.aud.2": "Coaches and mentors",
    "work.aud.3": "Experts in any industry",
    "work.aud.4": "Digital agencies",
    "work.aud.5": "Consultants",
    "work.aud.6": "Info-product creators",
    "work.aud.7": "Educators",
    "work.aud.8": "Teams selling online",
    "work.outro": "If your goal is to create, sell and automate online, this system was built for you.",
    
    // Pain Section
    "pain.section": "01 / The Problem",
    "pain.title.1": "Your business doesn't need",
    "pain.title.2": "more tools.",
    "pain.title.3": "It needs a",
    "pain.title.4": "system.",
    "pain.intro": "If you're building a digital business, you've probably already experienced this:",
    "pain.point.1": "You don't have a central place to run everything.",
    "pain.point.2": "You lose leads from lack of follow-up.",
    "pain.point.3": "Your automations are disconnected.",
    "pain.point.4": "Your content doesn't convert into sales consistently.",
    "pain.point.5": "Your team works across too many platforms at once.",
    "pain.point.6": "Every new launch forces you to start almost from scratch.",
    "pain.point.7": "You don't own or control your customers' data.",

    // Infrastructure Section
    "infra.section": "02 / The Solution",
    "infra.title.1": "The new",
    "infra.title.2": "infrastructure",
    "infra.title.3": "for modern digital businesses",
    "infra.intro": "Today most digital businesses are fragmented.",
    "infra.fragmented.label": "Fragmented",
    "infra.unified.label": "Unified",
    "infra.toggle.hint": "Toggle to unify",
    "infra.node.courses": "Courses",
    "infra.node.crm": "CRM",
    "infra.node.automation": "Automation",
    "infra.node.payments": "Payments",
    "infra.node.marketing": "Marketing",
    "infra.core": "Your System",
    "infra.problem": "One tool for courses. Another for the CRM. Another for automations. Another for payments. Another for marketing. That complicates growth, increases costs and makes selling depend too much on manual processes.",
    "infra.solution": "Our platform brings everything together into one system so you can create, sell and automate without friction.",
    
    // Principles Section (Process)
    "principles.section": "04 / Process",
    "principles.title": "HOW IT WORKS",
    "principles.step1.title": "YOU APPLY",
    "principles.step1.desc": "Complete your application and tell us about your knowledge and experience.",
    "principles.step2.title": "WE REVIEW YOUR PROFILE",
    "principles.step2.desc": "We analyze your application to make sure you're a good fit for the program.",
    "principles.step3.title": "ACCESS THE PLATFORM",
    "principles.step3.desc": "If you qualify, you get immediate access to all resources and tools.",
    "principles.step4.title": "BUILD & SCALE WITH AI",
    "principles.step4.desc": "Build your offer, set up your system, and automate and scale your business with artificial intelligence.",
    
    // Signals Section (Benefits)
    "signals.section": "05 / Benefits",
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
    
    // Capabilities Section (What you can build inside)
    "cap.section": "06 / Inside",
    "cap.title": "Everything you can build inside the platform",
    "cap.subtitle": "What you can do inside",
    "cap.1": "Courses and private areas",
    "cap.2": "Paid memberships and communities",
    "cap.3": "Sales funnels",
    "cap.4": "Forms and applications",
    "cap.5": "Automations",
    "cap.6": "Sales pipelines",
    "cap.7": "Customer tracking",
    "cap.8": "Interest-based segmentation",
    "cap.9": "AI-powered agents and flows",
    "cap.10": "Calendars",
    "cap.11": "Social media integrations",
    "cap.12": "Your own customer database",
    "cap.11.detail": "IG · TikTok · Facebook · YouTube · Google Business",
    "cap.counter": "Modules",

    // Apply Section
    "apply.section": "07 / Apply",
    "apply.title": "If you're ready to create, sell and automate your digital business in one system, this is your starting point.",
    "apply.subtitle": "Request your access to the platform",
    
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
