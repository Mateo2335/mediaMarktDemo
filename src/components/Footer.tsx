import React from "react";
import { Send, ShieldCheck, Truck, RefreshCw, CreditCard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-mm-dark text-gray-300 text-sm mt-auto">
      
      {/* Advantage Features Bar */}
      <div className="w-full border-b border-gray-800 bg-[#161616] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-800/60 rounded-full text-mm-red">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Envío rápido a domicilio</h4>
              <p className="text-xs text-gray-400">Gratis a partir de 49€ en miles de artículos</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-800/60 rounded-full text-mm-red">
              <RefreshCw size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Devoluciones fáciles</h4>
              <p className="text-xs text-gray-400">Hasta 30 días para devolver tu compra</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-800/60 rounded-full text-mm-red">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Compra 100% Segura</h4>
              <p className="text-xs text-gray-400">Garantía oficial y métodos de pago protegidos</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-800/60 rounded-full text-mm-red">
              <CreditCard size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Financiación flexible</h4>
              <p className="text-xs text-gray-400">Paga a plazos cómodamente tus compras</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links Area */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Column 1: Atención al Cliente */}
        <div>
          <h3 className="text-white font-bold mb-4 text-xs uppercase tracking-wider border-l-2 border-mm-red pl-2">
            Atención al Cliente
          </h3>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Contacto y Ayuda</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Estado de mi Pedido</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Devoluciones y Cambios</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Nuestras Tiendas</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cita Previa en Tienda</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
          </ul>
        </div>

        {/* Column 2: Comprar en MediaMarkt */}
        <div>
          <h3 className="text-white font-bold mb-4 text-xs uppercase tracking-wider border-l-2 border-mm-red pl-2">
            Comprar en MediaMarkt
          </h3>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Financiación y Pagos</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Garantías y Extensiones</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Servicios e Instalaciones</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tarjeta Regalo MediaMarkt</a></li>
            <li><a href="#" className="hover:text-white transition-colors">MediaMarkt Empresas</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Vender en nuestro Marketplace</a></li>
          </ul>
        </div>

        {/* Column 3: Sobre Nosotros */}
        <div>
          <h3 className="text-white font-bold mb-4 text-xs uppercase tracking-wider border-l-2 border-mm-red pl-2">
            Sobre Nosotros
          </h3>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Quiénes somos</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Trabaja con nosotros</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sostenibilidad y Medio Ambiente</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sala de prensa</a></li>
            <li><a href="#" className="hover:text-white transition-colors">MediaMarkt Club</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Afiliados</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className="text-white font-bold mb-4 text-xs uppercase tracking-wider border-l-2 border-mm-red pl-2">
            Únete a la Newsletter
          </h3>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed">
            Apúntate y recibe ofertas exclusivas, novedades y 10€ de descuento para tu primera compra online.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="Tu dirección de correo"
              className="bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-mm-red text-xs flex-1"
            />
            <button
              type="submit"
              className="bg-mm-red hover:bg-mm-red-hover text-white rounded-md py-2 px-3 transition-colors active:scale-95 flex items-center justify-center"
            >
              <Send size={14} />
            </button>
          </form>
          
          {/* Social Links */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" title="Facebook">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" title="Twitter / X">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" title="Instagram">
              <svg className="w-[18px] h-[18px] stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" title="YouTube">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" title="LinkedIn">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Trust & Legal Footer */}
      <div className="w-full bg-[#0a0a0a] py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-800 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a href="#" className="hover:text-gray-400">Aviso Legal</a>
            <a href="#" className="hover:text-gray-400">Política de Privacidad</a>
            <a href="#" className="hover:text-gray-400">Política de Cookies</a>
            <a href="#" className="hover:text-gray-400">Condiciones de Contratación</a>
            <a href="#" className="hover:text-gray-400">Configuración de Cookies</a>
          </div>

          <div className="flex items-center gap-4 text-gray-600">
            <span>© MediaMarkt Saturn Administradora de Tiendas, S.L.U. 2026. Todos los derechos reservados.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
