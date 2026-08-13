"use client";

import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";

const faqs = [
  {
    question: "Preciso levar crianças pequenas? Elas pagam passeio inteiro?",
    answer:
      "Crianças são bem-vindas a bordo! A taxa de embarque (R$30,00) se aplica normalmente — consulte condições especiais para crianças pequenas direto no WhatsApp.",
  },
  {
    question: "O que está incluído no valor do passeio?",
    answer:
      "Navegação com tripulação habilitada, coletes salva-vidas, paradas conforme o roteiro escolhido e toda a estrutura de segurança da lancha. Itens como churrasco a bordo podem ser incluídos mediante consulta.",
  },
  {
    question: "Os passeios acontecem com qualquer condição de tempo?",
    answer:
      "Não. Todos os nossos roteiros são sujeitos às condições do mar e do clima. Caso não seja seguro navegar, remarcamos sua data sem custo adicional.",
  },
  {
    question: "Posso desembarcar na Ilha das Couves em qualquer roteiro?",
    answer:
      "O desembarque na Ilha das Couves está disponível no Roteiro Norte Completo, sujeito à disponibilidade — somos uma das empresas credenciadas para esse desembarque.",
  },
  {
    question: "Qual a diferença entre passeio compartilhado e privativo?",
    answer:
      "No compartilhado, você reserva assentos e divide a lancha com outros passageiros, num roteiro fixo. No privativo, a lancha é só do seu grupo — você escolhe o roteiro, o tempo em cada parada e o ritmo do passeio.",
  },
  {
    question: "Quanto tempo dura o passeio?",
    answer:
      "Temos roteiros de 3h (Norte Express) e de 6h (Norte Completo e Sul Completo). A duração exata pode variar conforme condições do mar.",
  },
  {
    question: "Como faço para reservar?",
    answer:
      "É simples: fale com a gente pelo WhatsApp, escolha o roteiro e a lancha, confirme a data e pronto — te passamos todos os detalhes de embarque.",
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      className="border-b border-[#DDE3EC]"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-7 md:py-8 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 rounded-sm"
        aria-expanded={isOpen}
      >
        <span className="font-mono text-xs text-sky-500 tracking-widest mr-4 md:mr-6 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 font-heading font-semibold text-base md:text-lg leading-snug text-[#0B1D2E] group-hover:text-[#1F6FA3] transition-colors duration-200">
          {question}
        </span>
        <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-[#DDE3EC] text-[#1F6FA3] group-hover:bg-[#1F6FA3] group-hover:border-[#1F6FA3] group-hover:text-white transition-all duration-200">
          {isOpen ? <X size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="font-sans text-[#5C6672] leading-relaxed pb-7 md:pb-8 text-sm md:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "-10%" });

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="w-full bg-white pt-8 pb-20 md:pt-12 md:pb-32 scroll-mt-24"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center text-center mb-12 md:mb-16"
        >
          <Badge variant="outline" className="font-sans mb-5">
            Dúvidas Comuns
          </Badge>
          <h2 className="font-heading font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-[#0B1D2E] max-w-2xl">
            Perguntas Frequentes
          </h2>
          <p className="font-sans font-light text-base md:text-xl leading-relaxed text-[#5C6672] mt-4 max-w-xl">
            Tudo o que você precisa saber antes de embarcar com a gente.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="border-t border-[#DDE3EC]">
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center gap-5 mt-12 md:mt-16"
          >
            <p className="font-sans text-[#5C6672] text-sm md:text-base text-center">
              Ainda tem dúvidas? Fale diretamente com nossa equipe.
            </p>
            <CTAButton
              href="https://wa.me/5512996125606"
              variant="on-light"
            >
              Tirar dúvidas no WhatsApp
            </CTAButton>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
