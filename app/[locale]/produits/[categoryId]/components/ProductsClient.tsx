'use client'

import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, ArrowLeft, Package, Euro, CheckCircle, XCircle, BarChart3, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface Product {
  id: number
  name: string
  list_price: number
  qty_available: number
  categ_id: [number, string]
  default_code?: string
  description?: string
  image?: string
}

interface Category {
  id: number
  name: string
  product_count?: number
  parent_id?: [number, string] | false
  child_ids?: number[]
}

interface ProductsClientProps {
  category: Category
  initialProducts: Product[]
  subCategories: Category[]
  // params: { categoryId: string; locale: string } // Supprimer cette ligne
  dict: any
}

export default function ProductsClient({ 
  category, 
  initialProducts, 
  subCategories, 
  // params, // Supprimer cette prop
  dict
}: ProductsClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterStock, setFilterStock] = useState('all')
  const [selectedSubCategory, setSelectedSubCategory] = useState('all')
  const [internalLoading, setInternalLoading] = useState(true)
  
  const params = useParams()
  
  // Simuler un délai de chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setInternalLoading(false)
    }, 200)
    return () => clearTimeout(timer)
  }, [])
  
  // Composant Skeleton pour les statistiques
  const StatsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {[...Array(4)].map((_, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
  
  // Composant Skeleton pour les filtres
  const FiltersSkeleton = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-10 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  )
  
  // Composant Skeleton pour les produits
  const ProductsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <Card key={index} className="overflow-hidden bg-white h-full flex flex-col">
          <CardContent className="p-0 flex flex-col h-full">
            <div className="h-56 w-full bg-gray-200 animate-pulse"></div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="mt-auto">
                <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
  
  // Composant de loading complet
  const LoadingSpinner = () => (
    <section className="container mx-auto px-4 py-12">
      {/* Breadcrumb Skeleton */}
      <div className="mb-8">
        <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      
      {/* Stats Skeleton */}
      <StatsSkeleton />
      
      {/* Filters Skeleton */}
      <FiltersSkeleton />
      
      {/* Products Skeleton */}
      <ProductsSkeleton />
    </section>
  )

  // Filtrer et trier les produits avec useMemo pour optimiser les performances
  const filteredProducts = useMemo(() => {
    let filtered = initialProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (product.default_code && product.default_code.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesStock = filterStock === 'all' || 
                          (filterStock === 'in-stock' && product.qty_available > 0) ||
                          (filterStock === 'out-of-stock' && product.qty_available <= 0)
      
      const matchesSubCategory = selectedSubCategory === 'all' ||
                                product.categ_id[0] === parseInt(selectedSubCategory)
      
      return matchesSearch && matchesStock && matchesSubCategory
    })
    
    // Trier les produits
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price-asc':
          return a.list_price - b.list_price
        case 'price-desc':
          return b.list_price - a.list_price
        case 'stock':
          return b.qty_available - a.qty_available
        default:
          return 0
      }
    })
    
    return filtered
  }, [initialProducts, searchTerm, sortBy, filterStock, selectedSubCategory])

  return (
    <section className="container mx-auto px-4 py-12 min-h-screen">
      {internalLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Breadcrumb et retour */}
          <div className="mb-8">
            <Link 
              href={`/${params.locale}/produits`}
              className="inline-flex items-center text-[#085C91] hover:text-blue-700 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {dict.products.categoryPage.backToCategories}
            </Link>
            
            <div className="flex items-center text-sm text-gray-500">
              <Link href={`/${params.locale}/produits`} className="hover:text-[#085C91]">
                {dict.products.categories.title}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-800 font-medium">{category.name}</span>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{dict.products.categoryPage.totalProducts}</p>
                    <p className="text-2xl font-bold text-blue-600">{initialProducts.length}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{dict.products.categoryPage.subCategories}</p>
                    <p className="text-2xl font-bold text-green-600">{subCategories.length}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{dict.products.categoryPage.inStock}</p>
                    <p className="text-2xl font-bold text-green-600">
                      {initialProducts.filter(p => p.qty_available > 0).length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{dict.products.categoryPage.outOfStock}</p>
                    <p className="text-2xl font-bold text-red-600">
                      {initialProducts.filter(p => p.qty_available <= 0).length}
                    </p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres et recherche */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Barre de recherche */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder={dict.products.categoryPage.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 focus:ring-2 focus:ring-[#085C91] focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Filtre par sous-catégorie */}
              <div>
                <Select value={selectedSubCategory} onValueChange={setSelectedSubCategory}>
                  <SelectTrigger className="border-gray-200">
                    <SelectValue placeholder={dict.products.categoryPage.allSubCategories} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{dict.products.categoryPage.allSubCategories}</SelectItem>
                    {subCategories.map((subCat) => (
                      <SelectItem key={subCat.id} value={subCat.id.toString()}>
                        {subCat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Tri */}
              <div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="border-gray-200">
                    <SelectValue placeholder={dict.products.categoryPage.sortBy} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">{dict.products.categoryPage.nameAZ}</SelectItem>
                    <SelectItem value="price-asc">{dict.products.categoryPage.priceAsc}</SelectItem>
                    <SelectItem value="price-desc">{dict.products.categoryPage.priceDesc}</SelectItem>
                    <SelectItem value="stock">{dict.products.categoryPage.stockAvailable}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Filtre stock */}
              <div>
                <Select value={filterStock} onValueChange={setFilterStock}>
                  <SelectTrigger className="border-gray-200">
                    <SelectValue placeholder={dict.products.categoryPage.filterBy} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{dict.products.categoryPage.allProducts}</SelectItem>
                    <SelectItem value="in-stock">{dict.products.categoryPage.inStockOnly}</SelectItem>
                    <SelectItem value="out-of-stock">{dict.products.categoryPage.outOfStockOnly}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Statistiques */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{filteredProducts.length} {dict.products.categoryPage.productsDisplayed}</span>
                <span>•</span>
                <span>{filteredProducts.filter(p => p.qty_available > 0).length} {dict.products.categoryPage.inStockCount}</span>
              </div>
              
              <Badge variant="outline" className="text-[#085C91] border-[#085C91]">
                {category.name}
              </Badge>
            </div>
          </div>

          {/* Grille des produits */}
          <div className="min-h-[600px]">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white h-full flex flex-col"
                  >
                    <CardContent className="p-0 flex flex-col h-full">
                      {/* Image du produit ou logo SOFIMED */}
                      <div className="relative h-56 w-full overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0">
                        {product.image ? (
                          <img 
                            src={`data:image/jpeg;base64,${product.image}`}
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-2"
                            style={{
                              imageRendering: 'high-quality'
                            }}
                            onError={(e) => {
                              e.currentTarget.src = '/images/sofimed-logo.png'
                              e.currentTarget.className = 'h-24 w-auto object-contain opacity-60 p-4'
                            }}
                          />
                        ) : (
                          <img 
                            src="/images/sofimed-logo.png"
                            alt="SOFIMED Logo"
                            className="h-24 w-auto object-contain opacity-60 p-4"
                            style={{
                              imageRendering: 'high-quality'
                            }}
                          />
                        )}
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        {/* En-tête du produit */}
                        <div className="mb-4">
                          <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-[#085C91] transition-colors line-clamp-2 min-h-[3.5rem]">
                            {product.name}
                          </h3>
                          
                          {product.default_code && (
                            <p className="text-sm text-gray-500 mb-2">
                              {dict.products.categoryPage.reference} {product.default_code}
                            </p>
                          )}
                          
                          <p className="text-xs text-blue-600 mb-2">
                            {product.categ_id[1]}
                          </p>
                        </div>
                        
                        {/* Description */}
                        {product.description && (
                          <div className="mb-4 flex-1">
                            <p className="text-sm text-gray-600 line-clamp-3">
                              {product.description}
                            </p>
                          </div>
                        )}
                        
                        {/* Stock et bouton - toujours en bas */}
                        <div className="mt-auto">
                          <div className="flex items-center justify-center mb-4">
                            <div className="flex items-center">
                              {product.qty_available > 0 ? (
                                <>
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                                  <span className="text-sm text-green-600 font-medium">
                                    {product.qty_available} {dict.products.categoryPage.inStockCount}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-4 w-4 text-red-500 mr-1" />
                                  <span className="text-sm text-red-600 font-medium">
                                    {dict.products.categoryPage.outOfStock}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          
                          {/* Bouton d'action */}
                          <Button 
                            className="w-full bg-[#085C91] hover:bg-[#064a7a] text-white transition-colors"
                            disabled={product.qty_available <= 0}
                          >
                            {product.qty_available > 0 ? dict.products.categoryPage.viewDetails : dict.products.categoryPage.productUnavailable}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">
                  {searchTerm ? dict.products.categoryPage.noProductsFound : dict.products.categoryPage.noProductsAvailable}
                </h3>
                <p className="text-gray-400">
                  {searchTerm 
                    ? dict.products.categoryPage.tryModifySearch
                    : dict.products.categoryPage.noCategoryProducts}
                </p>
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm('')}
                    className="mt-4 border-[#085C91] text-[#085C91] hover:bg-[#085C91] hover:text-white"
                  >
                    {dict.products.categoryPage.clearSearch}
                  </Button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  )
}