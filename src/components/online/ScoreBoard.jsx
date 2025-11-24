import { MESSAGES } from "../../constants/messsages";

export default function ScoreBoard({
  totalRounds,
  bonusScore,
  bonusThreshold,
  players,
  upperCategories,
  lowerCategories,
  isGameOver,
  isRolled,
  currentRound,
  currentPlayer,
  possibleScores,
  playerStates,
  recordScore,
}) {
  const renderCategories = (categories) =>
    categories.map((category) => (
      <tr key={category}>
        <td className="pr-7 pl-3 border-2 border-neutral-600 h-9">
          {category}
        </td>
        {players.map((player) => renderScoreCell(category, player))}
      </tr>
    ));

  const renderScoreCell = (category, player) => {
    const playerState = playerStates?.find(
      (p) => p.playerId === player.playerId,
    );
    const playerScores = playerState?.scores;
    const isSelected = playerScores?.[category] !== undefined;

    const isCurrentPlayer =
      currentPlayer && player.playerId === currentPlayer.playerId;

    let scoreToShow = "";
    if (isSelected) scoreToShow = playerScores[category];
    else if (isCurrentPlayer && isRolled)
      scoreToShow = possibleScores?.[category] ?? "";

    const classes = [
      "border-2 border-neutral-600 text-center text-2xl transition-all",
      isSelected ? "font-bold text-black" : "font-light text-stone-400",
      isCurrentPlayer && !isGameOver ? "bg-amber-200" : "",
      !isSelected && isCurrentPlayer && isRolled
        ? "hover:bg-amber-500 hover:text-black cursor-pointer"
        : "",
    ];

    const handleClick = () => {
      if (isCurrentPlayer && !isSelected && scoreToShow !== "")
        recordScore(category);
    };

    return (
      <td
        key={player.playerId}
        className={classes.join(" ")}
        onClick={handleClick}
      >
        {scoreToShow}
      </td>
    );
  };

  const renderSubtotal = () => (
    <tr className="bg-gray-100 border-white border-b-2 border-dotted h-7 text-sm">
      <td className="bg-neutral-600 px-3 border-neutral-600 border-r-2 border-l-2 font-bold text-white">
        {MESSAGES.subtotal}
      </td>
      {players.map((player) => (
        <td
          key={player.playerId}
          className="bg-neutral-400 px-2 border-neutral-600 border-r-2 border-l-2 text-white text-right"
        >
          {MESSAGES.subtotalValue(
            playerStates?.find((p) => p.playerId === player.playerId)
              ?.subtotal ?? 0,
            bonusThreshold,
          )}
        </td>
      ))}
    </tr>
  );

  const renderBonus = () => (
    <tr className="bg-gray-100 border-neutral-600 border-r-2 border-b-2 border-l-2 h-9 font-bold">
      <td className="bg-neutral-600 p-1 px-3 text-white">
        {MESSAGES.bonus(bonusScore)}
      </td>
      {players.map((player) => (
        <td
          key={player.playerId}
          className="bg-neutral-400 border-neutral-600 border-r-2 border-l-2 text-white text-2xl text-center"
        >
          {playerStates?.find((p) => p.playerId === player.playerId)
            ?.bonusAwarded
            ? `+${bonusScore}`
            : playerStates?.find((p) => p.playerId === player.playerId)
                  ?.isUpperFull
              ? "+0"
              : ""}
        </td>
      ))}
    </tr>
  );

  const renderTotal = () => (
    <tr className="border-2 border-neutral-600">
      <td className="bg-neutral-600 p-2 px-3 border-2 border-neutral-600 font-bold text-white">
        {MESSAGES.total}
      </td>
      {players.map((player) => (
        <td
          key={player.playerId}
          className={`border-2 border-neutral-600 text-center text-2xl ${
            currentPlayer &&
            player.playerId === currentPlayer.playerId &&
            !isGameOver
              ? "bg-amber-200"
              : ""
          }`}
        >
          {playerStates?.find((p) => p.playerId === player.playerId)?.total ??
            0}
        </td>
      ))}
    </tr>
  );

  return (
    <table>
      <thead>
        <tr>
          <td className="p-2">
            <div className="flex flex-col justify-center items-center gap-x-2">
              <p className="text-xl">{MESSAGES.round}</p>
              <p className="text-3xl">
                {MESSAGES.roundValue(currentRound, totalRounds)}
              </p>
            </div>
          </td>
          {players.map((player) => (
            <th
              key={player.playerId}
              rowSpan={2}
              className="p-1 border-2 border-neutral-600 min-w-20 max-w-25 text-xl text-center wrap-break-word"
            >
              {player.nickname}
            </th>
          ))}
        </tr>

        <tr className="h-8">
          <th className="bg-neutral-600 px-3 border-2 border-neutral-600 text-white text-left">
            {MESSAGES.category}
          </th>
        </tr>
      </thead>

      <tbody>
        {renderCategories(upperCategories)}
        {renderSubtotal()}
        {renderBonus()}
        <tr className="border-none">
          <td
            className="p-1 text-gray-500 text-xs"
            colSpan={players.length + 1}
          >
            {MESSAGES.bonusDescription(
              upperCategories[0],
              upperCategories[upperCategories.length - 1],
              bonusThreshold,
            )}
          </td>
        </tr>
        {renderCategories(lowerCategories)}
        {renderTotal()}
      </tbody>
    </table>
  );
}
