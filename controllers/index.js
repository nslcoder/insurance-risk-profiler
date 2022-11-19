const calculateRiskProfile = (req, res, next) => {
  try {
    const { age, dependents, income, marital_status } = req.body;
    return res.send(
      `The user, ${age}, is ${marital_status}. He/she has ${dependents} dependents and makes ${income} annually.`
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  calculateRiskProfile,
};
