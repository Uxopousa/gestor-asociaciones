const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect(req.session.user ? "/dashboard" : "/login");
});

module.exports = router;
