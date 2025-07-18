'use client'

import { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, ArrowLeft, Package, CheckCircle, XCircle, BarChart3, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Image from 'next/image'

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
  dict: any
}

export default function ProductsClient({ 
  category, 
  initialProducts, 
  subCategories, 
  dict
}: ProductsClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterStock, setFilterStock] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [productsPerPage] = useState(12)
  
  const params = useParams()
  
  // S'assurer que le composant est monté côté client
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Gestion du chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Délai pour voir la roulette
    return () => clearTimeout(timer)
  }, [])
  
  // Fonction pour obtenir l'image avec le logo par défaut
  const getImageSrc = (product: Product): string => {
    if (!product.image) {
      return '/images/sofimed-logo.png'
    }
    
    if (product.image.startsWith('data:image/')) {
      return product.image
    }
    
    if (product.image.startsWith('http') || product.image.startsWith('/')) {
      return product.image
    }
    
    return `data:image/jpeg;base64,${product.image}`
  }
  
  // Filtrer et trier les produits (suppression du filtre par sous-catégorie)
  const filteredProducts = useMemo(() => {
    let filtered = initialProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (product.default_code && product.default_code.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesStock = filterStock === 'all' || 
                          (filterStock === 'in-stock' && product.qty_available > 0) ||
                          (filterStock === 'out-of-stock' && product.qty_available <= 0)
      
      return matchesSearch && matchesStock
    })
    
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'stock':
          return b.qty_available - a.qty_available
        default:
          return 0
      }
    })
    
    return filtered
  }, [initialProducts, searchTerm, sortBy, filterStock])

  // Calculer la pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  // Réinitialiser la page quand les filtres changent
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, sortBy, filterStock])

  // Calculer les statistiques
  const totalProducts = initialProducts.length
  const inStockProducts = initialProducts.filter(p => p.qty_available > 0).length
  const outOfStockProducts = totalProducts - inStockProducts

  // Composant de pagination
  const Pagination = () => {
    const getPageNumbers = () => {
      const pages = []
      const maxVisiblePages = 5
      
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) pages.push(i)
          pages.push('...')
          pages.push(totalPages)
        } else if (currentPage >= totalPages - 2) {
          pages.push(1)
          pages.push('...')
          for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
        } else {
          pages.push(1)
          pages.push('...')
          for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
          pages.push('...')
          pages.push(totalPages)
        }
      }
      
      return pages
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Précédent
        </Button>
        
        {getPageNumbers().map((page, index) => (
          <Button
            key={index}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => typeof page === 'number' && setCurrentPage(page)}
            disabled={page === '...'}
            className={page === currentPage ? "bg-[#085C91] hover:bg-blue-700" : ""}
          >
            {page}
          </Button>
        ))}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Suivant
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  // Écran de chargement avec portail
  const LoadingScreen = () => {
    if (!isMounted) return null
    
    return createPortal(
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
      </div>,
      document.body
    )
  }

  return (
    <>
      {/* Écran de chargement en portail */}
      {isLoading && <LoadingScreen />}
      
      {/* Contenu principal */}
      <div className="w-full bg-gray-50 min-h-screen">
        <section className="container mx-auto px-4 py-12">
          {/* Breadcrumb et retour (suppression des sous-catégories) */}
          <div className="mb-8">
            <Link 
              href={`/${params.locale}/produits`}
              className="inline-flex items-center text-[#085C91] hover:text-blue-700 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {dict?.navigation?.backToCategories || 'Retour aux catégories'}
            </Link>
            
            {/* Breadcrumb simplifié */}
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href={`/${params.locale}/produits`} className="hover:text-[#085C91]">
                {dict?.navigation?.products || 'Produits'}
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{category.name}</span>
            </nav>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Produits</p>
                    <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                  </div>
                  <Package className="h-8 w-8 text-[#085C91]" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">En Stock</p>
                    <p className="text-2xl font-bold text-green-600">{inStockProducts}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">Rupture</p>
                    <p className="text-2xl font-bold text-red-600">{outOfStockProducts}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres et recherche (suppression du filtre par sous-catégorie) */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Tri */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom A-Z</SelectItem>
                  <SelectItem value="stock">Stock</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Filtre stock */}
              <Select value={filterStock} onValueChange={setFilterStock}>
                <SelectTrigger>
                  <SelectValue placeholder="Stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="in-stock">En stock</SelectItem>
                  <SelectItem value="out-of-stock">Rupture</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Bouton reset */}
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('')
                  setSortBy('name')
                  setFilterStock('all')
                }}
              >
                Réinitialiser
              </Button>
            </div>
            
            {/* Résultats et pagination info */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
                </span>
                {totalPages > 1 && (
                  <span className="text-sm text-gray-500">
                    Page {currentPage} sur {totalPages}
                  </span>
                )}
                {searchTerm && (
                  <Badge variant="secondary" className="text-xs">
                    Recherche: "{searchTerm}"
                  </Badge>
                )}
              </div>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Grille des produits */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 h-full flex flex-col border border-gray-200">
                      <CardContent className="p-0 flex flex-col h-full">
                        {/* Image du produit */}
                        <div className="h-64 w-full bg-gray-50 flex items-center justify-center relative overflow-hidden">
                          <Image 
                            src={getImageSrc(product)}
                            alt={product.name}
                            fill
                            className="object-contain p-4 transition-transform duration-300 hover:scale-105"
                            quality={95}
                            priority={currentPage === 1}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = '/images/sofimed-logo.png'
                            }}
                          />
                        </div>
                        
                        {/* Contenu */}
                        <div className="p-6 flex-1 flex flex-col">
                          {/* En-tête */}
                          <div className="mb-4">
                            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight">
                              {product.name}
                            </h3>
                            {product.default_code && (
                              <p className="text-sm text-gray-500 mb-2">Réf: {product.default_code}</p>
                            )}
                          </div>
                          
                          {/* Description avec plus de caractères */}
                          {product.description && (
                            <div className="flex-1 mb-4">
                              <p className="text-sm text-gray-600 line-clamp-5 leading-relaxed">
                                {product.description.length > 200 
                                  ? product.description.substring(0, 200) + '...' 
                                  : product.description
                                }
                              </p>
                            </div>
                          )}
                          
                          {/* Action */}
                          <div className="mt-auto">
                            <Button 
                              className="w-full bg-[#085C91] hover:bg-blue-700 transition-colors duration-200"
                            >
                              Voir détails
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && <Pagination />}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <Image 
                    src="/images/sofimed-logo.png" 
                    alt="Sofimed Logo" 
                    fill
                    className="object-contain opacity-50"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-600 mb-4">
                  Aucun produit ne correspond à vos critères de recherche.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('')
                    setFilterStock('all')
                  }}
                >
                  Effacer les filtres
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}