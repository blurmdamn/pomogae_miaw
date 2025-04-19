import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWishlist } from "../redux/wishlistSlice";

import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import Wishlist from "../components/Wishlist";
import { getUserData } from "../api/auth";

import {
  MagnifyingGlassIcon,
  HeartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          const allProducts = data.flatMap((wishlist) => wishlist.products || []);
          dispatch(setWishlist(allProducts)); // 💥 сохраняем в Redux
        } else {
          console.error("Ошибка загрузки вишлиста:", response.status);
        }
      } catch (error) {
        console.error("Ошибка запроса вишлиста:", error);
      }
    };

    fetchWishlist();
  }, [navigate, dispatch]);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <UserCircleIcon className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl sm:text-3xl font-bold">
          Личный кабинет {user && `— ${user.username}`}
        </h1>
      </div>

      {/* Поиск */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
          <h2 className="text-xl font-semibold">Поиск игр</h2>
        </div>
        <SearchBar setSearchTerm={setSearchTerm} />
        <SearchResults
          searchTerm={searchTerm}
          setSearchResults={setSearchResults}
          searchResults={searchResults}
        />
      </div>

      {/* Вишлист */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <HeartIcon className="h-6 w-6 text-pink-500" />
          <h2 className="text-xl font-semibold">Мой вишлист</h2>
        </div>
        <Wishlist />
      </div>
    </div>
  );
};

export default Dashboard;
