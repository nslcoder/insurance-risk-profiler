const { USER_INFO_PROPERTIES } = require("../constants/userInfoProperties");

const validator = (userInfo) => {
  const userInfoKeys = Object.keys(userInfo);
  const objectLen = userInfoKeys.length;

  // Check if the userInfo object has 7 properties
  if (objectLen < 7 || objectLen > 7) {
    return `The user info object is either empty or doesn't have exact 7 properties.`;
  }

  // Check if the userinfo object has 7 required properties
  const extraProps = userInfoKeys.filter(
    (key) => !USER_INFO_PROPERTIES.includes(key)
  );
  if (extraProps.length > 0) {
    let unmatchedStr = "";

    for (let i = 0; i < extraProps.length; i++) {
      if (i === 0) {
        unmatchedStr += extraProps[i];
      }
      if (i > 0 && i < extraProps.length - 1) {
        unmatchedStr += `, ${extraProps[i]}`;
      }
      if (i === extraProps.length - 1 && extraProps.length > 1) {
        unmatchedStr += ` & ${extraProps[i]}`;
      }
    }

    return `These shouldn't be in the user info object: ${unmatchedStr}.`;
  }

  // Check if the userInfo properties have acceptable values and types
  const {
    age,
    dependents,
    house,
    income,
    marital_status,
    risk_questions,
    vehicle,
  } = userInfo;
  const propErrorMessages = {};

  if (age < 0) {
    propErrorMessages["ageValue"] = "Age should be equal or greather than 0.";
  }
  if (typeof age !== "number") {
    propErrorMessages["ageType"] = "Age should be number.";
  }

  if (dependents < 0) {
    propErrorMessages["dependentValue"] =
      "Dependents should be equal or greather than 0.";
  }
  if (typeof dependents !== "number") {
    propErrorMessages["dependentType"] = "Dependents should be number.";
  }

  if (house !== 0 && typeof house !== "object") {
    propErrorMessages["houseValue"] =
      "House should be 0 if the user doesn't have a house or an object if the user has a house.";
  }
  if (typeof house === "object") {
    if (!["owned", "mortgaged"].includes(house.ownership_status)) {
      propErrorMessages["houseOwnership"] =
        "House ownership status should be either owned or mortgaged.";
    }
  }

  if (income < 0) {
    propErrorMessages["incomeValue"] =
      "Income should be equal or greather than 0.";
  }
  if (typeof income !== "number") {
    propErrorMessages["incomeType"] = "Income should be number.";
  }

  if (!["single", "married"].includes(marital_status)) {
    propErrorMessages["maritalValue"] =
      "Marital status should be either single or married.";
  }
  if (typeof marital_status !== "string") {
    propErrorMessages["maritalType"] = "Marital status should be string.";
  }

  if (risk_questions.length !== 3) {
    propErrorMessages["riskQuestionsLength"] =
      "Risk question should have 3 values.";
  }
  if (!Array.isArray(risk_questions)) {
    propErrorMessages["riskQuestionsType"] = "Risk questions should be array.";
  } else {
    const isBinary = risk_questions.every((rq) => [0, 1].includes(rq));
    if (!isBinary) {
      propErrorMessages["riskQuestionsValue"] =
        "Risk question should have values which are either 0 or 1.";
    }
  }

  if (vehicle !== 0 && typeof vehicle !== "object") {
    propErrorMessages["vehicleValue"] =
      "Vehicle should be 0 if the user doesn't have a vehicle or an object if the user has a vehicle.";
  }
  if (typeof vehicle === "object") {
    if (typeof vehicle.year !== "number") {
      propErrorMessages["vehicleYear"] = "Vehicle year should be number.";
    }
  }

  if (Object.keys(propErrorMessages).length > 0) {
    return propErrorMessages;
  } else {
    return "validated";
  }
};

module.exports = {
  validator,
};
