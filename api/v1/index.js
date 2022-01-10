const express = require("express");
const router = express.Router();

router.use("/endpoint", require("../../modules/endpoint"));
router.use("/inspection", require("../../modules/inspection"));
router.use("/incident", require("../../modules/incident"));

module.exports = router;
