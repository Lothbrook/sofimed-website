"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function HeroSection({ dict }: { dict: any }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { src: "/images/hertz-scaled.jpg", alt: "Hertz" },
    { src: "/images/metal-work-scaled.jpg", alt: "Metal Work" },
    { src: "/images/ukp-scaled.jpg", alt: "UKP" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{ zIndex: index === currentSlide ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === currentSlide}
              quality={100}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`${dict.hero.slideLabel} ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{dict.hero.title}</h1>
        <p className="text-lg md:text-xl mb-4 leading-relaxed">
          <br />
          {dict.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3" asChild>
            <a href="https://store.sofimedmaroc.com" target="_blank" rel="noopener noreferrer">
              {dict.hero.visitShop}
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-black hover:bg-white hover:text-gray-900 px-8 py-3"
            asChild
          >
            <a href="/contact">{dict.hero.contactUs}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
