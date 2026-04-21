const pool = require("./config/database");

async function testConnection() {
    try {
        const [rows] = await pool.query("SELECT NOW() AS fecha");

        console.log(rows);

    } catch (error) {
        console.error(error);
    }
}

testConnection();