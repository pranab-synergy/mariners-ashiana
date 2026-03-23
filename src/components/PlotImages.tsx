import Image from "next/image";

export default function PlotImages() {
  return (
    <section className="grid grid-cols-2 gap-4 py-6 max-w-lg mx-auto">
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <Image
          src="/images/plots-strip.png"
          alt="8 Plots Strip - Plots 221 to 228"
          width={250}
          height={500}
          className="w-full h-auto max-h-48 object-contain"
        />
        <p className="text-center text-xs text-gray-500 py-1">
          Plots 221 &ndash; 228 Strip
        </p>
      </div>
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <Image
          src="/images/full-map.jpeg"
          alt="Full Layout Map with all plots"
          width={400}
          height={300}
          className="w-full h-auto max-h-48 object-contain"
        />
        <p className="text-center text-xs text-gray-500 py-1">
          Full Layout Map
        </p>
      </div>
    </section>
  );
}
