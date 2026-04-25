const express = require("express");
const router = express.Router();

const sociosController = require("../controllers/sociosController");

router.get("/", sociosController.index);

router.get("/nuevo", sociosController.nuevo);

router.post("/", sociosController.crear);

router.get("/:id/editar", sociosController.editar);

router.post("/:id", sociosController.actualizar);
router.post("/:id/eliminar", sociosController.eliminar);
module.exports = router;