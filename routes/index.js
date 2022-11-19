const express = require("express");
const router = express.Router();

const { calculateRiskProfile } = require("../controllers");

router.post("/", calculateRiskProfile);

module.exports = router;
