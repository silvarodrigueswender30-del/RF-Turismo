"use client";

import React from "react";
import { Marquee } from "@/components/ui/marquee";

export function LogoMarquee() {
  return (
    <div className="flex items-center w-full px-6 md:px-12 bg-transparent">
      <div className="flex-shrink-0 border-r border-white/20 pr-6 mr-6 hidden md:block">
        <p className="text-sm font-sans font-semibold tracking-wider text-white/60 uppercase whitespace-nowrap">
          Destinos
        </p>
      </div>
      <div className="flex-1 min-w-0">
        <Marquee className="[--gap:3rem]" fade={true} fadeAmount={10}>
          <span className="mx-8 text-xl sm:text-2xl font-heading font-light tracking-[-0.025em] text-white/50 hover:text-white transition-colors cursor-pointer">Ilha das Couves</span>
          <span className="mx-8 text-xl sm:text-2xl font-heading font-light tracking-[-0.025em] text-white/50 hover:text-white transition-colors cursor-pointer">Ilha do Prumirim</span>
          <span className="mx-8 text-xl sm:text-2xl font-heading font-light tracking-[-0.025em] text-white/50 hover:text-white transition-colors cursor-pointer">Ilha de Anchieta</span>
          <span className="mx-8 text-xl sm:text-2xl font-heading font-light tracking-[-0.025em] text-white/50 hover:text-white transition-colors cursor-pointer">Praia do Português</span>
          <span className="mx-8 text-xl sm:text-2xl font-heading font-light tracking-[-0.025em] text-white/50 hover:text-white transition-colors cursor-pointer">Ilha do Rachado</span>
          <span className="mx-8 text-xl sm:text-2xl font-heading font-light tracking-[-0.025em] text-white/50 hover:text-white transition-colors cursor-pointer">Praia do Cedro</span>
        </Marquee>
      </div>
    </div>
  );
}
