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
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">
          {MESSAGES.playerTurn(currentPlayer.name)}
        </h1>
        <p className="text-lg font-bold">
          {MESSAGES.remainingRoll(remainingRollCount)}
        </p>
      </div>
      <div className="mb-4 flex h-20 items-center justify-center gap-3 p-4 text-lg font-semibold">
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
      <div className="flex items-center justify-between">
        <button
          onClick={rollDices}
          disabled={remainingRollCount <= 0}
          className="rounded-2xl bg-blue-500 px-8 py-3 font-bold text-white shadow-lg transition-all hover:bg-blue-400 disabled:bg-gray-400"
        >
          {MESSAGES.rollButton}
        </button>
      </div>
    </div>
  );
}
