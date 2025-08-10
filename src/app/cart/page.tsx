'use client';

import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, MapPin, Clock, Phone } from 'lucide-react';

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

    return `🛍️ *Nouvelle Commande Mind's up*\n\n📞 *Numéro:* ${phoneNumber}\n\n📋 *Détails de la commande:*\n${orderDetails}\n\n💰 *Total:* ${totalPrice.toFixed(2)} DT\n\n⏰ Temps de préparation: 15-20 minutes\n💵 Paiement sur place\n\nMerci pour votre commande !`;
  };

  // Fonction pour envoyer vers WhatsApp automatiquement
  const handleConfirmOrder = () => {
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
      localStorage.removeItem('cart');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50 py-8 px-4 relative overflow-hidden">
      {/* Éléments décoratifs flottants */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-orange-400 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute top-32 right-20 w-6 h-6 bg-yellow-400 rounded-full opacity-70 animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-red-400 rounded-full opacity-50 animate-bounce-slow"></div>
      <div className="absolute top-48 right-40 w-5 h-5 bg-green-400 rounded-full opacity-60 animate-float"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Titre principal */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Mon <span className="gradient-text">Panier</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Finalisez votre commande de délicieux snacks
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Liste des articles du panier */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/90 glass rounded-3xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <ShoppingBag className="mr-3 text-orange-500" size={28} />
                  Articles sélectionnés
                </h2>
                {totalItems > 0 && (
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold">
                    {totalItems} article{totalItems > 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                    <ShoppingBag className="text-orange-400" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-3">Votre panier est vide</h3>
                  <p className="text-gray-500 mb-8 text-lg">Ajoutez de délicieux snacks à votre panier !</p>
                  <button className="btn-primary">
                    Découvrir les snacks
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white/80 border border-orange-200 rounded-2xl p-5 product-card-hover">
                      <div className="flex items-center space-x-5">
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
          <div className="lg:col-span-1">
            <div className="bg-white/90 glass rounded-3xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Résumé de la commande</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total ({totalItems} article{totalItems > 1 ? 's' : ''})</span>
                  <span className="font-semibold">{totalPrice.toFixed(2)} DT</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frais de service</span>
                  <span className="font-semibold">0.00 DT</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="gradient-text">{totalPrice.toFixed(2)} DT</span>
                </div>
              </div>

              {/* Mode de paiement */}
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm text-green-700 font-semibold">Paiement sur place</span>
                </div>
                <p className="text-xs text-green-600">
                  Vous payerez directement lors de la récupération de votre commande
                </p>
              </div>

              {/* Temps de préparation */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-700 font-semibold">Temps de préparation</span>
                </div>
                <p className="text-xs text-blue-600">
                  Votre commande sera prête en 15-20 minutes
                </p>
              </div>

             
{cartItems.length > 0 && (
  <button 
    onClick={() => {
      // Message sans numéro de téléphone
      const orderDetails = cartItems.map(item => 
        `• ${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)} DT`
      ).join('\n');

      const message = `🛍️ *Nouvelle Commande Mind's up*\n\n📋 *Détails de la commande:*\n${orderDetails}\n\n💰 *Total:* ${totalPrice.toFixed(2)} DT\n\n⏰ Temps de préparation: 15-20 minutes\n💵 Paiement sur place\n\nMerci pour votre commande !`;
      
      const whatsappNumber = '+21620470707';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      
      // Redirection immédiate
      window.location.href = whatsappUrl;
      
      // Vider le panier
      setTimeout(() => {
        setCartItems([]);
        localStorage.removeItem('cart');
      }, 1000);
    }}
    className="w-full btn-primary mb-4 text-lg py-4 flex items-center justify-center space-x-2"
  >
    <span>Commander via WhatsApp</span>
  </button>
)}

              <button className="w-full btn-secondary">
                Continuer mes achats
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour saisir le numéro de téléphone */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Finaliser votre commande
            </h3>
            
            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Votre numéro de téléphone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Ex: 20 123 456"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Ce numéro sera utilisé pour vous contacter concernant votre commande
              </p>
            </div>

            {/* Résumé rapide */}
            <div className="bg-orange-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Total articles:</span>
                <span className="font-bold">{totalItems}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Total à payer:</span>
                <span className="font-bold text-lg gradient-text">{totalPrice.toFixed(2)} DT</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmOrder}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-medium shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Envoyer via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}