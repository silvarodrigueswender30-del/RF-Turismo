import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { FloatingWhatsappButton } from "@/components/ui/floating-whatsapp-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rfturismoprojeto.vercel.app"),
  title: "RF Turismo — Passeios de Lancha em Ubatuba",
  description: "Passeios exclusivos de lancha nas ilhas mais bonitas de Ubatuba. Operadora credenciada para desembarque na Ilha das Couves. Reserve agora!",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://rfturismoprojeto.vercel.app",
  },
  openGraph: {
    title: "RF Turismo — Passeios de Lancha em Ubatuba",
    description: "Passeios exclusivos de lancha nas ilhas mais bonitas de Ubatuba. Reserve agora!",
    url: "https://rfturismoprojeto.vercel.app",
    siteName: "RF Turismo",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RF Turismo — Passeio de Lancha em Ubatuba",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RF Turismo — Passeios de Lancha em Ubatuba",
    description: "Passeios exclusivos de lancha nas ilhas mais bonitas de Ubatuba. Reserve agora!",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <FloatingWhatsappButton />
      </body>
    </html>
  );
}
