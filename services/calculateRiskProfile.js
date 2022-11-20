const scoreCalculator = require("../lib/ScoreCalculator");
const { lineScores, riskProfile, ineligibleCheck } = scoreCalculator;

const calculateBaseScore =
  scoreCalculator.calculateBaseScore.bind(scoreCalculator);
const setRiskProfile = scoreCalculator.setRiskProfile.bind(scoreCalculator);
const calculateScoresForAllLines =
  scoreCalculator.calculateScoresForAllLines.bind(scoreCalculator);
const calculateScore = scoreCalculator.calculateScore.bind(scoreCalculator);
const suggestPlan = scoreCalculator.suggestPlan.bind(scoreCalculator);

const {
  INSURANCE_LINES: { AUTO, DISABILITY, HOME, LIFE },
} = require("../constants/insuranceLines");
const {
  INSURANCE_PLANS: { INELIGIBLE },
} = require("../constants/insurancePlans");
const {
  HOUSE_OWNERSHIP: { MORTGAGED },
  OPERATORS: { ADD, SUBTRACT },
  MARITAL_STATUS: { MARRIED },
} = require("../constants/twoOptions");

const { findCurrentYear } = require("../utils/findCurrentYear");

const calculateRiskProfile = (userInfo) => {
  const {
    age,
    dependents,
    house,
    income,
    marital_status,
    risk_questions,
    vehicle,
  } = userInfo;

  calculateBaseScore(risk_questions);

  !income && setRiskProfile(DISABILITY, INELIGIBLE);
  !vehicle && setRiskProfile(AUTO, INELIGIBLE);
  !house && setRiskProfile(HOME, INELIGIBLE);

  age > 60 &&
    (setRiskProfile(DISABILITY, INELIGIBLE), setRiskProfile(LIFE, INELIGIBLE));

  const allIneligible = Object.entries(ineligibleCheck).every(
    (line) => line[1]
  );

  if (!allIneligible) {
    age < 30 && calculateScoresForAllLines(SUBTRACT, 2);

    age >= 30 && age <= 40 && calculateScoresForAllLines(SUBTRACT, 1);

    income > 200000 && calculateScoresForAllLines(SUBTRACT, 1);

    house.ownership_status === MORTGAGED &&
      (calculateScore(ADD, HOME, 1), calculateScore(ADD, DISABILITY, 1));

    dependents > 1 &&
      (calculateScore(ADD, LIFE, 1), calculateScore(ADD, DISABILITY, 1));

    marital_status === MARRIED &&
      (calculateScore(ADD, LIFE, 1), calculateScore(SUBTRACT, DISABILITY, 1));

    vehicle.year > findCurrentYear() - 5 && calculateScore(ADD, AUTO, 1);

    // Suggest insurance plans
    if (!ineligibleCheck.auto) {
      const plan = suggestPlan(lineScores.auto);
      setRiskProfile(AUTO, plan);
    }

    if (!ineligibleCheck.disability) {
      const plan = suggestPlan(lineScores.disability);
      setRiskProfile(DISABILITY, plan);
    }

    if (!ineligibleCheck.home) {
      const plan = suggestPlan(lineScores.home);
      setRiskProfile(HOME, plan);
    }

    if (!ineligibleCheck.life) {
      const plan = suggestPlan(lineScores.life);
      setRiskProfile(LIFE, plan);
    }
  }

  return { lineScores, ineligibleCheck, riskProfile };
};

module.exports = {
  calculateRiskProfile,
};
