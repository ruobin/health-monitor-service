const express = require("express");
const router = express.Router();
const incidentController = require("./incident.controller");

router.get("/", incidentController.index);
router.get("/:id", incidentController.find);
router.get("/:endpointId", incidentController.findByEndpointId);

module.exports = router;