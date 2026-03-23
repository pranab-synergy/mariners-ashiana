interface ConfirmationBannerProps {
  lockedAt: string;
}

export default function ConfirmationBanner({
  lockedAt,
}: ConfirmationBannerProps) {
  const date = new Date(lockedAt);
  const formatted = date.toLocaleString("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center print:bg-white print:border-gray-300">
      <p className="text-emerald-800 font-medium">
        Draw confirmed and locked on {formatted}
      </p>
      <p className="text-emerald-600 text-sm mt-1">
        This allocation is final and cannot be changed.
      </p>
    </div>
  );
}
