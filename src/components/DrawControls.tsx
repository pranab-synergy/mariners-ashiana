interface DrawControlsProps {
  onDraw: () => void;
  onConfirm: () => void;
  onUnlock: () => void;
  isLocked: boolean;
  hasDrawn: boolean;
}

export default function DrawControls({
  onDraw,
  onConfirm,
  onUnlock,
  isLocked,
  hasDrawn,
}: DrawControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 py-6 print:hidden">
      <button
        onClick={onDraw}
        disabled={isLocked}
        className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {hasDrawn ? "Re-Draw" : "Draw"}
      </button>

      {hasDrawn && !isLocked && (
        <button
          onClick={onConfirm}
          className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
        >
          Confirm &amp; Lock
        </button>
      )}

      {isLocked && (
        <>
          <span className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-sm font-medium">
            Locked
          </span>
          <button
            onClick={onUnlock}
            className="px-6 py-2 bg-rose-600 text-white font-semibold rounded-lg shadow-md hover:bg-rose-700 active:scale-95 transition-all text-sm"
          >
            Unlock
          </button>
        </>
      )}
    </div>
  );
}
