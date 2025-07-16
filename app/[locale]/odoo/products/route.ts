import { NextRequest, NextResponse } from 'next/server'
import { createOdooService } from '@/lib/odoo-service'

export async function POST(request: NextRequest) {
  try {
    const { uid, category, page = 1, perPage = 15 } = await request.json()
    
    if (!uid) {
      return NextResponse.json(
        { error: 'UID manquant' },
        { status: 400 }
      )
    }

    const odooService = createOdooService()
    
    // Récupérer le nombre total de produits
    const countResult = await odooService.getProductsCount(uid, category)
    if (!countResult.success) {
      throw new Error(countResult.error)
    }
    
    // Récupérer les produits avec pagination
    const productsResult = await odooService.getProducts(uid, page, perPage, category)
    if (!productsResult.success) {
      throw new Error(productsResult.error)
    }
    
    // Calculer les statistiques (en stock / hors stock)
    const inStockResult = await odooService.executeKw(
      'product.template',
      'search_count',
      [[
        ['type', '=', 'product'],
        ['qty_available', '>', 0],
        ...(category && category !== 'all' ? [['categ_id', 'child_of', category]] : [])
      ]],
      uid
    )
    
    const outOfStockResult = await odooService.executeKw(
      'product.template',
      'search_count',
      [[
        ['type', '=', 'product'],
        ['qty_available', '<=', 0],
        ...(category && category !== 'all' ? [['categ_id', 'child_of', category]] : [])
      ]],
      uid
    )
    
    const total = countResult.data || 0
    const totalPages = Math.ceil(total / perPage)
    
    return NextResponse.json({
      products: productsResult.data || [],
      total,
      totalPages,
      currentPage: page,
      inStockCount: inStockResult.success ? inStockResult.data : 0,
      outOfStockCount: outOfStockResult.success ? outOfStockResult.data : 0
    })
    
  } catch (error: any) {
    console.error('Erreur récupération produits:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des produits: ' + error.message },
      { status: 500 }
    )
  }
}