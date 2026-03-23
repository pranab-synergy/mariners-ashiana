import Image from "next/image";

export default function PlotImages() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <Image
          src="/images/plots-strip.png"
          alt="8 Plots Strip - Plots 221 to 228"
          width={400}
          height={800}
          className="w-full h-auto"
          priority
        />
        <p className="text-center text-sm text-gray-500 py-2">
          Plots 221 &ndash; 228 Strip
        </p>
      </div>
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <Image
          src="/images/full-map.jpeg"
          alt="Full Layout Map with all plots"
          width={800}
          height={600}
          className="w-full h-auto"
          priority
        />
        <p className="text-center text-sm text-gray-500 py-2">
          Full Layout Map
        </p>
      </div>
    </section>
  );
}
