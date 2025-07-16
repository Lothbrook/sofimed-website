'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award, Globe, CheckCircle, Clock, Settings, Shield, X } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from "react"

interface AProposContentProps {
  dict: any;
  locale: string;
}

export default function AProposContent({ dict, locale }: AProposContentProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const stats = [
    { icon: Users, label: dict.about.stats.satisfiedClients, value: "500+" },
    { icon: Award, label: dict.about.stats.yearsExperience, value: "15+" },
    { icon: Globe, label: dict.about.stats.partners, value: "50+" },
    { icon: Target, label: dict.about.stats.completedProjects, value: "1000+" },
  ]

  const values = [
    {
      title: dict.about.values.excellence.title,
      description: dict.about.values.excellence.description,
    },
    {
      title: dict.about.values.innovation.title,
      description: dict.about.values.innovation.description,
    },
    {
      title: dict.about.values.partnership.title,
      description: dict.about.values.partnership.description,
    },
    {
      title: dict.about.values.responsibility.title,
      description: dict.about.values.responsibility.description,
    },
  ]

  const whyChooseUs = [
    {
      icon: Settings,
      title: dict.about.whyChooseUs.personalizedSupport.title,
      description: dict.about.whyChooseUs.personalizedSupport.description
    },
    {
      icon: CheckCircle,
      title: dict.about.whyChooseUs.reactivity.title,
      description: dict.about.whyChooseUs.reactivity.description
    },
    {
      icon: Shield,
      title: dict.about.whyChooseUs.guaranteedQuality.title,
      description: dict.about.whyChooseUs.guaranteedQuality.description
    },
    {
      icon: Clock,
      title: dict.about.whyChooseUs.optimizedDeadlines.title,
      description: dict.about.whyChooseUs.optimizedDeadlines.description
    }
  ]

  const partners = [
    "/images/hertz-scaled.jpg",
    "/images/metal-work-scaled.jpg",
    "/images/ukp-scaled.jpg",
    "/images/hertz-scaled.jpg",
    "/images/metal-work-scaled.jpg",
    "/images/ukp-scaled.jpg"
  ]

  const valuesData = [
    dict.about.whyWorkWithUs.values.excellence,
    dict.about.whyWorkWithUs.values.teamwork,
    dict.about.whyWorkWithUs.values.respect,
    dict.about.whyWorkWithUs.values.openness,
    dict.about.whyWorkWithUs.values.responsibility
  ]

  return (
    <>
      {/* Hero Section */}
      <section 
        className="min-h-[50vh] relative flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/banner-apropos.jpg')",
          backgroundSize: "cover",
          
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{dict.about.title}</h1>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#085C91] via-[#0a6ba8] to-cyan-600 bg-clip-text text-transparent mb-6">
              {dict.about.ourHistory.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#085C91] to-cyan-500 mx-auto rounded-full"></div>
          </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image avec bouton vidéo */}
              <div className="relative">
                <img 
                  src="/images/banner-apropos.jpg" 
                  alt="Sofimed-store" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                {/* Bouton play pour la vidéo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={() => setIsVideoModalOpen(true)}
                    className="bg-white/90 hover:bg-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-8 h-8 text-[#085C91] ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Contenu texte */}
              <div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {dict.about.ourHistory.description}
                </p>
                <button className="bg-[#085C91] hover:bg-[#064a73] text-white px-6 py-3 rounded-lg transition-colors duration-300">
                  {dict.about.ourHistory.discoverButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Vidéo YouTube */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton fermer */}
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            {/* Iframe YouTube */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/G643sjhAeRQ?autoplay=1&rel=0&modestbranding=1"
              title={dict.about.ourHistory.videoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Pourquoi travailler avec nous */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Éléments décoratifs de fond */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#085C91]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#085C91] via-[#0a6ba8] to-cyan-600 bg-clip-text text-transparent mb-6">
              {dict.about.whyWorkWithUs.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#085C91] to-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Notre organisation */}
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:border-[#085C91]/20 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#085C91] to-cyan-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#085C91] group-hover:text-cyan-600 transition-colors duration-300">{dict.about.whyWorkWithUs.organization.title}</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    {dict.about.whyWorkWithUs.organization.description1}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {dict.about.whyWorkWithUs.organization.description2}
                  </p>
                </div>
              </div>
            </div>

            {/* Notre mission */}
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:border-[#085C91]/20 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#085C91] to-cyan-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#085C91] group-hover:text-cyan-600 transition-colors duration-300">{dict.about.whyWorkWithUs.mission.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {dict.about.whyWorkWithUs.mission.description}
                </p>
              </div>
            </div>

            {/* Notre vision */}
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:border-[#085C91]/20 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#085C91] to-cyan-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#085C91] group-hover:text-cyan-600 transition-colors duration-300">{dict.about.whyWorkWithUs.vision.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {dict.about.whyWorkWithUs.vision.description}
                </p>
              </div>
            </div>

            {/* Nos valeurs */}
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:border-[#085C91]/20 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#085C91] to-cyan-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#085C91] group-hover:text-cyan-600 transition-colors duration-300">{dict.about.whyWorkWithUs.values.title}</h3>
                </div>
                <div className="space-y-3">
                  {valuesData.map((value, index) => (
                    <div key={index} className="flex items-center group/item">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#085C91] to-cyan-500 rounded-full mr-3 group-hover/item:scale-125 transition-transform duration-200"></div>
                      <p className="text-gray-600 group-hover/item:text-[#085C91] transition-colors duration-200">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos services & solutions */}
      <section 
        className="py-20 relative"
        style={{
          backgroundImage: "url('/images/services-cle-en-mains-min.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#085C91]/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{dict.about.servicesAndSolutions.title}</h2>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              {dict.about.servicesAndSolutions.description}
            </p>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
              {dict.about.servicesAndSolutions.learnMore}
            </button>
          </div>
        </div>
      </section>

      {/* Nos avantages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#085C91] via-[#0a6ba8] to-cyan-600 bg-clip-text text-transparent mb-6">
                {dict.about.advantages.title}
              </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#085C91] to-cyan-500 mx-auto rounded-full"></div>
          </div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              {dict.about.advantages.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#085C91]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#085C91]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{dict.about.advantages.costReduction.title}</h3>
              <p className="text-gray-600 text-sm">{dict.about.advantages.costReduction.description}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#085C91]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#085C91]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{dict.about.advantages.timeGain.title}</h3>
              <p className="text-gray-600 text-sm">{dict.about.advantages.timeGain.description}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#085C91]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#085C91]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{dict.about.advantages.advancedManagement.title}</h3>
              <p className="text-gray-600 text-sm">{dict.about.advantages.advancedManagement.description}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#085C91]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#085C91]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{dict.about.advantages.pricingGrid.title}</h3>
              <p className="text-gray-600 text-sm">{dict.about.advantages.pricingGrid.description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}