"use client";

import { Marquee } from "@/components/ui/marquee";

const ilhas = [
  {
    slug: "ilha-das-couves",
    nome: "Ilha das Couves",
    descricao: "Águas cristalinas e trilhas curtas fazem da Ilha das Couves a parada mais fotografada do passeio de lancha em Ubatuba.",
    alt: "Ilha das Couves vista do mar durante passeio de lancha Ubatuba",
    image: "/images/galeria/ilhas/ilha-das-couves.webp",
  },
  {
    slug: "ilha-dos-porcos",
    nome: "Ilha dos Porcos",
    descricao: "Ideal para mergulho livre, a Ilha dos Porcos é famosa pela vida marinha visível já na superfície.",
    alt: "Mergulho livre na Ilha dos Porcos Ubatuba",
    image: "/images/galeria/ilhas/ilha-dos-porcos.avif",
  },
  {
    slug: "ilha-do-prumirim",
    nome: "Ilha do Prumirim",
    descricao: "Praia tranquila e protegida, perfeita para quem viaja com crianças pequenas.",
    alt: "Praia da Ilha do Prumirim Ubatuba SP",
    image: "/images/galeria/ilhas/ilha-do-prumirim.webp",
  },
  {
    slug: "ilha-rachada-rapada",
    nome: "Ilha Rachada e Rapada",
    descricao: "Formações rochosas ideais para fotos e contemplação da natureza intocada.",
    alt: "Ilha Rachada e Rapada Ubatuba",
    image: "/images/galeria/ilhas/ilha-rachada-rapada.avif",
  },
  {
    slug: "ilha-das-couves",
    nome: "Ilha das Couves",
    descricao: "Águas cristalinas e trilhas curtas fazem da Ilha das Couves a parada mais fotografada do passeio de lancha em Ubatuba.",
    alt: "Ilha das Couves vista do mar durante passeio de lancha Ubatuba",
    image: "/images/galeria/ilhas/ilha-das-couves.webp",
  },
  {
    slug: "ilha-dos-porcos",
    nome: "Ilha dos Porcos",
    descricao: "Ideal para mergulho livre, a Ilha dos Porcos é famosa pela vida marinha visível já na superfície.",
    alt: "Mergulho livre na Ilha dos Porcos Ubatuba",
    image: "/images/galeria/ilhas/ilha-dos-porcos.avif",
  },
];

export function IslandsSection() {
  return (
    <section className="relative w-full py-12 md:py-16">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-12 md:mb-16 flex max-w-5xl flex-col items-center px-6 text-center lg:px-0">
          <h2 className="font-heading font-light tracking-[-0.025em] text-3xl sm:text-4xl md:text-5xl text-[#0B2530] text-center mb-4 leading-[1.1]">
            Ilhas de Ubatuba Visitadas no Passeio de Lancha
          </h2>
          <p className="max-w-2xl font-sans text-base md:text-lg leading-relaxed text-[#4B6570] mt-2">
            Conheça as ilhas visitadas durante o passeio de lancha saindo de Ubatuba — águas cristalinas, trilhas curtas e paradas para mergulho livre em cada parada do roteiro.
          </p>
        </div>

        <div className="relative w-full pb-12">
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-[#FFFFFF] to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-[#FFFFFF] to-transparent" />

          <Marquee className="[--gap:1.5rem] py-4" pauseOnHover duration={70}>
            {ilhas.map((ilha, index) => (
              <div
                className="group flex w-64 shrink-0 flex-col pb-2"
                key={index}
              >
                <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-white shadow-sm border border-[#E4F6FA]">
                  <picture className="w-full h-full block">
                    <img
                      src={ilha.image}
                      alt={ilha.alt}
                      className="h-full w-full object-cover md:grayscale-[0.6] transition-all duration-300 md:group-hover:grayscale-0"
                      loading="lazy"
                    />
                  </picture>
                  <div className="absolute bottom-0 w-full bg-white/95 backdrop-blur-sm p-4 border-t border-[#E4F6FA]/50">
                    <h3 className="font-heading font-medium text-[#0B2530] text-lg">
                      {ilha.nome}
                    </h3>
                    <p className="font-sans text-[#4B6570] text-sm mt-1.5 leading-snug">
                      {ilha.descricao}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
