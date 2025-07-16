export interface OdooConfig {
  url: string
  db: string
  username: string
  password: string
}

export interface OdooResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export class OdooService {
  private config: OdooConfig

  constructor(config: OdooConfig) {
    this.config = config
    
    // En développement, ignorer les erreurs SSL
    if (process.env.NODE_ENV === 'development') {
      // @ts-ignore
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    }
  }

  /**
   * Authentification avec Odoo
   */
  async authenticate(): Promise<OdooResponse<number>> {
    try {
      console.log('Tentative d\'authentification avec:', {
        url: this.config.url,
        db: this.config.db,
        username: this.config.username
      })

      const xmlPayload = `<?xml version="1.0"?>
<methodCall>
  <methodName>authenticate</methodName>
  <params>
    <param><value><string>${this.config.db}</string></value></param>
    <param><value><string>${this.config.username}</string></value></param>
    <param><value><string>${this.config.password}</string></value></param>
    <param><value><struct></struct></value></param>
  </params>
</methodCall>`

      const response = await fetch(`${this.config.url}/xmlrpc/2/common`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml',
          'Accept': 'text/xml'
        },
        body: xmlPayload
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`)
      }

      const xmlText = await response.text()
      console.log('Réponse XML d\'authentification:', xmlText)
      
      // Vérifier d'abord s'il y a une erreur dans la réponse
      if (xmlText.includes('<methodResponse>') && xmlText.includes('<fault>')) {
        const faultMatch = xmlText.match(/<string>(.*?)<\/string>/)
        const errorMessage = faultMatch ? faultMatch[1] : 'Erreur d\'authentification inconnue'
        throw new Error(`Erreur Odoo: ${errorMessage}`)
      }

      // Parser la réponse pour extraire l'UID - plusieurs patterns possibles
      let uid: number | null = null
      
      // Pattern 1: <value><int>123</int></value>
      let uidMatch = xmlText.match(/<value><int>(\d+)<\/int><\/value>/)
      if (uidMatch) {
        uid = parseInt(uidMatch[1])
      }
      
      // Pattern 2: <int>123</int>
      if (!uid) {
        uidMatch = xmlText.match(/<int>(\d+)<\/int>/)
        if (uidMatch) {
          uid = parseInt(uidMatch[1])
        }
      }
      
      // Pattern 3: <i4>123</i4> (alternative integer format)
      if (!uid) {
        uidMatch = xmlText.match(/<i4>(\d+)<\/i4>/)
        if (uidMatch) {
          uid = parseInt(uidMatch[1])
        }
      }

      // Vérifier si l'authentification a échoué (retour false)
      if (xmlText.includes('<boolean>0</boolean>') || xmlText.includes('<value><boolean>0</boolean></value>')) {
        throw new Error('Identifiants incorrects - Vérifiez votre nom d\'utilisateur et mot de passe')
      }

      if (!uid || uid <= 0) {
        console.error('Impossible d\'extraire l\'UID de la réponse:', xmlText)
        throw new Error('Réponse d\'authentification invalide - UID non trouvé')
      }

      console.log('Authentification réussie, UID:', uid)
      return { success: true, data: uid }

    } catch (error: any) {
      console.error('Erreur d\'authentification:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Fonction execute_kw générique comme dans le PHP
   */
  async executeKw(
    model: string,
    method: string,
    params: any[],
    uid: number,
    options: { fields?: string[], limit?: number, offset?: number, order?: string } = {}
  ): Promise<OdooResponse> {
    try {
      // Construire le payload XML pour execute_kw
      let xmlPayload = `<?xml version="1.0"?>
<methodCall>
  <methodName>execute_kw</methodName>
  <params>
    <param><value><string>${this.config.db}</string></value></param>
    <param><value><int>${uid}</int></value></param>
    <param><value><string>${this.config.password}</string></value></param>
    <param><value><string>${model}</string></value></param>
    <param><value><string>${method}</string></value></param>`

      // Ajouter les paramètres (domaine de recherche)
      if (params.length > 0) {
        xmlPayload += `
    <param><value><array><data>`
        
        // Convertir les paramètres en XML
        for (const param of params) {
          if (Array.isArray(param)) {
            xmlPayload += `
      <value><array><data>`
            for (const condition of param) {
              if (Array.isArray(condition) && condition.length === 3) {
                xmlPayload += `
        <value><array><data>
          <value><string>${condition[0]}</string></value>
          <value><string>${condition[1]}</string></value>
          <value><string>${condition[2]}</string></value>
        </data></array></value>`
              }
            }
            xmlPayload += `
      </data></array></value>`
          }
        }
        xmlPayload += `
    </data></array></value></param>`
      }

      // Ajouter les options (fields, limit, offset, order)
      if (Object.keys(options).length > 0) {
        xmlPayload += `
    <param><value><struct>`
        
        if (options.fields) {
          xmlPayload += `
      <member>
        <name>fields</name>
        <value><array><data>`
          for (const field of options.fields) {
            xmlPayload += `
          <value><string>${field}</string></value>`
          }
          xmlPayload += `
        </data></array></value>
      </member>`
        }
        
        if (options.limit) {
          xmlPayload += `
      <member>
        <name>limit</name>
        <value><int>${options.limit}</int></value>
      </member>`
        }
        
        if (options.offset) {
          xmlPayload += `
      <member>
        <name>offset</name>
        <value><int>${options.offset}</int></value>
      </member>`
        }
        
        if (options.order) {
          xmlPayload += `
      <member>
        <name>order</name>
        <value><string>${options.order}</string></value>
      </member>`
        }
        
        xmlPayload += `
    </struct></value></param>`
      }

      xmlPayload += `
  </params>
</methodCall>`

      const response = await fetch(`${this.config.url}/xmlrpc/2/object`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml',
          'Accept': 'text/xml'
        },
        body: xmlPayload
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const xmlText = await response.text()
      console.log(`Réponse XML pour ${model}.${method}:`, xmlText)

      // Parser basique de la réponse XML
      // Pour search_count, extraire le nombre
      if (method === 'search_count') {
        const countMatch = xmlText.match(/<value><int>(\d+)<\/int><\/value>/)
        const count = countMatch ? parseInt(countMatch[1]) : 0
        return { success: true, data: count }
      }

      // Pour search_read, extraire les structures
      if (method === 'search_read') {
        const structMatches = xmlText.match(/<struct>.*?<\/struct>/gs)
        const results = []
        
        if (structMatches) {
          for (const structXml of structMatches) {
            const item: any = {}
            
            // Extraire l'ID
            const idMatch = structXml.match(/<name>id<\/name>\s*<value><int>(\d+)<\/int><\/value>/)
            if (idMatch) item.id = parseInt(idMatch[1])
            
            // Extraire le nom
            const nameMatch = structXml.match(/<name>name<\/name>\s*<value><string>(.*?)<\/string><\/value>/)
            if (nameMatch) item.name = nameMatch[1]
            
            // Extraire le prix
            const priceMatch = structXml.match(/<name>list_price<\/name>\s*<value><double>([\d.]+)<\/double><\/value>/)
            if (priceMatch) item.list_price = parseFloat(priceMatch[1])
            
            // Extraire le code par défaut
            const codeMatch = structXml.match(/<name>default_code<\/name>\s*<value>(?:<string>(.*?)<\/string>|<boolean>0<\/boolean>)<\/value>/)
            if (codeMatch && codeMatch[1]) item.default_code = codeMatch[1]
            
            // Extraire la quantité disponible
            const qtyMatch = structXml.match(/<name>qty_available<\/name>\s*<value><double>([\d.]+)<\/double><\/value>/)
            if (qtyMatch) item.qty_available = parseFloat(qtyMatch[1])
            
            // Extraire la description
            const descMatch = structXml.match(/<name>description<\/name>\s*<value>(?:<string>(.*?)<\/string>|<boolean>0<\/boolean>)<\/value>/)
            if (descMatch && descMatch[1]) item.description = descMatch[1]
            
            // Extraire categ_id (format: [id, "nom"])
            const categMatch = structXml.match(/<name>categ_id<\/name>\s*<value><array><data><value><int>(\d+)<\/int><\/value><value><string>(.*?)<\/string><\/value><\/data><\/array><\/value>/)
            if (categMatch) {
              item.categ_id = [parseInt(categMatch[1]), categMatch[2]]
            }
            
            // Extraire parent_id pour les catégories
            const parentMatch = structXml.match(/<name>parent_id<\/name>\s*<value>(?:<boolean>0<\/boolean>|<array><data><value><int>(\d+)<\/int><\/value>)/)
            item.parent_id = parentMatch && parentMatch[1] ? parseInt(parentMatch[1]) : false
            
            results.push(item)
          }
        }
        
        return { success: true, data: results }
      }

      return { success: true, data: xmlText }

    } catch (error: any) {
      console.error(`Erreur executeKw ${model}.${method}:`, error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Méthodes utilitaires spécifiques
   */
  async getProductCategories(uid: number): Promise<OdooResponse> {
    return this.executeKw(
      'product.category',
      'search_read',
      [[]],
      uid,
      {
        fields: ['id', 'name', 'parent_id', 'child_ids'],
        limit: 100
      }
    )
  }

  // Nouvelle méthode pour récupérer les sous-catégories de "Pompage" (ID: 3581)
  async getPumpingSubCategories(uid: number): Promise<OdooResponse> {
    try {
      // Récupérer toutes les sous-catégories de la catégorie "Pompage" (ID: 3581)
      const result = await this.executeKw(
        'product.category',
        'search_read',
        [['parent_id', '=', 3581]], // Filtrer par parent_id = 3581
        uid,
        {
          fields: ['id', 'name', 'parent_id', 'child_ids'],
          limit: 100,
          order: 'name asc'
        }
      )

      return result
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async getProductsCount(uid: number, categoryFilter?: string): Promise<OdooResponse> {
    const domain = [['type', '=', 'product']]
    if (categoryFilter && categoryFilter !== 'all') {
      domain.push(['categ_id', 'child_of', categoryFilter])
    }
    
    return this.executeKw('product.template', 'search_count', [domain], uid)
  }

  async getProducts(
    uid: number,
    page: number = 1,
    perPage: number = 15,
    categoryFilter?: string
  ): Promise<OdooResponse> {
    const domain = [['type', '=', 'product']]
    if (categoryFilter && categoryFilter !== 'all') {
      domain.push(['categ_id', 'child_of', categoryFilter])
    }
    
    const offset = (page - 1) * perPage
    
    return this.executeKw(
      'product.template',
      'search_read',
      [domain],
      uid,
      {
        fields: ['id', 'name', 'list_price', 'default_code', 'qty_available', 'description', 'categ_id'],
        limit: perPage,
        offset: offset,
        order: 'name asc'
      }
    )
  }
}

// Factory function pour créer une instance du service
export function createOdooService(): OdooService {
  const config: OdooConfig = {
    url: 'https://sys.sofimedmaroc.com',
    db: 'sofimed2',
    username: 'o.benzouina',
    password: 'sYE6#zojyH'
  }
  
  return new OdooService(config)
}