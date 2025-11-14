import { MESSAGES } from "../constants/messages.js";

export default function GameResult({ finalScores, restart }) {
  if (!finalScores.length) return null;

  const winner = finalScores[0];
  const topPlayers = finalScores.filter(
    (player) => player.total === winner.total,
  );
  const isDraw = topPlayers.length > 1;

  return (
    <div className="animate-fadeIn text-center">
      <h2 className="mt-10 mb-4 text-3xl font-bold">{MESSAGES.finalResult}</h2>

      {isDraw ? (
        <p className="mb-2 text-2xl font-bold">{MESSAGES.draw}</p>
      ) : (
        <p className="mb-2 text-2xl">
          <span className="font-bold">{MESSAGES.winner(winner.name)}</span>
        </p>
      )}

      <table className="m-6 mx-auto border-collapse border border-gray-400 text-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">
              {MESSAGES.player}
            </th>
            <th className="border border-gray-400 px-4 py-2">
              {MESSAGES.total}
            </th>
          </tr>
        </thead>

        <tbody>
          {finalScores.map((r) => (
            <tr key={r.id}>
              <td className="border border-gray-400 px-4 py-2">{r.name}</td>
              <td className="border border-gray-400 px-4 py-2 font-bold">
                {r.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={restart}
        className="rounded-2xl bg-blue-500 px-6 py-3 font-bold text-white transition-all hover:bg-blue-400"
      >
        {MESSAGES.restartGame}
      </button>
    </div>
  );
}
