import React from "react";
import { ArrowUpRight } from "lucide-react";

export function FeatureSection() {
  return (
    <section className="w-full py-16 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6">

        {/* Glow decorativo — corrigido: indigo → token turquoise da marca */}
        <div className="absolute -z-10 size-[400px] -top-10 -left-20 aspect-square rounded-full bg-[#2FB8D9]/15 blur-3xl" />

        {/* Título principal — font-heading, mesma família da Hero H1 */}
        <h2 className="font-heading font-light tracking-[-0.025em] leading-[1.2] text-[#0B2530] text-2xl md:text-3xl lg:text-4xl text-left max-w-3xl">
          Explore as melhores praias e ilhas do Litoral Norte com o conforto e a segurança de nossa frota premium.
        </h2>

        {/* Grid assimétrico 2/3 + 1/3 — estrutura inalterada */}
        <div className="grid grid-cols-1 md:grid-cols-3 mt-12 gap-10">

          {/* ── Imagem grande (esquerda, 2/3 no desktop) ─────────────── */}
          <div className="relative md:col-span-2 rounded-2xl overflow-hidden shadow-lg border border-slate-100 min-h-[350px]">
            <img
              alt="Passeio de Lancha"
              className="absolute inset-0 w-full h-full object-cover z-0"
              src="/images/imagem5.avif"
            />

            {/* Gradiente da Hero — consistente com o padrão da página */}
            <div
              aria-hidden
              className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0)_70%),linear-gradient(to_top,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_45%)]"
            />

            {/* Vinheta vertical na base — deep-teal-900, não cobre a foto toda */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 z-20 h-[45%]"
              style={{
                background:
                  "linear-gradient(to top, rgba(6,58,69,0.85) 0%, transparent 100%)",
              }}
            />

            {/*
              Número de destaque sobreposto — PLACEHOLDER para validação
              TODO: confirmar valor real e label exato com o cliente antes de ir para produção
            */}
            <div className="absolute bottom-0 left-0 z-30 p-6 md:p-8">
              <p className="font-heading font-light tracking-[-0.025em] text-white text-5xl md:text-6xl leading-none">
                15+
              </p>
              <p className="text-white/70 text-sm font-sans mt-1 tracking-wide">
                {/* TODO: validar copy exata com o cliente */}
                Praias e ilhas exploradas
              </p>
            </div>
          </div>

          {/* ── Coluna direita 1/3 ────────────────────────────────────── */}
          <div className="md:col-span-1 flex flex-col justify-center">

            {/* Imagem pequena com vinheta e badge sobreposto */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 mb-6 h-48 hover:-translate-y-1 transition duration-300">
              <img
                alt="Experiência Premium"
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="/images/imagem6.avif"
              />

              {/* Gradiente da Hero — consistente */}
              <div
                aria-hidden
                className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0)_70%),linear-gradient(to_top,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_45%)]"
              />

              {/* Vinheta vertical na base — mais sutil (imagem menor, hierarquia secundária) */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 z-20 h-[50%]"
                style={{
                  background:
                    "linear-gradient(to top, rgba(6,58,69,0.80) 0%, transparent 100%)",
                }}
              />

              {/*
                Badge sobreposto — PLACEHOLDER para validação
                TODO: confirmar copy exata com o cliente antes de produção
              */}
              <div className="absolute bottom-0 left-0 z-30 p-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-white/90 tracking-wide">
                  {/* TODO: validar copy com o cliente */}
                  ✦ 100% Personalizado
                </span>
              </div>
            </div>

            {/* Título secundário — font-heading, sem Poppins */}
            <h3 className="font-heading font-light tracking-[-0.025em] text-2xl text-[#0B2530] mt-2">
              Momentos inesquecíveis no mar
            </h3>

            {/* Parágrafo — font-sans (fonte de corpo padrão do projeto) */}
            <p className="text-slate-600 font-sans mt-3 text-sm md:text-base leading-relaxed">
              Nossa frota premium garante que sua família e amigos tenham a melhor experiência com total segurança e comodidade.
            </p>

            {/* CTA — cor corrigida: indigo → deep-teal do design system */}
            <a
              href="https://wa.me/5512996125606"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 mt-6 text-[#0C6478] hover:text-[#1D7DA3] transition font-medium font-sans text-sm"
            >
              Reserve seu passeio agora
              <ArrowUpRight
                className="size-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300"
                aria-hidden="true"
              />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
