// app/page.tsx
"use client";
import Hero from '@/app/components/Hero'
import ProductGrid from '@/app/components/ProductGrid'
import Image from 'next/image'
import { useState } from 'react'

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  return (
    <>
      <Hero />
      <ProductGrid selectedCategory={selectedCategory} />
             
      {/* Section vidéo promotionnelle */}
      <section className="py-8 px-3">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
            {/* Vidéo de fond */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/amine.mp4" type="video/mp4" />
              <source src="/promo-video.webm" type="video/webm" />
              {/* Image de fallback si la vidéo ne se charge pas */}
              <Image
                src="/Depositphotos_131964598_l-2015.jpg"
                alt="Offre spéciale snacks"
                fill
                className="object-cover"
              />
            </video>
            
            {/* Overlay coloré par-dessus la vidéo */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/60 via-orange-400/60 to-red-400/60"></div>
            
          
            {/* Éléments décoratifs */}
            <div className="absolute top-4 right-8 w-8 h-8 bg-white/20 rounded-full animate-pulse z-10"></div>
            <div className="absolute bottom-8 left-12 w-6 h-6 bg-white/30 rounded-full animate-bounce z-10"></div>
            

          </div>
        </div>
      </section>
    </>
  )
}