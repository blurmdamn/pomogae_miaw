import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import GameCard from "./GameCard";
import { useState } from "react";
import NotificationModal from "./NotificationModal"; // ✅ подключаем модалку

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleRemove = async (game) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch(`http://127.0.0.1:8000/api/wishlists/${game.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      dispatch(removeFromWishlist(game.id));
      setModalMessage("Удалено из вишлиста");
      setModalOpen(true);
    }
  };

  return (
    <div className="mb-8">
      {/* ✅ Модалка */}
      <NotificationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
      />

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wishlist.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              inWishlist={true}
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Вишлист пуст.</p>
      )}
    </div>
  );
};

export default Wishlist;
