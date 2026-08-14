"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const WHATSAPP_NUMBER = "5512996125606"
const MESSAGE = "Ficou com alguma dúvida? Fale com a RF Turismo pelo WhatsApp."
const URL_MESSAGE = "Olá! Gostaria de tirar algumas dúvidas sobre os passeios de lancha."

export function FloatingWhatsappButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isBalloonOpen, setIsBalloonOpen] = useState(true)

  /* --- Lógica de Visibilidade: 5s ou 30% scroll --- */
  useEffect(() => {
    let cancelled = false

    const show = () => {
      if (!cancelled) {
        setIsVisible(true)
      }
    }

    const timerId = setTimeout(show, 5000)

    const handleScroll = () => {
      if (isVisible) return
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable > 0 && (window.scrollY / scrollable) * 100 >= 30) {
        show()
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      cancelled = true
      clearTimeout(timerId)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isVisible])

  if (!isVisible) return null

  const encodedMessage = encodeURIComponent(URL_MESSAGE)

  // Verificação simplificada de mobile
  const isMobile =
    typeof window !== "undefined" &&
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768)

  const linkUrl = isMobile
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`

  const closeBalloon = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBalloonOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isBalloonOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute bottom-full mb-4 right-0 bg-white border border-[#E4F6FA] shadow-xl rounded-2xl p-4 w-[260px] origin-bottom-right"
          >
            <button
              onClick={closeBalloon}
              className="absolute top-2 right-2 text-[#4B6570] hover:text-[#0C6478] p-1.5 transition-colors focus:outline-none"
              aria-label="Fechar mensagem"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
            <div className="flex gap-3 pr-4">
              {/* Ponto Turquesa */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#2FB8D9] shrink-0 mt-2" />
              <p className="font-sans text-[15px] leading-snug text-[#0B2530]">
                {MESSAGE}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        className="w-16 h-16 flex items-center justify-center rounded-full bg-[#0C6478] hover:bg-[#2FB8D9] text-white transition-colors duration-300 border border-[#2FB8D9]/30 shadow-[0_0_20px_rgba(47,184,217,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2FB8D9]"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </motion.a>
    </div>
  )
}
