const { validationResult } = require("express-validator");
const socioModel = require("../models/socioModel");
const createHttpError = require("../utils/createHttpError");

function extraerErrores(validationOutcome) {
  return validationOutcome.array().reduce((acumulador, error) => {
    if (!acumulador[error.path]) {
      acumulador[error.path] = error.msg;
    }

    return acumulador;
  }, {});
}

function normalizarFormulario(socio = {}) {
  return {
    ...socio,
    nombre: socio.nombre || "",
    apellidos: socio.apellidos || "",
    dni: socio.dni || "",
    email: socio.email || "",
    telefono: socio.telefono || "",
    direccion: socio.direccion || "",
    fecha_alta: socio.fecha_alta
      ? new Date(socio.fecha_alta).toISOString().split("T")[0]
      : "",
    activo:
      typeof socio.activo === "boolean"
        ? socio.activo
          ? "1"
          : "0"
        : socio.activo || "1"
  };
}

function renderFormulario(res, view, options) {
  return res.status(options.statusCode || 200).render(view, {
    titulo: options.titulo,
    subtitulo: options.subtitulo,
    socio: normalizarFormulario(options.socio),
    errores: options.errores || {},
    mostrarEstado: options.mostrarEstado || false
  });
}

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

function esErrorDuplicado(error) {
  return Boolean(error && error.code === "ER_DUP_ENTRY");
}

function obtenerCampoDuplicado(error) {
  const sqlMessage = String(error && error.sqlMessage ? error.sqlMessage : "");

  if (sqlMessage.includes("uk_socios_dni")) {
    return "dni";
  }

  if (sqlMessage.includes("uk_socios_email")) {
    return "email";
  }

  return "dni";
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
  renderFormulario(res, "socios/nuevo", {
    titulo: "Nuevo socio",
    subtitulo: "Registra un nuevo miembro en el sistema.",
    socio: {},
    errores: {},
    mostrarEstado: false
  });
}

async function crear(req, res) {
  const validationOutcome = validationResult(req);

  if (!validationOutcome.isEmpty()) {
    return renderFormulario(res, "socios/nuevo", {
      titulo: "Nuevo socio",
      subtitulo: "Registra un nuevo miembro en el sistema.",
      socio: req.body,
      errores: extraerErrores(validationOutcome),
      mostrarEstado: false,
      statusCode: 422
    });
  }

  const socio = construirSocioDesdeFormulario({
    ...req.body,
    activo: "1"
  });

  try {
    await socioModel.crear(socio);
  } catch (error) {
    if (esErrorDuplicado(error)) {
      const campoDuplicado = obtenerCampoDuplicado(error);

      return renderFormulario(res, "socios/nuevo", {
        titulo: "Nuevo socio",
        subtitulo: "Registra un nuevo miembro en el sistema.",
        socio: req.body,
        errores: {
          [campoDuplicado]: "Ya existe un socio con ese DNI o email."
        },
        mostrarEstado: false,
        formError: "No se ha podido crear el socio porque ya existe un registro duplicado.",
        statusCode: 409
      });
    }

    throw error;
  }

  req.session.flashMessage = {
    tipo: "success",
    texto: "Socio creado correctamente."
  };

  res.redirect("/socios");
}

async function editar(req, res) {
  const socio = await socioModel.obtenerPorId(req.params.id);

  if (!socio) {
    throw createHttpError(404, "Socio no encontrado.");
  }

  renderFormulario(res, "socios/editar", {
    titulo: "Editar socio",
    subtitulo: "Actualiza los datos del socio.",
    socio,
    errores: {},
    mostrarEstado: true
  });
}

async function actualizar(req, res) {
  const validationOutcome = validationResult(req);

  if (!validationOutcome.isEmpty()) {
    return renderFormulario(res, "socios/editar", {
      titulo: "Editar socio",
      subtitulo: "Actualiza los datos del socio.",
      socio: {
        ...req.body,
        id: req.params.id
      },
      errores: extraerErrores(validationOutcome),
      mostrarEstado: true,
      statusCode: 422
    });
  }

  const socioExistente = await socioModel.obtenerPorId(req.params.id);

  if (!socioExistente) {
    throw createHttpError(404, "Socio no encontrado.");
  }

  const socio = construirSocioDesdeFormulario(req.body);

  try {
    await socioModel.actualizar(req.params.id, socio);
  } catch (error) {
    if (esErrorDuplicado(error)) {
      const campoDuplicado = obtenerCampoDuplicado(error);

      return renderFormulario(res, "socios/editar", {
        titulo: "Editar socio",
        subtitulo: "Actualiza los datos del socio.",
        socio: {
          ...req.body,
          id: req.params.id
        },
        errores: {
          [campoDuplicado]: "Ya existe un socio con ese DNI o email."
        },
        mostrarEstado: true,
        formError: "No se han podido guardar los cambios porque ya existe un registro duplicado.",
        statusCode: 409
      });
    }

    throw error;
  }

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
