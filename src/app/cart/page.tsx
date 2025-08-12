'use client';

import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, MapPin, Clock, Phone, User, Baby } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  rating: number;
  category: string;
}

export default function CartPage() {
  // Charger le panier depuis localStorage ou démarrer vide
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  // État pour la modal de confirmation
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');

  // Sauvegarder le panier dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Fonction pour créer le message WhatsApp
  const createWhatsAppMessage = () => {
    const orderDetails = cartItems.map(item => 
      `• ${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)} DT`
    ).join('\n');

    return `🎓 *Commande Centre Mind's Up*

👨‍👩‍👧‍👦 *Parent:* ${parentName}
👶 *Enfant:* ${childName}
📞 *Contact:* ${phoneNumber}

🍽️ *Snacks commandés:*
${orderDetails}

💰 *Total:* ${totalPrice.toFixed(2)} DT
💵 *Paiement sur place*

Merci pour votre confiance !`;
  };

  // Fonction pour envoyer vers WhatsApp automatiquement
  const handleConfirmOrder = () => {
    if (!parentName.trim()) {
      alert('Veuillez saisir le nom du parent');
      return;
    }
    if (!childName.trim()) {
      alert('Veuillez saisir le nom de l\'enfant');
      return;
    }
    if (!phoneNumber.trim()) {
      alert('Veuillez saisir votre numéro de téléphone');
      return;
    }

    const message = createWhatsAppMessage();
    const whatsappNumber = '+21620470707'; // ✅ Remplacez par votre numéro WhatsApp Business
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Envoyer automatiquement
    window.location.href = whatsappUrl;
    
    // Vider le panier après confirmation
    setTimeout(() => {
      setCartItems([]);
      setShowModal(false);
      setPhoneNumber('');
      setParentName('');
      setChildName('');
      localStorage.removeItem('cart');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50 py-4 sm:py-8 px-3 sm:px-4 relative overflow-hidden">
      {/* Éléments décoratifs flottants - masqués sur mobile */}
      <div className="hidden sm:block absolute top-20 left-10 w-4 h-4 bg-orange-400 rounded-full opacity-60 animate-bounce"></div>
      <div className="hidden sm:block absolute top-32 right-20 w-6 h-6 bg-yellow-400 rounded-full opacity-70 animate-pulse"></div>
      <div className="hidden sm:block absolute bottom-40 left-20 w-3 h-3 bg-red-400 rounded-full opacity-50 animate-bounce-slow"></div>
      <div className="hidden sm:block absolute top-48 right-40 w-5 h-5 bg-green-400 rounded-full opacity-60 animate-float"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Titre principal */}
        <div className="text-center mb-6 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 sm:mb-4">
            Mon <span className="gradient-text">Panier</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg px-4">
            Finalisez votre commande de délicieux snacks
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Liste des articles du panier */}
          <div className="order-2 lg:order-1 lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-white/90 glass rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center mb-2 sm:mb-0">
                  <ShoppingBag className="mr-2 sm:mr-3 text-orange-500" size={24} />
                  Articles sélectionnés
                </h2>
                {totalItems > 0 && (
                  <span className="bg-orange-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full font-semibold text-sm sm:text-base w-fit">
                    {totalItems} article{totalItems > 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="w-24 sm:w-32 h-24 sm:h-32 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-float">
                    <ShoppingBag className="text-orange-400" size={32} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-600 mb-2 sm:mb-3">Votre panier est vide</h3>
                  <p className="text-gray-500 mb-6 sm:mb-8 text-base sm:text-lg px-4">Ajoutez de délicieux snacks à votre panier !</p>
                  <button className="btn-primary px-6 py-3 text-sm sm:text-base">
                    Découvrir les snacks
                  </button>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white/80 border border-orange-200 rounded-xl sm:rounded-2xl p-3 sm:p-5 product-card-hover">
                      {/* Version mobile - disposition verticale */}
                      <div className="flex sm:hidden flex-col space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="relative flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover shadow-md"
                            />
                            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold shadow-lg">
                              {item.category}
                            </span>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-800 mb-1 text-base leading-tight">{item.name}</h3>
                            <div className="flex items-center mb-2">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={`text-xs ${i < Math.floor(item.rating) ? "text-yellow-400" : "text-gray-300"}`}>
                                    ★
                                  </span>
                                ))}
                              </div>
                              <span className="ml-1 text-xs text-gray-500 font-medium">({item.rating})</span>
                            </div>
                            <p className="text-lg font-bold gradient-text">{item.price.toFixed(2)} DT</p>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="flex items-center justify-center space-x-4 bg-orange-50 rounded-full p-2 w-fit mx-auto">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-white hover:bg-orange-100 text-orange-600 rounded-full flex items-center justify-center transition-all shadow-sm"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-bold text-base">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-white hover:bg-orange-100 text-orange-600 rounded-full flex items-center justify-center transition-all shadow-sm"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Version desktop - disposition horizontale */}
                      <div className="hidden sm:flex items-center space-x-5">
                        <div className="relative flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 rounded-xl object-cover shadow-md"
                          />
                          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
                            {item.category}
                          </span>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 mb-2 text-lg">{item.name}</h3>
                          <div className="flex items-center mb-3">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.floor(item.rating) ? "text-yellow-400" : "text-gray-300"}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-500 font-medium">({item.rating})</span>
                          </div>
                          <p className="text-xl font-bold gradient-text">{item.price.toFixed(2)} DT</p>
                        </div>

                        <div className="flex items-center space-x-3 bg-orange-50 rounded-full p-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 bg-white hover:bg-orange-100 text-orange-600 rounded-full flex items-center justify-center transition-all shadow-sm hover:shadow-md transform hover:scale-105"
                          >
                            <Minus size={18} />
                          </button>
                          <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 bg-white hover:bg-orange-100 text-orange-600 rounded-full flex items-center justify-center transition-all shadow-sm hover:shadow-md transform hover:scale-105"
                          >
                            <Plus size={18} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-3 hover:bg-red-50 rounded-full transform hover:scale-105"
                        >
                          <Trash2 size={22} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Résumé et commande */}
          <div className="order-1 lg:order-2 lg:col-span-1">
            <div className="bg-white/90 glass rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Résumé de la commande</h3>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>Sous-total ({totalItems} article{totalItems > 1 ? 's' : ''})</span>
                  <span className="font-semibold">{totalPrice.toFixed(2)} DT</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>Frais de service</span>
                  <span className="font-semibold">0.00 DT</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg sm:text-xl font-bold">
                  <span>Total</span>
                  <span className="gradient-text">{totalPrice.toFixed(2)} DT</span>
                </div>
              </div>

              {/* Mode de paiement */}
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="flex items-center mb-1 sm:mb-2">
                  <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-green-600 mr-2" />
                  <span className="text-xs sm:text-sm text-green-700 font-semibold">Paiement sur place</span>
                </div>
                <p className="text-xs text-green-600">
                  Vous payerez directement lors de la récupération de votre commande
                </p>
              </div>

              {/* Temps de préparation */}
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="flex items-center mb-1 sm:mb-2">
                  <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 mr-2" />
                  <span className="text-xs sm:text-sm text-blue-700 font-semibold">Temps de préparation</span>
                </div>
                <p className="text-xs text-blue-600">
                  Votre commande sera prête en 15-20 minutes
                </p>
              </div>

              {cartItems.length > 0 && (
                <button 
                  onClick={() => setShowModal(true)}
                  className="w-full btn-primary mb-3 sm:mb-4 text-base sm:text-lg py-3 sm:py-4 flex items-center justify-center space-x-2"
                >
                  <span>Commander via WhatsApp</span>
                </button>
              )}

              <button className="w-full btn-secondary text-sm sm:text-base py-2 sm:py-3">
                Continuer mes achats
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour saisir le numéro de téléphone */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full mx-2 sm:mx-4 shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
              Finaliser votre commande
            </h3>
            
            <div className="space-y-4 mb-6">
              {/* Nom du parent */}
              <div>
                <label htmlFor="parent" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du parent
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    id="parent"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Ex: Ahmed Ben Ali"
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Nom de l'enfant */}
              <div>
                <label htmlFor="child" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'enfant
                </label>
                <div className="relative">
                  <Baby className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    id="child"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Ex: Mohamed"
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Contact */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Votre numéro de téléphone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Ex: 20 123 456"
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm sm:text-base"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Ce numéro sera utilisé pour vous contacter concernant votre commande
                </p>
              </div>
            </div>

            {/* Résumé rapide */}
            <div className="bg-orange-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                <span className="font-medium text-gray-700">Total articles:</span>
                <span className="font-bold">{totalItems}</span>
              </div>
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="font-medium text-gray-700">Total à payer:</span>
                <span className="font-bold text-base sm:text-lg gradient-text">{totalPrice.toFixed(2)} DT</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="w-full sm:flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmOrder}
                className="w-full sm:flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-medium shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <span>Envoyer via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #f97316, #dc2626);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .btn-primary {
          background: linear-gradient(135deg, #f97316, #dc2626);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4);
        }

        .btn-secondary {
          background: white;
          color: #f97316;
          border: 2px solid #f97316;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: #f97316;
          color: white;
          transform: translateY(-2px);
        }

        .product-card-hover {
          transition: all 0.3s ease;
        }

        .product-card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}