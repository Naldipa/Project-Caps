import { useState } from "react";

// Metadata motif
const metadata = {
  "Parang": {
    origin: "Yogyakarta",
    philosophy: "Simbol kekuatan, keberanian, dan kontinuitas dalam perjuangan.",
    colors: ["Coklat", "Hitam", "Putih"]
  },
  "Kawung": {
    origin: "Solo",
    philosophy: "Kesucian, kendali diri, dan keadilan.",
    colors: ["Putih", "Coklat", "Merah"]
  },
  "Mega Mendung": {
    origin: "Cirebon",
    philosophy: "Kesabaran dan pengendalian diri seperti awan mendung yang menyejukkan.",
    colors: ["Biru", "Putih", "Merah"]
  },
  "SidoLuhur": {
    origin: "Solo",
    philosophy: "Harapan untuk mencapai kedudukan tinggi dan berbudi luhur.",
    colors: ["Coklat", "Krem", "Emas"]
  },
  "Truntum": {
    origin: "Solo",
    philosophy: "Simbol cinta yang tumbuh dan berkembang seperti bintang-bintang di langit.",
    colors: ["Biru", "Putih", "Emas"]
  },
  "Jumputan": {
    origin: "Pekalongan",
    philosophy: "Menggambarkan keberagaman dan keceriaan.",
    colors: ["Ungu", "Putih", "Hitam"]
  },
  "Sidomukti": {
    origin: "Solo",
    philosophy: "Simbol kehidupan bahagia dan sejahtera.",
    colors: ["Coklat", "Putih", "Emas"]
  },
  "Sidomulyo": {
    origin: "Solo",
    philosophy: "Harapan akan masa depan yang sejahtera dan penuh kebahagiaan.",
    colors: ["Kuning", "Putih", "Coklat"]
  },
  "Srikaton": {
    origin: "Yogyakarta",
    philosophy: "Keanggunan dan keindahan yang memikat hati.",
    colors: ["Pink", "Ungu", "Coklat"]
  },
  "SekarJagad": {
    origin: "Magelang",
    philosophy: "Melambangkan keindahan dan keberagaman dunia.",
    colors: ["Merah", "Putih", "Biru"]
  },
  "Tribusono": {
    origin: "Solo",
    philosophy: "Melambangkan harmoni antara manusia, alam, dan Tuhan.",
    colors: ["Coklat", "Putih", "Hitam"]
  },
  "Wahyu Tumurun": {
    origin: "Surakarta",
    philosophy: "Harapan agar berkah dan wahyu turun dari langit.",
    colors: ["Hitam", "Emas", "Coklat"]
  },
  "Wirasat": {
    origin: "Yogyakarta",
    philosophy: "Petunjuk dan wasiat untuk keturunan dalam menjalani hidup.",
    colors: ["Coklat", "Putih", "Merah"]
  }
};

const getMotifImage = (name) =>
  `/images/slideshow/${name.toLowerCase().replace(/\s+/g, "-")}.jpg`;

const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const perPage = 6;

  const motifList = Object.entries(metadata).map(([name, info]) => ({
    name,
    origin: info.origin,
    description: info.philosophy,
    colors: info.colors
  }));

  const filteredMotifs = motifList.filter((motif) =>
    motif.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMotifs.length / perPage);
  const paginated = filteredMotifs.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Koleksi Motif Batik</h2>

      {/* Input Pencarian */}
      <div className="mb-6 max-w-md mx-auto relative">
        <input
          type="text"
          placeholder="Cari motif batik..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // reset halaman saat mencari
          }}
          className="w-full border border-gray-300 rounded-md py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M5 11a6 6 0 1112 0 6 6 0 01-12 0z" />
          </svg>
        </span>
      </div>

      {/* Grid Motif */}
      {filteredMotifs.length === 0 ? (
        <p className="text-center text-gray-500">Motif tidak ditemukan.</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {paginated.map((motif) => (
              <div
                key={motif.name}
                className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
                aria-label={`Kartu motif ${motif.name}`}
              >
                <div className="relative h-40">
                  <img
                    src={getMotifImage(motif.name)}
                    alt={`Motif Batik ${motif.name}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/motifs/default-batik.jpg";
                    }}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-tr">
                    {motif.origin}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-gray-900 font-semibold mb-1">{motif.name}</h3>
                  <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                    {motif.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {motif.colors.map((color, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 bg-gray-100 rounded-full border text-gray-800"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <nav className="flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <span className="text-sm">Halaman {currentPage} dari {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
            >
              Berikutnya 
            </button>
          </nav>
        </>
      )}
    </div>
  );
};

export default Gallery;
