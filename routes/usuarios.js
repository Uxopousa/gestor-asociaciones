const express = require("express");

const usuariosController = require("../controllers/usuariosController");
const asyncHandler = require("../utils/asyncHandler");
const requireAuth = require("../middlewares/requireAuth");
const requireRole = require("../middlewares/requireRole");

const router = express.Router();

router.use(requireAuth);
router.use(requireRole(["admin"]));

router.get("/", asyncHandler(usuariosController.index));

module.exports = router;