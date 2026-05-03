const express = require("express");

const dashboardController = require("../controllers/dashboardController");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.get("/", requireAuth, dashboardController.index);

module.exports = router;
