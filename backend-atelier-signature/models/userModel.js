import pool  from "../config/db.js";

export class User {
  //Trouver un utilisateur par email
  static async findByEmail(email) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      return rows;
    } catch (error) {
      console.error("Erreur dans findByEmail:", error);
      throw error;
    }
  }

  //Créer un nouvel utilisateur
  static async create({ firstName, lastName, email, password, role }) {
    try {
      const [result] = await pool.query(
        `INSERT INTO users (firstName, lastName, email, password, role)
         VALUES (?, ?, ?, ?, ?)`,
        [firstName, lastName, email, password, role]
      );
      return result.insertId;
    } catch (error) {
      console.error("Erreur dans create:", error);
      throw error;
    }
  }

  //Trouver un utilisateur par ID
  static async findById(id) {
    try {
      const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0];
    } catch (error) {
      console.error("Erreur dans findById:", error);
      throw error;
    }
  }
}
