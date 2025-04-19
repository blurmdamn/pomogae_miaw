import { useState } from "react";
import { getCurrencySymbol } from "../utils/Currency.jsx";
import Modal from "./Modal"; // ✅ подключено модальное окно

const GameCard = ({ game, onAdd, onRemove, inWishlist, isGuestView = false }) => {
  const currencySymbol = getCurrencySymbol(game.store?.name);
  const [showModal, setShowModal] = useState(false); // ✅ модалка

  const handleGuestClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div
        className={`${
          isGuestView ? "min-h-[200px] sm:min-h-[230px]" : "min-h-[230px]"
        } p-3 sm:p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded shadow-md text-white flex flex-col justify-between`}
      >
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-semibold break-words leading-snug">
            {game.name}
          </h3>

          <p className="text-sm sm:text-base text-gray-300">
            {game.price}
            {currencySymbol}
          </p>

          {game.store?.name && (
            <p className="text-xs sm:text-sm text-gray-400">🛒 {game.store.name}</p>
          )}

          {game.url && (
            isGuestView ? (
              <button
                onClick={handleGuestClick}
                className="text-blue-300 hover:underline text-sm block"
              >
                Подробнее
              </button>
            ) : (
              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline text-sm block"
              >
                Перейти к игре
              </a>
            )
          )}
        </div>

        {/* 🎮 Управление вишлистом */}
        <div className="mt-3">
          {onAdd && !inWishlist && (
            <button
              onClick={() => onAdd(game)}
              className="w-full bg-gradient-to-r from-[#5c0010] to-[#8b000f] hover:opacity-90 text-white px-3 py-1 rounded text-sm"
            >
              Добавить в вишлист
            </button>
          )}

          {onRemove && inWishlist && (
            <button
              onClick={() => onRemove(game)}
              className="w-full bg-gradient-to-r from-[#111111] to-[#1f1f1f] hover:opacity-90 text-white px-3 py-1 rounded text-sm"
            >
              Удалить из вишлиста
            </button>
          )}
        </div>
      </div>

      {/* ✅ Модальное окно */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default GameCard;
