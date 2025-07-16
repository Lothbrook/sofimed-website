import { Button } from "@/components/ui/button"
import { ShoppingCart, Building2, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BusinessUnits({ dict }: { dict: any }) {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#085C91] to-gray-900 bg-clip-text text-transparent mb-4">
              {dict.businessUnits.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#085C91] to-cyan-500 mx-auto mb-6 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {dict.businessUnits.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* BU FIT Section */}
          <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="relative h-64">
              <Image
                src="/images/metal-work-scaled.jpg"
                alt="BU FIT"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <div className="bg-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  {dict.businessUnits.fit.label}
                </div>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors">
                {dict.businessUnits.fit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {dict.businessUnits.fit.description}
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg hover:shadow-cyan-100"
                  asChild
                >
                  <a href="https://store.sofimedmaroc.com" target="_blank" rel="noopener noreferrer">
                    {dict.businessUnits.fit.visitSite}
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50"
                  asChild
                >
                  <Link href="/contact">{dict.businessUnits.fit.learnMore}</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Projets Section */}
          <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="relative h-64">
              <Image
                src="/images/hertz-scaled.jpg"
                alt="Projets industriels"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {dict.businessUnits.projects.label}
                </div>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                {dict.businessUnits.projects.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {dict.businessUnits.projects.description}
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-100"
                  asChild
                >
                  <Link href="/produits">{dict.businessUnits.projects.visitSite}</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-red-600 text-red-600 hover:bg-red-50"
                  asChild
                >
                  <Link href="/contact">{dict.businessUnits.projects.learnMore}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
