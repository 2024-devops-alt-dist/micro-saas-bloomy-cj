import axios from "axios";

const API_BASE = (import.meta.env.VITE_API_URL as string) || "http://localhost:3000";
const normalizedBase = API_BASE.replace(/\/$/, "");
const API_URL = normalizedBase.endsWith("/api") ? normalizedBase : normalizedBase + "/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const getHealth = () => api.get("/health");

export default api;
