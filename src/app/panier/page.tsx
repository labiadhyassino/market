'use client';

import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, MapPin, Clock } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  rating: number;
  category: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
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

  // Sauvegarder le panier dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const suggestedProducts: Product[] = [
    {
      id: 5,
      name: "Bâtonnets Céréales",
      price: 2.99,
      image: "/api/placeholder/120/120",
      rating: 4.8,
      category: "Céréales"
    },
    {
      id: 6,
      name: "Pop Corn Caramel",
      price: 3.50,
      image: "/api/placeholder/120/120",
      rating: 4.6,
      category: "Pop Corn"
    },
    {
      id: 7,
      name: "Mini Bretzels",
      price: 2.80,
      image: "/api/placeholder/120/120",
      rating: 4.4,
      category: "Bretzels"
    },
    {
      id: 8,
      name: "Granola Bites",
      price: 4.20,
      image: "/api/placeholder/120/120",
      rating: 4.9,
      category: "Granola"
    }
  ];

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

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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

            {/* Produits suggérés */}
            {cartItems.length > 0 && (
              <div className="bg-white/90 glass rounded-3xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Ajoutez encore plus de gourmandises</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {suggestedProducts.map((product) => (
                    <div key={product.id} className="bg-white/80 border border-orange-200 rounded-xl p-4 product-card-hover group">
                      <div className="relative mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <span className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">{product.name}</h4>
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400 text-xs" : "text-gray-300 text-xs"}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="ml-1 text-xs text-gray-500">({product.rating})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold gradient-text">{product.price.toFixed(2)} DT</span>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all transform hover:scale-110"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                <button className="w-full btn-primary mb-4 text-lg py-4">
                  Confirmer la commande
                </button>
              )}

              <button className="w-full btn-secondary">
                Continuer mes achats
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
