const { calculateRiskProfile } = require("../services/calculateRiskProfile");
const { validator } = require("../middlewares/validator");

const createRiskProfile = (req, res, next) => {
  try {
    const message = validator(req.body);

    if (message === "validated") {
      const riskProfile = calculateRiskProfile(req.body);

      res.status(200).send(riskProfile);
    } else {
      res.status(400).send({ message });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRiskProfile,
};
