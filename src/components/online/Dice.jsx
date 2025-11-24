export default function Dice({ value, locked, isMyTurn, canRoll, onClick }) {
  return (
    <div
      onClick={isMyTurn && canRoll ? onClick : undefined}
      className={`flex h-12 w-12 items-center justify-center rounded border text-xl shadow-sm transition-all ${locked && canRoll ? "bg-green-200" : ""} ${isMyTurn && canRoll ? "cursor-pointer" : "cursor-default"}`}
    >
      {value}
    </div>
  );
}
