import pool from "../config/db.js";

export const Formation = {
  // Récupérer toutes les formations
  findAll: async () => {
    const [rows] = await pool.execute(
      "SELECT * FROM formations ORDER BY date_creation DESC"
    );
    return rows;
  },

  // Récupérer une formation par ID
  findById: async (id) => {
    const [rows] = await pool.execute(
      "SELECT * FROM formations WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  // Créer une nouvelle formation
  create: async ({ title, description, price, category }) => {
    const sql = `INSERT INTO formations (title, description, price, category, detailed_formation) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [title, description, price, category, detailed_formation]);
    return { id: result.insertId, title, description, price, category, detailed_formation };
  },

  // Retirer une formation
  remove: async (id) => {
    const [result] = await pool.execute(`DELETE FROM formations WHERE id = ?`, [id]);
    return result.affectedRows > 0;
  },
};



