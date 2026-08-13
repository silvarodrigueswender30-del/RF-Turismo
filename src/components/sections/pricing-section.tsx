import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";

function PricingSection() {
  return (
    <section id="valores" className="w-full bg-white pt-20 pb-8 md:pt-32 md:pb-12 scroll-mt-24">
      {/* Content Layer */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2 mb-8 md:mb-12">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline" className="font-sans">Vagas Limitadas</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h2 className="font-heading font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0B2530] leading-[1.1] tracking-tight max-w-2xl text-left">
                Valores do Passeio de Lancha em Ubatuba
              </h2>
              <p className="font-sans font-light text-base md:text-xl leading-relaxed max-w-md text-left text-[#4B6570]">
                Conforto no mar não precisa ser um mistério de preço. O passeio privativo com a RF Turismo começa em R$1.800, com roteiro e tempo de parada definidos por você. Para o passeio compartilhado, valores por pessoa variam conforme o roteiro escolhido — fale com a gente no WhatsApp e receba a tabela completa e a disponibilidade para sua data.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <CTAButton
                href="https://wa.me/5512996125606?text=Ol%C3%A1!%20Quero%20reservar%20um%20passeio%20de%20lancha%20com%20a%20RF%20Turismo."
                variant="on-light"
              >
                Reservar Agora
              </CTAButton>
              <CTAButton
                href="#servicos"
                variant="secondary-light"
              >
                Ver Roteiros
              </CTAButton>
            </div>
          </div>
          
          {/* Grid de Imagens à direita */}
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {/* Imagem 1: Casal na lancha */}
            <div className="relative bg-[#F7FBFC] rounded-2xl aspect-square overflow-hidden shadow-sm group">
              <img 
                src="/images/imagem5.avif" 
                alt="Lancha privativa navegando pelas águas de Ubatuba" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#063A45]/85 via-transparent to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
                <span className="font-heading text-white text-xl md:text-2xl drop-shadow-md">
                  A partir de R$1.800
                </span>
              </div>
            </div>

            {/* Imagem 2 (Central alta): Passeio na proa */}
            <div className="relative bg-[#F7FBFC] rounded-2xl row-span-2 overflow-hidden shadow-sm group">
              <img 
                src="/images/hero-1.jpeg" 
                alt="Passeio exclusivo de lancha em Ubatuba" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#063A45]/85 via-[#063A45]/10 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 z-20 pointer-events-none">
                <span className="font-heading text-white text-lg md:text-xl drop-shadow-md">
                  Seu roteiro, seu ritmo
                </span>
              </div>
            </div>

            {/* Imagem 3: Paisagem / Ilhas */}
            <div className="relative bg-[#F7FBFC] rounded-2xl aspect-square overflow-hidden shadow-sm group">
              <img 
                src="/images/imagem6.avif" 
                alt="Praia cristalina nas ilhas de Ubatuba" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#063A45]/85 via-transparent to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
                <span className="font-heading text-white text-lg md:text-xl drop-shadow-md">
                  Ilhas de Ubatuba
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { PricingSection };
export default PricingSection;
