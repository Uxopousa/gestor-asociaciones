const { body, param } = require("express-validator");

const nombrePattern = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ'\-\s]+$/;

const validarIdSocio = [
  param("id")
    .toInt()
    .isInt({ gt: 0 })
    .withMessage("El identificador del socio no es válido.")
];

const validarSocio = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres.")
    .matches(nombrePattern)
    .withMessage(
      "El nombre solo puede incluir letras, espacios, guiones y apóstrofes."
    ),
  body("apellidos")
    .trim()
    .notEmpty()
    .withMessage("Los apellidos son obligatorios.")
    .isLength({ min: 2, max: 150 })
    .withMessage("Los apellidos deben tener entre 2 y 150 caracteres.")
    .matches(nombrePattern)
    .withMessage(
      "Los apellidos solo pueden incluir letras, espacios, guiones y apóstrofes."
    ),
  body("dni")
    .trim()
    .toUpperCase()
    .notEmpty()
    .withMessage("El DNI es obligatorio.")
    .matches(/^\d{8}[A-Z]$/)
    .withMessage("El DNI debe tener 8 números y una letra mayúscula."),
  body("email")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("Introduce un email válido.")
    .normalizeEmail(),
  body("telefono")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[0-9\s()+-]{7,20}$/)
    .withMessage("El teléfono no tiene un formato válido."),
  body("direccion")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage("La dirección no puede superar 255 caracteres."),
  body("fecha_alta")
    .trim()
    .notEmpty()
    .withMessage("La fecha de alta es obligatoria.")
    .isISO8601({ strict: true })
    .withMessage("La fecha de alta no tiene un formato válido.")
    .custom((value) => {
      const selectedDate = new Date(`${value}T00:00:00`);
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        throw new Error("La fecha de alta no puede ser futura.");
      }

      return true;
    }),
  body("activo")
    .optional()
    .isIn(["0", "1"])
    .withMessage("El estado del socio no es válido.")
];

module.exports = {
  validarIdSocio,
  validarSocio
};
