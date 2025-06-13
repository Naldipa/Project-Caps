import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ContohBatik from "../components/ContohBatik";
import { AuthContext } from "../context/AuthContext";

const Upload = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    if (!isAuthenticated) {
      alert("Silakan login terlebih dahulu untuk mengunggah gambar");
      navigate("/login");
      return;
    }
    fileInputRef.current.click();
  };

  const handleReset = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Silahkan login terlebih dahulu untuk mengunggah gambar");
      navigate("/login");
      return;
    }

    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_FAST_API_URL}/predict`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      navigate("/detail", { state: { result: response.data } });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Terjadi kesalahan saat mengunggah atau memproses gambar.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900">
          IDENTIFIKASI MOTIF BATIK
        </h1>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-yellow-700">
            Anda perlu login untuk mengunggah gambar batik
          </p>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Login Sekarang
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white">
      <main className="flex-grow max-w-3xl mx-auto w-full px-4 py-8">
        <h1 className="text-center text-xl sm:text-2xl font-semibold mb-2 text-gray-900">
          IDENTIFIKASI MOTIF BATIK
        </h1>
        <p className="text-center text-gray-600 text-sm mb-8">
          Unggah foto batik Anda untuk mengetahui makna filosofinya
        </p>

        <form className="max-w-xl mx-auto" onSubmit={handleUpload}>
          <label
            htmlFor="file-upload"
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer py-12 mb-6 transition-colors ${
              selectedFile
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            {selectedFile ? (
              <>
                <i className="fas fa-check-circle text-green-500 text-2xl mb-2"></i>
                <span className="text-center text-gray-700 text-sm font-medium">
                  File Terpilih: {selectedFile.name}
                </span>
              </>
            ) : (
              <>
                <i className="fas fa-cloud-upload-alt text-gray-500 text-2xl mb-2"></i>
                <span className="text-center text-gray-700 text-sm">
                  Area Drag & Drop Gambar
                </span>
                <span className="text-gray-500 text-xs mt-2">atau</span>
              </>
            )}

            <button
              type="button"
              onClick={handleBrowseClick}
              className={`mt-2 text-xs sm:text-sm px-4 py-1.5 rounded-md ${
                selectedFile ? "bg-green-600 text-white" : "bg-black text-white"
              }`}
            >
              {selectedFile ? "GANTI FILE" : "PILIH FILE"}
            </button>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png"
            />
          </label>

          <ul className="mb-6 text-sm text-gray-700 space-y-1">
            <li className="flex items-center">
              <i className="fas fa-check text-green-500 mr-2"></i>
              <span>
                Format yang didukung:
                <span className="font-semibold"> JPG, PNG, JPEG</span>
                <span className="italic"> (max 5MB)</span>
              </span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-check text-green-500 mr-2"></i>
              <span>Pastikan motif terlihat jelas</span>
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mb-10">
            <button
              type="button"
              onClick={handleReset}
              className="border border-gray-700 rounded-md px-4 py-2 text-sm hover:bg-gray-100"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={!selectedFile || loading}
              className={`rounded-md px-4 py-2 text-sm shadow-md ${
                selectedFile
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? "MENGIDENTIFIKASI..." : "IDENTIFIKASI SEKARANG"}
            </button>
          </div>

          <section className="">
            <p>
              <strong>Contoh Foto Batik</strong>
            </p>
            <br />
            <div className="w-full h-full sm:flex flex-col sm:flex-row sm:space-x-2 space-y-4 sm:space-y-0 overflow-x-visible  ">
              {["Parang", "Kawung", "MegaMendung", "Sidoluhur", "Truntum"].map(
                (motif) => (
                  <ContohBatik
                    key={motif}
                    label={motif}
                    ariaLabel={`Motif batik ${motif}`}
                  />
                )
              )}
            </div>
          </section>
        </form>
      </main>
    </div>
  );
};

export default Upload;
