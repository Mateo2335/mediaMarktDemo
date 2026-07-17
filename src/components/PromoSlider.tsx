"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  badge?: string;
  image: string;
  accentColor: string;
  ctaText: string;
}

const SLIDES_ES: Slide[] = [
  {
    id: 1,
    title: "⚡ Gemini CLI Hackea los Precios ⚡",
    subtitle: "El agente de Inteligencia Artificial ha tomado el control y ha rebajado a la mitad tus productos favoritos. ¡Solo para programadores rápidos!",
    badge: "OFERTA IA EXCLUSIVA",
    image: "/images/mediamarkt_hero_banner.png",
    accentColor: "from-mm-red via-purple-900 to-mm-dark",
    ctaText: "¡COMPRAR AL 50%!"
  },
  {
    id: 2,
    title: "Semanas de la Tecnología",
    subtitle: "Ahorra al máximo en smartphones, portátiles y televisores de última generación con envío gratis.",
    badge: "Día Sin IVA",
    image: "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-mm-red via-red-800 to-black",
    ctaText: "Ver ofertas"
  },
  {
    id: 3,
    title: "Renueva tu Hogar",
    subtitle: "Consigue la máxima eficiencia con las mejores cafeteras superautomáticas, aspiradoras Dyson y electrodomésticos.",
    badge: "Eficiencia Hogar",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-[#1e293b] via-[#334155] to-black",
    ctaText: "Explorar ofertas hogar"
  }
];

const SLIDES_EN: Slide[] = [
  {
    id: 1,
    title: "⚡ Gemini CLI Price Hack ⚡",
    subtitle: "The Artificial Intelligence agent has taken control and slashed your favorite products in half. For fast programmers only!",
    badge: "EXCLUSIVE AI OFFER",
    image: "/images/mediamarkt_hero_banner.png",
    accentColor: "from-mm-red via-purple-900 to-mm-dark",
    ctaText: "SHOP AT 50% OFF!"
  },
  {
    id: 2,
    title: "Gaming Days",
    subtitle: "Equip yourself with the latest in PlayStation 5, Nintendo Switch, gaming laptops, and professional accessories.",
    badge: "Gamer Deals",
    image: "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-[#0f172a] via-[#1e1b4b] to-black",
    ctaText: "Enter the Gaming Zone"
  },
  {
    id: 3,
    title: "Renew Your Home",
    subtitle: "Achieve maximum efficiency with the best superautomatic coffee machines, Dyson vacuums, and home appliances.",
    badge: "Home Efficiency",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-[#1e293b] via-[#334155] to-black",
    ctaText: "Explore Home Deals"
  }
];

interface PromoSliderProps {
  currentStore: "Barcelona" | "Oregon";
}

export default function PromoSlider({ currentStore }: PromoSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = currentStore === "Barcelona" ? SLIDES_ES : SLIDES_EN;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 6000); // Auto slide every 6 seconds
    return () => clearInterval(interval);
  }, [nextSlide, isHovered]);

  return (
    <section 
      className="relative w-full h-[320px] md:h-[450px] overflow-hidden bg-black rounded-2xl shadow-xl border border-gray-200/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Container */}
      <div 
        className="w-full h-full flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full flex-shrink-0 relative overflow-hidden flex items-center justify-between"
          >
            {/* Background Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.accentColor} opacity-95 z-10`} />
            
            {/* Slide Image Background */}
            <div className="absolute right-0 top-0 h-full w-full md:w-3/5 select-none pointer-events-none mix-blend-screen opacity-80">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
                priority={slide.id === 1}
              />
            </div>
            
            {/* Text Content */}
            <div className="relative z-20 max-w-lg pl-6 md:pl-16 pr-6 text-left text-white flex flex-col justify-center h-full">
              {slide.badge && (
                <span className="bg-mm-yellow text-mm-dark text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm w-fit mb-4 border border-mm-yellow shadow-md animate-pulse">
                  {slide.badge}
                </span>
              )}
              <h2 className="text-2xl md:text-5xl font-black tracking-tight leading-tight drop-shadow-md">
                {slide.title}
              </h2>
              <p className="text-xs md:text-base text-gray-300 mt-3 md:mt-4 leading-relaxed font-medium">
                {slide.subtitle}
              </p>
              <div className="mt-6 md:mt-8">
                <button className="bg-white text-mm-dark hover:bg-mm-red hover:text-white font-bold text-xs md:text-sm py-3 px-7 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-600/30 active:scale-95">
                  {slide.ctaText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white text-white hover:text-mm-dark p-2 rounded-full backdrop-blur-sm z-30 transition-all duration-200 shadow-md active:scale-90"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white text-white hover:text-mm-dark p-2 rounded-full backdrop-blur-sm z-30 transition-all duration-200 shadow-md active:scale-90"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-8 bg-mm-red" : "w-2.5 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
