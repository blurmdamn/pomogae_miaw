import { getCurrencySymbol } from "../utils/Currency.jsx";

const GameCard = ({ game, onAdd, onRemove, inWishlist }) => {
  const currencySymbol = getCurrencySymbol(game.store?.name);

  return (
    <div className="p-4 border rounded shadow-md mb-4">
      <h3 className="text-lg font-semibold">{game.name}</h3>
      <p className="text-sm text-gray-600">
        {game.price}
        {currencySymbol}
      </p>

      {/* Ссылка на игру */}
      {game.url && (
        <a
          href={game.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline text-sm"
        >
          Перейти к игре
        </a>
      )}

      <div className="mt-2">
        {inWishlist ? (
          <button
            onClick={() => onRemove(game)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Удалить из вишлиста
          </button>
        ) : (
          <button
            onClick={() => onAdd(game)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Добавить в вишлист
          </button>
        )}
      </div>
    </div>
  );
};

export default GameCard;
