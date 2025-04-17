// src/components/Modal.jsx
import { Link } from "react-router-dom";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white text-black rounded-lg p-6 w-full max-w-sm shadow-lg relative">
        <h2 className="text-lg font-bold mb-2">Доступ ограничен</h2>
        <p className="mb-4 text-sm">
          Для просмотра подробностей, пожалуйста, войдите или зарегистрируйтесь.
        </p>
        <div className="flex justify-between">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Войти
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Зарегистрироваться
          </Link>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal;
