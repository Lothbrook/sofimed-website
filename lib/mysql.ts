import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

export default pool;

// Fonction utilitaire pour exécuter des requêtes
export async function executeQuery(query: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(query, params);
    return results;
  } catch (error) {
    console.error('Erreur de base de données:', error);
    throw error;
  }
}

// Fonction pour obtenir une connexion
export async function getConnection() {
  return await pool.getConnection();
}