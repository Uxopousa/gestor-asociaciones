const { body } = require("express-validator");

const rolesPermitidos = ["admin", "gestor", "lectura"];

const validarUsuario = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ min: 2, max: 120 })
    .withMessage("El nombre debe tener entre 2 y 120 caracteres."),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("Introduce un email válido.")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isLength({ min: 8, max: 100 })
    .withMessage("La contraseña debe tener al menos 8 caracteres."),
  body("rol")
    .trim()
    .notEmpty()
    .withMessage("El rol es obligatorio.")
    .isIn(rolesPermitidos)
    .withMessage("El rol seleccionado no es válido."),
  body("activo").optional().isIn(["1", "0"])
];

module.exports = {
  validarUsuario
};