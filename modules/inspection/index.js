const express = require("express");
const router = express.Router();
const inspectionController = require("./inspection.controller");

router.get("/", inspectionController.index);
router.get("/:id", inspectionController.find);

module.exports = router;