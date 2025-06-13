import React from "react";

export default function PopularMotif({ label, origin = "Tidak diketahui", ariaLabel }) {
  const getMotifImage = (label) =>
    `/images/slideshow/${label.toLowerCase().replace(/\s+/g, "-")}.jpg`;

  return (
    <div
      className="w-full h-28 sm:h-32 rounded-md overflow-hidden relative shadow-sm hover:shadow-md transition"
      aria-label={ariaLabel}
    >
      <img
        src={getMotifImage(label)}
        alt={`Motif Batik ${label}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/slideshow/default-batik.jpg";
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
