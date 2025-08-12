// components/Footer.tsx
import Link from 'next/link'
import { Facebook, Instagram, Mail, Phone } from 'lucide-react'

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M224 80a79.8 79.8 0 0 1-48-16v72a64 64 0 1 1-64-64 8 8 0 0 1 0 16 48 48 0 1 0 48 48V24a8 8 0 0 1 12.8-6.4A64 64 0 0 0 224 64a8 8 0 0 1 0 16Z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50 py-12 px-4 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-4 right-8 w-6 h-6 bg-orange-400 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-8 left-12 w-4 h-4 bg-yellow-400 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute top-12 left-1/4 w-3 h-3 bg-red-400 rounded-full opacity-60"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo et description */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-gray-800">mind's up </span>
            </Link>
            <p className="text-gray-600 mb-4">
              Ariana , Manzeh 6
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/LesEinsteineursPrime/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
              >
                <Facebook className="w-5 h-5 text-blue-600" />
              </Link>
              <Link
                href="https://www.tiktok.com/@minds_up_"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
              >
                <TikTokIcon className="w-5 h-5 text-black" />
              </Link>
              <Link
                href="https://www.instagram.com/tonprofil"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5 text-pink-600" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-orange-500 transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600">mindsupm6@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600">+216 92360576</span>
                <span className="text-gray-600">+216 92364260</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-orange-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-2 md:mb-0">
              © 2025 Mind's up. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-orange-500 transition-colors">
                Confidentialité
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-orange-500 transition-colors">
                Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
