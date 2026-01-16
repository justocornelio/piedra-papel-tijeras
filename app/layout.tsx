import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ IMPORTANTE: define tu URL real aquí (Vercel o tu dominio)
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://piedra-papel-tijeras-ecru.vercel.app/"; // <- cambia esto

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "RPS Arena | Piedra, Papel y Tijeras",
    template: "%s | RPS Arena",
  },
  description:
    "RPS Arena es un juego moderno de Piedra, Papel y Tijeras. Compite, sube de nivel y mejora tu ranking.",

  openGraph: {
    title: "RPS Arena",
    description:
      "Un juego moderno de Piedra, Papel y Tijeras con niveles, ranking y desafíos.",
    url: SITE_URL,
    siteName: "RPS Arena",
    images: [
      {
        // ✅ con metadataBase esto se vuelve absoluto automáticamente
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "RPS Arena",
      },
    ],
    locale: "es_ES",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "RPS Arena",
    description: "Compite en RPS Arena, el juego moderno de PPT.",
    images: ["/logo.png"],
  },

  icons: {
    icon: "/logo.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
