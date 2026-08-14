import { HeroSection } from "@/components/sections/hero-section";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { FeatureSection } from "@/components/sections/feature-section";
import { IslandsSection } from "@/components/sections/islands-section";
import { Stats } from "@/components/ui/stats-section-with-text";
import { GallerySlider } from "@/components/sections/gallery-slider";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialSectionDemo } from "@/components/ui/testimonials";
import { FaqSection } from "@/components/sections/faq-section";
import { FooterSection } from "@/components/sections/footer-section";
import { FeatureGrid } from "@/components/ui/feature-grid-enterprise-grade";
import { ClientGallerySection } from "@/components/sections/client-gallery-section";
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
      {/*
       * ═══ GRADIENT WRAPPER ════════════════════════════════════════════
       * Envolve TODAS as seções entre StatsCardSection e AnimatedTestimonials.
       * Gradiente em % (não px) → estica para cobrir a altura real do wrapper,
       * eliminando o desalinhamento estrutural do repeating-gradient em pixels.
       * Hero, LogoMarquee e Footer ficam FORA deste wrapper.
       * ════════════════════════════════════════════════════════════════ */}
      <div
        id="gradient-wrapper"
        style={{
          background: `linear-gradient(180deg,
            #FFFFFF  0%,
            #E4F6FA 15%,
            #FFFFFF 28%,
            #E4F6FA 42%,
            #FFFFFF 55%,
            #E4F6FA 70%,
            #FFFFFF 83%,
            #E4F6FA 92%,
            #FFFFFF 100%
          )`,
        }}
      >
        <StatsCardSection />
        <Stats />
        <TestimonialSectionDemo />
        <GallerySlider />
        <FeatureSection />
        <FeatureGrid />
        <IslandsSection />
        <ServicesSection />
        <PricingSection />

        <ClientGallerySection />

        <FaqSection />
        <AnimatedTestimonialsBasic />
      </div>
      <FooterSection />
    </div>
  );
}
