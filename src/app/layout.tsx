import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agora — Simulador de Compra y Venta de Criptomonedas",
  description:
    "Agora (del griego ἀγορά, «mercado»): prototipo académico (UMG) de exchange de criptomonedas con dashboard, mercado, trading simulado e historial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} antialiased min-h-screen bg-bg text-text font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
