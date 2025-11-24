import { useState, useMemo } from "react";
import { PLAYERS } from "../constants/players";

export function useScores() {
  const [scoresMap, setScoresMap] = useState(
    new Map(PLAYERS.map((p) => [p.id, {}])),
  );

  const setCategoryScore = (playerId, category, score) => {
    setScoresMap((prev) => {
      const newMap = new Map(prev);
      const prevScores = newMap.get(playerId);
      newMap.set(playerId, { ...prevScores, [category]: score });
      return newMap;
    });
  };

  const finalScores = useMemo(() => {
    const result = [];
    scoresMap.forEach((scores, playerId) => {
      const total = Object.values(scores).reduce((a, b) => a + b, 0);
      const player = PLAYERS.find((p) => p.id === playerId);
      result.push({ ...player, total });
    });
    return result.sort((a, b) => b.total - a.total);
  }, [scoresMap]);

  const resetScores = () =>
    setScoresMap(new Map(PLAYERS.map((p) => [p.id, {}])));

  return {
    scoresMap,
    setCategoryScore,
    finalScores,
    resetScores,
  };
}
