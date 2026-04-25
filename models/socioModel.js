const pool = require("../config/database");

async function obtenerTodos() {
    const [rows] = await pool.query(`
        SELECT *
        FROM socios
        ORDER BY apellidos, nombre
    `);

    return rows;
}

async function obtenerUltimos(limit = 5) {
    const [rows] = await pool.query(
        `
        SELECT *
        FROM socios
        ORDER BY fecha_alta DESC, id DESC
        LIMIT ?
        `,
        [limit]
    );

    return rows;
}

async function obtenerResumen() {
    const [rows] = await pool.query(`
        SELECT
            COUNT(*) AS total,
            COALESCE(SUM(CASE WHEN activo = 1 THEN 1 ELSE 0 END), 0) AS activos,
            COALESCE(SUM(CASE WHEN activo = 0 THEN 1 ELSE 0 END), 0) AS inactivos
        FROM socios
    `);

    return rows[0];
}


async function crear(socio) {
    const sql = `
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
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
        socio.nombre,
        socio.apellidos,
        socio.dni,
        socio.email,
        socio.telefono,
        socio.direccion,
        socio.fecha_alta,
        socio.activo
    ];

    const [resultado] = await pool.query(sql, valores);

    return resultado;
}
async function obtenerPorId(id) {
    const [rows] = await pool.query(
        "SELECT * FROM socios WHERE id = ?",
        [id]
    );

    return rows[0];
}

async function actualizar(id, socio) {
    const sql = `
        UPDATE socios
        SET
            nombre = ?,
            apellidos = ?,
            dni = ?,
            email = ?,
            telefono = ?,
            direccion = ?,
            fecha_alta = ?,
            activo = ?
        WHERE id = ?
    `;

    const valores = [
        socio.nombre,
        socio.apellidos,
        socio.dni,
        socio.email,
        socio.telefono,
        socio.direccion,
        socio.fecha_alta,
        socio.activo,
        id
    ];

    const [resultado] = await pool.query(sql, valores);

    return resultado;
}
async function eliminar(id) {
    const [resultado] = await pool.query(
        `
        UPDATE socios
        SET activo = FALSE
        WHERE id = ?
        `,
        [id]
    );

    return resultado;
}
module.exports = {
    obtenerTodos,
    obtenerUltimos,
    obtenerResumen,
    crear,
    obtenerPorId,
    actualizar,
    eliminar
};