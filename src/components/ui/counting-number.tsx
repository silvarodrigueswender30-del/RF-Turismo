"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CountingNumberProps {
  target: number;
  decimals?: number;
  formatLocale?: boolean;
}

export function CountingNumber({ target, decimals = 0, formatLocale = true }: CountingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 70, // Mais lento e suave conforme solicitado (não muito rápido)
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [motionValue, isInView, target]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(latest);
    });
  }, [springValue]);

  const formatted = formatLocale 
    ? Math.floor(displayValue).toLocaleString('pt-BR') 
    : displayValue.toFixed(decimals).replace('.', ',');

  return <span ref={ref}>{formatted}</span>;
}
