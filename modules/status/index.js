const express = require("express");
const router = express.Router();
const statusController = require("./status.controller");

router.get("/", statusController.index);

module.exports = router;
