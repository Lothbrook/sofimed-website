import { executeQuery } from '../mysql';

export interface Catalogue {
  id?: number;
  title: string;
  description?: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  category?: string;
  is_featured?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class CatalogueModel {
  static async getAll(): Promise<Catalogue[]> {
    const query = 'SELECT * FROM catalogues ORDER BY created_at DESC';
    return await executeQuery(query) as Catalogue[];
  }

  static async getById(id: number): Promise<Catalogue | null> {
    const query = 'SELECT * FROM catalogues WHERE id = ?';
    const results = await executeQuery(query, [id]) as Catalogue[];
    return results[0] || null;
  }

  static async create(catalogue: Omit<Catalogue, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const query = `
      INSERT INTO catalogues (title, description, file_url, file_name, file_size, category, is_featured)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await executeQuery(query, [
      catalogue.title,
      catalogue.description,
      catalogue.file_url,
      catalogue.file_name,
      catalogue.file_size,
      catalogue.category,
      catalogue.is_featured
    ]) as any;
    return result.insertId;
  }

  static async update(id: number, catalogue: Partial<Catalogue>): Promise<boolean> {
    const fields = Object.keys(catalogue).filter(key => key !== 'id');
    const values = fields.map(field => catalogue[field as keyof Catalogue]);
    
    const query = `
      UPDATE catalogues 
      SET ${fields.map(field => `${field} = ?`).join(', ')}
      WHERE id = ?
    `;
    
    const result = await executeQuery(query, [...values, id]) as any;
    return result.affectedRows > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM catalogues WHERE id = ?';
    const result = await executeQuery(query, [id]) as any;
    return result.affectedRows > 0;
  }
}