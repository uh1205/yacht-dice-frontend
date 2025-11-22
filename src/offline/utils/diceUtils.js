export const countDice = (diceValues, value) => {
  return diceValues.filter((v) => v === value).length;
};

export const countAllDices = (diceValues) => {
  const counts = new Map();
  for (const v of diceValues) {
    counts.set(v, (counts.get(v) || 0) + 1);
  }
  return counts;
};

export const sumDice = (diceValues) => diceValues.reduce((a, b) => a + b, 0);

export const hasStraightOfLength = (diceCounts, length) => {
  const numbers = [...diceCounts.keys()].sort((a, b) => a - b);
  let consecutive = 1;

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] === numbers[i - 1] + 1) {
      consecutive++;
      if (consecutive >= length) return true;
    } else {
      consecutive = 1;
    }
  }
  return false;
};
