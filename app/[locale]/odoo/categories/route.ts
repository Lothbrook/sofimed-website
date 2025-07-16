import { NextRequest, NextResponse } from 'next/server'
import { createOdooService } from '@/lib/odoo-service'

export async function POST(request: NextRequest) {
  try {
    const { uid } = await request.json()
    
    if (!uid) {
      return NextResponse.json(
        { error: 'UID manquant' },
        { status: 400 }
      )
    }

    const odooService = createOdooService()
    // Utiliser la nouvelle méthode pour récupérer seulement les sous-catégories de "Pompage"
    const result = await odooService.getPumpingSubCategories(uid)
    
    if (result.success) {
      // Ne pas ajouter "Toutes les catégories" car on veut seulement les sous-catégories spécifiques
      const categories = result.data || []
      
      return NextResponse.json({ categories })
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Erreur récupération catégories:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des catégories: ' + error.message },
      { status: 500 }
    )
  }
}