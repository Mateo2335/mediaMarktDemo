"use client";

import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  ChevronDown,
  Menu,
} from "lucide-react";
import { CATEGORIES_ES, CATEGORIES_EN } from "@/data/products";
import { TRANSLATIONS_ES, TRANSLATIONS_EN } from "@/data/translations";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  currentStore: "Barcelona" | "Oregon";
  setCurrentStore: (store: "Barcelona" | "Oregon") => void;
}

export default function Header({
  cartItemsCount,
  onCartClick,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  currentStore,
  setCurrentStore,
}: HeaderProps) {
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);

  const t = currentStore === "Barcelona" ? TRANSLATIONS_ES : TRANSLATIONS_EN;
  const categories =
    currentStore === "Barcelona" ? CATEGORIES_ES : CATEGORIES_EN;

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-40">
      {/* Top Banner Offer */}
      <div className="w-full bg-mm-yellow text-mm-dark text-sm py-2.5 px-4 font-black flex flex-col md:flex-row justify-between items-center gap-2 shadow-md border-b-2 border-mm-red">
        <div className="flex items-center gap-2">
          <span className="bg-mm-red text-white text-xs px-2.5 py-1 rounded-md uppercase tracking-widest font-black animate-pulse">
            {currentStore === "Barcelona"
              ? "★ DÍA LOCO GEMINI ★"
              : "★ GEMINI CRAZY DAY ★"}
          </span>
          <span className="text-mm-red font-black text-xs sm:text-sm uppercase tracking-wide">
            {currentStore === "Barcelona"
              ? "¡DESCUENTO ESPECIAL DEL 50% EN TU PRÓXIMA COMPRA!"
              : "SPECIAL 50% DISCOUNT ON YOUR NEXT PURCHASE!"}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="font-bold text-gray-800">
            {currentStore === "Barcelona" ? "Usa el código: " : "Use code: "}
            <span className="bg-mm-dark text-mm-yellow font-mono px-2 py-1 rounded-md font-black select-all">
              GEMINIMARKTI
            </span>
          </span>
          <span className="bg-white/80 border border-mm-red/30 text-mm-red font-bold px-2 py-0.5 rounded-full text-[10px] animate-bounce">
            {currentStore === "Barcelona" ? "¡Solo hoy!" : "Today only!"}
          </span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="w-full border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory(categories[0]); // Usually "Todos" or "All"
                setSearchQuery("");
              }}
              className="group flex items-center select-none"
            >
              {/* MediaMarkt styled Logo Box */}
              <div className="bg-mm-red text-white font-extrabold text-2xl tracking-tighter px-3 py-1.5 flex items-center rounded-sm transition-transform duration-200 active:scale-95 shadow-md">
                <span>Media</span>
                <span className="text-mm-dark bg-white ml-0.5 px-1 py-0.2 rounded-xs select-none">
                  Markt
                </span>
                {/* Logo Swirl Icon */}
                <span className="ml-1 text-white font-serif text-3xl font-black leading-none rotate-12 transition-transform duration-300 group-hover:rotate-45">
                  ~
                </span>
              </div>
            </button>
          </div>

          {/* Search Box */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mm-red focus:border-transparent text-sm bg-gray-50 hover:bg-gray-100/50 transition-colors"
              />
              <Search
                className="absolute right-3.5 top-3 text-gray-400"
                size={18}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-10 top-2.5 text-xs text-gray-400 hover:text-mm-red px-2 py-0.5"
                >
                  {t.clear}
                </button>
              )}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-5 sm:gap-6">
            {/* Store Locator */}
            <div className="relative flex flex-col text-left">
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                {t.yourStore}
              </span>
              <button
                onClick={() => setIsStoreDropdownOpen(!isStoreDropdownOpen)}
                className="flex items-center gap-1 hover:text-mm-red text-sm font-bold text-gray-700 transition-colors focus:outline-none"
              >
                <MapPin size={16} className="text-mm-red" />
                <span>MediaMarkt {currentStore}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isStoreDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Store Dropdown menu */}
              {isStoreDropdownOpen && (
                <div className="absolute top-[45px] left-0 bg-white border border-gray-200 rounded-xl shadow-xl py-2 w-56 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-1.5 border-b border-gray-100 mb-1">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                      {currentStore === "Barcelona"
                        ? "Selecciona tu tienda"
                        : "Select your store"}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentStore("Barcelona");
                      setIsStoreDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50 flex items-center justify-between ${
                      currentStore === "Barcelona"
                        ? "text-mm-red bg-red-50/40"
                        : "text-gray-700"
                    }`}
                  >
                    <span>MediaMarkt Madrid</span>
                    <span className="text-[9px] bg-gray-100 text-gray-500 font-bold px-1.5 py-0.5 rounded-full uppercase">
                      ES
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentStore("Oregon");
                      setIsStoreDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50 flex items-center justify-between ${
                      currentStore === "Oregon"
                        ? "text-mm-red bg-red-50/40"
                        : "text-gray-700"
                    }`}
                  >
                    <span>MediaMarkt Oregon</span>
                    <span className="text-[9px] bg-gray-100 text-gray-500 font-bold px-1.5 py-0.5 rounded-full uppercase">
                      EN
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Account */}
            <button className="flex items-center gap-2 hover:text-mm-red text-gray-700 transition-colors group">
              <div className="p-2 rounded-full hover:bg-gray-100 group-hover:text-mm-red transition-all">
                <User size={20} />
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[10px] text-gray-400">{t.welcome}</span>
                <span className="text-xs font-bold">{t.myAccount}</span>
              </div>
            </button>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="flex items-center gap-2 bg-mm-red hover:bg-mm-red-hover text-white py-2.5 px-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 group"
            >
              <div className="relative">
                <ShoppingCart size={18} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-3.5 -right-3 bg-white text-mm-red text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-mm-red animate-bounce">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold hidden sm:inline">
                {t.myCart}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="p-3 bg-gray-50 border-b border-gray-100 block md:hidden">
        <div className="relative">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mm-red focus:border-transparent text-sm bg-white"
          />
          <Search
            className="absolute right-3.5 top-2.5 text-gray-400"
            size={16}
          />
        </div>
      </div>

      {/* Category Navigation Subheader */}
      <nav className="bg-gray-50 border-b border-gray-200/50 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-700">
          {/* Main Categories Menu Button */}
          <div className="relative">
            <button
              onClick={() => setIsCategoriesMenuOpen(!isCategoriesMenuOpen)}
              className="flex items-center gap-2 hover:text-mm-red font-bold py-1.5 transition-colors"
            >
              <Menu size={16} />
              <span>{t.categories}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isCategoriesMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isCategoriesMenuOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-xl py-2 w-56 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsCategoriesMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-100 hover:text-mm-red transition-colors flex justify-between items-center ${
                      selectedCategory === cat
                        ? "text-mm-red bg-red-50/50"
                        : "text-gray-700"
                    }`}
                  >
                    <span>{cat === categories[0] ? t.allCategories : cat}</span>
                    {selectedCategory === cat && (
                      <span className="h-1.5 w-1.5 rounded-full bg-mm-red" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Category Links */}
          <div className="hidden md:flex items-center gap-6 overflow-x-auto no-scrollbar">
            {categories
              .filter((c) => c !== categories[0])
              .map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-1.5 border-b-2 hover:text-mm-red transition-all ${
                    selectedCategory === cat
                      ? "border-mm-red text-mm-red font-bold"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
          </div>

          {/* Campaign badging */}
          <div className="flex gap-4 items-center">
            <span className="text-mm-red font-black animate-pulse flex items-center gap-1 select-none">
              <span className="h-2 w-2 rounded-full bg-mm-red inline-block" />
              {t.outlet}
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-orange-500 font-black">{t.vatFreeDay}</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
