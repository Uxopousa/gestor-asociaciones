const socioModel = require("../models/socioModel");

async function index(req, res) {
    const socios = await socioModel.obtenerTodos();

    const mensaje = req.session.mensaje;

    delete req.session.mensaje;

    res.render("socios/index", {
        socios,
        mensaje
    });
}

function nuevo(req, res) {
    res.render("socios/nuevo");
}

async function crear(req, res) {
    try {
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

req.session.mensaje = {
    tipo: "success",
    texto: "Socio creado correctamente."
};

res.redirect("/socios");
    } catch (error) {
        console.error(error);

        res.status(500).send("Error al crear el socio.");
    }
}
async function editar(req, res) {

    const socio = await socioModel.obtenerPorId(req.params.id);

    res.render("socios/editar", {
        socio
    });

}

async function actualizar(req, res) {

    const socio = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        dni: req.body.dni,
        email: req.body.email || null,
        telefono: req.body.telefono || null,
        direccion: req.body.direccion || null,
        fecha_alta: req.body.fecha_alta,
        activo: req.body.activo === "1"
    };

    await socioModel.actualizar(req.params.id, socio);

    req.session.mensaje = {
        tipo: "success",
        texto: "Socio actualizado correctamente."
    };

    res.redirect("/socios");

}
module.exports = {
    index,
    nuevo,
    crear,
    editar,
    actualizar
};