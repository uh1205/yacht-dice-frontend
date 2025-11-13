import {
  countDice,
  countAllDices,
  sumDice,
  hasStraightOfLength,
} from "../utils/diceUtils.js";

export const CATEGORIES = {
  UPPER: {
    ACES: {
      name: "에이스",
      value: 1,
      calculateScore(diceValues) {
        return this.value * countDice(diceValues, this.value);
      },
    },
    DEUCES: {
      name: "듀스",
      value: 2,
      calculateScore(diceValues) {
        return this.value * countDice(diceValues, this.value);
      },
    },
    THREES: {
      name: "트레이",
      value: 3,
      calculateScore(diceValues) {
        return this.value * countDice(diceValues, this.value);
      },
    },
    FOURS: {
      name: "포",
      value: 4,
      calculateScore(diceValues) {
        return this.value * countDice(diceValues, this.value);
      },
    },
    FIVES: {
      name: "파이브",
      value: 5,
      calculateScore(diceValues) {
        return this.value * countDice(diceValues, this.value);
      },
    },
    SIXES: {
      name: "식스",
      value: 6,
      calculateScore(diceValues) {
        return this.value * countDice(diceValues, this.value);
      },
    },
  },
  LOWER: {
    CHOICE: {
      name: "초이스",
      calculateScore(diceValues) {
        return sumDice(diceValues);
      },
    },
    FOUR_OF_A_KIND: {
      name: "포 다이스",
      calculateScore(diceValues) {
        const counts = countAllDices(diceValues);
        return [...counts.values()].some((c) => c >= 4)
          ? sumDice(diceValues)
          : 0;
      },
    },
    FULL_HOUSE: {
      name: "풀 하우스",
      calculateScore(diceValues) {
        const counts = countAllDices(diceValues);
        const values = [...counts.values()];
        return values.includes(2) && values.includes(3)
          ? sumDice(diceValues)
          : 0;
      },
    },
    SMALL_STRAIGHT: {
      name: "S. 스트레이트",
      score: 15,
      calculateScore(diceValues) {
        const counts = countAllDices(diceValues);
        return hasStraightOfLength(counts, 4) ? this.score : 0;
      },
    },
    LARGE_STRAIGHT: {
      name: "L. 스트레이트",
      score: 30,
      calculateScore(diceValues) {
        const counts = countAllDices(diceValues);
        return hasStraightOfLength(counts, 5) ? this.score : 0;
      },
    },
    YACHT: {
      name: "요트",
      score: 50,
      calculateScore(diceValues) {
        const counts = countAllDices(diceValues);
        return [...counts.values()].includes(5) ? this.score : 0;
      },
    },
  },
};
