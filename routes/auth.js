const express = require("express");

const authController = require("../controllers/authController");
const asyncHandler = require("../utils/asyncHandler");
const { validarLogin } = require("../middlewares/authValidation");

const router = express.Router();

router.get("/", authController.formularioLogin);

router.post("/demo", authController.accesoDemo);

router.post("/", validarLogin, asyncHandler(authController.autenticar));

router.post("/logout", authController.cerrarSesion);

module.exports = router;
