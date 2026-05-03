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

function renderLogin(res, options = {}) {
  return res.status(options.statusCode || 200).render("auth/login", {
    titulo: "Acceso",
    valores: options.valores || {},
    errores: options.errores || {},
    formError: options.formError || ""
  });
}

function formularioLogin(req, res) {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  return renderLogin(res);
}

async function autenticar(req, res) {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  const validationOutcome = validationResult(req);

  if (!validationOutcome.isEmpty()) {
    return renderLogin(res, {
      valores: req.body,
      errores: extraerErrores(validationOutcome),
      statusCode: 422
    });
  }

  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password;

  const usuario = await usuarioModel.obtenerPorEmail(email);

  if (!usuario || !usuario.activo) {
    return renderLogin(res, {
      valores: { email },
      formError: "Credenciales incorrectas.",
      statusCode: 401
    });
  }

  const passwordValida = await bcrypt.compare(password, usuario.password_hash);

  if (!passwordValida) {
    return renderLogin(res, {
      valores: { email },
      formError: "Credenciales incorrectas.",
      statusCode: 401
    });
  }

  req.session.regenerate((error) => {
    if (error) {
      return res.status(500).render("error", {
        titulo: "Error",
        statusCode: 500,
        message: "No ha sido posible iniciar la sesión."
      });
    }

    req.session.user = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    };

    req.session.flashMessage = {
      tipo: "success",
      texto: `Bienvenido, ${usuario.nombre}.`
    };

    return req.session.save(() => res.redirect("/dashboard"));
  });
}

function cerrarSesion(req, res, next) {
  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }

    return res.redirect("/login");
  });
}

module.exports = {
  formularioLogin,
  autenticar,
  cerrarSesion
};