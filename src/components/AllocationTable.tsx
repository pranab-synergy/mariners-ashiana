import { Allocation } from "@/types";
import { formatINR } from "@/lib/data";

interface AllocationTableProps {
  allocations: Allocation[];
  isLocked: boolean;
}

export default function AllocationTable({
  allocations,
  isLocked,
}: AllocationTableProps) {
  if (allocations.length === 0) return null;

  const totalCost = allocations.reduce((sum, a) => sum + a.plot.cost, 0);

  return (
    <section className="py-6">
      {isLocked && (
        <div className="text-center mb-3">
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full uppercase tracking-wide">
            Confirmed
          </span>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-indigo-900 text-white text-sm">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Member ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-center">Plot No.</th>
              <th className="px-4 py-3 text-right">Area (sqft)</th>
              <th className="px-4 py-3 text-right">Cost</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((a, i) => (
              <tr
                key={a.plot.number}
                className={`border-b text-sm transition-colors ${
                  a.plot.highlight === "yellow"
                    ? "bg-amber-50"
                    : i % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                <td className="px-4 py-3 font-mono text-gray-600">
                  {a.member.id}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {a.member.name}
                </td>
                <td className="px-4 py-3 text-center font-semibold">
                  {a.plot.number}
                  {a.plot.highlight === "yellow" && (
                    <span className="ml-1 text-amber-500 text-xs">★</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {a.plot.areaSqft.toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3 text-right tabular-nums font-medium">
                  {formatINR(a.plot.cost)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-indigo-50 font-semibold text-sm">
              <td colSpan={4} className="px-4 py-3 text-right">
                Total
              </td>
              <td className="px-4 py-3 text-right tabular-nums">
                {allocations
                  .reduce((sum, a) => sum + a.plot.areaSqft, 0)
                  .toLocaleString("en-IN")}
              </td>
              <td className="px-4 py-3 text-right tabular-nums">
                {formatINR(totalCost)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
