import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "MediaMarkt | Tienda de Electrónica, Informática y Tecnología",
  description: "Compra tecnología, electrodomésticos, smartphones, portátiles y consolas al mejor precio en MediaMarkt. ¡Las mejores ofertas e informática!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-mm-gray text-mm-text">
        {children}
      </body>
    </html>
  );
}
