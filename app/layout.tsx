import "@/css/satoshi.css";
import "@/css/style.css";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import NextTopLoader from "nextjs-toploader";

import { Providers } from "./providers";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";

// ✅ CAMBIA ESTO si tu dominio es otro
const SITE_URL = "https://tu-juego.vercel.app";

export const metadata: Metadata = {
  title: {
    template: "%s | RPS Arena",
    default: "RPS Arena - Piedra, Papel y Tijeras",
  },
  description:
    "🪨📄✂️ RPS Arena es un juego moderno de Piedra, Papel y Tijeras. Compite contra la CPU, sube de nivel y demuestra tu estrategia.",
  keywords: [
    "piedra papel tijeras",
    "rock paper scissors",
    "rps",
    "juego online",
    "juego casual",
    "arena",
    "ranking",
    "estrategia",
  ].join(", "),
  authors: [
    {
      name: "RPS Arena Team",
      url: SITE_URL,
    },
  ],
  creator: "RPS Arena",
  publisher: "RPS Arena",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  metadataBase: new URL(SITE_URL),

  icons: {
    icon: "../public/logo.png", // ✅ recomendado 512x512 (o 192x192)
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
    },
  },

  // ✅ OPEN GRAPH (WhatsApp, Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    title: "RPS Arena - Piedra, Papel y Tijeras",
    description:
      "🪨📄✂️ Juego moderno de Piedra, Papel y Tijeras. Reta a la CPU, mejora tu ranking y sube de nivel.",
    siteName: "RPS Arena",
    images: [
      {
        // ✅ Debe existir en /public/images/og-image.png (1200x630)
        url: "../public/logo.png",
        width: 1200,
        height: 630,
        alt: "RPS Arena - Piedra, Papel y Tijeras",
      },
    ],
  },

  // ✅ TWITTER
  twitter: {
    card: "summary_large_image",
    title: "RPS Arena - Piedra, Papel y Tijeras",
    description:
      "🪨📄✂️ Compite en RPS Arena. Juego moderno, rápido y adictivo. Sube de nivel y domina la estrategia.",
    images: ["logo.png"],
  },

  appleWebApp: {
    capable: true,
    title: "RPS Arena",
    statusBarStyle: "black-translucent",
  },

  manifest: "/manifest.json",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "games",

  other: {
    "og:type": "game",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* ✅ Preload recursos críticos */}
        <link rel="preload" href="/images/og-image.png" as="image" />
        <link rel="preload" href="/images/logo.png" as="image" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ✅ Structured Data (SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GameApplication",
              name: "RPS Arena",
              applicationCategory: "Game",
              operatingSystem: "Web Browser",
              description:
                "Juego moderno de Piedra, Papel y Tijeras con progreso, niveles y ranking.",
              url: SITE_URL,
              author: {
                "@type": "Organization",
                name: "RPS Arena",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Piedra, Papel y Tijeras",
                "Modo contra CPU",
                "Sistema de niveles",
                "Racha y estadísticas",
                "Diseño moderno",
              ],
            }),
          }}
        />
      </head>

      <body>
        <Providers>
          <NextTopLoader color="#2563EB" showSpinner={false} />

          <div className="flex min-h-screen">
            <Sidebar />

            <div className="w-full bg-white dark:bg-gray-900">
              <Header />

              <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
