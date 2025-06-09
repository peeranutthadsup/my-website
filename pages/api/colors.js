import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'SellerShopee',
  });

  try {
    const [rows] = await connection.execute(
      'SELECT color_id, color_name, color_code, is_action FROM color WHERE is_action = 1'
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load colors', error: error.message });
  } finally {
    await connection.end();
  }
}