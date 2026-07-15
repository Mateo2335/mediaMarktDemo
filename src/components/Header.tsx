"use client";

import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  ChevronDown,
  HelpCircle,
  Menu,
  PhoneCall,
} from "lucide-react";
import { CATEGORIES } from "@/data/products";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function Header({
  cartItemsCount,
  onCartClick,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: HeaderProps) {
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-40">
      {/* Top Banner Offer */}
      <div className="w-full bg-mm-dark text-white text-xs py-2 px-4 flex justify-between items-center overflow-x-auto whitespace-nowrap">
        <div className="flex gap-6 mx-auto md:mx-0">
          <span className="flex items-center gap-1.5 text-gray-300">
            <span className="h-1.5 w-1.5 rounded-full bg-mm-red animate-pulse" />
            Envío gratis en miles de productos a partir de 49€
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-gray-300">
            <span className="h-1.5 w-1.5 rounded-full bg-mm-red" />
            Financiación a tu medida hasta 36 meses
          </span>
          <span className="hidden lg:flex items-center gap-1.5 text-gray-300">
            <span className="h-1.5 w-1.5 rounded-full bg-mm-red" />
            Recogida en tienda gratuita en 30 minutos
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-gray-300">
          <a href="#" className="hover:text-white flex items-center gap-1">
            <PhoneCall size={12} />
            900 205 000
          </a>
          <a href="#" className="hover:text-white flex items-center gap-1">
            <HelpCircle size={12} />
            Ayuda
          </a>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="w-full border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory("Todos");
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
                placeholder="¿Qué estás buscando? Ejem: iPhone, MacBook, OLED..."
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
                  Limpiar
                </button>
              )}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-5 sm:gap-6">
            {/* Store Locator */}
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                Tu tienda
              </span>
              <button className="flex items-center gap-1 hover:text-mm-red text-sm font-bold text-gray-700 transition-colors">
                <MapPin size={16} className="text-mm-red" />
                <span>MediaMarkt Barcelona</span>
                <ChevronDown size={14} />
              </button>
            </div>

            {/* Account */}
            <button className="flex items-center gap-2 hover:text-mm-red text-gray-700 transition-colors group">
              <div className="p-2 rounded-full hover:bg-gray-100 group-hover:text-mm-red transition-all">
                <User size={20} />
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[10px] text-gray-400">Bienvenido</span>
                <span className="text-xs font-bold">Mi Cuenta</span>
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
                Mi Carrito
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
            placeholder="¿Qué estás buscando?"
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
              <span>Categorías</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isCategoriesMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isCategoriesMenuOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-xl py-2 w-56 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {CATEGORIES.map((cat) => (
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
                    <span>
                      {cat === "Todos" ? "Todas las categorías" : cat}
                    </span>
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
            {CATEGORIES.filter((c) => c !== "Todos").map((cat) => (
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
              OUTLET OUTLET
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-orange-500 font-black">DIA SIN IVA</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
