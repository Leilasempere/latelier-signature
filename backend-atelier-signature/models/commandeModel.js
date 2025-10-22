import pool from "../config/db.js";

export const Commande = {

  create: async ({ user_id, formation_id, stripe_payment_id, status = "pending" }) => {
    const [result] = await pool.execute(
      `INSERT INTO commandes (user_id, formation_id, stripe_payment_id, status)
       VALUES (?, ?, ?, ?)`,
      [user_id, formation_id, stripe_payment_id, status]
    );
    return { id: result.insertId };
  },


  findAll: async () => {
    const [rows] = await pool.execute(`
      SELECT 
        commandes.*, 
        users.firstname, 
        users.lastname, 
        formations.title AS formation_title
      FROM commandes
      JOIN users ON commandes.user_id = users.id
      JOIN formations ON commandes.formation_id = formations.id
      ORDER BY commandes.date_creation DESC
    `);
    return rows;
  },


  findById: async (id) => {
    const [rows] = await pool.execute(
      `SELECT * FROM commandes WHERE id = ?`,
      [id]
    );
    return rows[0];
  },


  updatePDF: async (id, pdfPath) => {
    await pool.execute(
      `UPDATE commandes SET pdf_file = ?, status = 'sent' WHERE id = ?`,
      [pdfPath, id]
    );
  },


  delete: async (id) => {
    await pool.execute(`DELETE FROM commandes WHERE id = ?`, [id]);
  },
};