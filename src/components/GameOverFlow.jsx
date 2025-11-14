import GameResult from "./GameResult.jsx";
import GameOverMessage from "./GameOverMessage.jsx";

import { useEffect, useState } from "react";

export default function GameOverFlow({ finalScores, restart }) {
  const [showGameOverText, setShowGameOverText] = useState(true);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (showGameOverText) {
      const timer = setTimeout(() => {
        setShowGameOverText(false);
        setShowResult(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showGameOverText]);

  return (
    <div className="text-center">
      {showGameOverText && <GameOverMessage />}
      {showResult && <GameResult finalScores={finalScores} restart={restart} />}
    </div>
  );
}
