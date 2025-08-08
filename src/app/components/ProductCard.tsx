'use client';

import Image from 'next/image';
import { Star, Plus } from 'lucide-react';
import { useCart } from '../context/cardcontext'; // ✅ Import your cart hook

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category?: string;
}

export default function ProductCard({ id, name, price, rating, image, category }: ProductCardProps) {
  const { addToCart } = useCart(); // ✅ Get the addToCart function
  
  interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
  }
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };
  interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-105">
      {/* Image container */}
      <div className="relative h-48 bg-gradient-to-br from-orange-50 to-yellow-50 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {category && (
          <span className="absolute top-3 left-3 bg-white/90 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {renderStars(rating)}
          <span className="text-sm text-gray-500 ml-1">
            ({rating.toFixed(1)})
          </span>
        </div>

        {/* Price and Add button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-800">
              {price.toFixed(2)}DT
            </span>
          </div>
          <button
           onClick={() => addToCart({ id, name, price, image, rating, category: category ?? '' })}
            className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
