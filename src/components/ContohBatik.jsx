import React from "react";

export default function ContohBatik({ label, origin = "Tidak diketahui", ariaLabel }) {
  const getMotifImage = (label) =>
    `/images/contohbatik/${label.toLowerCase().replace(/\s+/g, "-")}.jpg`;

  return (
    <div
      className="w-full h-full sm:w-100 sm:h-40 rounded-md overflow-hidden relative shadow-sm hover:shadow-md transition"
      aria-label={ariaLabel}
    >
      <img
        src={getMotifImage(label)}
        alt={`Motif Batik ${label}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/contohbatik/default-batik.jpg";
        }}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Label Nama & Asal */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white px-3 py-1 text-sm">
        <div className="font-semibold">{label}</div>
      </div>
    </div>
  );
}
