const { calculateRiskProfile } = require("../services/calculateRiskProfile");

const createRiskProfile = (req, res, next) => {
  try {
    const riskProfile = calculateRiskProfile(req.body);

    res.status(200).send(riskProfile);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRiskProfile,
};
