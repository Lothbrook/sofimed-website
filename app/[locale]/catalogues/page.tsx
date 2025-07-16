import Header from "@/components/header"
import Footer from "@/components/footer"
import CTASection from "@/components/cta-section"
import CataloguesContent from "./components/catalogues-content"
import { getDictionary } from '../dictionaries'

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function AProposPage({ params: { locale } }: PageProps) {
  //@ts-expect-error
  const dict = await getDictionary(locale)

  return (
    <div className="min-h-screen">
      {/* <Header dict={dict} locale={locale} /> */}
      <CataloguesContent dict={dict} locale={locale} />
      <CTASection dict={dict} locale={locale} />
      <Footer dict={dict} locale={locale} />
    </div>
  )
}
