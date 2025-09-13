'use client';

import { Product } from '../context/cardcontext';
import ProductCard from './ProductCard';
const sampleProducts = [
  {
    id: '1',
    name: 'produit',
    price: 0,    rating: 4.2,
    image: '/produit 2.jpg',
    category: 'Mix'
  },
  {
    id: '2',
    name: 'produit',
    price: 0,
    rating: 4.5,
    image: '/produit1.jpg',
    category: 'Mix'
  },
  {
    id: '3',
    name: 'produit',
    price: 0,
    rating: 4.0,
    image: '/PROTEIN_063_MAIN.avif',
    category: 'Mix'
  },
  {
    id: '4',
    name: 'produit',
    price: 0,
    rating: 4.8,
    image: '/992x1340_7203.jpg',
    category: 'Mix'
  },
  {
    id: '5',
    name: 'produit',
    price: 0,
    rating: 4.3,
    image: '/ALR-274250-perfect-pumpkin-muffins-VAT-4x3-1-fbc71f52281a4f0d9875d98359daac17.jpg',
    category: 'Mix'
  },
  {
    id: '6',
    name: 'produit',
    price: 0,
    rating: 4.1,
    image: '/191e7cad-ffe8-42ac-9872-856f143af5e8-removebg-preview.png',
    category: 'Mix'
  },
  {
    id: '7',
    name: 'produit',
    price: 0,
    rating: 4.4,
    image: '/boules-denergies-dattes-pistache-1-1.jpg',
    category: 'Mix'
  },
  {
    id: '8',
    name: 'produit',
    price: 0,
    rating: 4.6,
    image: '/téléchargement (8).jpg',
    category: 'Mix'
  },
  {
    id: '9',
    name: 'produit',
    price: 0,
    rating: 4.2,
    image: '/vue-rapprochee-creme-glacee-banane_23-2151006029.avif',
    category: 'Mix'
  },
  {
    id: '9',
    name: 'produit',
    price: 0,
    rating: 4.2,
    image: '/gateaux.jpg',
    category: 'Mix'
  }
];

// Props pour passer la catégorie sélectionnée
// Props pour passer la catégorie sélectionnée
export default function ProductGrid({ selectedCategory }: { selectedCategory: string }) {
  
  const filteredProducts =
    selectedCategory === 'all'
      ? sampleProducts
      : sampleProducts.filter((product) => product.category === selectedCategory);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Snacks</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Le meilleur des snacks pour vos enfants, avec des produits sains et délicieux.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              rating={product.rating}
              image={product.image}
              category={product.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}