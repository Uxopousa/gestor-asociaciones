const express = require("express");
const router = express.Router();

const sociosController = require("../controllers/sociosController");

router.get("/", sociosController.index);

router.get("/nuevo", sociosController.nuevo);

router.post("/", sociosController.crear);

module.exports = router;