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
    try {
      const res = await api.get("/me");
      return res.data.user;
    } catch (err: any) {
      //  Si access_token expiré → tentative refresh
      if (err.response?.status === 401) {
        try {
          await api.post("/refresh");

          // Retry après refresh
          const retry = await api.get("/me");
          return retry.data.user;
        } catch {
          // Refresh échoué → session réellement expirée
          throw new Error("Session expirée");
        }
      }

      throw err;
    }
  }
};

export default authService;
