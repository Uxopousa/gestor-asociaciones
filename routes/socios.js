const express = require("express");
const router = express.Router();

const sociosController = require("../controllers/sociosController");
const asyncHandler = require("../utils/asyncHandler");
const requireAuth = require("../middlewares/requireAuth");
const requireRole = require("../middlewares/requireRole");
const {
  validarIdSocio,
  validarSocio
} = require("../middlewares/sociosValidation");

router.use(requireAuth);

router.get("/", asyncHandler(sociosController.index));

router.get("/nuevo", requireRole(["admin", "gestor"]), sociosController.nuevo);

router.post(
  "/",
  requireRole(["admin", "gestor"]),
  validarSocio,
  asyncHandler(sociosController.crear)
);

router.get(
  "/:id/editar",
  requireRole(["admin", "gestor"]),
  validarIdSocio,
  asyncHandler(sociosController.editar)
);

router.post(
  "/:id",
  requireRole(["admin", "gestor"]),
  validarIdSocio,
  validarSocio,
  asyncHandler(sociosController.actualizar)
);
router.post(
  "/:id/eliminar",
  requireRole(["admin", "gestor"]),
  validarIdSocio,
  asyncHandler(sociosController.eliminar)
);
module.exports = router;
