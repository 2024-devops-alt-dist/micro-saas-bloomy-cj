import api from "../../../services/api";

export const authService = {
  login: async (email: string, password: string) => {
    const res = await api.post("/login", { email, password });
    return res.data.user;
  },

  logout: async () => {
    await api.post("/logout");
  },

  me: async () => {
    const res = await api.get("/me");
    return res.data.user;
  }
};

export default authService;
