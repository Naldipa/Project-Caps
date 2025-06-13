import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DetailBatik = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-xl font-bold mb-4 text-red-600">Data tidak ditemukan</h2>
        <p className="mb-4 text-gray-600">Silakan unggah gambar batik terlebih dahulu.</p>
        <button
          onClick={() => navigate("/upload")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Kembali ke Upload
        </button>
      </div>
    );
  }

  const { prediction, confidence, info } = result;

  // Konversi nama motif ke nama file gambar
  const normalizeFilename = (label) =>
    label.toLowerCase().replace(/\s+/g, "-").replace(/_/g, "-") + ".jpg";

  const imageUrl = `/images/motifs/${normalizeFilename(prediction)}`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/upload")}
        className="flex items-center text-blue-600 hover:underline mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali
      </button>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Motif: {prediction}</h1>
      <p className="text-sm sm:text-base text-gray-600 mb-6">
        Keakuratan: {(confidence * 100).toFixed(2)}%
      </p>

      {/* Gambar Motif */}
      <div className="mb-10">
        <img
          src={imageUrl}
          alt={`Motif Batik ${prediction}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/motifs/default-batik.jpg";
          }}
          className="w-full max-w-[300px] mx-auto rounded-lg shadow-lg"
          loading="eager"
        />
      </div>

      {/* Filosofi & Sejarah */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white border rounded-lg p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Filosofi Motif</h2>
          <p className="text-gray-700 text-sm sm:text-base">{info?.philosophy || "-"}</p>
        </div>

        <div className="bg-white border rounded-lg p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Sejarah</h2>
          <p className="text-gray-700 text-sm sm:text-base">{info?.history || "-"}</p>
        </div>
      </div>

      {/* Info Tambahan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <section className="bg-gray-50 p-4 sm:p-5 rounded-lg border shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Warna Dominan</h3>
          <div className="flex flex-wrap gap-2">
            {info?.colors?.length > 0 ? (
              info.colors.map((color, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm"
                >
                  {color}
                </span>
              ))
            ) : (
              <p className="text-gray-600">-</p>
            )}
          </div>
        </section>

        <section className="bg-gray-50 p-4 sm:p-5 rounded-lg border shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Penggunaan</h3>
          <p className="text-gray-700 text-sm sm:text-base">{info?.usage || "-"}</p>
        </section>

        <section className="bg-gray-50 p-4 sm:p-5 rounded-lg border shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Asal Daerah</h3>
          <p className="text-gray-700 text-sm sm:text-base">{info?.origin || "-"}</p>
        </section>
      </div>
    </div>
  );
};

export default DetailBatik;
