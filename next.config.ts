import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuração recomendada pelo próprio log do Next.js para permitir testes via celular na LAN
  allowedDevOrigins: ['192.168.100.29', '192.168.1.100', '192.168.0.100', 'localhost'],
  images: {
    // Corrige os avisos de "[browser] Image with src ... is using quality 80 which is not configured"
    qualities: [25, 50, 75, 80, 90, 100],
  }
};

export default nextConfig;
