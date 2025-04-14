import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import Wishlist from "../components/Wishlist";
import { getUserData } from "../api/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    getUserData(token)
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });

    const fetchWishlist = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/wishlists/list/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Собрать все продукты из всех вишлистов пользователя
          const allProducts = data.flatMap((wishlist) => wishlist.products || []);
          setWishlist(allProducts);
        } else {
          console.error("Ошибка загрузки вишлиста:", response.status);
        }
      } catch (error) {
        console.error("Ошибка запроса вишлиста:", error);
      }
    };

    fetchWishlist();
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Личный кабинет {user && `— ${user.username}`}</h1>

      {/* 🔍 Поисковая строка */}
      <SearchBar setSearchTerm={setSearchTerm} />

      {/* 📄 Результаты поиска */}
      <SearchResults
        searchTerm={searchTerm}
        setSearchResults={setSearchResults}
        searchResults={searchResults}
        wishlist={wishlist}
        setWishlist={setWishlist}
      />

      {/* 💖 Вишлист */}
      <Wishlist wishlist={wishlist} setWishlist={setWishlist} />
    </div>
  );
};

export default Dashboard;
