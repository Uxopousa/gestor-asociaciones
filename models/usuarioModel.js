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

async function crear(usuario) {
  const [result] = await pool.query(
    `
    INSERT INTO usuarios (nombre, email, password_hash, rol, activo)
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      usuario.nombre,
      usuario.email,
      usuario.password_hash,
      usuario.rol,
      usuario.activo
    ]
  );

  return result.insertId;
}

module.exports = {
  obtenerPorEmail,
  obtenerTodos,
  crear
};