import { getCurrencySymbol } from "../utils/Currency.jsx";

const GameCard = ({ game, onAdd, onRemove, inWishlist, isGuestView = false }) => {
  const currencySymbol = getCurrencySymbol(game.store?.name);

  const handleGuestClick = () => {
    alert("Чтобы просматривать подробную информацию об игре, пожалуйста, зарегистрируйтесь.");
  };

  return (
    <div className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded shadow-md text-white">
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

      {/* 🎮 Управление вишлистом */}
      {onAdd && !inWishlist && (
        <button
          onClick={() => onAdd(game)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
        >
          Добавить в вишлист
        </button>
      )}

      {onRemove && inWishlist && (
        <button
          onClick={() => onRemove(game)}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
        >
          Удалить из вишлиста
        </button>
      )}
    </div>
  );
};

export default GameCard;
