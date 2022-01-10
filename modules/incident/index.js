const express = require("express");
const router = express.Router();
const incidentController = require("./incident.controller");

router.get("/", incidentController.index);
router.get("/:id", incidentController.find);

module.exports = router;