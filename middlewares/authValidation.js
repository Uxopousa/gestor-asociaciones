const { body } = require("express-validator");

const validarLogin = [
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
    .withMessage("La contraseña debe tener al menos 8 caracteres.")
];

module.exports = {
  validarLogin
};