"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Globe, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { getDictionary } from "@/app/[locale]/dictionaries"

export default function Header({ dict, locale }: { dict: any; locale: string }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Move handleLanguageSwitch inside the component
  const handleLanguageSwitch = () => {
    const currentLocale = locale
    const newLocale = currentLocale === 'fr' ? 'en' : 'fr'
    
    // Obtenir le chemin sans la locale actuelle
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/'
    
    // Rediriger vers la nouvelle locale avec le même chemin
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  useEffect(() => {
    // Set client flag to prevent hydration mismatch
    setIsClient(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { name: dict.home.title, href: `/${locale}/` },
    { name: dict.home.about, href: `/${locale}/a-propos` },
    { name: dict.home.products, href: `/${locale}/produits` },
    { name: dict.home.services, href: `/${locale}/services` },
    { name: dict.home.solutions, href: `/${locale}/solutions` },
    { name: dict.home.catalogues, href: `/${locale}/catalogues` },
    { name: dict.home.career, href: `/${locale}/carriere` },
    { name: dict.home.contact, href: `/${locale}/contact` },
  ]

  // Use isClient to prevent hydration mismatch for scroll-dependent styling
  const scrolledStyles = isClient && isScrolled

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ${scrolledStyles ? "py-2" : "py-4"}`}>
      <div
        className={`mx-auto transition-all duration-150 transform ${scrolledStyles ? "bg-white shadow-lg border border-gray-100/20 rounded-full max-w-[95%] px-6" : "container px-4 bg-transparent"}`}
      >
        <nav
          className={`flex items-center justify-between h-16 transition-all duration-150 ${scrolledStyles ? "px-2" : ""}`}
        >
          {/* Logo */}
          <Link href={`/${locale}/`} className="flex items-center group">
            <div className={`transition-all duration-300 ${scrolledStyles ? "scale-75" : ""}`}>
              <Image
                src="/images/sofimed-logo.png"
                alt="SOFIMED - La puissance derrière votre process"
                width={scrolledStyles ? 120 : 160}
                height={scrolledStyles ? 30 : 40}
                className="h-auto"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div
            className={`hidden lg:flex lg:items-center transition-all duration-300 ${scrolledStyles ? "space-x-2" : "space-x-6"}`}
          >
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
              >
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-300 ${scrolledStyles ? "text-gray-700 hover:text-[#085C91] text-sm" : "text-white hover:text-[#085C91]/80 text-base"}`}
                >
                  {item.name}
                  <span className={`absolute left-0 bottom-0 w-full h-0.5 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${scrolledStyles ? "bg-[#085C91]" : "bg-[#085C91]/80"}`} />
                </Link>
              </div>
            ))}

            <div className={`flex items-center transition-all duration-300 ${scrolledStyles ? "ml-4 space-x-4" : "ml-8 space-x-6"}`}>
              <button
                onClick={handleLanguageSwitch}
                className={`flex items-center space-x-1 transition-all duration-300 cursor-pointer hover:scale-110 ${scrolledStyles ? "text-gray-700 hover:text-[#085C91]" : "text-white hover:text-[#085C91]/80"}`}
              >
                <Globe
                  className={`transition-all duration-300 ${scrolledStyles ? "w-4 h-4" : "w-5 h-5"}`}
                />
                <span className={`font-medium ${scrolledStyles ? "text-xs" : "text-sm"}`}>
                  {locale === 'fr' ? 'EN' : 'FR'}
                </span>
              </button>
              <Button
                size={scrolledStyles ? "sm" : "default"}
                className={`bg-[#085C91] hover:bg-[#085C91]/90 text-white shadow-lg hover:shadow-[#085C91]/20 transition-all duration-300 ${scrolledStyles ? "text-xs py-1 px-3" : "text-sm py-2 px-4"}`}
                asChild
              >
                <a href="https://store.sofimedmaroc.com" target="_blank" rel="noopener noreferrer">
                  E-Shop
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 transition-colors duration-300 ${scrolledStyles ? "text-gray-700" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 transition-colors duration-300 ${scrolledStyles ? "text-gray-700" : "text-white"}`} />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 mt-2 mx-4 rounded-lg">
            <div className="py-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2.5 text-gray-700 hover:text-[#085C91] hover:bg-[#085C91]/5 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 py-3 border-t border-gray-100 mt-2">
                <Button
                  size="sm"
                  className="w-full bg-[#085C91] hover:bg-[#085C91]/90 text-white shadow-lg hover:shadow-[#085C91]/20 transition-all duration-300"
                  asChild
                >
                  <a href="https://store.sofimedmaroc.com" target="_blank" rel="noopener noreferrer">
                    E-Shop
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
