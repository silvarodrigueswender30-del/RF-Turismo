'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle, Menu, SendHorizonal, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Marquee } from '@/components/ui/marquee'

const carouselCards = [
    { title: "Passeio de Lancha",     imageUrl: "/images/hero-carousel/slide-1.avif", alt: "Lancha moderna navegando em águas cristalinas em Ubatuba" },
    { title: "Litoral Norte SP",      imageUrl: "/images/hero-carousel/slide-2.avif", alt: "Enseada tropical com lanchas ancoradas em Ubatuba" },
    { title: "Ilha Anchieta",         imageUrl: "/images/hero-carousel/slide-3.avif", alt: "Praia paradisíaca no pôr do sol em Ubatuba" },
    { title: "Pôr do Sol no Mar",     imageUrl: "/images/hero-carousel/slide-4.avif", alt: "Passageiros mergulhando ao redor da lancha em Ubatuba" },
    { title: "Passeio Família",       imageUrl: "/images/hero-carousel/slide-5.avif", alt: "Passeio premium exclusivo para casais e famílias em Ubatuba" },
]

const menuItems = [
    { name: 'Nossa Frota', href: '#frota' },
    { name: 'Roteiros', href: '#servicos' },
    { name: 'Valores', href: '#valores' },
    { name: 'FAQ', href: '#faq' },
]

export function HeroSection() {
    const [menuState, setMenuState] = useState(false)
    return (
        <>
            <header className="absolute inset-x-0 top-0 z-50">
                <nav
                    data-state={menuState && 'active'}
                    className="group w-full border-b border-white/20 bg-white/10 backdrop-blur-md">
                    <div className="m-auto max-w-7xl px-6">
                        <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                            <div className="flex w-full justify-between lg:w-auto">
                                <Link
                                    href="/"
                                    aria-label="home"
                                    className="flex items-center space-x-2 text-white">
                                    <Logo />
                                </Link>

                                <button
                                    onClick={() => setMenuState(!menuState)}
                                    aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden text-white">
                                    <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                    <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                                </button>
                            </div>

                            <div className="bg-black/90 group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/20 p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
                                <div className="lg:pr-4">
                                    <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={item.href}
                                                    className="text-white/80 hover:text-white block duration-150">
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:border-white/20 lg:pl-6">
                                    <Button
                                        asChild
                                        size="sm"
                                        className="bg-[#2FB8D9] text-white hover:bg-[#1D7DA3] border-none font-medium h-10 px-6 rounded-full transition-colors">
                                        <Link href="https://wa.me/5512996125606?text=Ol%C3%A1!%20Gostaria%20de%20reservar%20um%20passeio.">
                                            <span>Falar no WhatsApp</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                <section className="relative min-h-[90vh] flex items-center">
                    {/* Imagem de Fundo cobrindo toda a seção */}
                    <img 
                        src="/images/hero-2.avif" 
                        alt="Background" 
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                    {/* Overlay Escuro para legibilidade */}
                    <div
                        aria-hidden
                        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0)_70%),linear-gradient(to_top,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_45%)]"
                    />

                    <div className="relative z-10 w-full px-6 md:px-12 pt-28 pb-12 lg:pt-20 lg:pb-16">
                        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
                            {/* Texto Principal à Esquerda */}
                            <div className="mx-auto max-w-xl text-center lg:ml-0 lg:w-1/2 lg:text-left text-white">

                                <h1 className="mt-10 font-heading text-balance text-4xl font-light tracking-[-0.025em] leading-[0.98] md:text-5xl xl:text-6xl drop-shadow-lg">Sua lancha privativa para as ilhas mais desejadas de Ubatuba</h1>
                                <p className="mt-8 text-lg text-white/90 drop-shadow-md">Roteiros exclusivos pelas ilhas e praias mais preservadas do litoral norte, a bordo de uma frota própria, com tripulação experiente e credenciamento oficial para desembarque na Ilha das Couves.</p>

                                <div>
                                    <div className="mx-auto my-10 max-w-sm lg:my-12 lg:ml-0 lg:mr-auto block">
                                        <Link
                                            href="https://wa.me/5512996125606?text=Ol%C3%A1!%20Gostaria%20de%20receber%20a%20tabela%20de%20valores%20e%20roteiros%20dos%20passeios%20de%20lancha."
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors relative grid grid-cols-[1fr_auto] items-center rounded-[1rem] border border-white/20 pr-1 shadow-xl group h-14"
                                        >
                                            <MessageCircle className="text-white absolute inset-y-0 left-5 my-auto size-5" />
                                            
                                            <div className="w-full bg-transparent pl-12 text-left text-white font-medium">
                                                Reservar pelo WhatsApp
                                            </div>

                                            <div className="md:pr-1.5 lg:pr-0">
                                                <Button
                                                    aria-label="submit"
                                                    asChild
                                                >
                                                    <div>
                                                        <span className="hidden md:block">Reservar</span>
                                                        <SendHorizonal
                                                            className="relative mx-auto size-5 md:hidden"
                                                            strokeWidth={2}
                                                        />
                                                    </div>
                                                </Button>
                                            </div>
                                        </Link>
                                    </div>

                                    <ul className="list-inside list-disc space-y-2">
                                        <li>Nossa Frota</li>
                                        <li>Ilhas de Ubatuba</li>
                                        <li>Lancha Privativa</li>
                                    </ul>
                                </div>
                            </div>
                            
                            {/* Carrossel de Cards à Direita */}
                            <div className="mt-16 lg:mt-0 lg:w-1/2 flex justify-end overflow-visible">
                                <div className="w-full mask-image-linear-to-l overflow-visible -mr-6 lg:-mr-0">
                                    <Marquee className="[--duration:40s] [--gap:1.5rem]">
                                        {carouselCards.map((card, idx) => (
                                            <MarqueeCard key={idx} card={card} />
                                        ))}
                                    </Marquee>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

function MarqueeCard({ card }: { card: { title: string, imageUrl: string, alt: string } }) {
    const [hasError, setHasError] = useState(false)
    
    return (
        <div className="relative w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 bg-transparent cursor-pointer group">
            {hasError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#094F5F] text-white">
                    <span className="text-white/50 text-sm mt-2">Imagem Indisponível</span>
                </div>
            ) : (
                <img 
                    src={card.imageUrl} 
                    alt={card.alt} 
                    onError={() => setHasError(true)}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            )}
            {/* Efeito decorativo interno */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,white/20%,transparent_70%)] pointer-events-none" />
            {/* Gradiente base do card para texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
            {/* Label do card */}
            <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                <p className="font-bold text-sm sm:text-lg md:text-xl leading-tight drop-shadow-md group-hover:scale-105 transition-transform">
                    {card.title}
                </p>
            </div>
        </div>
    )
}

const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex items-center gap-3", className)}>
            <img 
                src="/images/logo-rf-sv1.svg" 
                alt="RF Turismo Logo" 
                className="h-10 md:h-12 w-auto object-contain brightness-0 invert" 
            />
            <span className="font-heading font-light text-lg md:text-xl text-white tracking-[-0.025em]">
                RF Turismo
            </span>
        </div>
    )
}
