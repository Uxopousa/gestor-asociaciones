const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const usuarioModel = require("../models/usuarioModel");

function extraerErrores(validationOutcome) {
  return validationOutcome.array().reduce((acumulador, error) => {
    if (!acumulador[error.path]) {
      acumulador[error.path] = error.msg;
    }

    return acumulador;
  }, {});
}

function renderFormulario(res, options = {}) {
  return res.status(options.statusCode || 200).render("usuarios/nuevo", {
    titulo: "Nuevo usuario",
    subtitulo: "Crea una nueva cuenta con acceso al sistema.",
    valores: options.valores || {},
    errores: options.errores || {},
    formError: options.formError || ""
  });
}

async function index(req, res) {
  const usuarios = await usuarioModel.obtenerTodos();

  res.render("usuarios/index", {
    titulo: "Usuarios",
    subtitulo: "Gestión de cuentas con acceso al sistema.",
    usuarios,
    puedeCrearUsuario: req.session.user && req.session.user.rol === "admin"
  });
}

function nuevo(req, res) {
  renderFormulario(res);
}

async function crear(req, res) {
  const validationOutcome = validationResult(req);

  if (!validationOutcome.isEmpty()) {
    return renderFormulario(res, {
      valores: req.body,
      errores: extraerErrores(validationOutcome),
      statusCode: 422
    });
  }

  const passwordHash = await bcrypt.hash(req.body.password, 10);

  try {
    await usuarioModel.crear({
      nombre: req.body.nombre.trim(),
      email: req.body.email.trim().toLowerCase(),
      password_hash: passwordHash,
      rol: req.body.rol,
      activo: req.body.activo !== "0"
    });
  } catch (error) {
    if (error && error.code === "ER_DUP_ENTRY") {
      return renderFormulario(res, {
        valores: req.body,
        formError: "Ya existe un usuario con ese email.",
        statusCode: 409
      });
    }

    throw error;
  }

  req.session.flashMessage = {
    tipo: "success",
    texto: "Usuario creado correctamente."
  };

  res.redirect("/usuarios");
}

module.exports = {
  index,
  nuevo,
  crear
};