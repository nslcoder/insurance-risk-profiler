# Insurance Risk Profiler

A simple insurance risk profiler that receives user info via an API endpoint and calculates a user's risk profile, which suggests an insurance plan for each line of insurance.

## Challenge Description

Copied from the original repo, which can be found [here](https://github.com/OriginFinancial/origin-backend-take-home-assignment);.

### The user info object

```
{
  "age": 35,
  "dependents": 2,
  "house": {"ownership_status": "owned"},
  "income": 0,
  "marital_status": "married",
  "risk_questions": [0, 1, 0],
  "vehicle": {"year": 2018}
}
```

`risk_questions` is an array of 3 binary values that represent answers to 3 questions related to risks.

### User attributes

All user attributes are required:

- Age (an integer equal or greater than 0).
- The number of dependents (an integer equal or greater than 0).
- Income (an integer equal or greater than 0).
- Marital status ("single" or "married").
- Risk answers (an array with 3 booleans).
- Users can have 0 or 1 house. When they do, it has just one attribute: ownership_status, which can be "owned" or "mortgaged".
- Users can have 0 or 1 vehicle. When they do, it has just one attribute: a positive integer corresponding to the year it was manufactured.

### The risk algorithm

The application receives the JSON payload through the API endpoint and transforms it into a risk profile by calculating a risk score for each line of insurance (life, disability, home & auto) based on the information provided by the user.

First, it calculates the base score by summing the answers from the risk questions, resulting in a number ranging from 0 to 3. Then, it applies the following rules to determine a risk score for each line of insurance.

1. If the user doesn’t have income, vehicles or houses, she is ineligible for disability, auto, and home insurance, respectively.
2. If the user is over 60 years old, she is ineligible for disability and life insurance.
3. If the user is under 30 years old, deduct 2 risk points from all lines of insurance. If she is between 30 and 40 years old, deduct 1.
4. If her income is above $200k, deduct 1 risk point from all lines of insurance.
5. If the user's house is mortgaged, add 1 risk point to her home score and add 1 risk point to her disability score.
6. If the user has dependents, add 1 risk point to both the disability and life scores.
7. If the user is married, add 1 risk point to the life score and remove 1 risk point from disability.
8. If the user's vehicle was produced in the last 5 years, add 1 risk point to that vehicle’s score.

This algorithm results in a final score for each line of insurance, which should be processed using the following ranges:

- 0 and below maps to “economic”.
- 1 and 2 maps to “regular”.
- 3 and above maps to “responsible”.

### Risk profile

```
{
  "auto": "regular",
  "disability": "ineligible",
  "home": "economic",
  "life": "regular"
}
```
