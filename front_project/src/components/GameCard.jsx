import { getCurrencySymbol } from "../utils/Currency.jsx";

const GameCard = ({ game, onAdd, onRemove, inWishlist, isGuestView = false }) => {
  const currencySymbol = getCurrencySymbol(game.store?.name);

  const handleGuestClick = () => {
    alert("Чтобы просматривать подробную информацию об игре, пожалуйста, зарегистрируйтесь.");
  };

  return (
    <div className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded shadow-md text-white flex flex-col justify-between min-h-[220px]">
      <div>
        <h3 className="text-lg font-semibold mb-1">{game.name}</h3>

        <p className="text-sm text-gray-300 mb-1">
          {game.price}
          {currencySymbol}
        </p>

        {game.store?.name && (
          <p className="text-xs text-gray-400 mb-1">🛒 {game.store.name}</p>
        )}

        {game.url && (
          isGuestView ? (
            <button
              onClick={handleGuestClick}
              className="text-blue-300 hover:underline text-sm block mb-2"
            >
              Подробнее
            </button>
          ) : (
            <a
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:underline text-sm block mb-2"
            >
              Перейти к игре
            </a>
          )
        )}
      </div>

      {/* 🎮 Управление вишлистом */}
      <div className="mt-2">
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
  );
};

export default GameCard;
