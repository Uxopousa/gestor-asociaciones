const socioModel = require("../models/socioModel");

async function index(req, res) {
    const [resumen, ultimosSocios] = await Promise.all([
        socioModel.obtenerResumen(),
        socioModel.obtenerUltimos(5)
    ]);

    res.render("dashboard/index", {
        titulo: "Dashboard",
        subtitulo: "Visión general del proyecto y acceso rápido a los módulos.",
        resumen,
        ultimosSocios
    });
}

module.exports = {
    index
};