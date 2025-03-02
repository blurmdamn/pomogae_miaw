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
      // Отправка запроса на сервер для получения токена
      const response = await fetch("http://127.0.0.1:8000/api/users/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: usernameOrEmail,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Если запрос успешен, сохраняем токен в localStorage
        console.log("Токен:", data.access_token);
        localStorage.setItem("token", data.access_token);

        // Перенаправляем пользователя на страницу Dashboard
        navigate("/dashboard");
      } else {
        // В случае ошибки выводим сообщение
        setError(data.detail || "Неизвестная ошибка");
      }
    } catch (err) {
      console.error("Ошибка:", err);
      setError("Ошибка сети. Попробуйте еще раз.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center">Вход</h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <form className="mt-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Логин или Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Войти
          </button>
        </form>
        <div className="flex justify-center mt-4">
          Нет аккаунта?{" "}
          <Link to="/register" className="ml-1 text-blue-500 hover:underline">
            Зарегистрируйтесь!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
