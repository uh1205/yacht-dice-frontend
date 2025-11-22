export default function Dice({ value, isKept, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded border text-xl shadow-sm transition-all ${isKept ? "bg-green-200" : ""}`}
    >
      {value}
    </div>
  );
}
