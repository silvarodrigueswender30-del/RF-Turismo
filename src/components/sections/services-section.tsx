"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { SectionDivider } from "@/components/ui/section-divider";
import { ArrowRight, ArrowLeft, Anchor, Sailboat, Ship, Waves, Map, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

// Shadcn UI Carousel Imports
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { Button } from "@/components/ui/button";

// --- Carousel Context ---
type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};
type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

// --- Main Carousel Component ---
const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

// --- Carousel Content ---
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

// --- Carousel Item ---
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

// --- Carousel Controls ---
const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-10 w-10 rounded-full",
        "left-2 top-1/2 -translate-y-1/2",
        className,
      )}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-10 w-10 rounded-full",
        "right-2 top-1/2 -translate-y-1/2",
        className,
      )}
      onClick={scrollNext}
      disabled={!canScrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

const CarouselDots = () => {
  const { api } = useCarousel();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!api) return;
    setScrollSnaps(api.scrollSnapList());
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  if (scrollSnaps.length <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-8">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          onClick={() => api?.scrollTo(index)}
          className={cn(
            "transition-all duration-300 rounded-full",
            index === selectedIndex
              ? "w-8 h-2 bg-[#2FB8D9]" // Pill ativo da marca
              : "w-2 h-2 bg-slate-300 hover:bg-slate-400" // Inativo
          )}
          aria-label={`Ir para o slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

// --- Service Card & Carousel Section ---
export interface Service {
  number: string;
  title: string;
  description: string;
  cta: string;
  whatsappText: string;
  icon: React.ElementType;
  gradient: string;
  accentColor: string;
}

// Sub-component for individual cards
const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const whatsappUrl = `https://wa.me/5512996125606?text=${encodeURIComponent(service.whatsappText)}`;

  return (
    <div
      className={cn(
        "relative flex min-h-[520px] w-full flex-col justify-between overflow-hidden rounded-3xl p-6 md:p-8"
      )}
    >
      {/* Background Image */}
      <img 
        src={`/images/services/${index + 1}.avif`} 
        alt={service.title} 
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
      />
      {/* Hero-like overlay gradient - Atualizado para paleta RF Turismo */}
      <div 
        aria-hidden 
        className={cn("absolute inset-0 z-10 bg-gradient-to-t pointer-events-none", service.gradient)}
      />

      {/* Top Content: Icon, Description */}
      <div className="z-20 flex flex-col items-start text-left">
        <div className="flex justify-between w-full items-center mb-6">
          <service.icon className="h-10 w-10 text-white" strokeWidth={1.25} />
          <span className="text-sm text-white/80 font-medium">
            ( {service.number} )
          </span>
        </div>
        
        <p className="text-sm md:text-base text-white/95 leading-relaxed font-light mb-6">
          {service.description}
        </p>
      </div>

      {/* Bottom Content: Title and CTA (WhatsApp Button) */}
      <div className="z-20 mt-8 pt-4 flex flex-col gap-4">
        <h3 className="text-xl md:text-2xl font-heading font-semibold uppercase tracking-wide text-white">
          {service.title}
        </h3>
        
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-between w-full p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 text-white shadow-sm"
        >
          <div className="flex items-center gap-3">
            {/* WhatsApp SVG Icon */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            <span className="text-sm font-sans font-medium tracking-wide">{service.cta}</span>
          </div>
          <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </a>
      </div>
    </div>
  );
};

// Main exportable component
export const ServiceCarousel = ({ services }: { services: Service[] }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="relative group"
      >
        <CarouselContent>
        {services.map((service, index) => (
            <CarouselItem key={index} className="basis-[85%] md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
                <ServiceCard service={service} index={index} />
            </div>
            </CarouselItem>
        ))}
        </CarouselContent>
        
        {/* Carousel Navigation (Desktop only) */}
        <div className="hidden md:block">
          <CarouselPrevious className="bg-white/90 hover:bg-white text-slate-800 border-slate-200 -left-6 lg:-left-12 shadow-sm" />
          <CarouselNext className="bg-white/90 hover:bg-white text-slate-800 border-slate-200 -right-6 lg:-right-12 shadow-sm" />
        </div>
        
        {/* Carousel Pagination Dots */}
        <CarouselDots />
      </Carousel>
    </div>
  );
};

// Define the data for the services (only the first 3 cards)
const services: Service[] = [
  {
    number: "001",
    title: "Lancha Compartilhada",
    description: "Ideal para quem viaja sozinho, em casal ou em grupo pequeno. Divida a experiência com outros viajantes e conheça as ilhas de Ubatuba pagando por assento.",
    cta: "Ver disponibilidade",
    whatsappText: "Olá! Gostaria de saber mais sobre a Lancha Compartilhada.",
    icon: Sailboat,
    gradient: "from-[#063A45] via-[#063A45]/70 to-[#2FB8D9]/20",
    accentColor: "#2FB8D9"
  },
  {
    number: "002",
    title: "Lancha Privativa",
    description: "A lancha é só sua. Escolha o roteiro, o tempo em cada parada e leve quem você quiser — do seu jeito, no seu ritmo. A partir de R$1.800",
    cta: "Reservar Privativa",
    whatsappText: "Olá! Gostaria de reservar uma Lancha Privativa.",
    icon: Anchor,
    gradient: "from-[#094F5F] via-[#094F5F]/70 to-[#0C6478]/20",
    accentColor: "#0C6478"
  },
  {
    number: "003",
    title: "Roteiro Personalizado",
    description: "Aniversário, pedido de casamento, confraternização de empresa ou um dia diferente com a família: montamos o roteiro sob medida para a ocasião.",
    cta: "Montar meu roteiro",
    whatsappText: "Olá! Gostaria de montar um Roteiro Personalizado.",
    icon: Map,
    gradient: "from-[#0B2530] via-[#0B2530]/70 to-[#1D7DA3]/20",
    accentColor: "#1D7DA3"
  },
];

// The Demo component is now the section component
export function ServicesSection() {
  return (
    <section id="servicos" className="relative w-full pt-6 pb-16 md:pt-8 md:pb-24 scroll-mt-24">
      {/* Background Layer: Ocean Divider sitting at the bottom of this section */}
      <div className="absolute left-0 right-0 bottom-0 z-0">
        <SectionDivider />
      </div>

      {/* Content Layer (Cards) sitting above the background */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center text-center w-full max-w-6xl mb-12 px-4 space-y-4">
          <h2 className="font-heading font-light tracking-[-0.025em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.1] text-center">
            Serviços Feitos Para o Mar
          </h2>
        </div>
        <ServiceCarousel services={services} />
      </div>
    </section>
  );
}
