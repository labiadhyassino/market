// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { CartProvider } from './context/cardcontext';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mini Market Kids',
  description: 'Le coin des gourmands pour les petits',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-orange-50`}>
      <CartProvider>
        <Header />
        <main className="min-h-screen">
        
          {children}
        
        </main>
        <Footer />
        </CartProvider>
      </body>
    </html>
  )
}