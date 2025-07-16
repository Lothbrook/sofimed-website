'use client'

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye, FileText, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CTASection from "@/components/cta-section"
import { useState } from "react"

interface CataloguesContentProps {
  dict: any
  locale: string
}

export default function CataloguesContent({ dict, locale }: CataloguesContentProps) {
  const [selectedCategory, setSelectedCategory] = useState(dict.catalogues.categories.all)
  const [searchTerm, setSearchTerm] = useState("")

  const catalogues = [
    {
      title: dict.catalogues.cataloguesList.generalEnglish.title,
      description: dict.catalogues.cataloguesList.generalEnglish.description,
      pages: "112 pages",
      size: "14 MB",
      category: dict.catalogues.categories.general,
      pdfUrl: "/images/SOFIMED-General-Catalog-englais.pdf",
      previewImage: "/images/SOFIMED-General-Anglais.jpg",
    },
    {
      title: dict.catalogues.cataloguesList.generalFrench.title,
      description: dict.catalogues.cataloguesList.generalFrench.description,
      pages: "112 pages",
      size: "17 MB",
      category: dict.catalogues.categories.general,
      pdfUrl: "/images/Catalogue-general-SOFIMED.pdf",
      previewImage: "/images/Catalogue-general-SOFIMED-min.jpg",
    },
    {
      title: dict.catalogues.cataloguesList.sanitaryPumps.title,
      description: dict.catalogues.cataloguesList.sanitaryPumps.description,
      pages: "10 pages",
      size: "1 MB",
      category: dict.catalogues.categories.sanitary,
      pdfUrl: "/images/pompes_sanitaires.pdf",
      previewImage: "/images/Pompes-sanitaires-1-min.jpg",
    },
    {
      title: dict.catalogues.cataloguesList.industrialPumps.title,
      description: dict.catalogues.cataloguesList.industrialPumps.description,
      pages: "21 pages",
      size: "3 MB",
      category: dict.catalogues.categories.industrial,
      pdfUrl: "/images/Pompes-industrielles.pdf",
      previewImage: "/images/Pompes-industrielles-SOFIMED-min.jpg",
    },
    {
      title: dict.catalogues.cataloguesList.fireEquipment.title,
      description: dict.catalogues.cataloguesList.fireEquipment.description,
      pages: "3 pages",
      size: "1 MB",
      category: dict.catalogues.categories.fireProtection,
      pdfUrl: "/images/equipement-de-lutte-contre-incendie-SOFIMED.pdf",
      previewImage: "/images/Equipement-de-lutte-contre-incendie-SOFIMED-min.jpg",
    },
    {
      title: dict.catalogues.cataloguesList.compressors.title,
      description: dict.catalogues.cataloguesList.compressors.description,
      pages: "5 pages",
      size: "1 MB",
      category: dict.catalogues.categories.compressors,
      pdfUrl: "/images/compresseurs.pdf",
      previewImage: "/images/compresseurs-sofimed-min.jpg",
    },
    {
      title: dict.catalogues.cataloguesList.filtration.title,
      description: dict.catalogues.cataloguesList.filtration.description,
      pages: "5 pages",
      size: "1 MB",
      category: dict.catalogues.categories.filtration,
      pdfUrl: "/images/filtration-industrielle-filtration-dair-sofimed.pdf",
      previewImage: "/images/filtration-industrielle-filtration-dair-sofimed-1-min.jpg",
    },
    {
      title: dict.catalogues.cataloguesList.valves.title,
      description: dict.catalogues.cataloguesList.valves.description,
      pages: "7 pages",
      size: "1 MB",
      category: dict.catalogues.categories.valves,
      pdfUrl: "/images/robinetterie-industrielle.pdf",
      previewImage: "/images/robinetterie-industrielle-sofimed-min.jpg",
    },
    {
      title: dict.catalogues.cataloguesList.automation.title,
      description: dict.catalogues.cataloguesList.automation.description,
      pages: "11 pages",
      size: "2 MB",
      category: dict.catalogues.categories.automation,
      pdfUrl: "/images/automation-process-control-sofimed.pdf",
      previewImage: "/images/automation-process-control-sofimed-min.jpg",
    },
    {
      title: dict.catalogues.cataloguesList.pneumatic.title,
      description: dict.catalogues.cataloguesList.pneumatic.description,
      pages: "9 pages",
      size: "2 MB",
      category: dict.catalogues.categories.pneumatic,
      pdfUrl: "/images/composants-pneumatique.pdf",
      previewImage: "/images/composants-pneumatique-sofimed.jpg",
    },
    {
      title: dict.catalogues.cataloguesList.cabling.title,
      description: dict.catalogues.cataloguesList.cabling.description,
      pages: "13 pages",
      size: "2 MB",
      category: dict.catalogues.categories.others,
      pdfUrl: "/images/coffrets-acessoires-de-cablage-sofimed.pdf",
      previewImage: "/images/coffrets-acessoires-de-cablage-sofimed-min.jpg",
    },
    {
      title: dict.catalogues.cataloguesList.atex.title,
      description: dict.catalogues.cataloguesList.atex.description,
      pages: "12 pages",
      size: "2 MB",
      category: dict.catalogues.categories.atex,
      pdfUrl: "/images/solution-atex.pdf",
      previewImage: "/images/solution-atex.jpg",
    },
    {
      title: dict.catalogues.cataloguesList.maintenance.title,
      description: dict.catalogues.cataloguesList.maintenance.description,
      pages: "18 pages",
      size: "3 MB",
      category: dict.catalogues.categories.others,
      pdfUrl: "/images/produits-technique-de-maintenance.pdf",
      previewImage: "/images/produits-technique-de-maintenance-sofimed-min.jpg",
    },
    {
      title: dict.catalogues.cataloguesList.transmission.title,
      description: dict.catalogues.cataloguesList.transmission.description,
      pages: "3 pages",
      size: "1 MB",
      category: dict.catalogues.categories.others,
      pdfUrl: "/images/transmission-electro-mecanique.pdf",
      previewImage: "/images/transmission-electro-mecanique-sofimed-min.jpg",
    },
    {
      title: dict.catalogues.cataloguesList.processConstruction.title,
      description: dict.catalogues.cataloguesList.processConstruction.description,
      pages: "10 pages",
      size: "1 MB",
      category: dict.catalogues.categories.others,
      pdfUrl: "/images/sofimed-process-construction.pdf",
      previewImage: "/images/sofimed-process-construction.jpg",
    },
  ]

  const categories = [
    dict.catalogues.categories.all,
    dict.catalogues.categories.general,
    dict.catalogues.categories.sanitary,
    dict.catalogues.categories.industrial,
    dict.catalogues.categories.fireProtection,
    dict.catalogues.categories.compressors,
    dict.catalogues.categories.filtration,
    dict.catalogues.categories.valves,
    dict.catalogues.categories.automation,
    dict.catalogues.categories.pneumatic,
    dict.catalogues.categories.atex,
    dict.catalogues.categories.others
  ]

  const filteredCatalogues = catalogues.filter(catalogue => {
    const matchesCategory = selectedCategory === dict.catalogues.categories.all || catalogue.category === selectedCategory
    const matchesSearch = catalogue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         catalogue.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleDownload = (pdfUrl: string, title: string) => {
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `${title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="min-h-[50vh] relative flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/banner-services.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{dict.catalogues.title}</h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              {dict.catalogues.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder={dict.catalogues.search.placeholder}
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="border-[#085C91] text-[#085C91] hover:bg-[#085C91] hover:text-white"
                onClick={() => {
                  setSelectedCategory(dict.catalogues.categories.all)
                  setSearchTerm("")
                }}
              >
                <FileText className="w-4 h-4 mr-2" />
                {dict.catalogues.search.allCatalogues}
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === selectedCategory ? "default" : "outline"}
                  size="sm"
                  className={category === selectedCategory ? "bg-[#085C91] hover:bg-[#085C91]/90" : "border-[#085C91] text-[#085C91] hover:bg-[#085C91] hover:text-white"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catalogues Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredCatalogues.map((catalogue, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden bg-white h-fit flex flex-col"
              >
                {/* Image Container - Format Portrait 162x229 */}
                <div className="relative bg-gray-100">
                  <div className="aspect-[162/229] w-full overflow-hidden">
                    <img
                      src={catalogue.previewImage}
                      alt={catalogue.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#085C91] text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
                      {catalogue.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FileText className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <CardHeader className="p-0 mb-1">
                    <CardTitle className="text-base font-semibold text-gray-900 leading-tight h-12 flex items-start">
                      <span className="line-clamp-2">{catalogue.title}</span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0 flex flex-col flex-grow">
                    {/* File Info */}
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-4 bg-gray-50 rounded-lg p-2">
                      <span className="flex items-center">
                        <FileText className="w-3 h-3 mr-1" />
                        {catalogue.pages}
                      </span>
                      <span className="font-medium">{catalogue.size}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 mt-auto">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full border-[#085C91] text-[#085C91] hover:bg-[#085C91] hover:text-white transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            {dict.catalogues.actions.preview}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl max-h-[95vh] p-0 w-[95vw]">
                          <DialogHeader className="p-6 pb-0">
                            <DialogTitle>{catalogue.title}</DialogTitle>
                          </DialogHeader>
                          <div className="p-6 pt-4">
                            <div className="w-full h-[80vh] border rounded-lg overflow-hidden">
                              <iframe
                                src={`${catalogue.pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                                className="w-full h-full"
                                title={`${dict.catalogues.actions.previewTitle} ${catalogue.title}`}
                              />
                            </div>
                            <div className="flex justify-end mt-4 gap-2">
                              <Button 
                                onClick={() => handleDownload(catalogue.pdfUrl, catalogue.title)}
                                className="bg-[#085C91] hover:bg-[#085C91]/90"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                {dict.catalogues.actions.download}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        size="sm" 
                        className="w-full bg-[#085C91] hover:bg-[#085C91]/90 transition-colors"
                        onClick={() => handleDownload(catalogue.pdfUrl, catalogue.title)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {dict.catalogues.actions.download}
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {filteredCatalogues.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">{dict.catalogues.noResults.title}</h3>
              <p className="text-gray-500">{dict.catalogues.noResults.description}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {/* <CTASection dict={dict} locale={locale} />

      <Footer dict={dict} locale={locale} /> */}
    </div>
  )
}