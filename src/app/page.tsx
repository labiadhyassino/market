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

             
      {/* Section image promotionnelle */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
            {/* Image de fond */}
            <Image
              src="/Depositphotos_131964598_l-2015.jpg"
              alt="Offre spéciale snacks"
              fill
              className="object-cover"
            />
            
            {/* Overlay coloré par-dessus l'image */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/80 via-orange-400/80 to-red-400/80"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Offre spéciale du moment !
                </h3>
                <p className="text-lg mb-4">
                  -20% sur tous les snacks healthy
                </p>
                <button className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                  Voir l'offre
                </button>
              </div>
            </div>
            
            {/* Éléments décoratifs */}
            <div className="absolute top-4 right-8 w-8 h-8 bg-white/20 rounded-full animate-pulse z-10"></div>
            <div className="absolute bottom-8 left-12 w-6 h-6 bg-white/30 rounded-full animate-bounce z-10"></div>
          </div>
        </div>
      </section>
    </>
  )
}