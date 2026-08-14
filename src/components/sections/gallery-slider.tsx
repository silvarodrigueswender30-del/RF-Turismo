'use client';

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ChevronLeft, ChevronRight, MapPin, ImageOff } from "lucide-react";
import { useState } from "react";

// ─── Gallery data ──────────────────────────────────────────────────────
// TODO: todas as 8 imagens abaixo são placeholders do Unsplash e NÃO
// correspondem aos locais reais anunciados. Substituir por fotos reais
// dos destinos antes de ir para produção.
interface GalleryItem {
  id: number;
  imageUrl: string;
  title: string;
  location: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    imageUrl: "/images/galeria/ilhas/island-1.avif",
    title: "Lancha Privativa",
    location: "Ubatuba, SP",
  },
  {
    id: 2,
    imageUrl: "/images/galeria/ilhas/island-2.avif",
    title: "Passeio em Família",
    location: "Ubatuba, SP",
  },
  {
    id: 3,
    imageUrl: "/images/galeria/ilhas/island-3.avif",
    title: "Águas Cristalinas",
    location: "Ubatuba, SP",
  },
  {
    id: 4,
    imageUrl: "/images/galeria/ilhas/island-4.avif",
    title: "Mergulho Livre",
    location: "Ubatuba, SP",
  },
  {
    id: 5,
    imageUrl: "/images/galeria/ilhas/island-5.avif",
    title: "Roteiro Exclusivo",
    location: "Ubatuba, SP",
  },
  {
    id: 6,
    imageUrl: "/images/galeria/ilhas/island-6.avif",
    title: "Visual Paradisíaco",
    location: "Ubatuba, SP",
  },
  {
    id: 7,
    imageUrl: "/images/galeria/ilhas/island-7.avif",
    title: "Pôr do Sol no Mar",
    location: "Ubatuba, SP",
  },
  {
    id: 8,
    imageUrl: "/images/galeria/ilhas/island-8.avif",
    title: "Experiência Náutica",
    location: "Ubatuba, SP",
  },
];

export function GallerySlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Fallback para manter os botões interativos
  // Como o InfiniteSlider usa framer-motion linear contínuo, não tem paginação nativa.
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % galleryItems.length);
  };

  return (
    <section className="relative w-full overflow-hidden pt-8 pb-24 md:pt-12 md:pb-32">
      {/* Imagem de fundo full-bleed */}
      <div className="absolute inset-0">
        <img 
          src="/images/galeria/002.avif" 
          alt="Lancha em Ubatuba" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Máscara superior: funde a imagem saindo do branco/bg da página */}
      <div 
        className="absolute top-0 left-0 right-0 h-[40%] z-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to bottom, 
            #FFFFFF 0%, 
            #FFFFFF 20%,
            rgba(255,255,255,0.8) 45%, 
            transparent 100%)`
        }}
      />

      {/* Máscara inferior: funde a imagem entrando na cor de fundo da próxima sessão */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[22%] z-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to top, 
            #FFFFFF 0%, 
            rgba(255,255,255,0.6) 45%, 
            transparent 100%)`
        }}
      />

      <div className="relative z-20 w-full">
        {/* Fade lateral do carrossel */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white/20 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white/20 to-transparent z-10 pointer-events-none" />

        <InfiniteSlider duration={35} durationOnHover={150} gap={24} className="py-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative w-[320px] md:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-transparent cursor-pointer"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.style.display = "flex";
                }}
              />

              <div className="absolute inset-0 hidden flex-col items-center justify-center bg-transparent gap-2">
                <ImageOff className="w-8 h-8 text-[#2FB8D9]/50" aria-hidden="true" />
                <span className="text-[#2FB8D9]/50 text-xs font-sans">Imagem indisponível</span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#063A45]/80 via-[#063A45]/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-white">
                <span className="inline-flex items-center gap-1 text-[#2FB8D9] text-xs font-medium mb-1">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  {item.location}
                </span>
                <h3 className="font-heading font-light tracking-[-0.025em] text-lg md:text-xl text-white group-hover:text-white/90 transition-colors duration-200">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </InfiniteSlider>
      </div>

      {/* Botões de navegação */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
        <button 
          aria-label="Anterior"
          onClick={handlePrev}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white transition hover:bg-white/25"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {galleryItems.map((_, i) => (
            <span 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-6 bg-[#2FB8D9]' : 'w-1.5 bg-white/40'
              }`} 
            />
          ))}
        </div>

        <button 
          aria-label="Próximo"
          onClick={handleNext}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white transition hover:bg-white/25"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
