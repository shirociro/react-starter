import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "@/modules/auth/stores/auth.slice";
import { authService } from "@/modules/auth/services/auth.services";

export const useAuth = () => {
  const dispatch = useDispatch();

  const login = async (email: string, password: string) => {
    const { user } = await authService.login(email, password);
    dispatch(loginUser({ email: user?.email || "", role: "user" }));
  };

  const register = async (email: string, password: string) => {
    const { user } = await authService.register(email, password);
    dispatch(loginUser({ email: user?.email || "", role: "user" }));
  };

  const logout = async () => {
    await authService.logout();
    dispatch(logoutUser());
  };

  return { login, register, logout };
};
