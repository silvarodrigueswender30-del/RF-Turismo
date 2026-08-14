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
    imageUrl: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Ilha das Cabras",
    location: "Ilhabela, SP",
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Passeio Premium",
    location: "São Sebastião, SP",
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Praia de Castelhanos",
    location: "Ilhabela, SP",
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Saco do Sombrio",
    location: "Ilhabela, SP",
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Praia do Bonete",
    location: "Ilhabela, SP",
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1544551763-8dd44758c2dd?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Mergulho na Fome",
    location: "Ilhabela, SP",
  },
  {
    id: 7,
    imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Pôr do Sol no Canal",
    location: "São Sebastião, SP",
  },
  {
    id: 8,
    imageUrl: "https://images.unsplash.com/photo-1562280963-8a5475640a10?auto=format&fit=crop&w=600&h=400&q=80",
    title: "As Ilhas",
    location: "São Sebastião, SP",
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
    <section className="relative w-full overflow-hidden pt-4 pb-20 md:pt-6 md:pb-28">
      {/* Imagem de fundo full-bleed */}
      <div className="absolute inset-0">
        <img 
          src="/images/galeria/sessao-4.webp" 
          alt="Lancha em Ubatuba" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Máscara superior: funde a imagem saindo do branco/bg da página */}
      <div 
        className="absolute top-0 left-0 right-0 h-[18%] z-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to bottom, 
            #FFFFFF 0%, 
            rgba(255,255,255,0.6) 40%, 
            transparent 100%)`
        }}
      />

      {/* Máscara inferior: funde a imagem entrando na cor de fundo da próxima sessão */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[22%] z-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to top, 
            #0B2530 0%, 
            rgba(11,37,48,0.65) 45%, 
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
              className="group relative w-[280px] md:w-[360px] aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-[#063A45] border border-slate-100/20 cursor-pointer"
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

              <div className="absolute inset-0 hidden flex-col items-center justify-center bg-[#063A45] gap-2">
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
