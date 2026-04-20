-- =====================================================
-- Gestor de Asociaciones
-- Esquema de la base de datos
-- Versión 1.0
-- =====================================================

CREATE TABLE socios (
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
);