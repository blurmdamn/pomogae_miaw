import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../redux/wishlistSlice";
import GameCard from "./GameCard";
import NotificationModal from "./NotificationModal"; // ✅ модалка

const SearchResults = ({
  searchTerm,
  searchResults,
  setSearchResults,
  searchMode,
}) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items || []);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      let url = "";

      if (searchTerm === "все") {
        url = "http://127.0.0.1:8000/api/products/list";
      } else if (searchTerm.length >= 2) {
        const endpoint = searchMode === "smart" ? "smart_search" : "search";
        url = `http://127.0.0.1:8000/api/products/${endpoint}?q=${searchTerm}`;
      } else {
        return;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Ошибка при загрузке результатов поиска:", error);
      }
    };

    fetchResults();
  }, [searchTerm, searchMode, setSearchResults]);

  const handleAddToWishlist = async (game) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("У вас нет аккаунта. Зарегистрируйтесь, чтобы добавить в вишлист.");
      return;
    }

    const response = await fetch("http://127.0.0.1:8000/api/wishlists/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id: game.id }),
    });

    if (response.ok) {
      dispatch(addToWishlist(game));
      setModalMessage("Добавлено в вишлист");
      setModalOpen(true);
    }
  };

  if (searchTerm.length < 2 && searchTerm !== "все") return null;

  return (
    <div className="mb-8">
      <NotificationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
      />

      <h2 className="text-xl font-bold mb-2">Результаты поиска</h2>
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {searchResults.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              inWishlist={wishlist.some((g) => g.id === game.id)}
              onAdd={handleAddToWishlist}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Ничего не найдено.</p>
      )}
    </div>
  );
};

export default SearchResults;
