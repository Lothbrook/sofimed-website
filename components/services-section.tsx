import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wrench, Settings, Users, Phone, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

interface ServicesSectionProps {
  dict: any;
  locale: string;
}

export default function ServicesSection({ dict, locale }: ServicesSectionProps) {
  const services = [
    {
      icon: Wrench,
      title: dict.services.maintenance.title,
      description: dict.services.maintenance.description,
      features: [
        dict.services.maintenance.features.preventive,
        dict.services.maintenance.features.emergency,
        dict.services.maintenance.features.spareParts
      ],
      color: "#085C91",
    },
    {
      icon: Settings,
      title: dict.services.installation.title,
      description: dict.services.installation.description,
      features: [
        dict.services.installation.features.complete,
        dict.services.installation.features.commissioning,
        dict.services.installation.features.training
      ],
      color: "#085C91",
    },
    {
      icon: Users,
      title: dict.services.consulting.title,
      description: dict.services.consulting.description,
      features: [
        dict.services.consulting.features.audit,
        dict.services.consulting.features.recommendations,
        dict.services.consulting.features.optimization
      ],
      color: "#085C91",
    },
    {
      icon: Phone,
      title: dict.services.support.title,
      description: dict.services.support.description,
      features: [
        dict.services.support.features.hotline,
        dict.services.support.features.remote,
        dict.services.support.features.documentation
      ],
      color: "#085C91",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-slate-100/40 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#085C91] to-gray-900 bg-clip-text text-transparent mb-4">
              {dict.services.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#085C91] to-cyan-500 mx-auto mb-6 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {dict.services.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 relative overflow-hidden rounded-2xl flex flex-col"
            >
              <CardContent className="p-8 flex flex-col h-full relative z-10">
                <div className="flex flex-col items-center mb-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#085C91] p-4 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#085C91] transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-6 text-center leading-relaxed text-sm">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8 flex-grow">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      <CheckCircle className="w-4 h-4 text-[#085C91] mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <Link 
                    href={`/${locale}/services`}
                    className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-[#085C91] bg-transparent border-2 border-[#085C91] rounded-xl"
                  >
                    <span className="flex items-center">
                      {dict.services.learnMore}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto shadow-xl border border-slate-200/50 backdrop-blur-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 relative z-10">
              <div className="text-left flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {dict.services.cta.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {dict.services.cta.description}
                </p>
              </div>
              <div className="flex flex-row gap-4 flex-shrink-0">
                <Button 
                  size="lg" 
                  className="bg-[#085C91] hover:bg-[#064a7a] text-white whitespace-nowrap px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl" 
                  asChild
                >
                  <Link href={`/${locale}/services`}>
                    {dict.services.cta.servicesButton}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#085C91] text-[#085C91] hover:bg-[#085C91] hover:text-white whitespace-nowrap px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl"
                  asChild
                >
                  <Link href={`/${locale}/contact`}>{dict.services.cta.quoteButton}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
