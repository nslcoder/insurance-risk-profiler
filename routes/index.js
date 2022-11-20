const express = require("express");
const router = express.Router();

const { createRiskProfile } = require("../controllers");

router.post("/", createRiskProfile);

module.exports = router;
