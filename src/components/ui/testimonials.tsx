'use client';

import { motion } from "framer-motion";
import { Ship } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

// TypeScript interface for a single testimonial object (now used for Fleet cards)
export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  imageSrc: string;
}

// TypeScript interface for the component's props
interface TestimonialSectionProps {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

/**
 * A responsive section component to display the RF Turismo fleet.
 * Mobile: horizontal CSS scroll-snap carousel with dot indicators.
 * Tablet (md+): static 2-column grid.
 * Desktop (lg+): static 3-column grid.
 * Framer Motion stagger-reveal preserved on vertical scroll.
 */
export const TestimonialSection = ({
  title,
  subtitle,
  testimonials,
}: TestimonialSectionProps) => {
  // ─── Framer Motion variants (stagger reveal) ─────────────────────────
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  // ─── Dot indicators — IntersectionObserver (mobile only) ─────────────
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = cardRefs.current.indexOf(
            entry.target as HTMLDivElement
          );
          if (idx !== -1) setActiveIndex(idx);
        }
      });
    },
    []
  );

  useEffect(() => {
    // Only attach observer when viewport is mobile-sized (<768px)
    if (typeof window === "undefined" || window.innerWidth >= 768) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      // Fire when card centre crosses the viewport mid-point
      rootMargin: "0px -40% 0px -40%",
      threshold: 0,
    });

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <section className="w-full py-16 sm:py-24 relative">
      {/* Gradiente na parte inferior para transicionar suavemente (branco -> transparente subindo), 
          unindo com a máscara superior branca da seção de Galeria logo abaixo */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 md:h-48 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to top, #FFFFFF 0%, transparent 100%)'
        }}
      />
      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        {/* Section Header — alinhado à esquerda, consistente com padrão das demais seções */}
        <div className="text-left max-w-2xl mb-12">
          <h2 className="font-heading font-light tracking-[-0.025em] text-3xl md:text-5xl text-slate-900 drop-shadow-sm">
            {title}
          </h2>
          <p className="mt-4 text-lg font-sans text-slate-600">
            {subtitle}
          </p>
        </div>

        {/*
          ─── Cards layout ────────────────────────────────────────────────
          Mobile  (<md): flex horizontal, overflow-x scroll-snap, scrollbar hidden.
          Tablet  (md+): CSS grid 2 cols, no horizontal scroll.
          Desktop (lg+): CSS grid 3 cols.
          motion.div preserves the stagger-reveal animation on vertical scroll.
        */}
        <motion.div
          className={[
            // ── Mobile: horizontal scroll-snap carousel ──
            "flex overflow-x-auto snap-x snap-mandatory gap-5 -mx-4 px-4 pb-4 scrollbar-hide",
            // ── md+: switch to static grid ──
            "md:grid md:grid-cols-2 md:gap-8 md:overflow-x-visible md:mx-0 md:px-0 md:pb-0 md:snap-none",
            // ── lg+: 3-column grid ──
            "lg:grid-cols-3",
          ].join(" ")}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              ref={(el) => { cardRefs.current[idx] = el; }}
              className={[
                // ── Shared card styles ──
                "relative overflow-hidden rounded-2xl bg-slate-900 shadow-lg group aspect-[3/4]",
                // ── Mobile: fixed width so cards peek correctly (85vw shows ~1.15 cards) ──
                "shrink-0 w-[80vw] snap-center",
                // ── md+: reset mobile sizing, let grid control width ──
                "md:w-auto md:shrink md:max-w-none md:mx-0",
              ].join(" ")}
              variants={itemVariants}
            >
              {/* Card Image */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={testimonial.imageSrc}
                  alt={testimonial.name}
                  className="h-full w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Wash sutil para unificar a temperatura de cor sem esconder o barco */}
                <div className="absolute inset-0 bg-[#063A45]/10 mix-blend-multiply pointer-events-none" />

                {/* Scrim (véu) não-linear: concentra escurecimento no terço inferior, preservando o barco no topo */}
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 group-hover:opacity-80"
                  style={{
                    backgroundImage: `linear-gradient(
                      to top,
                      #0B2530 0%,
                      rgba(11, 37, 48, 0.88) 12%,
                      rgba(11, 37, 48, 0.55) 26%,
                      rgba(11, 37, 48, 0.22) 42%,
                      rgba(11, 37, 48, 0.05) 58%,
                      transparent 72%
                    )`
                  }}
                />
              </div>

              {/* Content within the card */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white z-10">
                {/* Ícone Ship em círculo translúcido — token turquoise, padrão da seção Sobre Nós */}
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm mb-4">
                  <Ship
                    className="h-5 w-5 text-[#2FB8D9]"
                    aria-hidden="true"
                  />
                </span>
                <p className="text-sm sm:text-base font-sans font-light leading-relaxed text-slate-100 drop-shadow-sm">
                  {testimonial.quote}
                </p>
                <figcaption className="mt-4 border-t border-white/10 pt-3">
                  <h3 className="font-heading font-semibold text-lg text-white">
                    {testimonial.name}
                  </h3>
                  {/* Corrigido: text-sky-300 → token turquoise */}
                  <p className="text-xs text-[#2FB8D9] font-medium font-sans">
                    {testimonial.role}
                  </p>
                </figcaption>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Dot indicators — visible on mobile only ─────────────────── */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-6" aria-hidden="true">
          {testimonials.map((_, idx) => (
            <span
              key={idx}
              className={[
                "block rounded-full transition-all duration-300",
                idx === activeIndex
                  ? "w-6 h-2 bg-[#2FB8D9]"          // pill ativo — turquoise
                  : "w-2 h-2 bg-[#0B2530]/20",        // bullet inativo — ink/20
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Default high-quality data localized in Portuguese for RF Turismo Fleet
const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    quote: "❝ Elegância e desempenho para dias inteiros no mar, com espaço de sobra para o grupo relaxar. ❞",
    name: "Lancha Triton 26",
    role: "250 HP · Até 11 passageiros",
    // TODO: substituir por foto real da embarcação (Triton 26)
    imageSrc: "/images/frota/Lancha Triton 26.avif",
  },
  {
    id: 2,
    quote: "❝ A maior capacidade da nossa frota — perfeita para reunir toda a família ou o grupo de amigos em um só passeio. ❞",
    name: "Lancha Ventura 24",
    role: "200 HP · Até 13 passageiros",
    // TODO: substituir por foto real da embarcação (Ventura 24)
    imageSrc: "/images/frota/Lancha Ventura 24.avif",
  },
  {
    id: 3,
    quote: "❝ Ágil e confortável, ideal para casais ou grupos menores que querem exclusividade sem abrir mão da leveza no mar. ❞",
    name: "Lancha Ventura 20",
    role: "115 HP · Até 8 passageiros",
    // TODO: substituir por foto real da embarcação (Ventura 20) — imagem atual é temporária
    imageSrc: "/images/frota/Lancha Ventura 20.avif",
  },
];

export function TestimonialSectionDemo() {
  return (
    <TestimonialSection
      title="Nossa Frota"
      subtitle="Conheça as lanchas que vão levar você para as ilhas mais bonitas de Ubatuba"
      testimonials={defaultTestimonials}
    />
  );
}
