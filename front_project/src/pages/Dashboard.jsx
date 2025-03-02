import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../api/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Личный кабинет</h1>
      {user ? (
        <p className="mt-4 text-lg">Привет, {user.username}!</p>
      ) : (
        <p className="mt-4">Загрузка...</p>
      )}
      <button
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Выйти
      </button>
    </div>
  );
};

export default Dashboard;
