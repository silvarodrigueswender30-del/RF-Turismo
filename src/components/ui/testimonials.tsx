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
        ease: "easeOut",
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
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4">
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
                {/* Gradient overlay — usando token deep-teal-900 (#063A45) em vez de slate genérico */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#063A45] via-[#063A45]/50 to-transparent" />
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
    imageSrc: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=600&h=800",
  },
  {
    id: 2,
    quote: "❝ A maior capacidade da nossa frota — perfeita para reunir toda a família ou o grupo de amigos em um só passeio. ❞",
    name: "Lancha Ventura 24",
    role: "200 HP · Até 13 passageiros",
    // TODO: substituir por foto real da embarcação (Ventura 24)
    imageSrc: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=600&h=800",
  },
  {
    id: 3,
    quote: "❝ Ágil e confortável, ideal para casais ou grupos menores que querem exclusividade sem abrir mão da leveza no mar. ❞",
    name: "Lancha Ventura 20",
    role: "115 HP · Até 8 passageiros",
    // TODO: substituir por foto real da embarcação (Ventura 20) — imagem atual é temporária
    imageSrc: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600&h=800",
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
