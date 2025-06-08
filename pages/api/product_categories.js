import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: '',
    // database: 'SellerShopee',
      host: 'sql300.infinityfree.com',
      user: 'if0_39186742',
      password: '7XczsFrOQa6lXf',
      database: 'if0_39186742_sellershopee',
  });

  try {
    const [rows] = await connection.execute(
      'SELECT product_category_id, product_category_name, is_active FROM product_category WHERE is_active = 1'
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load product categories', error: error.message });
  } finally {
    await connection.end();
  }
}