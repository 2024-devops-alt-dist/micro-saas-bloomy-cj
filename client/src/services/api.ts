import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL + "/api";

const api = axios.create({
  baseURL: apiUrl,
});

export const getHealth = () => api.get("/health");
