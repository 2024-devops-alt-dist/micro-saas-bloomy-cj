import axios from "axios";

const API_BASE = (import.meta.env.VITE_API_URL as string) || "http://localhost:3000";
const API_PATH = "/api";
const API_URL = API_BASE.replace(/\/$/, "") + API_PATH;

// Création d’une instance Axios préconfigurée
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const getHealth = () => api.get("/health");

export default api;
