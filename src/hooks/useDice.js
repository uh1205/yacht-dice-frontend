import { useState } from "react";
import { YACHT_RULE } from "../constants/yachtRule";

export function useDice() {
  const [diceValues, setDiceValues] = useState([]);
  const [keptFlags, setKeptFlags] = useState(
    Array.from({ length: YACHT_RULE.DICE_COUNT }, () => false),
  );
  const [rollCount, setRollCount] = useState(0);

  const rollDices = () => {
    if (rollCount >= YACHT_RULE.MAX_ROLL_COUNT) return;
    const getRandom = () => Math.floor(Math.random() * 6) + 1;

    setDiceValues((prev) =>
      Array.from({ length: YACHT_RULE.DICE_COUNT }, (_, i) =>
        keptFlags[i] ? prev[i] : getRandom(),
      ),
    );

    setRollCount((c) => c + 1);
  };

  const toggleKeeping = (i) => {
    setKeptFlags((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  const resetDice = () => {
    setDiceValues([]);
    setKeptFlags(Array.from({ length: YACHT_RULE.DICE_COUNT }, () => false));
    setRollCount(0);
  };

  return {
    diceValues,
    keptFlags,
    rollCount,
    rollDices,
    toggleKeeping,
    resetDice,
  };
}
