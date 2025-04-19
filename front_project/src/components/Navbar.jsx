import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { CubeTransparentIcon } from "@heroicons/react/24/solid";
import NotificationsDropdown from "./NotificationsDropdown";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkToken();

    window.addEventListener("focus", checkToken);
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("focus", checkToken);
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-[#4b000f] to-[#0a0a0a] text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-wide bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(30,30,30,0.8)] hover:opacity-90 transition"
        >
          <CubeTransparentIcon className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(80,80,80,0.5)]" />
          GameDeals
        </Link>

        <div className="flex items-center space-x-6 text-sm font-medium">
          {isLoggedIn ? (
            <>
              <NotificationsDropdown />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1 border border-red-400 rounded hover:bg-red-500 hover:text-white transition"
              >
                <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-1 border border-[#4b000f] rounded hover:bg-[#4b000f] hover:text-white transition"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                Войти
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded hover:bg-gradient-to-r hover:from-[#4b000f] hover:to-black text-white transition"
              >
                <UserPlusIcon className="w-5 h-5" />
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
