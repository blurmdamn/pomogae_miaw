import GameCard from "./GameCard";

const Wishlist = ({ wishlist, setWishlist }) => {
  const handleRemove = (game) => {
    // Здесь будет DELETE-запрос в будущем
    setWishlist(wishlist.filter((g) => g.id !== game.id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Мой вишлист</h2>
      {wishlist.length > 0 ? (
        wishlist.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            inWishlist={true}
            onRemove={handleRemove}
          />
        ))
      ) : (
        <p className="text-gray-500">Вишлист пуст.</p>
      )}
    </div>
  );
};

export default Wishlist;
