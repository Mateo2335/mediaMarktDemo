"use client";

import React, { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoSlider from "@/components/PromoSlider";
import ProductCard from "@/components/ProductCard";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import { Product, CATEGORIES_ES, CATEGORIES_EN, MOCK_PRODUCTS_ES, MOCK_PRODUCTS_EN } from "@/data/products";
import { TRANSLATIONS_ES, TRANSLATIONS_EN } from "@/data/translations";
import { SlidersHorizontal, ArrowUpDown, Info } from "lucide-react";

export default function Home() {
  // Store / Language state
  const [currentStore, setCurrentStore] = useState<"Barcelona" | "Oregon">("Barcelona");
  const lang = currentStore === "Barcelona" ? "es" : "en";
  const t = currentStore === "Barcelona" ? TRANSLATIONS_ES : TRANSLATIONS_EN;
  const categories = currentStore === "Barcelona" ? CATEGORIES_ES : CATEGORIES_EN;
  const products = currentStore === "Barcelona" ? MOCK_PRODUCTS_ES : MOCK_PRODUCTS_EN;

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter/Sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const selectedCategory = categories[selectedCategoryIndex] || categories[0];
  
  const [maxPrice, setMaxPrice] = useState(1500);
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);
  const [sortBy, setSortBy] = useState("popularity"); // popularity, price-asc, price-desc, rating

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
    let result = [...products];

    // Category filter
    if (selectedCategoryIndex !== 0) {
      // Compare by matching index or mapped category name
      const categoryInProductLanguage = selectedCategory;
      result = result.filter(
        (p) => p.category.toLowerCase() === categoryInProductLanguage.toLowerCase()
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
    if (sortBy === "popularity") {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    } else if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedCategoryIndex, selectedCategory, searchQuery, maxPrice, onlyFreeShipping, sortBy]);

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
        setSelectedCategory={(cat) => {
          const idx = categories.indexOf(cat);
          if (idx !== -1) setSelectedCategoryIndex(idx);
        }}
        currentStore={currentStore}
        setCurrentStore={setCurrentStore}
      />

      {/* Main Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Banner Slider */}
        <PromoSlider currentStore={currentStore} />

        {/* Categories strip or badges for quick visualization */}
        <section className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200/60 mm-shadow">
          <h3 className="font-extrabold text-sm uppercase text-gray-800 tracking-wider mb-4 border-l-2 border-mm-red pl-2">
            {t.shopByCategory}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat, index) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryIndex(index)}
                className={`py-3 px-4 rounded-xl border font-bold text-xs uppercase transition-all duration-200 active:scale-95 text-center flex flex-col items-center justify-center gap-1.5 ${
                  selectedCategoryIndex === index
                    ? "bg-mm-red border-mm-red text-white shadow-md shadow-red-600/10"
                    : "bg-gray-50/50 border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{index === 0 ? t.viewAll : cat}</span>
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
                {t.filters}
              </h3>
              {(selectedCategoryIndex !== 0 || searchQuery !== "" || maxPrice < 1500 || onlyFreeShipping) && (
                <button
                  onClick={() => {
                    setSelectedCategoryIndex(0);
                    setSearchQuery("");
                    setMaxPrice(1500);
                    setOnlyFreeShipping(false);
                  }}
                  className="text-xs text-mm-red hover:underline font-bold"
                >
                  {t.clearAll}
                </button>
              )}
            </div>

            {/* Category selection in Sidebar */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.categoryLabel}</h4>
              <div className="space-y-1.5">
                {categories.map((cat, index) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryIndex(index)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                      selectedCategoryIndex === index
                        ? "bg-red-50 text-mm-red font-bold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>{index === 0 ? t.allCategories : cat}</span>
                    <span className="text-[10px] bg-gray-100 text-gray-400 font-bold px-1.5 py-0.5 rounded-full">
                      {index === 0
                        ? products.length
                        : products.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter slider */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.maxPrice}</h4>
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
                <span>1,500 €</span>
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
                  {t.freeShippingOnly}
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
                  {selectedCategoryIndex === 0 ? (currentStore === "Barcelona" ? "Todos los productos" : "All Products") : selectedCategory}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {t.foundItems.replace("{count}", String(filteredProducts.length))}
                </p>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <ArrowUpDown size={14} className="text-gray-400" />
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t.sortByLabel}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-bold text-gray-700 focus:outline-none border border-gray-200 bg-gray-50/50 hover:bg-gray-50 rounded-lg p-2 cursor-pointer focus:ring-1 focus:ring-mm-red"
                >
                  <option value="popularity">{t.sortByPopularity}</option>
                  <option value="price-asc">{t.sortByPriceAsc}</option>
                  <option value="price-desc">{t.sortByPriceDesc}</option>
                  <option value="rating">{t.sortByRating}</option>
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
                  <h3 className="font-bold text-gray-700">{t.noProductsFound}</h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-sm">
                    {currentStore === "Barcelona"
                      ? "Pruebe a cambiar la categoría, ajustar el rango de precios o buscar otro término."
                      : "Try changing the category, adjusting the price range, or searching for another term."}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategoryIndex(0);
                    setSearchQuery("");
                    setMaxPrice(1500);
                    setOnlyFreeShipping(false);
                  }}
                  className="bg-mm-red hover:bg-mm-red-hover text-white text-xs font-bold py-2.5 px-6 rounded-full transition-colors active:scale-95"
                >
                  {t.resetFilters}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    currentStore={currentStore}
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
        currentStore={currentStore}
      />

      {/* Footer */}
      <Footer currentStore={currentStore} />
    </div>
  );
}
