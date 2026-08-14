import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShieldCheck, Compass, Sparkles } from 'lucide-react';

type IconType = React.ElementType | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export interface FeatureItem {
  id: string;
  icon: IconType;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  features?: FeatureItem[];
  sectionTitle?: React.ReactNode;
  sectionSubtitle?: React.ReactNode;
  className?: string;
}

const defaultFeatures: FeatureItem[] = [
  {
    id: "comfort",
    icon: Sparkles,
    title: "Conforto & Lazer Completo",
    description: "Lanchas equipadas com sistema de som bluetooth de alta definição, churrasqueira a bordo, água doce, cooler térmico espaçoso e cabine para descanso confortável.",
  },
  {
    id: "crew",
    icon: Compass,
    title: "Marinheiros Experientes",
    description: "Tripulação profissional credenciada pela Marinha do Brasil. Conhecedores profundos de cada segredo, praia isolada e enseada tranquila do litoral norte.",
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: "Segurança em 1º Lugar",
    description: "Embarcações inspecionadas regularmente, equipadas com todos os itens de salvatagem homologados e rastreadores via satélite para sua total paz de espírito.",
  },
];

const FeatureGrid: React.FC<FeatureGridProps> = ({
  features = defaultFeatures,
  sectionTitle = "A melhor estrutura do Litoral Norte",
  sectionSubtitle = "Nossas lanchas e tripulação estão preparadas para oferecer uma experiência inesquecível e extremamente segura.",
  className,
}) => {
  if (!features || features.length === 0) {
    return null;
  }

  // Pegamos apenas os 3 primeiros cards conforme solicitado
  const displayFeatures = features.slice(0, 3);

  return (
    <section
      className={cn("py-16 sm:py-24 text-[#0B2530]", className)}
      role="region"
      aria-label={sectionTitle ? `Diferenciais: ${sectionTitle}` : "Diferenciais do Serviço"}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        {(sectionTitle || sectionSubtitle) && (
          <div className="text-right max-w-3xl ml-auto mb-12 sm:mb-16">
            {sectionTitle && (
              <h2 className="font-heading font-light tracking-[-0.025em] text-3xl sm:text-4xl md:text-5xl text-slate-900 drop-shadow-sm">
                {sectionTitle}
              </h2>
            )}
            {sectionSubtitle && (
              <p className="mt-4 text-lg font-sans text-slate-600">
                {sectionSubtitle}
              </p>
            )}
          </div>
        )}

        {/* Features Container (Grid no Desktop, Carrossel com scroll snap no Mobile) */}
        <div
          className="flex overflow-x-auto gap-6 pb-6 -mx-6 px-6 scroll-smooth snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-3 md:gap-8 md:overflow-x-visible md:pb-0 md:-mx-0 md:px-0"
          role="list"
        >
          {displayFeatures.map((feature) => (
            <Card
              key={feature.id}
              className="group flex flex-col h-full p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:border-[#2FB8D9]/50 focus-within:ring-2 focus-within:ring-[#2FB8D9] focus-within:ring-offset-2 bg-[#F7FBFC] border border-[#0C6478]/10 rounded-2xl snap-center shrink-0 w-[85vw] sm:w-[50vw] md:w-auto"
              role="listitem"
            >
              <CardHeader className="p-0 pb-4">
                {/* Círculo premium: gradiente sutil, borda fina, glow e scale no hover */}
                <div
                  className={[
                    "mb-4 w-12 h-12 rounded-full",
                    "flex items-center justify-center",
                    "bg-gradient-to-br from-[#0C6478]/15 to-[#2FB8D9]/15",
                    "border border-[#2FB8D9]/25",
                    "shadow-[0_4px_20px_rgba(47,184,217,0.15)]",
                    "group-hover:scale-110 transition-transform duration-300",
                  ].join(" ")}
                >
                  <feature.icon
                    className="h-5 w-5 text-[#0C6478]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <CardTitle className="text-xl font-heading font-semibold text-slate-900 leading-tight">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-grow">
                <CardDescription className="text-sm font-sans text-slate-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
export { FeatureGrid };
