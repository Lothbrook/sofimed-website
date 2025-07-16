import Header from "@/components/header"
import Footer from "@/components/footer"
import CTASection from "@/components/cta-section"
import CarriereContent from "./componenets/carriere-content"
import { getDictionary } from '../dictionaries'

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function CarrierePage({ params: { locale } }: PageProps) {
  const dict = await getDictionary(locale)
  console.log(dict)
  return (
    <div className="min-h-screen">
      {/* <Header dict={dict} locale={locale} /> */}
      <CarriereContent dict={dict} locale={locale} />
      {/* <CTASection dict={dict} locale={locale} /> */}
      {/* <Footer dict={dict} locale={locale} /> */}
    </div>
  )
}

// export default async function CarriereContent({ params: { locale } }: PageProps) {
//   //@ts-expect-error
//   const dict = await getDictionary(locale)

//   return (
//     <div className="min-h-screen">
//       {/* <Header dict={dict} locale={locale} /> */}
//       <CarriereContent dict={dict} locale={locale} />
//       {/* <CTASection dict={dict} locale={locale} /> */}
//       <Footer dict={dict} locale={locale} />
//     </div>
//   )
// }
