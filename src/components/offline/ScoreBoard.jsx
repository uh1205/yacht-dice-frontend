import { MESSAGES } from "../../constants/messsages";
import { CATEGORIES } from "../../constants/categories.js";
import { YACHT_RULE } from "../../constants/yachtRule.js";
import {
  calculateSubtotal,
  calculateBonus,
  calculateTotal,
} from "../../utils/scoreUtils.js";

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
        <td className="pr-7 pl-3 border-2 border-neutral-600 h-9">
          {category.name}
        </td>
        {players.map((player) => renderScoreCell(key, category, player))}
      </tr>
    ));

  const renderSubtotal = () => (
    <tr className="bg-gray-100 border-white border-b-2 border-dotted h-7 text-sm">
      <td className="bg-neutral-600 px-3 border-neutral-600 border-r-2 border-l-2 font-bold text-white">
        {MESSAGES.subtotal}
      </td>
      {players.map((player) => (
        <td
          key={player.id}
          className="bg-neutral-400 px-2 border-neutral-600 border-r-2 border-l-2 text-white text-right"
        >
          {MESSAGES.subtotalValue(
            calculateSubtotal(scoresMap.get(player.id)),
            YACHT_RULE.BONUS_THRESHOLD,
          )}
        </td>
      ))}
    </tr>
  );

  const renderBonus = () => (
    <tr className="bg-gray-100 border-neutral-600 border-r-2 border-b-2 border-l-2 h-9 font-bold">
      <td className="bg-neutral-600 p-1 px-3 text-white">
        {MESSAGES.bonus(YACHT_RULE.BONUS_SCORE)}
      </td>
      {players.map((player) => (
        <td
          key={player.id}
          className="bg-neutral-400 border-neutral-600 border-r-2 border-l-2 text-white text-2xl text-center"
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
      <td className="bg-neutral-600 p-2 px-3 border-2 border-neutral-600 font-bold text-white">
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
    <table>
      <thead>
        <tr>
          <td className="p-2">
            <div className="flex flex-col justify-center items-center gap-x-2">
              <p className="text-xl">{MESSAGES.round}</p>
              <p className="text-3xl">
                {MESSAGES.roundValue(turnCount + 1, YACHT_RULE.MAX_ROUNDS)}
              </p>
            </div>
          </td>
          {players.map((player) => (
            <th
              key={player.id}
              rowSpan={2}
              className="border-2 border-neutral-600 w-20 text-xl text-center"
            >
              {player.name}
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
        {renderCategories(CATEGORIES.UPPER)}
        {renderSubtotal()}
        {renderBonus()}
        <tr className="border-none">
          <td
            className="p-1 text-gray-500 text-xs"
            colSpan={players.length + 1}
          >
            {MESSAGES.bonusDescription(
              CATEGORIES.UPPER.ACES.name,
              CATEGORIES.UPPER.SIXES.name,
              YACHT_RULE.BONUS_THRESHOLD,
            )}
          </td>
        </tr>
        {renderCategories(CATEGORIES.LOWER)}
        {renderTotal()}
      </tbody>
    </table>
  );
}
