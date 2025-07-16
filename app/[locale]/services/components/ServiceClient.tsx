'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wrench, Settings, Users, Phone, CheckCircle, ArrowRight, PenTool, Cog, MessageCircle, MapPin, Monitor, Truck, Handshake, Hammer, UserCheck, GraduationCap } from "lucide-react"

interface ServicesClientProps {
  dict: any
  locale: string
}

export default function ServicesClient({ dict, locale }: ServicesClientProps) {
  const services = [
    {
      icon: Users,
      title: dict?.services?.customerRelations?.title || "Centre de relation clients",
      description: dict?.services?.customerRelations?.description || "Au fil des années, l'équipe SOFIMED s'est forgée une solide expérience dans la distribution de matériel médical et dans la maintenance des équipements médicaux.",
      features: dict?.services?.customerRelations?.features || ["Maintenance préventive", "Dépannage d'urgence", "Pièces de rechange", "Contrats de maintenance"],
      color: "bg-[#085C91]",
    },
    {
      icon: Settings,
      title: dict?.services?.technicalSupport?.title || "Support technique S.A.V",
      description: dict?.services?.technicalSupport?.description || "Nous avons établi des partenariats techniques avec plusieurs fabricants d'équipements médicaux et nous avons acquis une expertise dans la maintenance.",
      features: dict?.services?.technicalSupport?.features || ["Support technique 24/7", "Maintenance préventive", "Réparation sur site", "Gestion des pièces de rechange"],
      color: "bg-[#085C91]",
    },
    {
      icon: Users,
      title: dict?.services?.professionalTraining?.title || "Formation professionnelle",
      description: dict?.services?.professionalTraining?.description || "Une équipe de professionnels vous forme sur l'utilisation de vos équipements médicaux pour une meilleure prise en main et une utilisation optimale.",
      features: dict?.services?.professionalTraining?.features || ["Formation sur site", "Documentation technique", "Support continu", "Certification"],
      color: "bg-[#085C91]",
    },
    {
      icon: PenTool,
      title: dict?.services?.designModeling?.title || "Conception & modélisations des plans",
      description: dict?.services?.designModeling?.description || "Nous offrons des services de conception et de modélisation 3D pour vos projets industriels, avec une expertise technique avancée.",
      features: dict?.services?.designModeling?.features || ["Modélisation 3D", "Plans techniques détaillés", "Conception sur mesure", "Validation des designs"],
      color: "bg-[#085C91]",
    },
    {
      icon: Cog,
      title: dict?.services?.designEngineering?.title || "Ingénierie de conception",
      description: dict?.services?.designEngineering?.description || "Notre équipe d'ingénieurs vous accompagne dans la conception et le développement de solutions techniques innovantes adaptées à vos besoins.",
      features: dict?.services?.designEngineering?.features || ["Études de faisabilité", "Conception technique", "Optimisation des processus", "Accompagnement projet"],
      color: "bg-[#085C91]",
    },
  ]

  const completeOffers = [
    {
      icon: MessageCircle,
      title: dict?.services?.completeOffers?.consulting?.title || "Conseil",
      description: dict?.services?.completeOffers?.consulting?.description || "Notre personnel back-office hautement qualifié et formé à vos métiers vous conseille sur le choix des équipements et composants dont vous avez besoin.",
      color: "bg-green-500",
    },
    {
      icon: MapPin,
      title: dict?.services?.completeOffers?.proximityService?.title || "Service de proximité",
      description: dict?.services?.completeOffers?.proximityService?.description || "Notre équipe de vente itinérante d'ingénieurs technico-commerciaux est à votre disposition tous les jours pour vous aider à faire le meilleur choix de produits à vos besoins.",
      color: "bg-yellow-500",
    },
    {
      icon: Monitor,
      title: dict?.services?.completeOffers?.design3D?.title || "Conception plan 3D",
      description: dict?.services?.completeOffers?.design3D?.description || "Ce service permet une visualisation immédiate d'implantation et d'accès au matériel. L'espace est mieux géré, le montage optimisé.",
      color: "bg-blue-500",
    },
    {
      icon: Truck,
      title: dict?.services?.completeOffers?.logistics?.title || "Logistique",
      description: dict?.services?.completeOffers?.logistics?.description || "Un stock important sur la plate-forme logistique centrale à Casablanca quartier industriel et point de vente sur Casa et Tanger pour une livraison rapide en partenariat avec des compagnies de transport national et international.",
      color: "bg-orange-500",
    },
    {
      icon: Handshake,
      title: dict?.services?.completeOffers?.qualityCommitment?.title || "Engagement qualité",
      description: dict?.services?.completeOffers?.qualityCommitment?.description || "Notre engagement Qualité permet une adéquation complète de nos produits et services aux besoins clients. SOFIMED est certifiée ISO 9001/ ISO 14001/OHSAS 18001 et bien d'autres certificats spécifiques ATEX...",
      color: "bg-purple-500",
    },
    {
      icon: Cog,
      title: dict?.services?.completeOffers?.engineeringService?.title || "Service d'ingénierie",
      description: dict?.services?.completeOffers?.engineeringService?.description || "Ce service réalise des études d'avant-projets afin de vérifier la faisabilité puis définir les solutions les plus adaptées à vos besoins en prenant en considération vos contraintes, budget et de planning.",
      color: "bg-red-500",
    },
    {
      icon: Hammer,
      title: dict?.services?.completeOffers?.maintenance?.title || "Maintenance & préparation",
      description: dict?.services?.completeOffers?.maintenance?.description || "SOFIMED vous propose toutes opérations de maintenance et réparation sur ses produits en atelier ou dans vos locaux.",
      color: "bg-orange-600",
    },
    {
      icon: UserCheck,
      title: dict?.services?.completeOffers?.commissioning?.title || "Mise en services",
      description: dict?.services?.completeOffers?.commissioning?.description || "Une équipe de techniciens est à votre disposition pour une assistance à l'installation, à la mise en service, à la réparation mais aussi pour l'optimisation.",
      color: "bg-cyan-500",
    },
    {
      icon: GraduationCap,
      title: dict?.services?.completeOffers?.training?.title || "Formation",
      description: dict?.services?.completeOffers?.training?.description || "SOFIMED réalise des formations produits d'entretien des équipements et installations sur site ou dans nos locaux.",
      color: "bg-purple-600",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="min-h-[50vh] relative flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/banner-services.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {dict?.services?.hero?.title || "Services"}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              {dict?.services?.hero?.subtitle || "Obtenir des informations et des compétences pour améliorer vos opérations"}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-7xl mx-auto mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              {dict?.services?.intro || "Chez le groupe SOFIMED, nous avons une large gamme de services adaptés à vos besoins industriels offrant la plus haute qualité, attention et fiabilité. Notre équipe de chefs de produits et de fournisseurs associés innove en permanence, offrant une valeur constante à nos clients et contribuant à améliorer leur productivité."}
            </p>
          </div>
          
          {/* First 3 services */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {services.slice(0, 3).map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">{service.title}</CardTitle>
                  <p className="text-gray-600">{service.description}</p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 mb-6 flex-1">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-[#085C91] hover:bg-[#064a73] transition-colors">
                    {dict?.services?.learnMore || "En savoir plus"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* New 2 services */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.slice(3, 5).map((service, index) => (
              <Card key={index + 3} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">{service.title}</CardTitle>
                  <p className="text-gray-600">{service.description}</p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 mb-6 flex-1">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-[#085C91] hover:bg-[#064a73] transition-colors">
                    {dict?.services?.learnMore || "En savoir plus"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Notre offre complète Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#085C91] via-[#0a6ba8] to-cyan-600 bg-clip-text text-transparent mb-6">
                {dict?.services?.completeOffer?.title || "Notre offre complète"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#085C91] to-cyan-500 mx-auto rounded-full"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              {dict?.services?.completeOffer?.description || "Chez le groupe SOFIMED, nous avons une large gamme de services adaptés à vos besoins industriels offrant la plus haute qualité, attention et fiabilité. Notre équipe de chefs de produits et de fournisseurs associés innove en permanence, offrant une valeur constante à nos clients et contribuant à améliorer leur productivité."}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {completeOffers.map((offer, index) => (
              <Card key={index} className="border border-gray-200 hover:border-[#085C91] transition-all duration-300 hover:shadow-lg bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-[#085C91] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <offer.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-[#085C91] mb-3">
                    {offer.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed text-center">
                    {offer.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}