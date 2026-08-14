import { ShieldCheck, Anchor, Compass, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Stats() {
  return (
    <div className="w-full pt-20 pb-4 lg:pt-32 lg:pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Coluna esquerda — inalterada */}
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge variant="outline">Sobre Nós</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h2 className="font-heading font-light tracking-[-0.025em] text-3xl md:text-5xl lg:text-6xl text-left leading-[1.1] max-w-xl text-slate-900">
                Especialistas em transformar um dia em Ubatuba em uma lembrança para a vida toda
              </h2>
              <p className="text-base sm:text-lg max-w-lg leading-relaxed text-slate-600 text-left mt-2 font-sans font-light">
                A RF Turismo nasceu para oferecer uma forma diferente de conhecer Ubatuba: sem roteiros apertados, sem lotação máxima, sem pressa. Nossa frota própria e nossa tripulação experiente cuidam de cada detalhe — da escolha do melhor horário para cada maré até a parada certa para você aproveitar o mar com calma. Somos uma das poucas operadoras credenciadas para desembarque na Ilha das Couves, e cada passeio pode ser ajustado ao seu ritmo: mais tempo na ilha que você mais gostou, roteiro pensado para crianças, casal ou grupo de amigos, churrasco a bordo — sua experiência, do seu jeito.
              </p>
            </div>
          </div>

          {/* Coluna direita — grade 2×2 unificada */}
          <div className="flex justify-center items-center">
            <div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full gap-4">

              {/* Card 1 — Frota própria (com foto) */}
              <div className="relative overflow-hidden flex flex-col justify-between p-6 rounded-2xl min-h-[190px]">
                <img
                  src="/images/numero2.avif"
                  alt="Frota própria"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                {/* Gradiente vertical uniforme — sem linha diagonal */}
                <div
                  aria-hidden
                  className="absolute inset-0 z-10"
                  style={{ background: "linear-gradient(to bottom, rgba(6,58,69,0.15) 0%, rgba(6,58,69,0.88) 100%)" }}
                />
                <div className="relative z-20 flex flex-col justify-between h-full w-full">
                  {/* Ícone em círculo translúcido */}
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm mb-auto">
                    <Anchor className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </span>
                  <div className="mt-8">
                    <h3 className="text-xl font-heading font-light tracking-[-0.025em] text-white leading-tight">
                      Frota própria e revisada
                    </h3>
                    <p className="text-xs leading-relaxed tracking-tight text-white/60 mt-1 font-sans">
                      Embarcações modernas e seguras
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 — Tripulação (sólido) */}
              <div
                className="flex flex-col justify-between p-6 rounded-2xl min-h-[190px]"
                style={{ background: "#063A45" }}
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm mb-auto">
                  <ShieldCheck className="w-5 h-5 text-white" strokeWidth={1.5} />
                </span>
                <div className="mt-8">
                  <h3 className="text-xl font-heading font-light tracking-[-0.025em] text-white leading-tight">
                    Tripulação habilitada e experiente
                  </h3>
                  <p className="text-xs leading-relaxed tracking-tight text-white/60 mt-1 font-sans">
                    Marinheiros credenciados pela Marinha
                  </p>
                </div>
              </div>

              {/* Card 3 — Roteiros (com foto) */}
              <div className="relative overflow-hidden flex flex-col justify-between p-6 rounded-2xl min-h-[190px]">
                <img
                  src="/images/numero3.avif"
                  alt="Roteiros personalizados"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 z-10"
                  style={{ background: "linear-gradient(to bottom, rgba(6,58,69,0.15) 0%, rgba(6,58,69,0.88) 100%)" }}
                />
                <div className="relative z-20 flex flex-col justify-between h-full w-full">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm mb-auto">
                    <Compass className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </span>
                  <div className="mt-8">
                    <h3 className="text-xl font-heading font-light tracking-[-0.025em] text-white leading-tight">
                      Roteiros 100% personalizáveis
                    </h3>
                    <p className="text-xs leading-relaxed tracking-tight text-white/60 mt-1 font-sans">
                      Passeios totalmente privativos do seu jeito
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4 — Credenciamento (sólido) */}
              <div
                className="flex flex-col justify-between p-6 rounded-2xl min-h-[190px]"
                style={{ background: "#063A45" }}
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm mb-auto">
                  <Award className="w-5 h-5 text-white" strokeWidth={1.5} />
                </span>
                <div className="mt-8">
                  <h3 className="text-xl font-heading font-light tracking-[-0.025em] text-white leading-tight">
                    Credenciamento oficial
                  </h3>
                  <p className="text-xs leading-relaxed tracking-tight text-white/60 mt-1 font-sans">
                    Autorização para a Ilha das Couves
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
