import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/userSlice";

const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch(logout());
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const user = await res.json();
          dispatch(login(user));
        } else {
          dispatch(logout());
          localStorage.removeItem("token");
        }
      } catch (err) {
        dispatch(logout());
      }
    };

    initAuth();
  }, [dispatch]);
};

export default useAuthInit;
