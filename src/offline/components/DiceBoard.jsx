import Dice from "./Dice";

import { YACHT_RULE } from "../constants/yachtRule.js";
import { MESSAGES } from "../constants/messages";

export default function DiceBoard({
  diceValues,
  keptFlags,
  rollCount,
  rollDices,
  toggleKeeping,
  currentPlayer,
}) {
  const remainingRollCount = YACHT_RULE.MAX_ROLL_COUNT - rollCount;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-xl">
          {MESSAGES.playerTurn(currentPlayer.name)}
        </h1>
        <p className="font-bold text-lg">
          {MESSAGES.remainingRoll(remainingRollCount)}
        </p>
      </div>

      <div className="flex justify-center items-center gap-3 mb-4 p-4 h-20 font-semibold text-lg">
        {rollCount > 0
          ? diceValues.map((v, i) => (
              <Dice
                key={i}
                value={v}
                isKept={keptFlags[i]}
                onClick={() => toggleKeeping(i)}
              />
            ))
          : MESSAGES.rollPrompt}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={rollDices}
          disabled={remainingRollCount <= 0}
          className="bg-blue-500 hover:bg-blue-400 disabled:bg-gray-400 shadow-lg px-8 py-3 rounded-2xl font-bold text-white transition-all"
        >
          {MESSAGES.rollButton}
        </button>
      </div>
    </div>
  );
}
