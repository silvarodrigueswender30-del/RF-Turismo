"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"

import {
  Autoplay,
  EffectCoverflow,
  Pagination,
} from "swiper/modules"

// Imagens copiadas do Nativo Turismo (momentos reais de clientes)
const baseImages = [
  { src: "/images/galeria/clientes/cliente-1.avif", alt: "Família aproveitando o passeio de lancha em Ubatuba" },
  { src: "/images/galeria/clientes/cliente-2.avif", alt: "Casal sorrindo durante roteiro náutico em Ubatuba" },
  { src: "/images/galeria/clientes/cliente-3.avif", alt: "Mergulho livre nas águas cristalinas de Ubatuba" },
  { src: "/images/galeria/clientes/cliente-4.avif", alt: "Grupo de amigos na lancha privativa RF Turismo" },
  { src: "/images/galeria/clientes/cliente-5.avif", alt: "Clientes relaxando na areia da praia" },
  { src: "/images/galeria/clientes/cliente-6.avif", alt: "Turistas explorando as ilhas em Ubatuba" },
  { src: "/images/galeria/clientes/cliente-7.avif", alt: "Vista panorâmica durante o passeio" },
  { src: "/images/galeria/clientes/cliente-8.avif", alt: "Momentos especiais no mar de Ubatuba" },
  { src: "/images/galeria/clientes/cliente-9.avif", alt: "Pôr do sol durante passeio de lancha em Ubatuba" },
]

// Array triplicado para garantir buffer de clonagem do loop em qualquer resolução
// (regra Swiper: total de slides ≥ slides visíveis × 2 + 1)
const clientImages = [...baseImages, ...baseImages, ...baseImages]

export function ClientGallerySection() {
  const css = `
  .rf-gallery-swiper {
    width: 100%;
    padding-bottom: 56px;
    padding-top: 12px;
  }

  .rf-gallery-swiper .swiper-slide {
    background-position: center;
    background-size: cover;
    width: clamp(220px, 26vw, 320px);
    height: clamp(290px, 34vw, 420px);
    border-radius: 20px;
    overflow: hidden;
  }

  .rf-gallery-swiper .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Custom Pagination — tokens RF Turismo */
  .rf-gallery-swiper .swiper-pagination-bullet {
    background-color: rgba(12, 100, 120, 0.20);
    opacity: 1;
    width: 8px;
    height: 8px;
    border-radius: 999px;
    transition: all 0.3s ease;
    margin: 0 4px !important;
  }
  .rf-gallery-swiper .swiper-pagination-bullet-active {
    background-color: #2FB8D9;
    width: 28px;
    border-radius: 999px;
  }

  @media (max-width: 639px) {
    .rf-gallery-swiper .swiper-pagination-bullet {
      width: 6px;
      height: 6px;
      margin: 0 3px !important;
    }
    .rf-gallery-swiper .swiper-pagination-bullet-active {
      width: 22px;
    }
    .rf-gallery-swiper {
      padding-bottom: 40px;
    }
  }
  `

  return (
    <section className="w-full pt-8 pb-8 md:pt-12 md:pb-12 overflow-hidden relative">
      {/* Gradiente superior para transição suave (branco -> transparente descendo) */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 md:h-48 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, #FFFFFF 0%, transparent 100%)'
        }}
      />
      <style>{css}</style>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-8 md:mb-12 relative z-10">
        <h2 className="font-heading font-light tracking-[-0.025em] text-3xl sm:text-4xl md:text-5xl text-[#0B2530] text-center leading-[1.1] mb-4">
          Momentos que Nossos Clientes Viveram no Mar
        </h2>
        <p className="font-sans text-base md:text-lg text-[#4B6570] text-center max-w-2xl mx-auto">
          Cada foto aqui é de uma família que embarcou com a RF Turismo —{" "}
          <span className="text-[#2FB8D9]">momentos reais</span>, sorrisos reais.
        </p>
      </div>

      <Swiper
        className="rf-gallery-swiper"
        modules={[EffectCoverflow, Autoplay, Pagination]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        loopAdditionalSlides={9}
        slidesPerView="auto"
        spaceBetween={20}
        coverflowEffect={{
          rotate: 15,
          stretch: 0,
          depth: 120,
          modifier: 1.5,
          slideShadows: false,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
      >
        {clientImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
