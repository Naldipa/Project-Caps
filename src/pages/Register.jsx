import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaCheck, FaSpinner } from "react-icons/fa";
import { supabase } from "../lib/supabase";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateForm = () => {
    // Validasi nama
    if (!formData.name.trim()) {
      setError("Nama lengkap harus diisi");
      return false;
    }

    // Validasi email
    if (!formData.email) {
      setError("Email harus diisi");
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Format email tidak valid");
      return false;
    }

    // Validasi password
    if (!formData.password) {
      setError("Password harus diisi");
      return false;
    } else if (formData.password.length < 6) {
      setError("Password minimal 6 karakter");
      return false;
    }

    // Validasi konfirmasi password
    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi password tidak sama");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      setIsLoading(true);

      // Daftarkan user ke Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (authError) {
        throw new Error(authError.message || "Gagal mendaftarkan akun");
      }

      // 2. Simpan profil user ke tabel profiles
      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: authData.user.id,
          full_name: formData.name,
          email: formData.email,
          created_at: new Date().toISOString(),
        });

        if (profileError) {
          console.error("Profile Error Details:", profileError);
          throw new Error(
            profileError.message || "Gagal menyimpan data profil pengguna"
          );
        }
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat registrasi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Daftar Akun Baru</h2>

      {isSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md flex items-center">
          <FaCheck className="mr-2" />
          Registrasi berhasil! Silakan cek email Anda untuk verifikasi.
        </div>
      )}

      {error && !isSuccess && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
          {error}
        </div>
      )}

      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nama Lengkap
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  touched.name && !formData.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {touched.name && !formData.name && (
              <p className="mt-1 text-xs text-red-600">
                Nama lengkap harus diisi
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  touched.email && !formData.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {touched.email && !formData.email && (
              <p className="mt-1 text-xs text-red-600">Email harus diisi</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur("password")}
                className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  touched.password && !formData.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {touched.password && !formData.password && (
              <p className="mt-1 text-xs text-red-600">Password harus diisi</p>
            )}
            {formData.password && formData.password.length < 6 && (
              <p className="mt-1 text-xs text-red-600">
                Password minimal 6 karakter
              </p>
            )}
          </div>

          {/* Konfirmasi Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Konfirmasi Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => handleBlur("confirmPassword")}
                className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  touched.confirmPassword && !formData.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {touched.confirmPassword && !formData.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">
                Konfirmasi password harus diisi
              </p>
            )}
            {formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">Password tidak sama</p>
              )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                Memproses...
              </>
            ) : (
              "Daftar"
            )}
          </button>
        </form>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-600">
            Kami telah mengirim email verifikasi ke {formData.email}. Silakan
            verifikasi email Anda sebelum login.
          </p>
        </div>
      )}

      <div className="mt-4 text-center text-sm">
        <p className="text-gray-600">
          Sudah punya akun?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            Masuk di sini
          </button>
        </p>
      </div>
    </div>
  );
}
