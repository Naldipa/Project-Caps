import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Ambil nama dari metadata atau fallback ke email
  const displayName = user?.user_metadata?.name || user?.email?.split("@")[0] || "Pengguna";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Menu */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-semibold text-gray-900">
              BatikEye
            </Link>
            <div className="hidden sm:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-gray-900">Beranda</Link>
              <Link to="/gallery" className="text-gray-700 hover:text-gray-900">Galeri</Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900">Tentang</Link>
              <Link to="/upload" className="text-gray-700 hover:text-gray-900">Unggah</Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-700">
                  Hi, <strong>{user.full_name || user.email?.split("@")[0]}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 border border-gray-300 rounded-md px-4 py-1.5 hover:bg-gray-50"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 border border-gray-300 rounded-md px-4 py-1.5 hover:bg-gray-50">
                  Masuk
                </Link>
                <Link to="/register" className="text-gray-700 border border-gray-300 rounded-md px-4 py-1.5 hover:bg-gray-50">
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-lg`} />
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="sm:hidden mt-3 space-y-3">
            <div className="space-y-1">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Beranda</Link>
              <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Galeri</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Tentang</Link>
              <Link to="/upload" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Unggah</Link>

              {isAuthenticated ? (
                <>
                  <p className="px-3 py-2 text-sm text-gray-700">
                    Hi, <strong>{user.full_name || user.email?.split("@")[0]}</strong>
                  </p>
                  <button
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 border border-gray-300 text-gray-700 rounded text-center">Masuk</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 border border-gray-300 text-gray-700 rounded text-center">Daftar</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
