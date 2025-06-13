import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { faBolt, faBook, faCompass } from "@fortawesome/free-solid-svg-icons";
import UploadButton from "../components/UploadButton";
import Slideshow from "../components/Slideshow";
import Feature from "../components/Feature";
import PopularMotif from "../components/PopularMotif";
import { Link } from "react-router-dom";
import BatikMap from "../components/BatikMap";
import { motifs } from "../data/motifs";

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:px-4 focus:py-2 focus:z-50"
      >
        Loncat ke konten utama
      </a>

      {/* Status Autentikasi */}
      {isAuthenticated && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded text-sm">
          Anda sudah login!
        </div>
      )}

      {/* Hero Section */}
      <section className="text-center mb-10 py-8">
        <h1 className="text-2xl sm:text-3xl font-normal mb-6 text-gray-900">
          Temukan Makna Budaya di Balik Motif Batik
        </h1>
        {isAuthenticated ? (
          <UploadButton />
        ) : (
          <p className="text-sm text-gray-500">
            Silakan{" "}
            <Link to="/Login" className="text-blue-600 hover:underline">
              Login
            </Link>{" "}
            atau{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Daftar
            </Link>{" "}
            untuk mengunggah gambar
          </p>
        )}
      </section>

      {/* Slideshow */}
      <section className="mb-14">
        <Slideshow />
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
        <Feature
          icon={faBolt}
          title="Cepat"
          description="Unggah & Identifikasi"
          ariaLabel="Fitur cepat untuk mengunggah dan mengidentifikasi batik"
        />
        <Feature
          icon={faBook}
          title="Edukatif"
          description="Pelajari Filosofi"
          ariaLabel="Fitur edukatif untuk mempelajari filosofi batik"
        />
        <Feature
          icon={faCompass}
          title="Interaktif"
          description="Jelajahi Ragam Motif"
          ariaLabel="Fitur interaktif untuk menjelajahi ragam motif batik"
        />
      </section>

      {/* Popular Motifs */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-6 text-gray-900">
          Contoh Motif Populer
        </h2>
        <div className="grid grid-cols-1 gap-2 sm:flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 overflow-x-visible pb-2">
          {["Parang", "Kawung", "Mega Mendung", "Srikaton", "Truntum"].map(
            (motif) => (
              <PopularMotif
                key={motif}
                label={motif}
                ariaLabel={`Motif batik ${motif}`}
              />
            )
          )}
        </div>
      </section>

      {/* Batik Map Section */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-6 text-gray-900">
          Persebaran Batik di Indonesia
        </h2>
        <BatikMap motifs={motifs} />
      </section>
    </main>
  );
}
