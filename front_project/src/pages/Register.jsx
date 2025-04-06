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
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.detail || "Ошибка при регистрации");
      }
    } catch (err) {
      console.error("Ошибка:", err);
      setError("Ошибка сети. Попробуйте ещё раз.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center">Регистрация</h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <form className="mt-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
            Зарегистрироваться
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
