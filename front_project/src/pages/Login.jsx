import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username: usernameOrEmail,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        navigate("/dashboard");
      } else {
        setError(data.detail || "Неизвестная ошибка");
      }
    } catch (err) {
      setError("Ошибка сети. Попробуйте ещё раз.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg text-white p-8 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Вход</h2>
        {error && <p className="text-red-300 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Логин"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
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
            className="w-full bg-gradient-to-r from-[#1c1c1e] to-[#4b000f] hover:opacity-90 text-white py-2 rounded font-semibold"
          >
            Войти
          </button>

        </form>
        <p className="mt-4 text-center text-sm text-white">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-blue-300 underline">
            Зарегистрируйтесь!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
