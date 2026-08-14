"use client"

import { Separator } from "@/components/ui/separator"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Testimonial {
  id: number
  initials: string
  name: string
  role: string
  rating: number
  quote: string
}

export interface AnimatedTestimonialsProps {
  title?: string
  subtitle?: string
  badgeText?: string
  testimonials?: Testimonial[]
  autoRotateInterval?: number
  className?: string
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AnimatedTestimonials({
  title = "Quem já embarcou, recomenda",
  subtitle = "Mais de 100 avaliações reais de quem já viveu a experiência RF Turismo pelas ilhas de Ubatuba.",
  badgeText = "Avaliações reais no Google",
  testimonials = [],
  autoRotateInterval = 6000,
  className,
}: AnimatedTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // ── Framer Motion scroll-reveal ──────────────────────────────────────────
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  }

  useEffect(() => {
    if (isInView) controls.start("visible")
  }, [isInView, controls])

  // ── Navigation helpers ───────────────────────────────────────────────────
  const goTo = useCallback(
    (index: number) => setActiveIndex((index + testimonials.length) % testimonials.length),
    [testimonials.length]
  )
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  // ── Autoplay — pausa quando o usuário paira sobre o card ─────────────────
  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1 || isPaused) return
    const interval = setInterval(() => goNext(), autoRotateInterval)
    return () => clearInterval(interval)
  }, [autoRotateInterval, testimonials.length, isPaused, goNext])

  if (testimonials.length === 0) return null

  const total = testimonials.length

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`py-24 overflow-hidden ${className || ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 gap-16 w-full md:grid-cols-2 lg:gap-24"
        >
          {/* ── Left column: copy + controls ── */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <div className="space-y-6">
              {/* Badge */}
              {badgeText && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#0C6478]/10 text-[#0C6478]">
                  <Star className="mr-1 h-3.5 w-3.5 fill-[#0C6478]" />
                  <span>{badgeText}</span>
                </div>
              )}

              <h2 className="font-heading font-light tracking-[-0.025em] text-3xl sm:text-4xl md:text-5xl text-slate-900 leading-[1.1]">
                {title}
              </h2>

              <p className="max-w-[600px] font-sans text-slate-600 md:text-xl/relaxed">
                {subtitle}
              </p>

              {/* Indicador numérico + setas — mais limpo para 10 itens */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={goPrev}
                  aria-label="Depoimento anterior"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0C6478]/30 text-[#0C6478] hover:bg-[#0C6478]/10 transition-colors duration-200"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <span className="font-sans text-sm tabular-nums text-slate-500 select-none min-w-[4rem] text-center">
                  {String(activeIndex + 1).padStart(2, "0")}
                  <span className="text-slate-300 mx-1">/</span>
                  {String(total).padStart(2, "0")}
                </span>

                <button
                  onClick={goNext}
                  aria-label="Próximo depoimento"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0C6478]/30 text-[#0C6478] hover:bg-[#0C6478]/10 transition-colors duration-200"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── Right column: animated card ── */}
          <motion.div
            variants={itemVariants}
            className="relative h-full mr-0 md:mr-10 min-h-[300px] md:min-h-[400px]"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : 100,
                  scale: activeIndex === index ? 1 : 0.9,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ zIndex: activeIndex === index ? 10 : 0 }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="bg-white border border-slate-100 shadow-lg rounded-2xl p-8 h-full flex flex-col">
                  {/* Stars */}
                  <div className="mb-6 flex gap-1.5">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                  </div>

                  {/* Quote text */}
                  <div className="relative mb-6 flex-1">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-[#0C6478]/12 rotate-180" />
                    <p className="relative z-10 text-lg font-medium leading-relaxed text-slate-800">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>

                  <Separator className="my-4" />

                  {/* Author row */}
                  <div className="flex items-center gap-4">
                    {/* Badge de iniciais — sem dependência externa (randomuser.me removido) */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0C6478] to-[#2FB8D9] text-white font-heading font-semibold text-lg ring-2 ring-white/20 shadow-md">
                      {testimonial.initials}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{testimonial.name}</h3>
                      <p className="text-sm text-[#0C6478]/70 font-sans">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Decorative corner accents — tokens da marca */}
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-xl bg-[#0C6478]/5" />
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-xl bg-[#2FB8D9]/5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Dados reais do Google (10 depoimentos) ───────────────────────────────────

const rfTestimonials: Testimonial[] = [
  {
    id: 1,
    initials: "PP",
    name: "Paloma Pires",
    role: "Passeio de Lancha",
    rating: 5,
    quote:
      "Que passeio incrível! Foi muito mais do que um simples passeio de lancha, foi uma experiência linda que vamos guardar com muito carinho. Além das paisagens maravilhosas, tivemos o prazer de conhecer famílias extremamente gentis e humildes.",
  },
  {
    id: 2,
    initials: "PP",
    name: "panquinha panka",
    role: "Passeio de Lancha",
    rating: 5,
    quote:
      "Gostei muito, atenderam a gente muito bem. A moça foi muito atenciosa, muita segurança, o condutor muito educado e profissional. As ilhas são maravilhosas, super indico o passeio.",
  },
  {
    id: 3,
    initials: "CD",
    name: "Canal do Dengue",
    role: "Passeio de Lancha",
    rating: 5,
    quote:
      "Fizemos um passeio nesse final de semana com a RF Turismo e super recomendo. Marinheiro Cebola, um excelente profissional — pegamos chuva na volta, mas ele pilota muito bem. Parabéns pela recepção, estava tudo maravilhoso. Voltaremos mais vezes!",
  },
  {
    id: 4,
    initials: "EG",
    name: "Ester Furlan Galdeano",
    role: "Roteiro Norte",
    rating: 5,
    quote:
      "Fizemos um passeio muito bom, mesmo sendo alta temporada. Dá pra mergulhar e ver muitos peixes na Ilha das Couves, a Ilha do Prumirim tem águas calmas e é deliciosa, assim como a Ilha dos Porcos. O Flávio e a esposa são muito atenciosos.",
  },
  {
    id: 5,
    initials: "RC",
    name: "Rafael De Carli",
    role: "Passeio de Lancha",
    rating: 5,
    quote:
      "Passeio perfeito! Cebola, marinheiro do barco, foi muito atencioso, sem pressa, e nos levou para lugares bem bonitos. Podem ir sem medo.",
  },
  {
    id: 6,
    initials: "NS",
    name: "Naiara Silva",
    role: "Passeio de Lancha",
    rating: 5,
    quote: "Passeio maravilhoso! Flávio super atencioso e muito prestativo.",
  },
  {
    id: 7,
    initials: "VB",
    name: "Virginia Barros",
    role: "Lancha Privativa",
    rating: 5,
    quote:
      "Lancha maravilhosa, pessoal muito gente boa desde a contratação até o passeio. Estão de parabéns.",
  },
  {
    id: 8,
    initials: "EC",
    name: "Emily Correa",
    role: "Passeio de Lancha",
    rating: 5,
    quote: "Amei! O passeio foi ótimo e a atendente super simpática.",
  },
  {
    id: 9,
    initials: "JO",
    name: "Júlia Beatriz Freitas de Oliveira",
    role: "Passeio de Lancha",
    rating: 5,
    quote:
      "Passeio excelente, o marinheiro Cebola muito querido e proativo. Barco maravilhoso, com conforto e segurança.",
  },
  {
    id: 10,
    initials: "DG",
    name: "Débora Gonçalves",
    role: "Roteiro Norte",
    rating: 5,
    quote:
      "Vale muito a pena o passeio! Conhecemos várias praias e aproveitamos bastante. Sr. Flávio muito educado e atencioso.",
  },
]

export function AnimatedTestimonialsBasic() {
  return <AnimatedTestimonials testimonials={rfTestimonials} />
}
