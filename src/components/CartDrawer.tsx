"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import { TRANSLATIONS_ES, TRANSLATIONS_EN } from "@/data/translations";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  currentStore?: "Barcelona" | "Oregon";
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  currentStore = "Barcelona",
}: CartDrawerProps) {
  const t = currentStore === "Barcelona" ? TRANSLATIONS_ES : TRANSLATIONS_EN;
  
  // Disable body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Calculations
  const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  
  // Free shipping logic (e.g., above 49€)
  const FREE_SHIPPING_THRESHOLD = 49;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const shippingCost = cartItems.length === 0 ? 0 : (isFreeShipping ? 0 : 3.99);
  const total = subtotal + shippingCost;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 ease-in-out">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-mm-red" />
            <h2 className="text-base font-black uppercase text-gray-800">
              {t.myCartTitle} ({itemsCount})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-mm-dark transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Alert banner */}
        {cartItems.length > 0 && (
          <div className="bg-red-50 py-3 px-4 border-b border-red-100/50">
            {isFreeShipping ? (
              <p className="text-xs text-green-700 font-bold flex items-center gap-1.5">
                {t.congratsFreeShipping}
              </p>
            ) : (
              <div className="space-y-1.5">
                <p className="text-xs text-gray-600 font-medium">
                  {t.shippingSpendMore.replace("{amount}", amountToFreeShipping.toFixed(2))}
                </p>
                {/* Progress bar */}
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-mm-red h-full transition-all duration-300"
                    style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="p-4 bg-gray-50 rounded-full text-gray-400">
                <ShoppingBag size={48} className="stroke-[1.5]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-700">{t.emptyCart}</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {currentStore === "Barcelona"
                    ? "¿Aún no has decidido qué comprar? Explora nuestras ofertas y encuentra la mejor tecnología."
                    : "Haven't decided what to buy yet? Explore our deals and find the best technology."}
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-mm-red hover:bg-mm-red-hover text-white text-xs font-bold py-2.5 px-6 rounded-full transition-colors"
              >
                {currentStore === "Barcelona" ? "Volver a la tienda" : "Return to store"}
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3.5 p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors"
              >
                {/* Product Image */}
                <div className="h-20 w-20 bg-white rounded-md border border-gray-200/50 p-2 flex items-center justify-center flex-shrink-0 relative">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h4 className="font-semibold text-xs text-gray-800 line-clamp-2 leading-tight">
                      {item.product.name}
                    </h4>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mt-0.5">
                      {item.product.category}
                    </span>
                  </div>

                  {/* Quantity selector & Price */}
                  <div className="flex items-center justify-between mt-2">
                    
                    {/* Quantity selectors */}
                    <div className="flex items-center border border-gray-200 bg-white rounded-md overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-gray-500 hover:bg-gray-100 active:scale-95 transition-all"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold px-2.5 text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-gray-500 hover:bg-gray-100 active:scale-95 transition-all"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price and delete button */}
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs font-black text-mm-red block">
                          {(item.product.price * item.quantity).toLocaleString("es-ES")} €
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-gray-400 font-medium">
                            ({item.product.price} €/unit)
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1.5 rounded-md text-gray-400 hover:text-mm-red hover:bg-red-50 transition-colors"
                        title="Remove product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-4">
            
            {/* Calculation summary */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>{t.subtotal}</span>
                <span>{subtotal.toLocaleString("es-ES")} €</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>{t.shippingCostLabel}</span>
                <span>{isFreeShipping ? (currentStore === "Barcelona" ? "Gratis" : "Free") : `${shippingCost.toFixed(2)} €`}</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-800 pt-2 border-t border-gray-200/80">
                <span>{t.total}</span>
                <span className="text-mm-red">{total.toLocaleString("es-ES")} €</span>
              </div>
            </div>

            {/* CTA Checkout button */}
            <button
              onClick={() => alert(t.simulateAlertSuccess)}
              className="w-full bg-mm-red hover:bg-mm-red-hover text-white py-3 rounded-full font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span>{t.secureCheckout}</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Payment security info */}
            <p className="text-[10px] text-gray-400 text-center leading-relaxed">
              {currentStore === "Barcelona"
                ? "Pago 100% seguro. Financiación disponible en el siguiente paso."
                : "100% secure payment. Financing available in the next step."}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
