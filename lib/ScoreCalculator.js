const {
  INSURANCE_PLANS: { ECONOMIC, REGULAR, RESPONSIBLE, INELIGIBLE },
} = require("../constants/insurancePlans");
const {
  OPERATORS: { ADD, SUBTRACT },
} = require("../constants/twoOptions");

class ScoreCalculator {
  constructor() {
    this.baseScore = null;

    this.lineScores = {
      auto: null,
      disability: null,
      home: null,
      life: null,
    };

    this.riskProfile = {
      auto: null,
      disability: null,
      home: null,
      life: null,
    };

    this.ineligibleCheck = {
      auto: null,
      disability: null,
      home: null,
      life: null,
    };
  }

  calculateBaseScore(riskAnswers) {
    this.baseScore = riskAnswers.reduce((accu, cur) => accu + cur);
    this.setBaseLineScores();
  }

  setBaseLineScores() {
    for (const key in this.lineScores) {
      this.lineScores[key] = this.baseScore;
    }
  }

  calculateScore(operator, line, score) {
    if (this.riskProfile[line] !== INELIGIBLE) {
      if (operator === ADD) {
        this.lineScores[line] += score;
      }
      if (operator === SUBTRACT) {
        this.lineScores[line] -= score;
      }
    }
  }

  calculateScoresForAllLines(operator, score) {
    if (operator === ADD) {
      for (const key in this.lineScores) {
        if (this.riskProfile[key] !== INELIGIBLE) {
          this.lineScores[key] += score;
        }
      }
    }
    if (operator === SUBTRACT) {
      for (const key in this.lineScores) {
        if (this.riskProfile[key] !== INELIGIBLE) {
          this.lineScores[key] -= score;
        }
      }
    }
  }

  setRiskProfile(line, plan) {
    this.riskProfile[line] = plan;
    if (plan === INELIGIBLE) {
      this.ineligibleCheck[line] = true;
    }
  }

  suggestPlan(score) {
    if (score <= 0) {
      return ECONOMIC;
    } else if ([1, 2].includes(score)) {
      return REGULAR;
    } else {
      return RESPONSIBLE;
    }
  }
}

module.exports = new ScoreCalculator();
