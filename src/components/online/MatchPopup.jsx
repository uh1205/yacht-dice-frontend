export default function MatchPopup({ show }) {
  if (!show) return null;
  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="z-10 relative bg-white shadow-lg p-8 rounded-xl text-center">
        <h2 className="mb-2 font-bold text-2xl">매칭 성공!</h2>
        <p>잠시 후 게임 화면으로 이동합니다...</p>
      </div>
    </div>
  );
}
