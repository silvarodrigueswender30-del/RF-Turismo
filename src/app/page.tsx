import { HeroSection } from "@/components/sections/hero-section";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { FeatureSection } from "@/components/sections/feature-section";
import { Stats } from "@/components/ui/stats-section-with-text";
import { GallerySlider } from "@/components/sections/gallery-slider";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialSectionDemo } from "@/components/ui/testimonials";
import { FaqSection } from "@/components/sections/faq-section";
import { FooterSection } from "@/components/sections/footer-section";
import { FeatureGrid } from "@/components/ui/feature-grid-enterprise-grade";
import { ArchGallery } from "@/components/ui/arch-gallery";
import { StatsCardSection } from "@/components/ui/stats-card-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { AnimatedTestimonialsBasic } from "@/components/ui/animated-testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <section className="relative overflow-hidden w-full py-8 md:py-10 flex items-center -mt-px">
        {/* Imagem de Fundo alinhada do topo para parecer extensão da hero */}
        <img 
          src="/images/logos-3.avif" 
          alt="Logos Background" 
          className="absolute inset-0 w-full h-full object-cover object-bottom z-0"
        />
        {/* Overlay que começa com a mesma escuridão do rodapé da hero (0.55)
            e se mantém uniforme para legibilidade dos logos */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0)_70%),linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.55)_100%)]"
        />
        <div className="relative z-10 w-full">
          <LogoMarquee />
        </div>
      </section>
      <StatsCardSection />
      <Stats />
      <TestimonialSectionDemo />
      <GallerySlider />
      <FeatureSection />
      <FeatureGrid />
      <ServicesSection />
      <PricingSection />
      
      <section className="w-full py-12 sm:py-16 bg-white flex flex-col items-center overflow-hidden">
        <h2 className="font-heading font-light tracking-[-0.025em] text-3xl sm:text-4xl text-[#0B2530] text-center mb-2 px-6">
          Visão Geral da Nossa Frota e Destinos
        </h2>
        <p className="text-[#4B6570] text-center font-sans max-w-xl px-6 mb-4 text-base sm:text-lg">
          Navegue por nossa galeria em arco e sinta o gostinho da experiência que te aguarda a bordo das lanchas mais <span className="text-[#2FB8D9]">premium</span> do litoral.
        </p>
        <ArchGallery />
      </section>

      <FaqSection />
      <AnimatedTestimonialsBasic />
      <FooterSection />
    </div>
  );
}
