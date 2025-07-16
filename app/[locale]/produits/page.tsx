

import { useState, useEffect } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, ChevronRight, Loader2, ArrowLeft, FolderOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getCategories, authenticate } from '@/lib/odoo'
import CategoriesClient from './components/CategoriesClient'
import { Suspense } from 'react'
import { getDictionary } from '../dictionaries'
// import { Loader2 } from "lucide-react"

interface Category {
  id: number
  name: string
  product_count?: number
  parent_id?: [number, string] | false
  child_ids?: number[]
}

// Composant de chargement amélioré
function LoadingComponent({ dict }: { dict: any }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section Skeleton */}
      <section className="min-h-[60vh] relative flex items-center justify-center overflow-hidden bg-gray-300 animate-pulse">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="h-16 bg-white/20 rounded-lg mb-6 animate-pulse"></div>
            <div className="h-8 bg-white/20 rounded-lg max-w-2xl mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
      
      {/* Content Loading */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-[#085C91] mx-auto mb-4" />
              <p className="text-lg text-gray-600 mb-2">{dict.products.categories.loadingCategories}</p>
              <p className="text-sm text-gray-500">{dict.products.categories.pleaseWait}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Composant d'erreur
function ErrorComponent({ error }: { error: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h3 className="text-red-800 font-semibold mb-2">{dict.products.categories.noCategories}</h3>
          </div>
          <a 
            href="/produits" 
            className="inline-block bg-[#085C91] hover:bg-[#064a7a] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Réessayer
          </a>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

// Fonction pour récupérer les données côté serveur
// Ajouter un cache simple
const categoriesCache = new Map()

async function getCategoriesData(): Promise<{ categories: Category[], error?: string }> {
  const cacheKey = 'categories'
  
  // Vérifier le cache
  if (categoriesCache.has(cacheKey)) {
    const cached = categoriesCache.get(cacheKey)
    if (Date.now() - cached.timestamp < 300000) { // 5 minutes
      return { categories: cached.data }
    }
  }

  try {
    await authenticate()
    
    const categories = await getCategories()
    
    // Mettre en cache
    categoriesCache.set(cacheKey, {
      data: categories,
      timestamp: Date.now()
    })
    
    return { categories }
  } catch (error: any) {
    console.error('Erreur lors de la récupération des catégories:', error)
    return { 
      categories: [], 
      error: 'Impossible de charger les catégories. Veuillez réessayer plus tard.' 
    }
  }
}

// Page principale côté serveur
export default async function ProduitsPage({
  params
}: {
  params: { locale: string }
}) {
  const dict = await getDictionary(params.locale as 'en' | 'fr')
  const { categories, error } = await getCategoriesData()

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h3 className="text-red-800 font-semibold mb-2">{dict.products.categories.noCategories}</h3>
            </div>
            <a 
              href={`/${params.locale}/produits`}
              className="inline-flex items-center px-4 py-2 bg-[#085C91] text-white rounded-lg hover:bg-[#064a7a] transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {dict.products.categories.clearSearch}
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {dict.products.title}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              {dict.products.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {dict.products.categories.title}
            </h2>
            <p className="text-lg text-gray-600">
              {dict.products.categories.subtitle}
            </p>
          </div>
          
          <Suspense fallback={<LoadingComponent dict={dict} />}>
            <CategoriesClient 
              initialCategories={categories} 
              dict={dict}
              locale={params.locale}
            />
          </Suspense>
        </div>
      </section>
    </div>
  )
}

// Fonction pour récupérer les catégories directement
const fetchCategories = async () => {
  try {
    console.log('Récupération des catégories...')
    const categories = await getCategories()
    console.log('Catégories reçues:', categories)
    setCategories(categories || [])
  } catch (error: any) {
    console.error('Erreur récupération catégories:', error)
    const errorMessage = error.message || 'Erreur inconnue lors du chargement des catégories'
    setError(`Erreur lors du chargement des catégories: ${errorMessage}`)
  }
}

// Fonction pour récupérer les produits d'une catégorie directement
const fetchProducts = async (categoryId: string, page: number = 1) => {
  setProductsLoading(true)
  setError(null)
  
  try {
    console.log(`Récupération des produits pour la catégorie ${categoryId}, page ${page}...`)
    
    // Utiliser getProducts directement avec une limite
    const products = await getProducts(50) // Récupérer 50 produits
    
    // Filtrer par catégorie si nécessaire
    let filteredProducts = products
    if (categoryId !== 'all') {
      filteredProducts = products.filter(product => 
        product.categ_id && product.categ_id[0] === parseInt(categoryId)
      )
    }
    
    // Pagination côté client
    const perPage = 12
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
    
    setProducts(paginatedProducts)
    setCurrentPage(page)
    setTotalPages(Math.ceil(filteredProducts.length / perPage))
    
    // Calculer les statistiques
    const inStock = filteredProducts.filter(p => p.qty_available > 0).length
    const outOfStock = filteredProducts.filter(p => p.qty_available <= 0).length
    
    setStats({
      total: filteredProducts.length,
      inStock: inStock,
      outOfStock: outOfStock
    })
    
    console.log(`Produits récupérés: ${paginatedProducts.length}/${filteredProducts.length}`)
  } catch (error: any) {
    console.error('Erreur récupération produits:', error)
    const errorMessage = error.message || 'Erreur inconnue lors du chargement des produits'
    setError(`Erreur lors du chargement des produits: ${errorMessage}`)
    setProducts([])
    setStats({ total: 0, inStock: 0, outOfStock: 0 })
  } finally {
    setProductsLoading(false)
  }
}
