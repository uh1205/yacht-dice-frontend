import { MESSAGES } from "../../constants/messsages";

export default function GameResult({ finalScores, isDraw, winner, quit }) {
  return (
    <div className="text-center animate-fadeIn">
      <h2 className="mt-10 mb-4 font-bold text-3xl">{MESSAGES.finalResult}</h2>

      {isDraw ? (
        <p className="mb-2 font-bold text-2xl">{MESSAGES.draw}</p>
      ) : (
        <p className="mb-2 text-2xl">
          <span className="font-bold">{MESSAGES.winner(winner.nickname)}</span>
        </p>
      )}

      <table className="m-6 mx-auto border border-gray-400 text-lg border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border border-gray-400">
              {MESSAGES.player}
            </th>
            <th className="px-4 py-2 border border-gray-400">
              {MESSAGES.total}
            </th>
          </tr>
        </thead>

        <tbody>
          {finalScores.map((r) => (
            <tr key={r.playerId}>
              <td className="px-4 py-2 border border-gray-400">{r.nickname}</td>
              <td className="px-4 py-2 border border-gray-400 font-bold">
                {r.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={quit}
        className="bg-blue-500 hover:bg-blue-400 px-6 py-3 rounded-2xl font-bold text-white transition-all"
      >
        {MESSAGES.quitGame}
      </button>
    </div>
  );
}
