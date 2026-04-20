const express = require("express");
const router = express.Router();

const socioModel = require("../models/socioModel");

router.get("/", async (req, res) => {

    const socios = await socioModel.obtenerTodos();
    console.log(socios);

    res.render("socios/index", {
        socios
    });
});

module.exports = router;