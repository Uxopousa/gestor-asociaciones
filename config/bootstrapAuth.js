const pool = require("./database");

const adminSeed = {
  nombre: "Administrador",
  email: "admin@gestor.local",
  passwordHash: "$2b$10$.zhOtz739gP.Hx/.JqYSx.PM6NR9D79pV3csqINvsLWu/UbPQNkUu",
  rol: "admin"
};

async function bootstrapAuth() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

        nombre VARCHAR(120) NOT NULL,
        email VARCHAR(150) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        rol ENUM('admin', 'gestor', 'lectura') NOT NULL DEFAULT 'gestor',
        activo BOOLEAN NOT NULL DEFAULT TRUE,

        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            ON UPDATE CURRENT_TIMESTAMP,

        UNIQUE KEY uk_usuarios_email (email)
    )
  `);

  await pool.query(
    `
    INSERT INTO usuarios (nombre, email, password_hash, rol, activo)
    SELECT ?, ?, ?, ?, TRUE
    WHERE NOT EXISTS (
        SELECT 1 FROM usuarios WHERE email = ?
    )
    `,
    [
      adminSeed.nombre,
      adminSeed.email,
      adminSeed.passwordHash,
      adminSeed.rol,
      adminSeed.email
    ]
  );
}

module.exports = bootstrapAuth;