'use client'

import Header from "@/components/header"
import Footer from "@/components/footer"
import CTASection from "@/components/cta-section"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users, Briefcase, GraduationCap, Heart, Send } from "lucide-react"

interface CarriereContentProps {
  dict: any
  locale: string
}

export default function CarriereContent({ dict, locale }: CarriereContentProps) {
  const benefits = [
    {
      icon: GraduationCap,
      title: dict.carriere.benefits.training.title,
      description: dict.carriere.benefits.training.description,
    },
    {
      icon: Heart,
      title: dict.carriere.benefits.workLife.title,
      description: dict.carriere.benefits.workLife.description,
    },
    {
      icon: Users,
      title: dict.carriere.benefits.teamSpirit.title,
      description: dict.carriere.benefits.teamSpirit.description,
    },
    {
      icon: Briefcase,
      title: dict.carriere.benefits.careerGrowth.title,
      description: dict.carriere.benefits.careerGrowth.description,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[60vh] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/Carriere-sofimed-min.jpg')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {dict.carriere.hero.title}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              {dict.carriere.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
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
                {dict.carriere.whyJoin.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#085C91] to-cyan-500 mx-auto mb-6 rounded-full"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {dict.carriere.whyJoin.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 relative overflow-hidden rounded-2xl flex flex-col"
              >
                <CardContent className="p-8 flex flex-col h-full relative z-10">
                  <div className="flex flex-col items-center mb-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#085C91] p-4 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#085C91] transition-colors duration-300">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-center leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 bg-gradient-to-br from-white to-slate-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-slate-100/40 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#085C91] to-gray-900 bg-clip-text text-transparent mb-4">
                  {dict.carriere.culture.title}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#085C91] to-cyan-500 mx-auto mb-6 rounded-full"></div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  {dict.carriere.culture.environment.title}
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {dict.carriere.culture.environment.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  {dict.carriere.culture.environment.features.map((item: string, index: number) => (
                    <div key={index} className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300">
                      <div className="w-3 h-3 bg-[#085C91] rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="p-4">
                    <div className="text-4xl font-bold text-[#085C91] mb-2">{dict.carriere.culture.stats.employees}</div>
                    <div className="text-gray-600 font-medium">{dict.carriere.culture.stats.employeesLabel}</div>
                  </div>
                  <div className="p-4">
                    <div className="text-4xl font-bold text-[#085C91] mb-2">{dict.carriere.culture.stats.experience}</div>
                    <div className="text-gray-600 font-medium">{dict.carriere.culture.stats.experienceLabel}</div>
                  </div>
                  <div className="p-4">
                    <div className="text-4xl font-bold text-[#085C91] mb-2">{dict.carriere.culture.stats.satisfaction}</div>
                    <div className="text-gray-600 font-medium">{dict.carriere.culture.stats.satisfactionLabel}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Candidature Spontanée */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-slate-100/40 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#085C91] to-gray-900 bg-clip-text text-transparent mb-4">
                  {dict.carriere.application.title}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#085C91] to-cyan-500 mx-auto mb-6 rounded-full"></div>
              </div>
            </div>

            <Card className="border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-[#085C91] rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <Send className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  {dict.carriere.application.question}
                </h3>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                  {dict.carriere.application.description}
                </p>
                
                <div className="space-y-4 mb-8">
                  {dict.carriere.application.requirements.map((requirement: string, index: number) => (
                    <div key={index} className="flex items-center justify-center text-gray-600">
                      <div className="w-2 h-2 bg-[#085C91] rounded-full mr-3"></div>
                      <span>{requirement}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  size="lg" 
                  className="bg-[#085C91] hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <a href="mailto:rh@sofimedmaroc.com">
                    {dict.carriere.application.button}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  )
}