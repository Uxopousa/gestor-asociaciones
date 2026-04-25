const socioModel = require("../models/socioModel");

async function index(req, res) {
    const socios = await socioModel.obtenerTodos();

    res.render("socios/index", {
        socios
    });
}

function nuevo(req, res) {
    res.render("socios/nuevo");
}

async function crear(req, res) {
    const socio = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        dni: req.body.dni,
        email: req.body.email || null,
        telefono: req.body.telefono || null,
        direccion: req.body.direccion || null,
        fecha_alta: req.body.fecha_alta,
        activo: true
    };

    await socioModel.crear(socio);

    res.redirect("/socios");
}
module.exports = {
    index,
    nuevo,
    crear
};