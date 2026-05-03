const usuarioModel = require("../models/usuarioModel");

async function index(req, res) {
  const usuarios = await usuarioModel.obtenerTodos();

  res.render("usuarios/index", {
    titulo: "Usuarios",
    subtitulo: "Gestión de cuentas con acceso al sistema.",
    usuarios
  });
}

module.exports = {
  index
};