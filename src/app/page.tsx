"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoSlider from "@/components/PromoSlider";
import ProductCard from "@/components/ProductCard";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import { MOCK_PRODUCTS, Product, CATEGORIES } from "@/data/products";
import { SlidersHorizontal, ArrowUpDown, Info } from "lucide-react";

export default function Home() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter/Sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);
  const [sortBy, setSortBy] = useState("popularidad"); // popularidad, precio-asc, precio-desc, valoracion

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true); // Auto-open drawer when item is added
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    // Category filter
    if (selectedCategory !== "Todos") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.specs.some((spec) => spec.toLowerCase().includes(query))
      );
    }

    // Price filter
    result = result.filter((p) => p.price <= maxPrice);

    // Free shipping filter
    if (onlyFreeShipping) {
      result = result.filter((p) => p.isFreeShipping);
    }

    // Sorting
    if (sortBy === "popularidad") {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    } else if (sortBy === "precio-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "precio-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "valoracion") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, maxPrice, onlyFreeShipping, sortBy]);

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Banner Slider */}
        <PromoSlider />

        {/* Categories strip or badges for quick visualization */}
        <section className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200/60 mm-shadow">
          <h3 className="font-extrabold text-sm uppercase text-gray-800 tracking-wider mb-4 border-l-2 border-mm-red pl-2">
            Comprar por categoría
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-3 px-4 rounded-xl border font-bold text-xs uppercase transition-all duration-200 active:scale-95 text-center flex flex-col items-center justify-center gap-1.5 ${
                  selectedCategory === cat
                    ? "bg-mm-red border-mm-red text-white shadow-md shadow-red-600/10"
                    : "bg-gray-50/50 border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{cat === "Todos" ? "Ver Todo" : cat}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Column: Sidebar Filters */}
          <aside className="bg-white rounded-xl border border-gray-200/60 p-6 space-y-6 mm-shadow lg:sticky lg:top-[120px] z-20">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-extrabold text-sm uppercase text-gray-800 tracking-wider flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-mm-red" />
                Filtros
              </h3>
              {(selectedCategory !== "Todos" || searchQuery !== "" || maxPrice < 1500 || onlyFreeShipping) && (
                <button
                  onClick={() => {
                    setSelectedCategory("Todos");
                    setSearchQuery("");
                    setMaxPrice(1500);
                    setOnlyFreeShipping(false);
                  }}
                  className="text-xs text-mm-red hover:underline font-bold"
                >
                  Limpiar todo
                </button>
              )}
            </div>

            {/* Category selection in Sidebar */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Categoría</h4>
              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                      selectedCategory === cat
                        ? "bg-red-50 text-mm-red font-bold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>{cat === "Todos" ? "Todas las categorías" : cat}</span>
                    <span className="text-[10px] bg-gray-100 text-gray-400 font-bold px-1.5 py-0.5 rounded-full">
                      {cat === "Todos"
                        ? MOCK_PRODUCTS.length
                        : MOCK_PRODUCTS.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter slider */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Precio máximo</h4>
                <span className="text-xs font-black text-mm-red bg-red-50 px-2 py-0.5 rounded-sm">
                  {maxPrice} €
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="1500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-mm-red"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                <span>100 €</span>
                <span>1.500 €</span>
              </div>
            </div>

            {/* Delivery/Shipping check */}
            <div className="pt-4 border-t border-gray-100">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={onlyFreeShipping}
                  onChange={(e) => setOnlyFreeShipping(e.target.checked)}
                  className="rounded border-gray-300 text-mm-red focus:ring-mm-red h-4 w-4 accent-mm-red"
                />
                <span className="text-xs font-semibold text-gray-600 group-hover:text-gray-800 transition-colors">
                  Solo Envío Gratis
                </span>
              </label>
            </div>
          </aside>

          {/* Right Column: Catalog Grid */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Catalog Info and Sort header */}
            <div className="bg-white rounded-xl border border-gray-200/60 p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-4 mm-shadow">
              <div className="text-center sm:text-left">
                <h2 className="text-lg font-black text-gray-800">
                  {selectedCategory === "Todos" ? "Todos los productos" : selectedCategory}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Se han encontrado <span className="font-bold text-gray-700">{filteredProducts.length}</span> artículos
                </p>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <ArrowUpDown size={14} className="text-gray-400" />
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-bold text-gray-700 focus:outline-none border border-gray-200 bg-gray-50/50 hover:bg-gray-50 rounded-lg p-2 cursor-pointer focus:ring-1 focus:ring-mm-red"
                >
                  <option value="popularidad">Popularidad</option>
                  <option value="precio-asc">Precio más bajo</option>
                  <option value="precio-desc">Precio más alto</option>
                  <option value="valoracion">Mejor valorados</option>
                </select>
              </div>
            </div>

            {/* Product Card Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200/60 p-12 text-center mm-shadow flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-gray-50 rounded-full text-gray-400">
                  <Info size={40} className="stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-700">No se encontraron productos</h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-sm">
                    Intenta cambiar la categoría, ajustar el rango de precios o buscar otro término.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory("Todos");
                    setSearchQuery("");
                    setMaxPrice(1500);
                    setOnlyFreeShipping(false);
                  }}
                  className="bg-mm-red hover:bg-mm-red-hover text-white text-xs font-bold py-2.5 px-6 rounded-full transition-colors active:scale-95"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}

          </div>
        </div>

      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
