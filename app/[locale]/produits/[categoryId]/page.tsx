import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getCategories, getProducts, authenticate, odoo } from '@/lib/odoo'
import ProductsClient from './components/ProductsClient'
import { Loader2 } from 'lucide-react'
import Footer from '@/components/footer'
import { getDictionary } from '../../dictionaries'

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

function LoadingComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#085C91]" />
        <p className="text-gray-600">Chargement des produits...</p>
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
          <p className="text-gray-600">{error}</p>
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
            
            {/* Affichage des sous-catégories */}
            {subCategories.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Sous-catégories :</h2>
                <div className="flex flex-wrap gap-3 justify-center">
                  {subCategories.map((subCat) => (
                    <div
                      key={subCat.id}
                      className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30 hover:bg-white/30 transition-colors duration-300"
                    >
                      <span className="font-medium">{subCat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <Suspense fallback={<LoadingComponent />}>
        <ProductsClient 
          initialProducts={products} 
          category={category}
          subCategories={subCategories}
          // params={params} // Supprimer cette ligne
          dict={dict}
        />
      </Suspense>
      
      {/* <Footer /> */}
    </div>
  )
}