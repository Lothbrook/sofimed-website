import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import BusinessUnits from "@/components/business-units"
import Footer from "@/components/footer"
// Ajouter les imports pour les nouvelles sections
import ServicesSection from "@/components/services-section"
import SolutionsSection from "@/components/solutions-section"
import WhyChooseUs from "@/components/why-choose-us"
import CTASection from "@/components/cta-section"
import { getDictionary } from "./dictionaries"

// Ajouter les nouvelles sections après BusinessUnits et avant Footer
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "fr" | "en")
  return (
    <div className="min-h-screen">
      <HeroSection dict={dict} />
      <BusinessUnits dict={dict} />
      <ServicesSection dict={dict} locale={locale} />
      <SolutionsSection dict={dict} locale={locale} />
      <WhyChooseUs dict={dict} />
      <CTASection dict={dict} locale={locale} />
      {/* <Footer /> */}
    </div>
  )
}
