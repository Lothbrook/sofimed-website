'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Filter, Wind, Thermometer, Droplets, Shield, Zap, Settings, Award, Users, CheckCircle, Wrench, Truck, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface SolutionsClientProps {
  dict: any
  locale: string
}

export default function SolutionsClient({ dict, locale }: SolutionsClientProps) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)

  const mainSections = [
    {
      title: dict?.solutions?.distribution?.title || "Sofimed distribution",
      description: dict?.solutions?.distribution?.description || "Le groupe Sofimed propose différents types d'offres : offres commerciales avec des équipements et des fournitures associées innovent en permanence, offrant une valeur constante à nos clients et contribuant à améliorer leur productivité. Nos équipes de chefs de produits et de fournisseurs associés innovent en permanence, offrant une valeur constante à nos clients et contribuant à améliorer leur productivité.",
      features: dict?.solutions?.distribution?.features || [
        "Équipements industriels",
        "Fournitures spécialisées",
        "Solutions sur mesure",
        "Support technique"
      ]
    },
    {
      title: dict?.solutions?.automation?.title || "Automatisation",
      description: dict?.solutions?.automation?.description || "Nos solutions d'automatisation permettent d'optimiser vos processus industriels grâce à des technologies de pointe. Nous proposons des systèmes intelligents qui améliorent l'efficacité et réduisent les coûts opérationnels.",
      features: dict?.solutions?.automation?.features || [
        "Systèmes de contrôle automatique",
        "Capteurs intelligents",
        "Interface homme-machine",
        "Maintenance prédictive"
      ]
    }
  ]

  const skidsData = [
    {
      title: dict?.solutions?.skids?.waterPressure?.title || "Skids de surpression d'eau.",
      content: dict?.solutions?.skids?.waterPressure?.content || "Nous concevons et fabriquons des systèmes de surpression d'eau avec un débit élevé et exigence de pression suivant les normes s'adressant aux applications industrielles. Ces conception et fabrications sont livrés sous forme d'ensemble complet (pressostats, manomètres, vannes, etc....) avec pompes électriques centrifuges verticales ou horizontales en acier inoxydable, ou fonte équipées de variateurs de fréquences, automates de gestion et asservissement, collecteurs entrées-sorties groupes, réservoir de pression, carte de protection et contrôle et tous les accessoires montés sur le châssis. Vous trouverez toujours une solution avec notre équipe SOFIMED qui répond à vos besoins."
    },
    {
      title: dict?.solutions?.skids?.gplPumping?.title || "Skids de pompage & compression GPL",
      content: dict?.solutions?.skids?.gplPumping?.content || "Nous fournissons une gamme complète de groupes de pompage et compression GPL et gaz liquéfié étudié et fabriqué dans nos ateliers à Casablanca suivant les normes en vigueur avec l'intégration de Compresseurs verticales, pompes à palettes, pompes multicellulaires à canal latéral, moteur électrique, liquid-trap ( Piège à liquide), vanne à quatre voix, tuyauterie, coffret électrique de commande ou de puissance et bien d'autres équipements et instruments de contrôle et sécurité ( pression, niveau, température ...) pour le dépotage/chargement camions-citernes et remplissage bouteilles de gaz GPL.\n\nNotre service technique étudie et propose des groupes de pompage et compression spécifiques pour des applications spéciales à la demande du client en conformité avec les normes de réglementation en vigueur."
    },
    {
      title: dict?.solutions?.skids?.dosing?.title || "Skids de pompage, dosage & comptage",
      content: dict?.solutions?.skids?.dosing?.content || "Nous construisons soigneusement des skids de transfert, dosage, injection d'additifs ou comptage des fluides spécifiques avec une configuration bien adaptée aux exigences du client et normes de sécurité. Nos skids sont testés dans nos ateliers avant la livraison et l'installation."
    }
  ]

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section 
        className="min-h-[60vh] relative flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/banner-solutions.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {dict?.solutions?.hero?.title || "Solutions clés en mains"}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              {dict?.solutions?.hero?.subtitle || "Des solutions innovantes et sur mesure pour répondre à tous vos défis industriels"}
            </p>
          </div>
        </div>
      </section>

      {/* Sofimed Distribution Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-slate-100/40 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <div className="inline-block">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#085C91] to-gray-900 bg-clip-text text-transparent mb-4">
                      {mainSections[0].title}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#085C91] to-cyan-500 mx-auto lg:mx-0 mb-6 rounded-full"></div>
                  </div>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {mainSections[0].description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  {mainSections[0].features.map((feature, index) => (
                    <div key={index} className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300">
                      <CheckCircle className="w-5 h-5 text-[#085C91] mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <img
                    src="/images/service-1.jpg"
                    alt="Sofimed Distribution"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automatisation Section */}
      <section className="py-20 bg-gradient-to-br from-white to-slate-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-slate-100/40 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <img
                    src="/images/Autamation-SOFIMED-min.jpg"
                    alt="Automatisation"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <div className="text-center lg:text-left">
                  <div className="inline-block">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#085C91] to-gray-900 bg-clip-text text-transparent mb-4">
                      {mainSections[1].title}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#085C91] to-cyan-500 mx-auto lg:mx-0 mb-6 rounded-full"></div>
                  </div>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {mainSections[1].description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  {mainSections[1].features.map((feature, index) => (
                    <div key={index} className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300">
                      <CheckCircle className="w-5 h-5 text-[#085C91] mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification ISO Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-slate-100/40 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <div className="inline-block">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#085C91] to-gray-900 bg-clip-text text-transparent mb-4">
                      {dict?.solutions?.quality?.title || "Qualité"}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#085C91] to-cyan-500 mx-auto lg:mx-0 mb-6 rounded-full"></div>
                  </div>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {dict?.solutions?.quality?.description || "Notre engagement qualité est reconnu par la certification ISO 9001. Cette certification atteste de notre capacité à fournir des produits et services conformes aux exigences de nos clients et aux réglementations applicables, tout en démontrant notre amélioration continue."}
                </p>
                <div className="space-y-4 mt-8">
                  <div className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300">
                    <Award className="w-6 h-6 text-[#085C91] mr-4 flex-shrink-0" />
                    <span className="text-gray-700 font-semibold">{dict?.solutions?.quality?.features?.certification || "Certification ISO 9001"}</span>
                  </div>
                  <div className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300">
                    <CheckCircle className="w-6 h-6 text-[#085C91] mr-4 flex-shrink-0" />
                    <span className="text-gray-700 font-semibold">{dict?.solutions?.quality?.features?.improvement || "Amélioration continue des processus"}</span>
                  </div>
                  <div className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300">
                    <Shield className="w-6 h-6 text-[#085C91] mr-4 flex-shrink-0" />
                    <span className="text-gray-700 font-semibold">{dict?.solutions?.quality?.features?.compliance || "Conformité aux normes internationales"}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <img
                    src="/images/qualite.jpg"
                    alt="Certification ISO 9001:2015"
                    className="w-full h-80 object-contain p-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skids de pompage Section */}
      <section className="py-20 bg-gradient-to-br from-white to-slate-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-slate-100/40 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Hero Image */}
            <div className="mb-16">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  src="/images/SOFIMED_skids.jpg"
                  alt="Skids de pompage"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <div className="inline-block">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                      {dict?.solutions?.skids?.title || "Skids de pompage"}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-white to-cyan-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accordion */}
            <div className="space-y-4">
              {skidsData.map((skid, index) => (
                <Card
                  key={index}
                  className="border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="text-xl font-bold text-[#085C91] pr-4">
                      {skid.title}
                    </h3>
                    <div className="flex-shrink-0">
                      {openAccordion === index ? (
                        <ChevronUp className="w-6 h-6 text-[#085C91]" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-[#085C91]" />
                      )}
                    </div>
                  </button>
                  
                  {openAccordion === index && (
                    <div className="px-8 pb-8 border-t border-gray-100">
                      <div className="pt-6">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {skid.content}
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Assistance technique et maintenance Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-slate-100/40 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-1">
                <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <img
                    src="/images/Assistance-technique-et-maintenance-min-1.jpg"
                    alt="Assistance technique et maintenance"
                    className="w-full h-96 object-cover"
                  />
                </div>
              </div>
              <div className="order-2">
                <div className="text-center lg:text-left">
                  <div className="inline-block">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#085C91] to-gray-900 bg-clip-text text-transparent mb-4">
                      {dict?.solutions?.technicalAssistance?.title || "Assistance technique et maintenance"}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#085C91] to-cyan-500 mx-auto lg:mx-0 mb-6 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {dict?.solutions?.technicalAssistance?.description || "SOFIMED propose à ses clients différents programmes d'assistance technique téléphonique, d'entretien correctif, préventive, des contrôles périodiques des équipements et assurent tous les dépannages sur site, une révision en atelier ou contrat d'entretien."}
                  </p>
                  
                  {/* Features list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {(dict?.solutions?.technicalAssistance?.features || [
                      "Assistance téléphonique 24/7",
                      "Maintenance préventive et corrective",
                      "Contrôles périodiques",
                      "Dépannages sur site"
                    ]).map((feature, index) => (
                      <div key={index} className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300">
                        <CheckCircle className="w-5 h-5 text-[#085C91] mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management de projet Section */}
      <section className="py-20 bg-gradient-to-br from-white to-slate-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-slate-100/40 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="text-center lg:text-left">
                  <div className="inline-block">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#085C91] to-gray-900 bg-clip-text text-transparent mb-4">
                      {dict?.solutions?.projectManagement?.title || "Management de projet"}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#085C91] to-cyan-500 mx-auto lg:mx-0 mb-6 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {dict?.solutions?.projectManagement?.description || "Une équipe d'experts en Mécanique des fluides, Étude électrique, Automatisme, Instrumentation, Étude de structure et tuyauterie développent les supports de formation pour nos équipes internes et clients."}
                  </p>
                  
                  {/* Features list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {(dict?.solutions?.projectManagement?.features || [
                      "Mécanique des fluides",
                      "Étude électrique",
                      "Automatisme et instrumentation",
                      "Étude de structure et tuyauterie"
                    ]).map((feature, index) => (
                      <div key={index} className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300">
                        <CheckCircle className="w-5 h-5 text-[#085C91] mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <img
                    src="/images/Management-de-projet.jpg"
                    alt="Management de projet"
                    className="w-full h-96 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}