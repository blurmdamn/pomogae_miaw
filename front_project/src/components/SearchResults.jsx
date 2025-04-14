import { useEffect } from "react";
import GameCard from "./GameCard";

const SearchResults = ({ searchTerm, setSearchResults, searchResults, wishlist, setWishlist }) => {
  useEffect(() => {
    if (searchTerm.length < 2) return;

    const fetchResults = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/products/search?q=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    };

    fetchResults();
  }, [searchTerm, setSearchResults]);

  const handleAddToWishlist = async (game) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch("http://127.0.0.1:8000/api/wishlists/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id: game.id }),
    });

    if (response.ok) {
      setWishlist((prev) => [...prev, game]);
    }
  };

  if (searchTerm.length < 2) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-2">Результаты поиска</h2>
      {searchResults.length > 0 ? (
        searchResults.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            inWishlist={wishlist.some((g) => g.id === game.id)}
            onAdd={handleAddToWishlist}
          />
        ))
      ) : (
        <p className="text-gray-500">Ничего не найдено.</p>
      )}
    </div>
  );
};

export default SearchResults;
