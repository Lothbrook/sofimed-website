

import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { getDictionary } from "./dictionaries"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ClientSessionProvider } from "@/components/providers/session-provider"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

// Composant de chargement global
function GlobalLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#085C91] mx-auto mb-4" />
        <p className="text-lg text-gray-600">Chargement...</p>
      </div>
    </div>
  )
}

export const metadata = {
  title: "SOFIMED - Fournitures Industrielles",
  description: "Votre partenaire pour les fournitures industrielles au Maroc",
  generator: 'BENZOUINA Oussama',
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale as "fr" | "en")
  
  return (
    <html lang={locale} className="light" style={{colorScheme: "light"}}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ClientSessionProvider>
            <Header dict={dict} locale={locale} />
            <Suspense fallback={<GlobalLoading />}>
              {children}
              <Toaster position="top-right" richColors />
            </Suspense>
            <Footer dict={dict} locale={locale} />
          </ClientSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
