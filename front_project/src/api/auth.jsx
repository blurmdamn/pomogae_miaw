import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/users";

export const loginUser = async (usernameOrEmail, password) => {
  const formData = new URLSearchParams();
  formData.append("username", usernameOrEmail);
  formData.append("password", password);

  try {
    const response = await axios.post(`${API_URL}/token`, formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return response.data; // { access_token: "..." }
  } catch (error) {
    throw error.response?.data?.detail || "Ошибка входа";
  }
};

export const getUserData = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Ошибка загрузки профиля";
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
