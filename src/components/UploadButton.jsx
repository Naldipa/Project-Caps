import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";

export default function UploadButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/upload");
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center bg-black text-white text-xs font-normal rounded-md px-4 py-2 hover:bg-gray-900"
    >
      <FaUpload className="mr-2" />
      UNGGAH FOTO BATIK ANDA
    </button>
  );
}
