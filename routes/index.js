const express = require("express");

const router = express.Router();

router.get('/',(req,res)=>{
    res.render("index");
})
// TEMPORAL
router.get("/test", (req, res) => {
    req.session.prueba = "Hola sesión";
    res.send("Sesión creada");
});

router.get("/test2", (req, res) => {
    res.send(req.session.prueba);
});
module.exports = router;