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
  // Use React state instead of localStorage for Claude.ai compatibility
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Chips Barbecue",
      price: 4.50,
      image: "/api/placeholder/120/120",
      rating: 4.5,
      category: "Chips",
      quantity: 2
    },
    {
      id: 2,
      name: "Cookies Chocolat",
      price: 3.20,
      image: "/api/placeholder/120/120",
      rating: 4.8,
      category: "Cookies",
      quantity: 1
    }
  ]);

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
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50 py-2 px-2 relative overflow-hidden">
      {/* Floating decorative elements - hidden on very small screens */}
      <div className="hidden md:block absolute top-20 left-10 w-4 h-4 bg-orange-400 rounded-full opacity-60 animate-bounce"></div>
      <div className="hidden md:block absolute top-32 right-20 w-6 h-6 bg-yellow-400 rounded-full opacity-70 animate-pulse"></div>
      <div className="hidden md:block absolute bottom-40 left-20 w-3 h-3 bg-red-400 rounded-full opacity-50"></div>
      <div className="hidden md:block absolute top-48 right-40 w-5 h-5 bg-green-400 rounded-full opacity-60"></div>

      <div className="max-w-sm mx-auto lg:max-w-6xl relative z-10 w-full">
        {/* Main title - very compact for 350px */}
        <div className="text-center mb-3 lg:mb-12">
          <h1 className="text-lg sm:text-xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-1 lg:mb-4">
            Mon <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Panier</span>
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-lg">
            Finalisez votre commande
          </p>
        </div>

        {/* Mobile-first layout - single column for very small screens */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3 lg:gap-6 w-full">
          {/* Order summary first on mobile for better UX */}
          <div className="w-full lg:col-span-1 lg:order-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl lg:rounded-3xl shadow-lg p-3 lg:p-6 lg:sticky lg:top-8">
              <h3 className="text-sm lg:text-xl font-bold text-gray-800 mb-3 lg:mb-6">Résumé</h3>

              <div className="space-y-2 lg:space-y-4 mb-3 lg:mb-6">
                <div className="flex justify-between text-gray-600 text-xs lg:text-base">
                  <span>Sous-total ({totalItems} article{totalItems > 1 ? 's' : ''})</span>
                  <span className="font-semibold">{totalPrice.toFixed(2)} DT</span>
                </div>
                <div className="flex justify-between text-gray-600 text-xs lg:text-base">
                  <span>Frais de service</span>
                  <span className="font-semibold">0.00 DT</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-sm lg:text-xl font-bold">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">{totalPrice.toFixed(2)} DT</span>
                </div>
              </div>

              {/* Payment method - more compact */}
              <div className="mb-3 lg:mb-6 p-2 lg:p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="flex items-center mb-1">
                  <MapPin className="w-3 h-3 lg:w-5 lg:h-5 text-green-600 mr-1 lg:mr-2" />
                  <span className="text-xs lg:text-sm text-green-700 font-semibold">Paiement sur place</span>
                </div>
              </div>

              {/* Preparation time - more compact */}
              <div className="mb-3 lg:mb-6 p-2 lg:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="flex items-center mb-1">
                  <Clock className="w-3 h-3 lg:w-5 lg:h-5 text-blue-600 mr-1 lg:mr-2" />
                  <span className="text-xs lg:text-sm text-blue-700 font-semibold">Prêt en 15-20 min</span>
                </div>
              </div>

              {cartItems.length > 0 && (
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-3 py-2 lg:py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg mb-2 lg:mb-4 text-xs lg:text-lg">
                  Confirmer
                </button>
              )}

              <button className="w-full bg-white text-orange-500 border-2 border-orange-500 hover:bg-orange-50 px-3 py-2 lg:py-3 rounded-full font-semibold transition-all text-xs lg:text-base">
                Continuer
              </button>
            </div>
          </div>

          {/* Cart items list */}
          <div className="w-full lg:col-span-2 space-y-3 lg:space-y-6 lg:order-1 min-w-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl lg:rounded-3xl shadow-lg p-3 lg:p-6 w-full overflow-hidden">
              <div className="flex items-center justify-between mb-3 lg:mb-6">
                <h2 className="text-sm lg:text-2xl font-bold text-gray-800 flex items-center">
                  <ShoppingBag className="mr-2 text-orange-500" size={16} />
                  Articles
                </h2>
                {totalItems > 0 && (
                  <span className="bg-orange-500 text-white px-2 py-1 rounded-full font-semibold text-xs">
                    {totalItems}
                  </span>
                )}
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-8 lg:py-16">
                  <div className="w-16 lg:w-32 h-16 lg:h-32 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-6">
                    <ShoppingBag className="text-orange-400" size={24} />
                  </div>
                  <h3 className="text-lg lg:text-2xl font-bold text-gray-600 mb-2 lg:mb-3">Panier vide</h3>
                  <p className="text-gray-500 mb-4 lg:mb-8 text-sm lg:text-lg px-2">Ajoutez des snacks !</p>
                  <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 lg:px-8 py-2 lg:py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg text-xs lg:text-base">
                    Découvrir
                  </button>
                </div>
              ) : (
                <div className="space-y-2 lg:space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white/80 border border-orange-200 rounded-lg lg:rounded-2xl p-2 lg:p-5 hover:shadow-md transition-all">
                      {/* Stack layout for very small screens */}
                      <div className="space-y-2 lg:space-y-0 lg:flex lg:items-center lg:space-x-5">
                        {/* Top row: Image + Name + Remove button */}
                        <div className="flex items-start space-x-2 lg:space-x-0 lg:contents">
                          <div className="relative flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 lg:w-24 lg:h-24 rounded-lg object-cover shadow-md"
                            />
                            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-1 py-0.5 rounded-full font-semibold shadow-lg">
                              {item.category.slice(0, 3)}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0 lg:flex-initial">
                            <h3 className="font-bold text-gray-800 text-xs lg:text-lg mb-1 truncate">{item.name}</h3>
                            <div className="flex items-center mb-1 lg:mb-2">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={`text-xs ${i < Math.floor(item.rating) ? "text-yellow-400" : "text-gray-300"}`}>
                                    ★
                                  </span>
                                ))}
                              </div>
                              <span className="ml-1 text-xs text-gray-500">({item.rating})</span>
                            </div>
                            <p className="text-sm lg:text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">{item.price.toFixed(2)} DT</p>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded-full lg:order-last"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {/* Bottom row: Quantity controls centered */}
                        <div className="flex justify-center lg:justify-end lg:flex-shrink-0">
                          <div className="flex items-center space-x-1 bg-orange-50 rounded-full p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 lg:w-10 lg:h-10 bg-white hover:bg-orange-100 text-orange-600 rounded-full flex items-center justify-center transition-all shadow-sm"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 lg:w-12 text-center font-bold text-sm lg:text-lg">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 lg:w-10 lg:h-10 bg-white hover:bg-orange-100 text-orange-600 rounded-full flex items-center justify-center transition-all shadow-sm"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Suggested products - more compact grid */}
            {cartItems.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl lg:rounded-3xl shadow-lg p-3 lg:p-6">
                <h3 className="text-sm lg:text-xl font-bold text-gray-800 mb-3 lg:mb-6">Ajoutez plus</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
                  {suggestedProducts.map((product) => (
                    <div key={product.id} className="bg-white/80 border border-orange-200 rounded-lg p-2 lg:p-4 hover:shadow-md transition-all">
                      <div className="relative mb-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-16 lg:h-24 object-cover rounded-lg"
                        />
                        <span className="absolute top-1 left-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-1 py-0.5 rounded-full">
                          {product.category.slice(0, 3)}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1 text-xs leading-tight truncate">{product.name}</h4>
                      <div className="flex items-center mb-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="ml-1 text-xs text-gray-500">({product.rating})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent text-xs lg:text-base">{product.price.toFixed(2)} DT</span>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center font-bold transition-all transform hover:scale-110 text-xs"
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
        </div>
      </div>
    </div>
  );
}