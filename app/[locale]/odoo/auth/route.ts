import { NextRequest, NextResponse } from 'next/server'
import { createOdooService } from '@/lib/odoo-service'

export async function POST(request: NextRequest) {
  try {
    const odooService = createOdooService()
    const result = await odooService.authenticate()
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        uid: result.data 
      })
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error 
        },
        { status: 401 }
      )
    }
  } catch (error: any) {
    console.error('Erreur authentification:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de l\'authentification: ' + error.message 
      },
      { status: 500 }
    )
  }
}