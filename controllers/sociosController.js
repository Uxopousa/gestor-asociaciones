const socioModel = require("../models/socioModel");

function construirSocioDesdeFormulario(body) {
    return {
        nombre: body.nombre,
        apellidos: body.apellidos,
        dni: body.dni,
        email: body.email || null,
        telefono: body.telefono || null,
        direccion: body.direccion || null,
        fecha_alta: body.fecha_alta,
        activo: body.activo === "1"
    };
}

async function index(req, res) {
    const socios = await socioModel.obtenerTodos();

    res.render("socios/index", {
        titulo: "Socios",
        subtitulo: "Gestión de altas, bajas y seguimiento de miembros.",
        socios
    });
}

function nuevo(req, res) {
    res.render("socios/nuevo", {
        titulo: "Nuevo socio",
        subtitulo: "Registrar un nuevo miembro en el sistema."
    });
}

async function crear(req, res) {
    try {
        const socio = construirSocioDesdeFormulario({
            ...req.body,
            activo: "1"
        });

        await socioModel.crear(socio);

        req.session.flashMessage = {
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

    if (!socio) {
        return res.status(404).send("Socio no encontrado.");
    }

    res.render("socios/editar", {
        titulo: "Editar socio",
        subtitulo: "Actualiza los datos de un miembro existente.",
        socio
    });
}

async function actualizar(req, res) {
    const socioExistente = await socioModel.obtenerPorId(req.params.id);

    if (!socioExistente) {
        return res.status(404).send("Socio no encontrado.");
    }

    const socio = construirSocioDesdeFormulario(req.body);

    await socioModel.actualizar(req.params.id, socio);

    req.session.flashMessage = {
        tipo: "success",
        texto: "Socio actualizado correctamente."
    };

    res.redirect("/socios");
}

async function eliminar(req, res) {

    await socioModel.eliminar(req.params.id);

    req.session.flashMessage = {
        tipo: "success",
        texto: "Socio dado de baja correctamente."
    };

    res.redirect("/socios");
}

module.exports = {
    index,
    nuevo,
    crear,
    editar,
    actualizar,
    eliminar
};