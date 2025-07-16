import { executeQuery } from '../mysql';
import bcrypt from 'bcryptjs';

export interface User {
  id?: number;
  username: string;
  email: string;
  password_hash?: string;
  first_name?: string;
  last_name?: string;
  role: 'admin' | 'editor' | 'viewer';
  is_active?: boolean;
  last_login?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateUserData {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  role?: 'admin' | 'editor' | 'viewer';
}

export class UserModel {
  static async getAll(): Promise<Omit<User, 'password_hash'>[]> {
    const query = `
      SELECT id, username, email, first_name, last_name, role, is_active, last_login, created_at, updated_at 
      FROM users 
      ORDER BY created_at DESC
    `;
    return await executeQuery(query) as Omit<User, 'password_hash'>[];
  }

  static async getById(id: number): Promise<Omit<User, 'password_hash'> | null> {
    const query = `
      SELECT id, username, email, first_name, last_name, role, is_active, last_login, created_at, updated_at 
      FROM users 
      WHERE id = ?
    `;
    const results = await executeQuery(query, [id]) as Omit<User, 'password_hash'>[];
    return results[0] || null;
  }

  static async getByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = ? AND is_active = TRUE';
    const results = await executeQuery(query, [email]) as User[];
    return results[0] || null;
  }

  static async getByUsername(username: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE username = ? AND is_active = TRUE';
    const results = await executeQuery(query, [username]) as User[];
    return results[0] || null;
  }

  static async create(userData: CreateUserData): Promise<number> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const query = `
      INSERT INTO users (username, email, password_hash, first_name, last_name, role)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const result = await executeQuery(query, [
      userData.username,
      userData.email,
      hashedPassword,
      userData.first_name,
      userData.last_name,
      userData.role || 'editor'
    ]) as any;
    
    return result.insertId;
  }

  static async update(id: number, userData: Partial<CreateUserData>): Promise<boolean> {
    const fields: string[] = [];
    const values: any[] = [];
    
    if (userData.username) {
      fields.push('username = ?');
      values.push(userData.username);
    }
    if (userData.email) {
      fields.push('email = ?');
      values.push(userData.email);
    }
    if (userData.password) {
      fields.push('password_hash = ?');
      values.push(await bcrypt.hash(userData.password, 10));
    }
    if (userData.first_name !== undefined) {
      fields.push('first_name = ?');
      values.push(userData.first_name);
    }
    if (userData.last_name !== undefined) {
      fields.push('last_name = ?');
      values.push(userData.last_name);
    }
    if (userData.role) {
      fields.push('role = ?');
      values.push(userData.role);
    }
    
    if (fields.length === 0) return false;
    
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
    
    const result = await executeQuery(query, values) as any;
    return result.affectedRows > 0;
  }

  static async updateLastLogin(id: number): Promise<boolean> {
    const query = 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?';
    const result = await executeQuery(query, [id]) as any;
    return result.affectedRows > 0;
  }

  static async deactivate(id: number): Promise<boolean> {
    const query = 'UPDATE users SET is_active = FALSE WHERE id = ?';
    const result = await executeQuery(query, [id]) as any;
    return result.affectedRows > 0;
  }

  static async verifyPassword(email: string, password: string): Promise<User | null> {
    const user = await this.getByEmail(email);
    if (!user || !user.password_hash) return null;
    
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return null;
    
    // Mettre à jour la dernière connexion
    await this.updateLastLogin(user.id!);
    
    return user;
  }
}