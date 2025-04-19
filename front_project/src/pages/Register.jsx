import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.detail || "Ошибка при регистрации");
      }
    } catch (err) {
      setError("Ошибка сети. Попробуйте ещё раз.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-lg text-white p-6 sm:p-8 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Регистрация</h2>
        {error && <p className="text-red-300 text-center">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white/90 text-black placeholder-gray-600"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white/90 text-black placeholder-gray-600"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white/90 text-black placeholder-gray-600"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#000428] to-[#2a2d34] hover:opacity-90 text-white py-2 rounded font-semibold"
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-white">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-blue-300 underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
