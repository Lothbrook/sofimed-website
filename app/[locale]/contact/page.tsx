import { getDictionary } from '../dictionaries'
import ContactClient from './components/ContactClient'

interface ContactPageProps {
  params: { locale: string }
}

export default async function ContactPage({ params }: ContactPageProps) {
  const dict = await getDictionary(params.locale)
  
  return (
    <ContactClient dict={dict} locale={params.locale} />
  )
}