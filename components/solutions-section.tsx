import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Settings, Wrench, ClipboardList, ArrowRight } from "lucide-react"
import Link from "next/link"

interface SolutionsSectionProps {
  dict: any;
  locale: string;
}

export default function SolutionsSection({ dict, locale }: SolutionsSectionProps) {
  const solutions = [
    {
      icon: Settings,
      title: dict.solutions.automation.title,
      description: dict.solutions.automation.description,
      link: dict.solutions.learnMore,
      image: "service-1.jpg",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Wrench,
      title: dict.solutions.maintenance.title,
      description: dict.solutions.maintenance.description,
      link: dict.solutions.learnMore,
      image: "service-2.jpg",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: ClipboardList,
      title: dict.solutions.projectManagement.title,
      description: dict.solutions.projectManagement.description,
      link: dict.solutions.learnMore,
      image: "service-3.jpg",
      gradient: "from-purple-500 to-indigo-500"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Éléments décoratifs de fond */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-cyan-100/30 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#085C91] to-gray-900 bg-clip-text text-transparent mb-4">
            {dict.solutions.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#085C91] to-cyan-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {dict.solutions.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100/50 flex flex-col"
              >
                {/* Image avec overlay gradient */}
                <div className="relative aspect-w-16 aspect-h-9 bg-gray-200 overflow-hidden">
                  <img
                    src={`/images/${solution.image}`}
                    alt={solution.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${solution.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  {/* Icône flottante */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <IconComponent className="w-6 h-6 text-[#085C91]" />
                  </div>
                </div>
                
                <div className="p-6 relative flex flex-col flex-grow">
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#085C91] transition-colors duration-300">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-4 flex-grow">{solution.description}</p>
                  
                  <div className="mt-auto">
                    <Link 
                      href={`/${locale}/solutions`}
                      className="inline-flex items-center text-[#085C91] hover:text-white font-medium group/link relative overflow-hidden px-4 py-2 rounded-lg border-2 border-[#085C91] hover:border-[#085C91] transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center">
                        {solution.link}
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-[#085C91] transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
