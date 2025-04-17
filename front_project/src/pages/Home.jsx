import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import { FireIcon, BuildingStorefrontIcon } from "@heroicons/react/24/solid";

const storeOptions = [
  { value: "all", label: "Все магазины" },
  { value: "Steam", label: "Steam" },
  { value: "GOG", label: "GOG" },
  { value: "Nintendo Store", label: "Nintendo" },
];

const Home = () => {
  const [games, setGames] = useState([]);
  const [storeFilter, setStoreFilter] = useState("all");

  useEffect(() => {
    let url = "http://127.0.0.1:8000/api/products/list";
    if (storeFilter !== "all") {
      url = `http://127.0.0.1:8000/api/products/by_store/${storeFilter}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then(setGames);
  }, [storeFilter]);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FireIcon className="h-7 w-7 text-orange-500" />
          Популярные предложения
        </h1>

        <div className="flex items-center gap-2 bg-white/90 text-black px-4 py-2 rounded shadow">
          <BuildingStorefrontIcon className="w-5 h-5 text-gray-700" />
          <select
            value={storeFilter}
            onChange={(e) => setStoreFilter(e.target.value)}
            className="bg-transparent outline-none text-sm"
          >
            {storeOptions.map((store) => (
              <option key={store.value} value={store.value}>
                {store.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} isGuestView={true} />
        ))}

      </div>
    </div>
  );
};

export default Home;
