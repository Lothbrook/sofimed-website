'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, ChevronRight, FolderOpen, Eye, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface Category {
  id: number
  name: string
  product_count?: number
  parent_id?: [number, string] | false
  child_ids?: number[]
}

interface CategoriesClientProps {
  initialCategories: Category[]
  isLoading?: boolean
  dict: any
  locale: string
}

export default function CategoriesClient({ 
  initialCategories, 
  isLoading = false,
  dict,
  locale
}: CategoriesClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [internalLoading, setInternalLoading] = useState(true)
  const params = useParams()
  
  // Réduire le délai de chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setInternalLoading(false)
    }, 200) // Réduit de 800ms à 200ms
    return () => clearTimeout(timer)
  }, [])

  // Filtrer les catégories qui ont des images disponibles
  const categoriesWithImages = initialCategories.filter(category => 
    hasImage(category.name) !== null
  )
  
  // Filtrer selon le terme de recherche
  const filteredCategories = categoriesWithImages.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Composant de loading centré
  // LoadingSpinner component
  // Composant Skeleton pour les cartes
  const CategorySkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[...Array(8)].map((_, index) => (
        <Card key={index} className="overflow-hidden bg-white h-full flex flex-col">
          <CardContent className="p-0 flex flex-col h-full">
            <div className="h-64 w-full bg-gray-200 animate-pulse"></div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded animate-pulse mt-4"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
  
  // Dans le LoadingSpinner
  const LoadingSpinner = () => (
    <div className="space-y-8">
      {/* Search Bar Skeleton */}
      <div className="max-w-md mx-auto">
        <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
      
      {/* Categories Skeleton */}
      <CategorySkeleton />
    </div>
  )

  if (internalLoading || isLoading) {
    return (
      <div className="space-y-8">
        {/* Search Bar Skeleton */}
        <div className="max-w-md mx-auto">
          <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
        
        {/* Categories Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <Card key={index} className="overflow-hidden bg-white h-full flex flex-col">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="h-64 w-full bg-gray-200 animate-pulse"></div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse mt-4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder={dict.products.categories.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-3 text-lg border-2 border-gray-200 focus:border-[#085C91] focus:ring-0 rounded-xl"
          />
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCategories.map((category) => {
            const imagePath = hasImage(category.name)
            return (
              <Card 
                key={category.id} 
                className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white h-full flex flex-col"
              >
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Image Section */}
                  <div className="relative h-64 w-full overflow-hidden bg-white flex items-center justify-center">
                    {imagePath ? (
                      <Image
                        src={imagePath}
                        alt={category.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        style={{
                          imageRendering: 'high-quality'
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <FolderOpen className="h-16 w-16 mb-2" />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-[#085C91] transition-colors line-clamp-2">
                        {category.name}
                      </h3>
                      
                      {category.product_count !== undefined && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                            {category.product_count} {dict.products.categories.productsCount}
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    {/* Button - Always at bottom */}
                    <div className="mt-auto">
                      <Link href={`/${locale}/produits/${category.id}`}>
                        <Button 
                          className="w-full bg-[#085C91] hover:bg-[#064a7a] text-white transition-colors group-hover:shadow-lg"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {dict.products.categories.viewProducts}
                          <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <FolderOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">
            {searchTerm ? dict.products.categories.noCategories : dict.products.categories.noCategories}
          </h3>
          <p className="text-gray-400">
            {searchTerm 
              ? dict.products.categories.tryDifferentSearch
              : dict.products.categories.noCategories}
          </p>
          {searchTerm && (
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm('')}
              className="mt-4 border-[#085C91] text-[#085C91] hover:bg-[#085C91] hover:text-white"
            >
              {dict.products.categories.clearSearch}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

// Liste des marques avec images disponibles
const availableBrands = [
  'ALMATEC', 'BLACKMER', 'CSF INOX', 'FINDER', 'GUCUM', 
  'HCP', 'JABSCO', 'JESSBERGER', 'KSB', 'MOUVEX', 
  'OBL', 'PURITY', 'WILDEN'
]

// Fonction pour vérifier si une catégorie a une image correspondante
const hasImage = (categoryName: string): string | null => {
  const normalizedCategoryName = categoryName.toUpperCase().trim()
  
  // Recherche exacte
  const exactMatch = availableBrands.find(brand => 
    brand === normalizedCategoryName
  )
  
  if (exactMatch) {
    return `/images/marques/${exactMatch}.jpg`
  }
  
  // Recherche partielle (si le nom de la catégorie contient le nom de la marque)
  const partialMatch = availableBrands.find(brand => 
    normalizedCategoryName.includes(brand) || brand.includes(normalizedCategoryName)
  )
  
  if (partialMatch) {
    return `/images/marques/${partialMatch}.jpg`
  }
  
  return null
}