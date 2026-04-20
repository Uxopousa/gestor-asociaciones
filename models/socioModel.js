const pool = require("../config/database");

async function obtenerTodos() {
    const [rows] = await pool.query(`
        SELECT *
        FROM socios
        ORDER BY apellidos, nombre
    `);

    return rows;
}

module.exports = {
    obtenerTodos
};