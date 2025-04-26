import { CheckCircleIcon } from "@heroicons/react/24/solid";

const NotificationModal = ({ isOpen, onClose, message = "Успешно!" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="animate-fade-in bg-gradient-to-b from-white/10 to-black/20 backdrop-blur-xl text-white rounded-xl p-6 w-[90%] sm:max-w-sm shadow-xl relative border border-white/20">
        {/* Иконка + сообщение */}
        <div className="flex items-center gap-3 mb-3">
          <CheckCircleIcon className="w-6 h-6 text-green-400" />
          <h2 className="text-lg font-semibold">{message}</h2>
        </div>

        {/* Кнопка OK */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-white/10 hover:bg-white/20 rounded text-sm font-semibold border border-white/20"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
