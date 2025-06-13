import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const BatikMap = ({ motifs }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapRef.current) {
      // Inisialisasi peta Indonesia
      mapRef.current = L.map("batik-map", {
        scrollWheelZoom: false,
        attributionControl: true,
      }).setView([-2.5489, 118.0149], 5); // koordinat tengah Indonesia

      // Tambahkan tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);
    }

    // Bersihkan marker lama
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    if (motifs && motifs.length > 0) {
      markersRef.current = motifs
        .map((motif) => {
          if (!motif.position || !Array.isArray(motif.position)) return null;

          const icon = L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
            iconSize: [28, 28],
            iconAnchor: [14, 28],
            popupAnchor: [0, -28],
          });

          const marker = L.marker(motif.position, { icon }).addTo(mapRef.current);

          const popup = document.createElement("div");
          popup.innerHTML = `
            <h3 style="font-weight:bold; font-size:14px; margin-bottom:4px">${motif.name}</h3>
            <img src="${motif.image || "/images/motifs/default-batik.jpg"}" alt="${motif.name}" style="width:100%; height:80px; object-fit:cover; margin-bottom:4px;" />
            <p style="font-size:12px;"><strong>Daerah:</strong> ${motif.origin}</p>
          `;

          marker.bindPopup(popup);
          return marker;
        })
        .filter(Boolean);

      if (markersRef.current.length > 0) {
        const group = L.featureGroup(markersRef.current);
        mapRef.current.fitBounds(group.getBounds(), { padding: [20, 20] });
      }
    }

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
    };
  }, [motifs]);

  return (
    <div
      id="batik-map"
      className="w-full h-64 md:h-80 rounded-md border border-gray-200"
      aria-label="Peta persebaran batik di Indonesia"
      role="application"
    ></div>
  );
};

export default BatikMap;
