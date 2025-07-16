import { getDictionary } from '../dictionaries'
import ServicesClient from './components/ServiceClient'
import CTASection from '@/components/cta-section'

interface ServicesPageProps {
  params: {
    locale: string
  }
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const dict = await getDictionary(params.locale)
  
  return (
    <>
    <ServicesClient dict={dict} locale={params.locale}/>
         <CTASection dict={dict} locale={params.locale} />
    </>
  )
}