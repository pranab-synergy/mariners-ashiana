import { RATE_PER_SQFT } from "@/lib/data";

export default function Header() {
  return (
    <header className="text-center py-8 border-b-4 border-indigo-600 bg-white">
      <h1 className="text-3xl md:text-4xl font-bold text-indigo-900">
        Mariner&apos;s Ashiana
      </h1>
      <p className="text-lg text-gray-600 mt-2">Plot Allocation Draw</p>
      <p className="text-sm text-gray-500 mt-1">
        Rate: {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(RATE_PER_SQFT)}/sqft
      </p>
    </header>
  );
}
