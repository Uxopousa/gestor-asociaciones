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
module.exports = {
    obtenerTodos,
    crear
};