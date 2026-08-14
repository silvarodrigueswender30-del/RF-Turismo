'use client';

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { MapPin, ImageOff } from "lucide-react";

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
    // TODO: substituir por foto real da Ilha das Cabras (Ubatuba)
    imageUrl: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Ilha das Cabras",
    location: "Ilhabela, SP",
  },
  {
    id: 2,
    // TODO: substituir por foto real de passeio premium em Ubatuba
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Passeio Premium",
    location: "São Sebastião, SP",
  },
  {
    id: 3,
    // TODO: substituir por foto real da Praia de Castelhanos
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Praia de Castelhanos",
    location: "Ilhabela, SP",
  },
  {
    id: 4,
    // TODO: substituir por foto real do Saco do Sombrio
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Saco do Sombrio",
    location: "Ilhabela, SP",
  },
  {
    id: 5,
    // TODO: substituir por foto real da Praia do Bonete
    imageUrl: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Praia do Bonete",
    location: "Ilhabela, SP",
  },
  {
    id: 6,
    // TODO: substituir por foto real do Mergulho na Fome
    imageUrl: "https://images.unsplash.com/photo-1544551763-8dd44758c2dd?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Mergulho na Fome",
    location: "Ilhabela, SP",
  },
  {
    id: 7,
    // BUG CORRIGIDO: URL anterior (photo-1473116763269-25541579ffbe) retornava 404.
    // Substituída por imagem válida de pôr do sol no litoral como placeholder temporário.
    // TODO: substituir por foto real do Pôr do Sol no Canal de São Sebastião
    imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&h=400&q=80",
    title: "Pôr do Sol no Canal",
    location: "São Sebastião, SP",
  },
  {
    id: 8,
    // TODO: substituir por foto real das ilhas de Ubatuba
    imageUrl: "https://images.unsplash.com/photo-1562280963-8a5475640a10?auto=format&fit=crop&w=600&h=400&q=80",
    title: "As Ilhas",
    location: "São Sebastião, SP",
  },
];

// ─── Fallback visual para imagem quebrada ────────────────────────────
function ImageFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#063A45] gap-2">
      <ImageOff className="w-8 h-8 text-[#2FB8D9]/50" aria-hidden="true" />
      <span className="text-[#2FB8D9]/50 text-xs font-sans">Imagem indisponível</span>
    </div>
  );
}

export function GallerySlider() {
  return (
    <section className="w-full pt-4 pb-16 md:pt-6 md:pb-24 overflow-hidden">
      <div className="w-full relative">
        {/* Fade lateral — mascara bordas do slider; usa rgba branco para funcionar sobre qualquer fundo claro */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none" />

        <InfiniteSlider duration={35} durationOnHover={150} gap={24} className="py-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative w-[280px] md:w-[360px] aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-[#063A45] border border-slate-100 cursor-pointer"
            >
              {/* Imagem com fallback visual em caso de URL quebrada */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
                onError={(e) => {
                  // Oculta a img quebrada e mostra o fallback (bg do container)
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.style.display = "flex";
                }}
              />

              {/* Fallback visível apenas quando onError é disparado */}
              <div className="absolute inset-0 hidden flex-col items-center justify-center bg-[#063A45] gap-2">
                <ImageOff className="w-8 h-8 text-[#2FB8D9]/50" aria-hidden="true" />
                <span className="text-[#2FB8D9]/50 text-xs font-sans">Imagem indisponível</span>
              </div>

              {/* Gradiente de vinheta — token deep-teal-900 em vez de slate genérico */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#063A45]/80 via-[#063A45]/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Conteúdo sobreposto */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-white">
                {/* Localização — token turquoise em vez de sky-400 genérico */}
                <span className="inline-flex items-center gap-1 text-[#2FB8D9] text-xs font-medium mb-1">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  {item.location}
                </span>
                {/* Título — font-heading, consistente com padrão das demais seções */}
                <h3 className="font-heading font-light tracking-[-0.025em] text-lg md:text-xl text-white group-hover:text-white/90 transition-colors duration-200">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
