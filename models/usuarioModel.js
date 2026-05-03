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

async function obtenerTodos() {
  const [rows] = await pool.query(
    `
    SELECT id, nombre, email, rol, activo, created_at
    FROM usuarios
    ORDER BY nombre ASC
    `
  );

  return rows;
}

module.exports = {
  obtenerPorEmail,
  obtenerTodos
};