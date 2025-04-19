import { Link } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/solid"; // добавь импорт

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="animate-slide-in bg-gradient-to-b from-white/10 to-black/20 backdrop-blur-xl text-white rounded-xl p-6 w-[90%] sm:max-w-md shadow-xl relative border border-white/20">
        {/* Заголовок с иконкой */}
        <div className="flex items-center gap-2 mb-3">
          <LockClosedIcon className="w-6 h-6 text-white" />
          <h2 className="text-lg sm:text-xl font-bold">Доступ ограничен</h2>
        </div>

        <p className="mb-6 text-sm sm:text-base text-gray-300">
          Чтобы просматривать подробности, пожалуйста, войдите или зарегистрируйтесь.
        </p>

        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Link
            to="/login"
            className="w-full text-center bg-gradient-to-r from-[#1c1c1e] to-[#4b000f] hover:opacity-90 text-white py-2 rounded font-semibold text-sm"
          >
            Войти
          </Link>
          <Link
            to="/register"
            className="w-full text-center bg-gradient-to-r from-[#000428] to-[#2a2d34] hover:opacity-90 text-white py-2 rounded font-semibold text-sm"
          >
            Зарегистрироваться
          </Link>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white/50 hover:text-white text-xl font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal;
