import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, Youtube } from "lucide-react"

interface FooterProps {
  dict: any;
  locale: string;
}

export default function Footer({ dict, locale }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className=" px-4 py-2 rounded mb-4 inline-block">
            <img
                src="/images/sofimed-logo.png"
                alt="SOFIMED Logo"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {dict.footer.description}
            </p>
            
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{dict.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/a-propos`} className="text-gray-400 hover:text-white transition-colors">
                  {dict.home.about}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/produits`} className="text-gray-400 hover:text-white transition-colors">
                  {dict.home.products}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="text-gray-400 hover:text-white transition-colors">
                  {dict.home.services}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/solutions`} className="text-gray-400 hover:text-white transition-colors">
                  {dict.home.solutions}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">{dict.footer.services}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/catalogues`} className="text-gray-400 hover:text-white transition-colors">
                  {dict.home.catalogues}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/carriere`} className="text-gray-400 hover:text-white transition-colors">
                  {dict.home.career}
                </Link>
              </li>
              <li>
                <a href="https://store.sofimedmaroc.com" className="text-gray-400 hover:text-white transition-colors">
                  SOFIMED - Store
                </a>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-400 hover:text-white transition-colors">
                  {dict.footer.support}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">{dict.footer.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-red-500" />
                <span className="text-gray-400 text-sm">+212 522 240 101</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-red-500" />
                <span className="text-gray-400 text-sm">+212 522 240 100</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-red-500" />
                <span className="text-gray-400 text-sm">contact@sofimedmaroc.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="text-gray-400 text-sm">137, Boulevard Moulay Ismaïl - Roches Noires 20290</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a href="https://www.linkedin.com/company/sofimed-maroc" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </a>
              <a href="https://www.facebook.com/sofimedmmaroc" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </a>
              <a href="https://www.youtube.com/channel/UCzYtVEnCg_H7u16hGsAqQ5Q" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">{dict.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
