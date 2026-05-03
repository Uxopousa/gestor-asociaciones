const express = require("express");
const router = express.Router();

const sociosController = require("../controllers/sociosController");
const asyncHandler = require("../utils/asyncHandler");
const {
  validarIdSocio,
  validarSocio
} = require("../middlewares/sociosValidation");

router.get("/", asyncHandler(sociosController.index));

router.get("/nuevo", sociosController.nuevo);

router.post("/", validarSocio, asyncHandler(sociosController.crear));

router.get(
  "/:id/editar",
  validarIdSocio,
  asyncHandler(sociosController.editar)
);

router.post(
  "/:id",
  validarIdSocio,
  validarSocio,
  asyncHandler(sociosController.actualizar)
);
router.post(
  "/:id/eliminar",
  validarIdSocio,
  asyncHandler(sociosController.eliminar)
);
module.exports = router;
