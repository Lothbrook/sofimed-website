import CTASection from '@/components/cta-section'
import { getDictionary } from '../dictionaries'
import SolutionsClient from './componenets/SolutionClient'


interface SolutionsPageProps {
  params: {
    locale: string
  }
}

export default async function SolutionsPage({ params }: SolutionsPageProps) {
  const dict = await getDictionary(params.locale)
  
  return( 
  <>
  <SolutionsClient dict={dict} locale={params.locale} />
  <CTASection dict={dict} locale={params.locale}/>
  </>
  )
}