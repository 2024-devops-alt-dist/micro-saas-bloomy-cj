import axios from "axios";

// Récupère l’URL de base de l’API depuis les variables d’enviro Vite.
// par défaut, on utilise http://localhost:3000 (dev).
const API_BASE =
  (import.meta.env.VITE_API_URL as string) || "http://localhost:3000";

// Supprime le slash final si l’URL se termine par "/" pour éviter les doubles "//"
const normalizedBase = API_BASE.replace(/\/$/, "");

// Vérifie si l’URL se termine déjà par "/api".
// - Si oui, on la garde telle quelle
// - Sinon, on ajoute "/api"
const API_URL = normalizedBase.endsWith("/api") ? normalizedBase : normalizedBase + "/api";

// Création d’une instance Axios préconfigurée
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const getHealth = () => api.get("/health");

export default api;
