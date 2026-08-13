'use client';

import { useState, type CSSProperties } from 'react';
import { ImageOff } from 'lucide-react';

type GalleryItem = {
  image: { src: string; alt?: string; location: string };
};

type ArchGalleryProps = {
  items?: GalleryItem[];
  cardWidth?: number;
  cardHeight?: number;
  cornerRadius?: number;
  className?: string;
};

const DEFAULT_ITEMS: GalleryItem[] = [
  {
    image: {
      src: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=600&h=800&q=80',
      alt: 'Lancha moderna navegando em águas cristalinas em Ubatuba',
      location: 'Ilha do Prumirim'
    },
  },
  {
    image: {
      src: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=600&h=800&q=80',
      alt: 'Enseada tropical com lanchas ancoradas em Ubatuba',
      location: 'Praia do Cedro'
    },
  },
  {
    image: {
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&h=800&q=80',
      alt: 'Praia paradisíaca no pôr do sol em Ubatuba',
      location: 'Praia Domingas Dias'
    },
  },
  {
    image: {
      src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&h=800&q=80',
      alt: 'Passageiros mergulhando ao redor da lancha em Ubatuba',
      location: 'Ilha das Couves'
    },
  },
  {
    image: {
      src: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=600&h=800&q=80',
      alt: 'Passeio premium exclusivo para casais e famílias em Ubatuba',
      location: 'Saco da Ribeira'
    },
  },
  {
    image: {
      src: 'https://images.unsplash.com/photo-1544551763-8dd44758c2dd?auto=format&fit=crop&w=600&h=800&q=80',
      alt: 'Visual panorâmico do mar a bordo em Ubatuba',
      location: 'Praia do Lázaro'
    },
  },
  {
    image: {
      src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&h=800&q=80',
      alt: 'Ilha das Cabras e mar cristalino em Ubatuba',
      location: 'Praia de Santa Rita'
    },
  },
];

const ROTATE_STEP = 6;
const Y_STEP = 18;
const OVERLAP = 0.58;
const HOVER_SCALE = 1.08;
const HOVER_LIFT = 16;

function GalleryCard({ 
  entry, 
  cardStyle, 
  isHovered, 
  onMouseEnter, 
  onMouseLeave, 
  onFocus, 
  onBlur, 
  index 
}: {
  entry: GalleryItem;
  cardStyle: CSSProperties;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
  index: number;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      style={cardStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={0}
      aria-label={entry.image.alt || `Photo ${index + 1}`}
      className="group"
    >
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#094F5F] text-white">
          <ImageOff className="w-8 h-8 opacity-50 mb-2" />
        </div>
      ) : (
        <img
          src={entry.image.src}
          alt={entry.image.alt || ''}
          draggable={false}
          onError={() => setHasError(true)}
          className='pointer-events-none absolute inset-0 h-full w-full select-none object-cover'
        />
      )}
      
      {/* Vinheta Gradient */}
      <div className={`absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#063A45]/90 via-[#063A45]/30 to-transparent transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-70' : 'opacity-100'}`} />
      
      {/* Texto Sobreposto Seguro */}
      <div className="absolute bottom-4 left-0 right-0 px-4 text-center pointer-events-none">
        <span className="font-heading text-white text-sm md:text-base drop-shadow-md">
          {entry.image.location}
        </span>
      </div>
    </div>
  );
}

export function ArchGallery({
  items = DEFAULT_ITEMS,
  cardWidth = 180,
  cardHeight = 240,
  cornerRadius = 18,
  className = '',
}: ArchGalleryProps) {
  const deck = items.length ? items : DEFAULT_ITEMS;
  const total = deck.length;
  const mid = (total - 1) / 2;
  const [hovered, setHovered] = useState<number | null>(null);

  const stageWidth = cardWidth + Math.abs(mid) * 2 * cardWidth * OVERLAP + cardWidth * 0.2;
  const stageHeight = cardHeight + Math.abs(mid) * Y_STEP + 48;

  return (
    <div
      className={['flex w-full items-center justify-center py-10 overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
      role='group'
      aria-label='Image gallery'
    >
      <div
        className='relative scale-90 sm:scale-100 transition-transform duration-300'
        style={{ width: stageWidth, height: stageHeight }}
      >
        {deck.map((entry, index) => {
          const offset = index - mid;
          const rotate = offset * ROTATE_STEP;
          const translateY = Math.abs(offset) * Y_STEP;
          const translateX = offset * cardWidth * OVERLAP;
          const baseZ = total - Math.abs(offset);
          const isHovered = hovered === index;

          // Sombra proporcional à distância do centro (offset)
          const shadowSpread = Math.max(8, 28 - Math.abs(offset) * 4);
          const shadowY = Math.max(4, 12 - Math.abs(offset) * 2);
          
          const cardStyle: CSSProperties = {
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: cardWidth,
            height: cardHeight,
            marginLeft: -cardWidth / 2,
            marginTop: -cardHeight / 2,
            borderRadius: cornerRadius,
            overflow: 'hidden',
            transformOrigin: 'center center',
            transform: isHovered
              ? `translate(${translateX}px, ${translateY - HOVER_LIFT}px) rotate(0deg) scale(${HOVER_SCALE})`
              : `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(1)`,
            zIndex: isHovered ? total + 1 : baseZ,
            transition:
              'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), z-index 0ms, box-shadow 280ms ease',
            boxShadow: isHovered
              ? '0 20px 40px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.1)'
              : `0 ${shadowY}px ${shadowSpread}px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)`,
            cursor: 'pointer',
            backgroundColor: '#F7FBFC',
          };

          return (
            <GalleryCard
              key={`${entry.image.src}-${index}`}
              entry={entry}
              cardStyle={cardStyle}
              isHovered={isHovered}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}
export default ArchGallery;
