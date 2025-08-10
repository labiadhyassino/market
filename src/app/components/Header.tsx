// components/Header.tsx
'use client';

import Link from 'next/link'
import { Search, ShoppingCart, User, Menu } from 'lucide-react'
import { useCart } from '../context/cardcontext'
import { useEffect, useState } from 'react'

export default function Header() {
  const { totalItems } = useCart()
  const [isAnimating, setIsAnimating] = useState(false)

  // ✅ Animation quand le nombre d'articles change
  useEffect(() => {
    if (totalItems > 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [totalItems])

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-gray-800">Mind's up</span>
          </Link>
          
          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-orange-500 transition-colors">
              Accueil
            </Link>
            <Link href="/menu" className="text-gray-700 hover:text-orange-500 transition-colors">
              Menu
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* ✅ Bouton panier avec animation */}
            <Link href="/cart">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative group">
                <ShoppingCart 
                  className={`w-5 h-5 text-gray-600 transition-transform ${
                    isAnimating ? 'scale-110' : 'scale-100'
                  } group-hover:scale-105`} 
                />
                {/* ✅ Badge avec transition fluide */}
                {totalItems > 0 && (
                  <span 
                    className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full flex items-center justify-center px-1 font-semibold shadow-lg transition-all duration-300 ${
                      isAnimating ? 'scale-125' : 'scale-100'
                    }`}
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
                
                {/* ✅ Effet de pulsation si le panier n'est pas vide */}
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-orange-400 rounded-full animate-ping opacity-20"></span>
                )}
              </button>
            </Link>
            
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}