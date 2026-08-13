'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle, Menu, SendHorizonal, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Marquee } from '@/components/ui/marquee'

const carouselCards = [
    { title: "Passeio de Lancha",     imageUrl: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=600&h=400&q=80", alt: "Lancha moderna navegando em águas cristalinas em Ubatuba" },
    { title: "Litoral Norte SP",      imageUrl: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=600&h=400&q=80", alt: "Enseada tropical com lanchas ancoradas em Ubatuba" },
    { title: "Ilha Anchieta",         imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&h=400&q=80", alt: "Praia paradisíaca no pôr do sol em Ubatuba" },
    { title: "Pôr do Sol no Mar",     imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&h=400&q=80", alt: "Passageiros mergulhando ao redor da lancha em Ubatuba" },
    { title: "Passeio Família",       imageUrl: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=600&h=400&q=80", alt: "Passeio premium exclusivo para casais e famílias em Ubatuba" },
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
        <svg
            viewBox="0 0 78 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('h-5 w-auto', className)}>
            <path
                d="M3 0H5V18H3V0ZM13 0H15V18H13V0ZM18 3V5H0V3H18ZM0 15V13H18V15H0Z"
                fill="url(#logo-gradient)"
            />
            <path
                d="M27.06 7.054V12.239C27.06 12.5903 27.1393 12.8453 27.298 13.004C27.468 13.1513 27.7513 13.225 28.148 13.225H29.338V14.84H27.808C26.9353 14.84 26.2667 14.636 25.802 14.228C25.3373 13.82 25.105 13.157 25.105 12.239V7.054H24V5.473H25.105V3.144H27.06V5.473H29.338V7.054H27.06ZM30.4782 10.114C30.4782 9.17333 30.6709 8.34033 31.0562 7.615C31.4529 6.88967 31.9855 6.32867 32.6542 5.932C33.3342 5.524 34.0822 5.32 34.8982 5.32C35.6349 5.32 36.2752 5.46733 36.8192 5.762C37.3745 6.04533 37.8165 6.40233 38.1452 6.833V5.473H40.1002V14.84H38.1452V13.446C37.8165 13.888 37.3689 14.2563 36.8022 14.551C36.2355 14.8457 35.5895 14.993 34.8642 14.993C34.0595 14.993 33.3229 14.789 32.6542 14.381C31.9855 13.9617 31.4529 13.3837 31.0562 12.647C30.6709 11.899 30.4782 11.0547 30.4782 10.114ZM38.1452 10.148C38.1452 9.502 38.0092 8.941 37.7372 8.465C37.4765 7.989 37.1309 7.62633 36.7002 7.377C36.2695 7.12767 35.8049 7.003 35.3062 7.003C34.8075 7.003 34.3429 7.12767 33.9122 7.377C33.4815 7.615 33.1302 7.972 32.8582 8.448C32.5975 8.91267 32.4672 9.468 32.4672 10.114C32.4672 10.76 32.5975 11.3267 32.8582 11.814C33.1302 12.3013 33.4815 12.6753 33.9122 12.936C34.3542 13.1853 34.8189 13.31 35.3062 13.31C35.8049 13.31 36.2695 13.1853 36.7002 12.936C37.1309 12.6867 37.4765 12.324 37.7372 11.848C38.0092 11.3607 38.1452 10.794 38.1452 10.148ZM43.6317 4.232C43.2803 4.232 42.9857 4.113 42.7477 3.875C42.5097 3.637 42.3907 3.34233 42.3907 2.991C42.3907 2.63967 42.5097 2.345 42.7477 2.107C42.9857 1.869 43.2803 1.75 43.6317 1.75C43.9717 1.75 44.2607 1.869 44.4987 2.107C44.7367 2.345 44.8557 2.63967 44.8557 2.991C44.8557 3.34233 44.7367 3.637 44.4987 3.875C44.2607 4.113 43.9717 4.232 43.6317 4.232ZM44.5837 5.473V14.84H42.6457V5.473H44.5837ZM49.0661 2.26V14.84H47.1281V2.26H49.0661ZM50.9645 10.114C50.9645 9.17333 51.1572 8.34033 51.5425 7.615C51.9392 6.88967 52.4719 6.32867 53.1405 5.932C53.8205 5.524 54.5685 5.32 55.3845 5.32C56.1212 5.32 56.7615 5.46733 57.3055 5.762C57.8609 6.04533 58.3029 6.40233 58.6315 6.833V5.473H60.5865V14.84H58.6315V13.446C58.3029 13.888 57.8552 14.2563 57.2885 14.551C56.7219 14.8457 56.0759 14.993 55.3505 14.993C54.5459 14.993 53.8092 14.789 53.1405 14.381C52.4719 13.9617 51.9392 13.3837 51.5425 12.647C51.1572 11.899 50.9645 11.0547 50.9645 10.114ZM58.6315 10.148C58.6315 9.502 58.4955 8.941 58.2235 8.465C57.9629 7.989 57.6172 7.62633 57.1865 7.377C56.7559 7.12767 56.2912 7.003 55.7925 7.003C55.2939 7.003 54.8292 7.12767 54.3985 7.377C53.9679 7.615 53.6165 7.972 53.3445 8.448C53.0839 8.91267 52.9535 9.468 52.9535 10.114C52.9535 10.76 53.0839 11.3267 53.3445 11.814C53.6165 12.3013 53.9679 12.6753 54.3985 12.936C54.8405 13.1853 55.3052 13.31 55.7925 13.31C56.2912 13.31 56.7559 13.1853 57.1865 12.936C57.6172 12.6867 57.9629 12.324 58.2235 11.848C58.4955 11.3607 58.6315 10.794 58.6315 10.148ZM65.07 6.833C65.3533 6.357 65.7273 5.98867 66.192 5.728C66.668 5.456 67.229 5.32 67.875 5.32V7.326H67.382C66.6227 7.326 66.0447 7.51867 65.648 7.904C65.2627 8.28933 65.07 8.958 65.07 9.91V14.84H63.132V5.473H65.07V6.833ZM73.3624 10.165L77.6804 14.84H75.0624L71.5944 10.811V14.84H69.6564V2.26H71.5944V9.57L74.9944 5.473H77.6804L73.3624 10.165Z"
                fill="currentColor"
            />
            <defs>
                <linearGradient
                    id="logo-gradient"
                    x1="10"
                    y1="0"
                    x2="10"
                    y2="20"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9B99FE" />
                    <stop
                        offset="1"
                        stopColor="#2BC8B7"
                    />
                </linearGradient>
            </defs>
        </svg>
    )
}
