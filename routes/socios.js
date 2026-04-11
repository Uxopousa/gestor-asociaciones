const express = require("express");

const router = express.Router();

router.get("/",(req,res)=>{

    res.render("socios/index");
})

module.exports = router;