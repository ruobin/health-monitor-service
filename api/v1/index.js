const express = require("express");
const router = express.Router();

router.use("/endpoint", require("../../modules/endpoint"));
router.use("/inspection", require("../../modules/inspection"));
router.use("/incident", require("../../modules/incident"));
router.use("/status", require("../../modules/status"));

module.exports = router;
