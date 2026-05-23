-- =====================================================
-- Gestor de Asociaciones
-- seed.sql
-- Datos de prueba
-- =====================================================

SET NAMES utf8mb4;

INSERT INTO socios (
    nombre,
    apellidos,
    dni,
    email,
    telefono,
    direccion,
    fecha_alta,
    activo
)
VALUES
(
    'Juan',
    'Pérez García',
    '12345678A',
    'juan.perez@email.com',
    '600111111',
    'Calle Mayor 10',
    '2026-01-15',
    TRUE
),
(
    'María',
    'López Fernández',
    '23456789B',
    'maria.lopez@email.com',
    '600222222',
    'Avenida Castilla 25',
    '2026-02-10',
    TRUE
),
(
    'Carlos',
    'Sánchez Ruiz',
    '34567890C',
    'carlos.sanchez@email.com',
    '600333333',
    'Plaza España 3',
    '2026-03-05',
    TRUE
),
(
    'Laura',
    'Martín Gómez',
    '45678901D',
    'laura.martin@email.com',
    '600444444',
    'Calle Sol 8',
    '2026-04-12',
    TRUE
),
(
    'Pedro',
    'Navarro Díaz',
    '56789012E',
    'pedro.navarro@email.com',
    '600555555',
    'Ronda Norte 14',
    '2026-05-20',
    FALSE
)
ON DUPLICATE KEY UPDATE
    nombre = VALUES(nombre),
    apellidos = VALUES(apellidos),
    email = VALUES(email),
    telefono = VALUES(telefono),
    direccion = VALUES(direccion),
    fecha_alta = VALUES(fecha_alta),
    activo = VALUES(activo);

INSERT INTO usuarios (
    nombre,
    email,
    password_hash,
    rol,
    activo
)
VALUES
(
    'Administrador',
    'admin@gestor.local',
    '$2b$10$.zhOtz739gP.Hx/.JqYSx.PM6NR9D79pV3csqINvsLWu/UbPQNkUu',
    'admin',
    TRUE
)
ON DUPLICATE KEY UPDATE
    nombre = VALUES(nombre),
    password_hash = VALUES(password_hash),
    rol = VALUES(rol),
    activo = VALUES(activo);