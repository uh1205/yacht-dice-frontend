import { YACHT_RULE } from "../constants/yachtRule.js";
import { CATEGORIES } from "../constants/categories";

export const calculateSubtotal = (scores) => {
  if (!scores) return 0;
  const upperKeys = Object.keys(CATEGORIES.UPPER);
  return upperKeys.reduce((sum, key) => {
    const score = scores[key];
    return sum + (typeof score === "number" ? score : 0);
  }, 0);
};

export const calculateBonus = (scores) => {
  const upperSum = calculateSubtotal(scores);
  if (upperSum >= YACHT_RULE.BONUS_THRESHOLD) {
    return YACHT_RULE.BONUS_SCORE;
  }
  const upperKeys = Object.keys(CATEGORIES.UPPER);
  const allFilled = upperKeys.every((key) => typeof scores[key] === "number");
  if (allFilled && upperSum < YACHT_RULE.BONUS_THRESHOLD) {
    return 0;
  }
  return null;
};

export const calculateTotal = (scores) => {
  const allKeys = [
    ...Object.keys(CATEGORIES.UPPER),
    ...Object.keys(CATEGORIES.LOWER),
  ];

  const totalScore = allKeys.reduce((sum, key) => {
    const score = scores[key];
    return sum + (typeof score === "number" ? score : 0);
  }, 0);

  return totalScore + (calculateBonus(scores) || 0);
};
