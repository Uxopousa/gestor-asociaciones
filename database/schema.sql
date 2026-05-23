-- =====================================================
-- Gestor de Asociaciones
-- Esquema de la base de datos
-- Versión 1.0
-- =====================================================

CREATE TABLE IF NOT EXISTS socios (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,

    dni VARCHAR(20) NOT NULL,
    email VARCHAR(150) DEFAULT NULL,
    telefono VARCHAR(20) DEFAULT NULL,
    direccion VARCHAR(255) DEFAULT NULL,

    fecha_alta DATE NOT NULL,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY uk_socios_dni (dni),
    UNIQUE KEY uk_socios_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE socios CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE usuarios CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;