import { CATEGORIES } from "../constants/categories.js";
import { MESSAGES } from "../constants/messages.js";
import {
  calculateSubtotal,
  calculateBonus,
  calculateTotal,
} from "../utils/scoreUtils.js";

export default function ScoreBoard({
  turnCount,
  scoresMap,
  currentPlayer,
  diceValues,
  selectCategory,
  players,
  isGameOver,
}) {
  const renderScoreCell = (categoryKey, category, player) => {
    const scores = scoresMap.get(player.id);
    const isSelected = scores[categoryKey] !== undefined;
    const isCurrentPlayer = player.id === currentPlayer.id;
    const isRolled = diceValues.length > 0;

    let scoreToShow = "";
    if (isSelected) scoreToShow = scores[categoryKey];
    else if (isCurrentPlayer && isRolled)
      scoreToShow = category.calculateScore(diceValues);

    const classes = [
      "border-2 border-neutral-600 text-center text-2xl transition-all",
      isSelected ? "font-bold text-black" : "font-light text-stone-400",
      isCurrentPlayer && !isGameOver ? "bg-amber-200" : "",
      !isSelected && isCurrentPlayer && isRolled
        ? "hover:bg-amber-500 hover:text-black cursor-pointer"
        : "",
    ];

    const handleClick = () => {
      if (isCurrentPlayer && !isSelected)
        selectCategory(categoryKey, scoreToShow);
    };

    return (
      <td key={player.id} className={classes.join(" ")} onClick={handleClick}>
        {scoreToShow}
      </td>
    );
  };

  const renderCategories = (categories) =>
    Object.entries(categories).map(([key, category]) => (
      <tr key={key}>
        <td className="h-9 border-2 border-neutral-600 px-3">
          {category.name}
        </td>
        {players.map((player) => renderScoreCell(key, category, player))}
      </tr>
    ));

  const renderSubtotal = () => (
    <tr className="h-7 border-b-2 border-dotted border-white bg-gray-100 text-sm">
      <td className="border-r-2 border-l-2 border-neutral-600 bg-neutral-600 px-3 font-bold text-white">
        {MESSAGES.subtotal}
      </td>
      {players.map((player) => (
        <td
          key={player.id}
          className="border-r-2 border-l-2 border-neutral-600 bg-neutral-400 px-2 text-right text-white"
        >
          {MESSAGES.subtotalValue(calculateSubtotal(scoresMap.get(player.id)))}
        </td>
      ))}
    </tr>
  );

  const renderBonus = () => (
    <tr className="h-9 border-r-2 border-b-2 border-l-2 border-neutral-600 bg-gray-100 font-bold">
      <td className="bg-neutral-600 p-1 px-3 text-white">{MESSAGES.bonus}</td>
      {players.map((player) => (
        <td
          key={player.id}
          className="border-r-2 border-l-2 border-neutral-600 bg-neutral-400 text-center text-2xl text-white"
        >
          {calculateBonus(scoresMap.get(player.id)) !== null
            ? `+${calculateBonus(scoresMap.get(player.id))}`
            : ""}
        </td>
      ))}
    </tr>
  );

  const renderTotal = () => (
    <tr className="border-2 border-neutral-600">
      <td className="border-2 border-neutral-600 bg-neutral-600 p-2 px-3 font-bold text-white">
        {MESSAGES.total}
      </td>
      {players.map((player) => (
        <td
          key={player.id}
          className={`border-2 border-neutral-600 text-center text-2xl ${
            player.id === currentPlayer.id && !isGameOver ? "bg-amber-200" : ""
          }`}
        >
          {calculateTotal(scoresMap.get(player.id))}
        </td>
      ))}
    </tr>
  );

  return (
    <table className="w-75">
      <thead>
        <tr>
          <td className="p-2">
            <div className="flex items-center justify-center gap-4">
              <p className="text-xl">{MESSAGES.turn}</p>
              <p className="text-2xl">{MESSAGES.turnValue(turnCount + 1)}</p>
            </div>
          </td>
          {players.map((player) => (
            <th
              key={player.id}
              rowSpan={2}
              className="w-20 border-2 border-neutral-600 text-center text-lg"
            >
              {player.name}
            </th>
          ))}
        </tr>
        <tr className="h-8">
          <th className="border-2 border-neutral-600 bg-neutral-600 px-3 text-left text-white">
            {MESSAGES.category}
          </th>
        </tr>
      </thead>
      <tbody>
        {renderCategories(CATEGORIES.UPPER)}
        {renderSubtotal()}
        {renderBonus()}
        <tr className="border-none">
          <td
            className="p-1 text-xs text-gray-500"
            colSpan={players.length + 1}
          >
            {MESSAGES.bonusDescription}
          </td>
        </tr>
        {renderCategories(CATEGORIES.LOWER)}
        {renderTotal()}
      </tbody>
    </table>
  );
}
