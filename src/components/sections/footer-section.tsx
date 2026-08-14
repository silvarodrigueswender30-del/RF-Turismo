"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, MessageCircle, Navigation, Info } from "lucide-react"
import { FaInstagram } from "react-icons/fa"

export function FooterSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  const topFadeMask = [
    "linear-gradient(",
    "to bottom,",
    "transparent 0%,",
    "rgba(0,0,0,0.2) 10%,",
    "rgba(0,0,0,0.55) 22%,",
    "rgba(0,0,0,0.85) 34%,",
    "black 42%,",
    "black 100%",
    ")",
  ].join(" ")

  return (
    <footer id="contato" className="relative w-full overflow-hidden bg-transparent text-white scroll-mt-24">
      {/* BACKGROUND MASK LAYER */}
      <div
        className="absolute inset-0 z-0"
        style={{
          WebkitMaskImage: topFadeMask,
          maskImage: topFadeMask,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <Image
          src="/images/hero-2.avif"
          alt="Vista panorâmica do mar - RF Turismo"
          fill
          className="object-cover object-center hidden md:block"
          quality={80}
        />
        <Image
          src="/images/hero-2.avif"
          alt="Vista panorâmica do mar - RF Turismo"
          fill
          className="object-cover object-center block md:hidden"
          quality={80}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.90) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-24 pb-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="flex flex-col gap-12 md:gap-16"
        >
          {/* COLUNA 1 - MARCA */}
          <motion.div variants={itemVariants} className="w-full text-center md:text-left border-b border-white/10 pb-12">
            <h2 className="font-heading font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-3">
              RF Turismo
            </h2>
            <p className="font-sans text-lg sm:text-xl text-sky-100 font-light">
              Passeios de lancha exclusivos em Ubatuba
            </p>
          </motion.div>

          {/* GRID DE COLUNAS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
            
            {/* COLUNA 2 — Navegação */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <h3 className="font-heading text-xl mb-2 text-sky-400 flex items-center gap-2">
                <Navigation size={20} />
                Navegação
              </h3>
              <ul className="font-sans text-slate-300 space-y-3 text-sm sm:text-base">
                <li>
                  <a href="#servicos" className="hover:text-sky-400 transition-colors duration-200">
                    Roteiros
                  </a>
                </li>
                <li>
                  <a href="#frota" className="hover:text-sky-400 transition-colors duration-200">
                    Nossa Frota
                  </a>
                </li>
                <li>
                  <a href="#depoimentos" className="hover:text-sky-400 transition-colors duration-200">
                    Depoimentos
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-sky-400 transition-colors duration-200">
                    Perguntas Frequentes
                  </a>
                </li>
                <li>
                  <a 
                    href="https://wa.me/5512996125606?text=Ol%C3%A1!%20Quero%20reservar%20um%20passeio%20de%20lancha%20com%20a%20RF%20Turismo."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition-colors duration-200 font-medium"
                  >
                    Reservar no WhatsApp
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* COLUNA 3 — Contato */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <h3 className="font-heading text-xl mb-2 text-sky-400 flex items-center gap-2">
                <Info size={20} />
                Contato
              </h3>
              <div className="font-sans text-slate-300 space-y-4 text-sm sm:text-base">
                <p className="leading-relaxed flex items-start gap-2">
                  <span>📍</span>
                  <span>Av. Leovegildo Dias Vieira, 810 — Itaguá, Ubatuba/SP</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>📱</span>
                  <a href="https://wa.me/5512996125606" className="hover:text-sky-400 transition-colors duration-200">
                    (12) 99612-5606
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <FaInstagram size={18} className="text-sky-400" />
                  <a 
                    href="https://instagram.com/rfturismoubatuba" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-sky-400 transition-colors duration-200"
                  >
                    @rfturismoubatuba
                  </a>
                </p>
              </div>
            </motion.div>

            {/* COLUNA 4 — Mapa */}
            <motion.div variants={itemVariants} className="col-span-1 sm:col-span-2 flex flex-col w-full h-full">
              <h3 className="font-heading text-xl mb-4 text-white flex items-center gap-2">
                <MapPin size={20} className="text-sky-400 shrink-0" />
                Local de Embarque
              </h3>
              <div className="w-full aspect-video rounded-2xl border border-white/15 bg-[#0B1D2E] p-2 shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
                <iframe
                  src="https://maps.google.com/maps?q=Av.%20Leovegildo%20Dias%20Vieira%2C%20810%20-%20Itagu%C3%A1%2C%20Ubatuba%20-%20SP%2C%2011680-000&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(15%) brightness(0.95)", borderRadius: "12px" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Embarque RF Turismo - Itaguá"
                  className="w-full h-full"
                ></iframe>
              </div>
            </motion.div>

          </div>

          {/* RODAPÉ SECUNDÁRIO */}
          <motion.div
            variants={itemVariants}
            className="pt-8 mt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50 font-sans"
          >
            <p className="text-center md:text-left w-full md:w-auto leading-relaxed">
              © {new Date().getFullYear()} RF Turismo — Todos os direitos reservados. Passeios sujeitos às condições do mar e clima.
            </p>
            <span className="text-xs opacity-60 shrink-0">
              Desenvolvido por{" "}
              <a 
                href="https://www.offdata.digital/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline hover:text-sky-400 transition-colors"
              >
                Off-Data
              </a>
            </span>
          </motion.div>

        </motion.div>
      </div>
    </footer>
  )
}
export default FooterSection
