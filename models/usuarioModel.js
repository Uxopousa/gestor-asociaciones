const pool = require("../config/database");

async function obtenerPorEmail(email) {
  const [rows] = await pool.query(
    `
    SELECT id, nombre, email, password_hash, rol, activo
    FROM usuarios
    WHERE email = ?
    LIMIT 1
    `,
    [email]
  );

  return rows[0] || null;
}

module.exports = {
  obtenerPorEmail
};