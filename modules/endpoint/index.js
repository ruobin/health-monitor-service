const express = require("express");
const router = express.Router();
const endpointController = require("./endpoint.controller");

router.get("/", endpointController.index);
router.get("/:id", endpointController.find);
router.post("/", endpointController.create);
router.delete("/:id", endpointController.delete);

module.exports = router;