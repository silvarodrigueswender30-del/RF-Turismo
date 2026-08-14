"use client";

import { Star, UserCheck, ShieldCheck } from "lucide-react";
import { CountingNumber } from "@/components/ui/counting-number";

export default function StatsCardSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:divide-x md:divide-[#2FB8D9]/20">

          {/* Item 1 — Nota no Google */}
          <div className="flex flex-col items-center justify-center text-center space-y-2 md:px-6">
            {/* Ícone acima do número */}
            <Star
              size={24}
              strokeWidth={1.5}
              className="text-[#2FB8D9] mb-1"
              aria-hidden="true"
            />
            {/* Número animado — sem o caractere ★ duplicado */}
            <div className="relative inline-block">
              <div className="font-heading font-light tracking-[-0.025em] text-[clamp(2rem,5vw,2.75rem)] leading-none text-[#0B2530]">
                <CountingNumber target={5} decimals={1} formatLocale={false} />
              </div>
              {/* Traço decorativo fino sob o número */}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 block w-8 h-[2px] rounded-full bg-[#2FB8D9]" aria-hidden="true" />
            </div>
            <p className="text-[#4B6570] text-xs sm:text-sm font-sans font-medium pt-3">
              Nota no Google
            </p>
          </div>

          {/* Item 2 — Avaliações */}
          <div className="flex flex-col items-center justify-center text-center space-y-2 md:px-6">
            <UserCheck
              size={24}
              strokeWidth={1.5}
              className="text-[#2FB8D9] mb-1"
              aria-hidden="true"
            />
            <div className="relative inline-block">
              <div className="font-heading font-light tracking-[-0.025em] text-[clamp(2rem,5vw,2.75rem)] leading-none text-[#0B2530]">
                <CountingNumber target={100} />+
              </div>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 block w-8 h-[2px] rounded-full bg-[#2FB8D9]" aria-hidden="true" />
            </div>
            <p className="text-[#4B6570] text-xs sm:text-sm font-sans font-medium pt-3">
              Avaliações reais
            </p>
          </div>

          {/* Texto descritivo (Col-span 2) */}
          <div className="col-span-2 border-t border-[#2FB8D9]/20 pt-6 md:border-t-0 md:border-l-0 md:pl-10 md:pt-0 flex items-center justify-center md:justify-start text-center md:text-left">
            <div className="flex items-start gap-3 max-w-md">
              {/* Badge ícone ShieldCheck */}
              <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#2FB8D9] mt-0.5" aria-hidden="true">
                <ShieldCheck size={18} strokeWidth={1.5} className="text-[#2FB8D9]" />
              </span>
              <p className="text-[#4B6570] font-sans text-sm sm:text-base leading-relaxed">
                Como uma{" "}
                <strong className="text-[#0B2530] font-semibold">operadora credenciada oficial</strong>
                , garantimos seu desembarque legalizado e seguro na cobiçada{" "}
                <strong className="text-[#0B2530] font-semibold">Ilha das Couves</strong>
                , sem filas ou imprevistos.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export { StatsCardSection };
