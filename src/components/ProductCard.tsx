"use client";

import React from "react";
import Image from "next/image";
import { Star, StarHalf, ShoppingCart, CheckCircle } from "lucide-react";
import { Product } from "@/data/products";
import { TRANSLATIONS_ES, TRANSLATIONS_EN } from "@/data/translations";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  currentStore?: "Barcelona" | "Oregon";
}

export default function ProductCard({ product, onAddToCart, currentStore = "Barcelona" }: ProductCardProps) {
  const t = currentStore === "Barcelona" ? TRANSLATIONS_ES : TRANSLATIONS_EN;
  const {
    name,
    price,
    originalPrice,
    rating,
    reviewsCount,
    image,
    isFreeShipping,
    tag,
    specs,
  } = product;

  // Calculate discount percentage if original price exists
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  // Generate star rating icons
  const renderStars = (ratingVal: number) => {
    const stars = [];
    const fullStars = Math.floor(ratingVal);
    const hasHalf = ratingVal % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} size={14} className="fill-mm-yellow text-mm-yellow" />
        );
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <StarHalf key={i} size={14} className="fill-mm-yellow text-mm-yellow" />
        );
      } else {
        stars.push(<Star key={i} size={14} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200/60 overflow-hidden flex flex-col h-full mm-shadow mm-card-hover group relative">
      
      {/* Product Tag Badge */}
      {tag && (
        <span className="absolute top-3 left-3 bg-mm-red text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-sm z-10 shadow-sm">
          {tag}
        </span>
      )}

      {/* Discount Tag */}
      {discount > 0 && (
        <span className="absolute top-3 right-3 bg-mm-dark text-mm-yellow text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-sm z-10 shadow-sm border border-mm-yellow">
          -{discount}%
        </span>
      )}

      {/* Image Container */}
      <div className="w-full pt-[80%] relative bg-white flex items-center justify-center border-b border-gray-100 overflow-hidden group">
        <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-6 select-none"
            priority={product.id === "prod-1"}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Category */}
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mt-1 leading-snug group-hover:text-mm-red transition-colors min-h-[40px]">
            {name}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex">{renderStars(rating)}</div>
            <span className="text-xs font-bold text-gray-500">({reviewsCount})</span>
          </div>

          {/* Specifications Bullet list */}
          <ul className="mt-3.5 space-y-1 border-t border-gray-100 pt-3">
            {specs.slice(0, 3).map((spec, index) => (
              <li key={index} className="text-[11px] text-gray-500 flex items-start gap-1.5 leading-tight">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300 mt-1 flex-shrink-0" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing and Cart Actions */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          
          {/* Shipping & Delivery Badge */}
          <div className="flex items-center gap-1.5 mb-2.5">
            {isFreeShipping ? (
              <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <CheckCircle size={10} className="fill-green-700 text-white" />
                {t.freeShippingBadge}
              </span>
            ) : (
              <span className="text-[10px] text-gray-400 font-medium">
                {t.shippingCost}
              </span>
            )}
          </div>

          {/* Pricing area */}
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col">
              {originalPrice && (
                <span className="text-xs text-gray-400 line-through font-medium">
                  {originalPrice.toLocaleString("es-ES")} €
                </span>
              )}
              <div className="flex items-baseline text-mm-red">
                {/* Custom Bold MediaMarkt Tag Price display */}
                <span className="text-2xl font-black tracking-tighter">
                  {price.toLocaleString("es-ES")}
                </span>
                <span className="text-sm font-black ml-0.5">,- €</span>
              </div>
            </div>

            {/* Add to Cart button */}
            <button
              onClick={() => onAddToCart(product)}
              className="bg-mm-red hover:bg-mm-red-hover text-white p-2.5 rounded-xl transition-all duration-200 active:scale-90 shadow-sm hover:shadow group/btn"
              title={t.addToCart}
            >
              <ShoppingCart size={18} className="transition-transform duration-300 group-hover/btn:scale-110" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
