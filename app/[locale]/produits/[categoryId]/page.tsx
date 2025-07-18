import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getCategories, getProducts, authenticate, odoo } from '@/lib/odoo'
import ProductsClient from './components/ProductsClient'
import { Loader2 } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { getDictionary } from '../../dictionaries'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  list_price: number
  qty_available: number
  categ_id: [number, string]
  default_code?: string
  description?: string
  image?: string // Ajout du champ image
}

interface Category {
  id: number
  name: string
  product_count?: number
  parent_id?: [number, string] | false
  child_ids?: number[]
}

function LoadingComponent({ dict }: { dict: any }) {
  return (
    <div className="fixed inset-0 bg-white z-[99999] flex items-center justify-center">
      <div className="text-center">
        {/* Roulette de chargement principale */}
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-gray-200 border-t-[#085C91] rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-r-blue-300 rounded-full animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
        </div>
        
        {/* Logo Sofimed */}
        <div className="w-20 h-20 mx-auto mb-6 relative">
          <Image 
            src="/images/sofimed-logo.png" 
            alt="Sofimed Logo" 
            fill
            className="object-contain"
          />
        </div>
        
        {/* Texte de chargement */}
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Chargement des produits</h2>
        <p className="text-gray-600 mb-8 text-lg">Veuillez patienter...</p>
        
        {/* Points animés */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-4 h-4 bg-[#085C91] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-4 h-4 bg-[#085C91] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-4 h-4 bg-[#085C91] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
        
        {/* Barre de progression simulée */}
        <div className="w-80 h-3 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#085C91] to-blue-400 rounded-full animate-pulse transition-all duration-1000" style={{width: '75%'}}></div>
        </div>
        
        {/* Message additionnel */}
        <p className="text-sm text-gray-500 mt-6">Préparation de votre catalogue...</p>
      </div>
    </div>
  )
}

// Fonction pour récupérer les sous-catégories avec retry
async function getSubCategories(categoryId: string, retryCount = 0): Promise<Category[]> {
  try {
    await authenticate()
    
    const subCategories = await odoo.searchRead(
      'product.category',
      [['parent_id', '=', parseInt(categoryId)]],
      ['name', 'parent_id', 'product_count', 'child_ids'],
      100
    )
    
    return subCategories
  } catch (error: any) {
    console.error('Erreur lors de la récupération des sous-catégories:', error)
    
    // Retry une fois si la session a expiré
    if (error.message.includes('Session Expired') && retryCount < 1) {
      console.log('Session expirée, tentative de ré-authentification...')
      // Forcer une nouvelle authentification
      await authenticate()
      return getSubCategories(categoryId, retryCount + 1)
    }
    
    return []
  }
}

// Fonction pour récupérer les produits avec child_of et retry amélioré
async function getProductsByCategory(categoryId: string, retryCount = 0): Promise<Product[]> {
  try {
    await authenticate()
    
    // Utiliser child_of pour récupérer tous les produits de la catégorie et ses sous-catégories
    const products = await odoo.searchRead(
      'product.product',
      [
        ['sale_ok', '=', true],
        ['categ_id', 'child_of', parseInt(categoryId)]
      ],
      ['name', 'list_price', 'qty_available', 'categ_id', 'default_code', 'description', 'image'],
      1000 // Augmenter la limite pour récupérer plus de produits
    )
    
    return products
  } catch (error: any) {
    console.error('Erreur lors de la récupération des produits:', error)
    
    // Retry jusqu'à 3 fois si la session a expiré
    if (error.message.includes('Session Expired') && retryCount < 3) {
      console.log(`Session expirée, tentative de ré-authentification (${retryCount + 1}/3)...`)
      // Attendre un peu avant de réessayer
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Forcer une nouvelle authentification
      await authenticate()
      return getProductsByCategory(categoryId, retryCount + 1)
    }
    
    // Si toutes les tentatives échouent, retourner un tableau vide
    console.error('Toutes les tentatives de récupération des produits ont échoué')
    return []
  }
}

// Fonction pour récupérer les données avec gestion d'erreur améliorée
async function getCategoryData(categoryId: string): Promise<{
  category: Category | null
  subCategories: Category[]
  products: Product[]
  error?: string
}> {
  try {
    // Forcer une nouvelle authentification au début
    await authenticate()
    
    const [categories, subCategories, products] = await Promise.all([
      getCategories(),
      getSubCategories(categoryId),
      getProductsByCategory(categoryId)
    ])
    
    const category = categories.find(cat => cat.id === parseInt(categoryId))
    if (!category) {
      return { category: null, subCategories: [], products: [], error: 'Catégorie non trouvée' }
    }
    
    return { category, subCategories, products }
  } catch (error: any) {
    console.error('Erreur lors du chargement:', error)
    return {
      category: null,
      subCategories: [],
      products: [],
      error: `Erreur lors du chargement: ${error.message || 'Erreur inconnue'}`
    }
  }
}

export default async function CategoryProductsPage({
  params
}: {
  params: { categoryId: string; locale: string }
}) {
  const { category, subCategories, products, error } = await getCategoryData(params.categoryId)
  const dict = await getDictionary(params.locale as 'en' | 'fr')

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <section 
        className="min-h-[60vh] relative flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/banner-services.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{category.name}</h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              {products.length} produit{products.length > 1 ? 's' : ''} disponible{products.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <Suspense fallback={<LoadingComponent dict={dict} />}>
        <ProductsClient 
          initialProducts={products} 
          category={category}
          subCategories={subCategories}
          dict={dict}
        />
      </Suspense>
    </div>
  )
}