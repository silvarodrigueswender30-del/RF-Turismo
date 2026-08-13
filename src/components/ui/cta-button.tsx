"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Variant = "on-light" | "on-dark" | "secondary-light" | "secondary-dark"

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  variant?: Variant
  className?: string
  target?: "_blank" | "_self"
}

const variantStyles: Record<Variant, string> = {
  "on-light":
    "bg-[#0B1D2E] text-white hover:bg-[#1F6FA3]",
  "on-dark":
    "bg-white text-[#0B1D2E] hover:bg-[#EEF2F8]",
  "secondary-light":
    "bg-transparent text-[#0B1D2E] border border-[#0B1D2E]/30 hover:bg-[#0B1D2E]/5",
  "secondary-dark":
    "bg-transparent text-white border border-white/40 hover:bg-white/10",
}

const chevronStyles: Record<Variant, string> = {
  "on-light": "text-white",
  "on-dark": "text-[#0B1D2E]",
  "secondary-light": "text-[#0B1D2E]",
  "secondary-dark": "text-white",
}

export function CTAButton({
  href,
  children,
  variant = "on-light",
  className,
  target = "_blank",
}: CTAButtonProps) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "inline-flex items-center gap-0 font-body font-semibold text-sm select-none cursor-pointer",
        "transition-colors duration-300 ease-in-out",
        "rounded-full overflow-hidden",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400",
        className
      )}
    >
      {/* Label pill */}
      <span
        className={cn(
          "px-6 py-3 rounded-full transition-colors duration-300 ease-in-out",
          variantStyles[variant]
        )}
      >
        {children}
      </span>

      {/* Chevron pill — aparece no hover com slide + fade */}
      <motion.div
        className={cn(
          "relative flex items-center justify-center rounded-full p-3.5 overflow-hidden transition-colors duration-300 ease-in-out",
          variantStyles[variant]
        )}
        initial={{ width: 0, paddingLeft: 0, paddingRight: 0, opacity: 0 }}
        animate={
          hovered
            ? { width: "auto", paddingLeft: 14, paddingRight: 14, opacity: 1 }
            : { width: 0, paddingLeft: 0, paddingRight: 0, opacity: 0 }
        }
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <ChevronRight
          className={cn("w-4 h-4 shrink-0", chevronStyles[variant])}
          strokeWidth={2.5}
        />
      </motion.div>
    </Link>
  )
}
