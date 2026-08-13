"use client";

/**
 * SectionDivider — Transição visual entre Team (ilhas) e ServicesSection
 *
 * Arquitetura: elemento no fluxo com margin-top/bottom negativo.
 * z-index BAIXO (0) na imagem → ServicesSection (DOM posterior) fica
 * naturalmente acima em todos os breakpoints, inclusive mobile.
 *
 * Ancoragem calibrada:
 *  - overlapUp nunca excede o padding-bottom real de Team (py-12 = 48px mobile,
 *    py-16 = 64px desktop) para não invadir o conteúdo da seção de ilhas.
 *  - overlapDown empurra ServicesSection para dentro da imagem, criando
 *    o efeito de cards "flutuando" sobre o costão.
 *
 * Em page.tsx:
 *   <Team />
 *   <SectionDivider />
 *   <ServicesSection />   ← precisa de position:relative z-20 para ficar acima da imagem
 */

import React from "react";

export function SectionDivider() {
  // Altura total da faixa de imagem
  const height = "clamp(180px, 22vw, 340px)";

  // Gradiente de máscara — dissolução suave em ambas as bordas
  const maskGradient = [
    "linear-gradient(",
    "to bottom,",
    "transparent 0%,",
    "rgba(0,0,0,0.2) 10%,",
    "rgba(0,0,0,0.55) 22%,",
    "rgba(0,0,0,0.85) 34%,",
    "black 42%,",
    "black 58%,",
    "rgba(0,0,0,0.85) 66%,",
    "rgba(0,0,0,0.55) 78%,",
    "rgba(0,0,0,0.2) 90%,",
    "transparent 100%",
    ")",
  ].join(" ");

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className="pointer-events-none w-full"
      style={{
        height,
        // O translateY foi removido. Ao ficar no bottom: 0 natural, a imagem (que tem ~180px a 340px)
        // sobe além do padding (64px a 96px) da seção, resultando num overlap perfeito com os cards,
        // descontando a área transparente da máscara.
      }}
    >
      <picture className="absolute inset-0 w-full h-full block">
        <img
          src="/images/logos-3.avif"
          alt=""
          role="presentation"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "center",
            WebkitMaskImage: maskGradient,
            maskImage: maskGradient,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />
      </picture>
    </div>
  );
}
