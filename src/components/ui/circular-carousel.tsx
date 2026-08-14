"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselItem {
  id: string;
  tag?: string;
  title: string;
  description: string;
}

interface CircularCarouselProps {
  items: CarouselItem[];
  className?: string;
}

// Navigation buttons z-index is 30 — cards are capped at max 9, so buttons always win
const BUTTONS_Z = 30;

export function CircularCarousel({ items, className }: CircularCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className={cn("relative flex flex-col items-center justify-center w-full overflow-hidden", className)}>
      {/* 3D card area — overflow-hidden removed here so fanned cards aren't clipped */}
      <div className="relative w-full max-w-[280px] md:max-w-[340px] h-[220px] md:h-[260px] flex items-center justify-center perspective-[1200px]">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            let distance = index - activeIndex;
            const halfLength = Math.floor(items.length / 2);
            
            if (distance > halfLength) distance -= items.length;
            if (distance < -halfLength) distance += items.length;

            const isActive = distance === 0;
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            
            const spread = isMobile ? 100 : 160; 
            const xOffset = distance * spread; 
            const yOffset = Math.abs(distance) * (isMobile ? 15 : 25); 
            const rotateZ = distance * 8; 
            const scale = isActive ? 1 : 1 - Math.abs(distance) * 0.15;
            // Cap zIndex at 9 — always below BUTTONS_Z (30)
            const zIndex = Math.max(1, 9 - Math.abs(distance));
            
            const opacity = isActive ? 1 : Math.abs(distance) === 1 ? (isMobile ? 0.3 : 0.75) : 0;
            
            const blurAmount = isMobile ? '10px' : (isActive ? '18px' : '14px');

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  x: xOffset,
                  y: yOffset,
                  rotateZ: rotateZ,
                  scale: scale,
                  zIndex: zIndex,
                  opacity: opacity,
                  // Inactive cards (opacity < 1) never capture touches/clicks
                  pointerEvents: isActive ? "auto" : "none"
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8
                }}
                className={cn(
                  "absolute flex flex-col justify-start gap-2 md:gap-3 w-[260px] md:w-[320px] h-[180px] md:h-[200px] p-6 md:p-7 rounded-2xl transition-colors duration-300",
                  isActive ? "cursor-default" : "cursor-pointer"
                )}
                style={{
                  background: isActive ? "rgba(22,75,110,0.28)" : "rgba(255,255,255,0.10)",
                  backdropFilter: `blur(${blurAmount})`,
                  WebkitBackdropFilter: `blur(${blurAmount})`,
                  border: isActive ? "1px solid rgba(255,255,255,0.28)" : "1px solid rgba(255,255,255,0.18)",
                  boxShadow: isActive ? "0 0 60px rgba(63,169,214,0.30), 0 20px 25px -5px rgba(0, 0, 0, 0.4)" : "none",
                }}
              >
                {item.tag && (
                  <span className="font-body w-fit text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-sky-400 text-navy-900 shadow-sm inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    {item.tag}
                  </span>
                )}
                
                <div className="mt-1 md:mt-2">
                  <h3 
                    className={cn(
                      "font-display font-bold mb-1.5 md:mb-2 transition-colors duration-300",
                      isActive ? "text-white" : "text-white/60"
                    )}
                    style={{ 
                      textShadow: isActive ? "0 0 16px rgba(63,169,214,0.7), 0 1px 3px rgba(0,0,0,0.8)" : "none" 
                    }}
                  >
                    {/* Diferencia número vs "h" em títulos de horário (ex: "9h", "9h20", "17h") */}
                    {(() => {
                      const timeMatch = item.title.match(/^(\d+)(h.*)$/);
                      if (timeMatch) {
                        return (
                          <>
                            <span className="text-4xl md:text-5xl">{timeMatch[1]}</span>
                            <span className="text-2xl md:text-3xl">{timeMatch[2]}</span>
                          </>
                        );
                      }
                      return <span className="text-2xl md:text-3xl">{item.title}</span>;
                    })()}
                  </h3>
                  <p 
                    className={cn(
                      "font-body font-light text-xs md:text-sm leading-relaxed transition-colors duration-300",
                      isActive ? "text-white/80" : "text-white/50"
                    )}
                    style={{ textShadow: isActive ? "0 1px 3px rgba(0,0,0,0.6)" : "none" }}
                  >
                    {/* MapPin apenas em descriptions com referência geográfica direta */}
                    {/^(Chegada|Ilha)/.test(item.description) && (
                      <MapPin className="inline-block w-3 h-3 mr-1 text-white/50 shrink-0 relative -top-px" />
                    )}
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation — separate DOM layer, always above cards (z-index via style) */}
      <div
        className="flex flex-col items-center mt-6 md:mt-10 gap-6 md:gap-8"
        style={{ position: "relative", zIndex: BUTTONS_Z }}
      >
        <div className="flex items-center gap-5">
          {/* prev button — ghost, 44x44px touch target */}
          <button
            onClick={prev}
            className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Previous step"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div 
            className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10"
            style={{ background: "rgba(0,0,0,0.2)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
          >
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "h-2 md:h-2.5 rounded-full transition-all duration-300 focus:outline-none",
                  i === activeIndex 
                    ? "bg-sky-400 w-6 md:w-8" 
                    : "bg-white/30 hover:bg-white/60 w-2 md:w-2.5"
                )}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>

          {/* next button — ghost, 44x44px touch target */}
          <button
            onClick={next}
            className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Next step"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

      </div>
    </div>
  );
}
