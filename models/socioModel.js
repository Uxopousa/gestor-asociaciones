const pool = require("../config/database");

async function obtenerTodos() {
    const [rows] = await pool.query(`
        SELECT *
        FROM socios
        ORDER BY apellidos, nombre
    `);

    return rows;
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
    crear,
    obtenerPorId,
    actualizar,
    eliminar
};