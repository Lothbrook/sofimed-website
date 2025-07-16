'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send, Printer, Building2, Store, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface ContactClientProps {
  dict: any
  locale: string
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
}

export default function ContactClient({ dict, locale }: ContactClientProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation côté client
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Veuillez entrer une adresse email valide')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        toast.success('Message envoyé avec succès! Nous vous répondrons dans les plus brefs délais.')
        // Réinitialiser le formulaire
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        })
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Erreur lors de l\'envoi du message')
      }
    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Erreur de connexion. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: dict?.contact?.address?.title || "Adresse",
      details: [
        dict?.contact?.address?.street || "137, Boulevard Moulay Ismaïl - Roches Noires 20290", 
        dict?.contact?.address?.city || "Casablanca - Maroc"
      ],
      color: "bg-[#085C91]",
    },
    {
      icon: Phone,
      title: dict?.contact?.phone?.title || "Téléphone",
      details: ["+212 522 240 100"],
      color: "bg-[#085C91]",
    },
    {
      icon: Mail,
      title: dict?.contact?.email?.title || "Email",
      details: ["contact@sofimedmaroc.com"],
      color: "bg-[#085C91]",
    },
    {
      icon: Clock,
      title: dict?.contact?.hours?.title || "Horaires",
      details: [dict?.contact?.hours?.schedule || "Lun - Ven: 8h00 - 18h00"],
      color: "bg-[#085C91]",
    },
  ]

  const offices = [
    {
      id: "headquarters",
      city: dict?.contact?.offices?.headquarters?.title || "Siège Social",
      address: dict?.contact?.offices?.headquarters?.address || "137, Boulevard Moulay Ismaïl - Roches Noires 20290",
      phone: "+212 522 240 101",
      fax: "+212 522 240 100",
      email: "contact@sofimedmaroc.com",
      coordinates: { lat: 33.598591, lng: -7.582789 },
      icon: Building2,
      color: "text-red-600"
    },
    {
      id: "store",
      city: dict?.contact?.offices?.store?.title || "Magasin",
      address: dict?.contact?.offices?.store?.address || "47 rue du Boured (roches noires) – Casablanca – Maroc",
      phone: "+212 522 240 101",
      fax: "+212 522 240 100",
      email: "contact@sofimedmaroc.com",
      coordinates: { lat: 33.59845694286828, lng: -7.5851983692821365 },
      icon: Store,
      color: "text-blue-600"
    },
  ]

  // URLs Google Maps
  const headquartersMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.2695690313467!2d-7.58653947372272!3d33.598309491562034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd0d83b187ff%3A0x8b243f27468636b4!2sSofimed%20Maroc!5e0!3m2!1sfr!2sma!4v1751985215254!5m2!1sfr!2sma"
  const simpleMapUrl = headquartersMapUrl

  const faqData = [
    {
      question: dict?.contact?.faq?.delivery?.question || "Quels sont vos délais de livraison ?",
      answer: dict?.contact?.faq?.delivery?.answer || "Nos délais de livraison varient selon les produits et votre localisation. En général, comptez 2-5 jours ouvrables pour les produits en stock.",
    },
    {
      question: dict?.contact?.faq?.maintenance?.question || "Proposez-vous des services de maintenance ?",
      answer: dict?.contact?.faq?.maintenance?.answer || "Oui, nous proposons des contrats de maintenance préventive et corrective pour tous nos équipements.",
    },
    {
      question: dict?.contact?.faq?.quote?.question || "Comment obtenir un devis personnalisé ?",
      answer: dict?.contact?.faq?.quote?.answer || "Vous pouvez nous contacter via ce formulaire, par téléphone ou email. Nous vous répondrons sous 24h avec un devis détaillé.",
    },
    {
      question: dict?.contact?.faq?.individuals?.question || "Travaillez-vous avec les particuliers ?",
      answer: dict?.contact?.faq?.individuals?.answer || "SOFIMED se concentre principalement sur le marché B2B, mais nous pouvons étudier certaines demandes de particuliers au cas par cas.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="min-h-[70vh] relative flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/Sofimed-contact-min.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {dict?.contact?.hero?.title || "Contactez-Nous"}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              {dict?.contact?.hero?.subtitle || "Notre équipe est à votre disposition pour répondre à toutes vos questions"}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
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
                {dict?.contact?.info?.title || "Nos Coordonnées"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#085C91] to-cyan-500 mx-auto mb-6 rounded-full"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 relative overflow-hidden rounded-2xl flex flex-col">
                <CardContent className="p-8 flex flex-col h-full relative z-10">
                  <div className="flex flex-col items-center mb-6 text-center">
                    <div className={`w-16 h-16 rounded-2xl ${info.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#085C91] transition-colors duration-300">
                      {info.title}
                    </h3>
                  </div>
                  <div className="space-y-2 text-center">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-600 text-sm leading-relaxed">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gradient-to-br from-white to-slate-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-slate-100/40 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden">
              <CardHeader className="p-8">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-[#085C91] to-gray-900 bg-clip-text text-transparent">
                  {dict?.contact?.form?.title || "Envoyez-nous un message"}
                </CardTitle>
                <p className="text-gray-600 text-lg">
                  {dict?.contact?.form?.subtitle || "Remplissez le formulaire ci-dessous et nous vous répondrons rapidement"}
                </p>
              </CardHeader>
              <CardContent className="space-y-6 p-8 pt-0">
                {isSubmitted && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 font-medium">Message envoyé avec succès!</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {dict?.contact?.form?.firstName || "Prénom"} *
                      </label>
                      <Input 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder={dict?.contact?.form?.firstNamePlaceholder || "Votre prénom"} 
                        className="border-gray-200 focus:border-[#085C91] focus:ring-[#085C91]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {dict?.contact?.form?.lastName || "Nom"} *
                      </label>
                      <Input 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder={dict?.contact?.form?.lastNamePlaceholder || "Votre nom"} 
                        className="border-gray-200 focus:border-[#085C91] focus:ring-[#085C91]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {dict?.contact?.form?.email || "Email"} *
                    </label>
                    <Input 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={dict?.contact?.form?.emailPlaceholder || "votre.email@exemple.com"} 
                      className="border-gray-200 focus:border-[#085C91] focus:ring-[#085C91]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {dict?.contact?.form?.phone || "Téléphone"}
                    </label>
                    <Input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={dict?.contact?.form?.phonePlaceholder || "+212 6XX XX XX XX"} 
                      className="border-gray-200 focus:border-[#085C91] focus:ring-[#085C91]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {dict?.contact?.form?.company || "Entreprise"}
                    </label>
                    <Input 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={dict?.contact?.form?.companyPlaceholder || "Nom de votre entreprise"} 
                      className="border-gray-200 focus:border-[#085C91] focus:ring-[#085C91]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {dict?.contact?.form?.subject || "Sujet"} *
                    </label>
                    <Input 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={dict?.contact?.form?.subjectPlaceholder || "Objet de votre message"} 
                      className="border-gray-200 focus:border-[#085C91] focus:ring-[#085C91]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {dict?.contact?.form?.message || "Message"} *
                    </label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={dict?.contact?.form?.messagePlaceholder || "Décrivez votre demande en détail..."} 
                      rows={6} 
                      className="border-gray-200 focus:border-[#085C91] focus:ring-[#085C91]"
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#085C91] hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {dict?.contact?.form?.submit || "Envoyer le message"}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map & Offices */}
            <div className="space-y-8">
              {/* Interactive Map */}
              <Card className="border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 via-[#085C91] to-gray-900 bg-clip-text text-transparent flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-[#085C91]" />
                    {dict?.contact?.map?.title || "Nos Localisations"}
                  </CardTitle>
                  
                  {/* Map Legend */}
                  <div className="flex flex-wrap gap-4 mt-4">
                    {offices.map((office) => (
                      <div key={office.id} className="flex items-center space-x-2 text-sm">
                        <office.icon className={`w-4 h-4 ${office.color}`} />
                        <span className="text-gray-600">{office.city}</span>
                      </div>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Google Maps Embed */}
                  <div className="relative h-80 w-full">
                    <iframe
                      src={simpleMapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-b-2xl"
                      title="Localisation SOFIMED"
                    ></iframe>
                    
                    {/* Custom Overlay with Location Markers */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                      <div className="space-y-2">
                        {offices.map((office) => (
                          <div key={office.id} className="flex items-center space-x-2 text-xs">
                            <div className={`w-3 h-3 rounded-full ${office.id === 'headquarters' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                            <span className="font-medium text-gray-700">{office.city}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Offices Details */}
              <Card className="border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden">
                <CardHeader className="p-8">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-[#085C91] to-gray-900 bg-clip-text text-transparent">
                    {dict?.contact?.offices?.title || "Nos Bureaux"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-8 pt-0">
                  {offices.map((office, index) => (
                    <div key={index} className="border-l-4 border-[#085C91] pl-6 py-4 bg-gradient-to-r from-blue-50/50 to-transparent rounded-r-lg hover:from-blue-50 transition-colors duration-300 group">
                      <div className="flex items-center mb-3">
                        <office.icon className={`w-5 h-5 mr-2 ${office.color}`} />
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#085C91] transition-colors duration-300">{office.city}</h3>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p className="flex items-center">
                          <MapPin className="w-4 h-4 mr-3 text-[#085C91]" />
                          {office.address}
                        </p>
                        <p className="flex items-center">
                          <Phone className="w-4 h-4 mr-3 text-[#085C91]" />
                          {office.phone}
                        </p>
                        <p className="flex items-center">
                          <Printer className="w-4 h-4 mr-3 text-[#085C91]" />
                          {office.fax}
                        </p>
                        <p className="flex items-center">
                          <Mail className="w-4 h-4 mr-3 text-[#085C91]" />
                          {office.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
                {dict?.contact?.faq?.title || "Questions Fréquentes"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#085C91] to-cyan-500 mx-auto mb-6 rounded-full"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {dict?.contact?.faq?.subtitle || "Trouvez rapidement les réponses à vos questions"}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqData.map((faq, index) => (
              <Card key={index} className="border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-1 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg group-hover:text-[#085C91] transition-colors duration-300">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}