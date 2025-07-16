// odoo-jsonrpc.ts - Clean JSON-RPC implementation for Odoo API

// Disable SSL verification for development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Configuration
const ODOO_CONFIG = {
  url: 'https://sys.sofimedmaroc.com',
  db: 'sofimed2',
  username: 'o.benzouina',
  password: 'sYE6#zojyH'
};

// Types
interface JsonRpcRequest {
  jsonrpc: string;
  method: string;
  params: any;
  id?: number;
}

interface JsonRpcResponse {
  jsonrpc: string;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
  id?: number;
}

interface OdooSession {
  uid: number;
  session_id: string;
  username: string;
  name: string;
  company_id: number;
  partner_id: number;
  db: string;
  server_version: string;
}

// Session storage
let currentSession: OdooSession | null = null;
let sessionCookies: string = '';

// Core JSON-RPC client
class OdooJsonRpc {
  private baseUrl: string;
  private requestId: number = 1;

  constructor(url: string) {
    this.baseUrl = url;
  }

  private async makeRequest(endpoint: string, method: string, params: any): Promise<any> {
    const request: JsonRpcRequest = {
      jsonrpc: '2.0',
      method: 'call',
      params: params,
      id: this.requestId++
    };

    // console.log(`🔄 JSON-RPC Request to ${endpoint}:`, JSON.stringify(request, null, 2));

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(sessionCookies && { 'Cookie': sessionCookies })
      },
      body: JSON.stringify(request)
    });

    // Extract cookies from response
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      sessionCookies = setCookie;
      // console.log('🍪 Updated session cookies');
    }

    const data: JsonRpcResponse = await response.json();
    // console.log(`📦 JSON-RPC Response:`, JSON.stringify(data, null, 2));

    if (data.error) {
      throw new Error(`JSON-RPC Error: ${data.error.message} (Code: ${data.error.code})`);
    }

    return data.result;
  }

  // Authentication
  async authenticate(db: string, login: string, password: string): Promise<OdooSession> {
    const result = await this.makeRequest('/web/session/authenticate', 'call', {
      db,
      login,
      password
    });

    if (!result || !result.uid) {
      throw new Error('Authentication failed: Invalid credentials or server response');
    }

    currentSession = result;
    // console.log('✅ Authentication successful:', {
    //   uid: result.uid,
    //   username: result.username,
    //   name: result.name,
    //   db: result.db
    // });

    return result;
  }

  // Generic model operation with auto re-authentication
  async callKw(model: string, method: string, args: any[] = [], kwargs: any = {}): Promise<any> {
    if (!currentSession) {
      throw new Error('Not authenticated. Please authenticate first.');
    }

    try {
      return await this.makeRequest('/web/dataset/call_kw', 'call', {
        model,
        method,
        args,
        kwargs
      });
    } catch (error: any) {
      // If session expired, re-authenticate and retry
      if (error.message.includes('Session Expired')) {
        // console.log('🔄 Session expired, re-authenticating...');
        // await this.authenticate(ODOO_CONFIG.db, ODOO_CONFIG.username, ODOO_CONFIG.password);
        // return await this.makeRequest('/web/dataset/call_kw', 'call', {
        //   model,
        //   method,
        //   args,
        //   kwargs
        // });
      }
      throw error;
    }
  }

  // CRUD Operations
  async search(model: string, domain: any[] = []): Promise<number[]> {
    return await this.callKw(model, 'search', [domain]);
  }

  async read(model: string, ids: number[], fields: string[] = []): Promise<any[]> {
    return await this.callKw(model, 'read', [ids], { fields });
  }

  async searchRead(model: string, domain: any[] = [], fields: string[] = [], limit: number = 0, offset: number = 0): Promise<any[]> {
    return await this.callKw(model, 'search_read', [domain], {
      fields,
      limit,
      offset
    });
  }

  async create(model: string, values: any): Promise<number> {
    return await this.callKw(model, 'create', [values]);
  }

  async write(model: string, ids: number[], values: any): Promise<boolean> {
    return await this.callKw(model, 'write', [ids, values]);
  }

  async unlink(model: string, ids: number[]): Promise<boolean> {
    return await this.callKw(model, 'unlink', [ids]);
  }

  // Get current session info
  getSession(): OdooSession | null {
    return currentSession;
  }

  // Check if authenticated
  isAuthenticated(): boolean {
    return currentSession !== null && currentSession.uid > 0;
  }
}

// Create global instance
const odoo = new OdooJsonRpc(ODOO_CONFIG.url);

// High-level API functions
export async function authenticate(): Promise<OdooSession> {
  return await odoo.authenticate(ODOO_CONFIG.db, ODOO_CONFIG.username, ODOO_CONFIG.password);
}

// Améliorer la fonction ensureAuthenticated
export async function ensureAuthenticated(): Promise<void> {
  if (!odoo.isAuthenticated()) {
    console.log('🔐 Session non authentifiée, authentification en cours...')
    await authenticate()
  }
}

// Nouvelle fonction avec retry automatique
// Amélioration de la fonction executeWithRetry
export async function executeWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      await ensureAuthenticated()
      return await operation()
    } catch (error: any) {
      console.error(`Tentative ${attempt + 1} échouée:`, error.message)
      
      // Si c'est une erreur de session expirée et qu'il reste des tentatives
      if (error.message.includes('Session Expired') && attempt < maxRetries) {
        console.log(`🔄 Session expirée, ré-authentification (${attempt + 1}/${maxRetries})...`)
        // Forcer une nouvelle authentification
        currentSession = null
        sessionCookies = ''
        // Attendre un peu avant de réessayer
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)))
        await authenticate()
        continue
      }
      
      // Si c'est la dernière tentative ou une autre erreur, relancer
      throw error
    }
  }
  throw new Error('Toutes les tentatives ont échoué')
}

// Modifier les fonctions existantes pour utiliser executeWithRetry
export async function getCategories(limit: number = 500): Promise<any[]> {
  return executeWithRetry(async () => {
    const allCategories = await odoo.searchRead(
      'product.category',
      [],
      ['name', 'parent_id', 'product_count'],
      limit
    )
    
    const filteredCategories = allCategories.filter(category => {
      return category.parent_id && 
             Array.isArray(category.parent_id) && 
             category.parent_id[0] === 3581
    })
    
    return filteredCategories
  })
}

export async function getProducts(limit: number = 100): Promise<any[]> {
  return executeWithRetry(async () => {
    return await odoo.searchRead(
      'product.product',
      [['sale_ok', '=', true]],
      ['name', 'list_price', 'qty_available', 'categ_id', 'barcode'],
      limit
    )
  })
}

// Nouvelle fonction pour rechercher avec child_of
export async function getProductsByCategory(categoryId: number, limit: number = 500): Promise<any[]> {
  return executeWithRetry(async () => {
    return await odoo.searchRead(
      'product.product',
      [
        ['sale_ok', '=', true],
        ['categ_id', 'child_of', categoryId]
      ],
      ['name', 'list_price', 'qty_available', 'categ_id', 'default_code', 'description', 'image'],
      limit
    )
  })
}

// Nouvelle fonction pour récupérer les sous-catégories
export async function getSubCategories(parentId: number): Promise<any[]> {
  return executeWithRetry(async () => {
    return await odoo.searchRead(
      'product.category',
      [['parent_id', '=', parentId]],
      ['name', 'parent_id', 'product_count', 'child_ids'],
      100
    )
  })
}

export async function getAllProducts(): Promise<any[]> {
  await ensureAuthenticated();
  
  // console.log('📦 Fetching all products with pagination...');
  
  // First, get the total count
  const totalIds = await odoo.search('product.product', [['sale_ok', '=', true]]);
  const totalCount = totalIds.length;
  
  // console.log(`📊 Total products to fetch: ${totalCount}`);
  
  const allProducts: any[] = [];
  const batchSize = 1000; // Fetch 1000 products at a time
  
  for (let offset = 0; offset < totalCount; offset += batchSize) {
    const remaining = totalCount - offset;
    const currentBatch = Math.min(batchSize, remaining);
    
    // console.log(`📦 Fetching products ${offset + 1}-${offset + currentBatch} of ${totalCount}...`);
    
    try {
      const batchProducts = await odoo.searchRead(
        'product.product',
        [['sale_ok', '=', true]],
        ['name', 'list_price', 'qty_available', 'categ_id', 'barcode'],
        currentBatch,
        offset
      );
      
      allProducts.push(...batchProducts);
      // console.log(`✅ Fetched ${batchProducts.length} products (total so far: ${allProducts.length})`);
      
      // Small delay to avoid overwhelming the server
      if (offset + batchSize < totalCount) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      // console.error(`❌ Error fetching batch at offset ${offset}:`, error);
      // Continue with next batch instead of failing completely
    }
  }
  
  // console.log(`🎉 Finished fetching all products: ${allProducts.length} total`);
  return allProducts;
}

export async function createCustomer(customerData: any): Promise<number> {
  await ensureAuthenticated();
  const data = {
    is_company: true,
    customer: true,  // Odoo 12 compatibility
    ...customerData
  };
  return await odoo.create('res.partner', data);
}

export async function getSalesOrders(states: string[] = ['draft', 'sent', 'sale'], limit: number = 50): Promise<any[]> {
  await ensureAuthenticated();
  return await odoo.searchRead(
    'sale.order',
    [['state', 'in', states]],
    ['name', 'partner_id', 'amount_total', 'state', 'date_order'],
    limit
  );
}

export async function getInvoices(states: string[] = ['draft', 'posted'], limit: number = 50): Promise<any[]> {
  await ensureAuthenticated();
  return await odoo.searchRead(
    'account.move',
    [['move_type', 'in', ['out_invoice', 'out_refund']], ['state', 'in', states]],
    ['name', 'partner_id', 'amount_total', 'state', 'invoice_date'],
    limit
  );
}

// Export the odoo instance for advanced usage
export { odoo };

// Get session info
export function getSessionInfo() {
  return {
    session: odoo.getSession(),
    isAuthenticated: odoo.isAuthenticated(),
    cookies: sessionCookies
  };
}