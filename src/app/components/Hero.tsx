// components/Hero.tsx
export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50 py-16 px-4 overflow-hidden">
      {/* Éléments décoratifs flottants */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-orange-400 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute top-20 right-20 w-6 h-6 bg-yellow-400 rounded-full opacity-70 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-red-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-32 right-40 w-5 h-5 bg-green-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Zigzag décoratif */}
      <div className="absolute bottom-0 left-0 w-full h-8">
        <svg viewBox="0 0 1200 24" className="w-full h-full text-white fill-current">
          <path d="M0,24 L50,0 L100,24 L150,0 L200,24 L250,0 L300,24 L350,0 L400,24 L450,0 L500,24 L550,0 L600,24 L650,0 L700,24 L750,0 L800,24 L850,0 L900,24 L950,0 L1000,24 L1050,0 L1100,24 L1150,0 L1200,24 L1200,24 L0,24 Z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 items-center gap-12">
          {/* Contenu texte */}
          <div className="text-center md:text-left z-10 relative">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Le coin des 
              <span className="text-orange-500"> gourmands</span>
              <br />
              <span className="text-2xl md:text-3xl">pour les petits</span>
            </h1>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Découvrez notre sélection de snacks délicieux et sains, 
              spécialement conçus pour régaler vos enfants !
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
              Découvrir les snacks
            </button>
          </div>

          {/* Illustration */}
          <div className="relative flex justify-center">
            <div className="relative w-80 h-80">
              {/* Bol principal avec image */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full transform rotate-12 shadow-2xl overflow-hidden">
                <div className="absolute top-4 left-4 w-8 h-8 bg-white opacity-30 rounded-full blur-sm"></div>
                
                {/* Image dans le bol */}
                <img 
                  src="/istockphoto-904661696-612x612.jpg" 
                  alt="Snacks délicieux"
                  className="absolute inset-2 w-[calc(100%)] h-[calc(100%)] object-cover rounded-full transform -rotate-12"
                />
              </div>
              
              {/* Éléments qui sortent du bol */}
              <div className="absolute -top-8 left-20 w-6 h-6 bg-yellow-400 rounded-full shadow-lg animate-bounce"></div>
              <div className="absolute -top-4 right-16 w-4 h-8 bg-red-500 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute -top-6 left-32 w-8 h-4 bg-green-500 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -top-12 right-24 w-5 h-5 bg-blue-500 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute -right-4 top-16 w-6 h-6 bg-pink-500 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '2s' }}></div>
              <div className="absolute -left-2 top-20 w-4 h-4 bg-orange-500 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
            
            {/* Éléments décoratifs autour */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-400 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-yellow-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}