import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: any | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Chargement initial : vérifie la session via /me = checkAuth()
    useEffect(() => {
        const loadUser = async () => {
        try {
            const me = await authService.me();
            setUser(me);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
        };
        loadUser();
    }, []);

    // Connexion
    const login = async (email: string, password: string) => {
        try {
            const u = await authService.login(email, password);
            setUser(u);
            navigate("/addGarden");
        } catch (err: any) {
            throw new Error(err.message || "Erreur lors de la connexion.");
        }
    };

    // Déconnexion
    const logout = async () => {
        try {
            await authService.logout();
            console.log("Déconnecté !");
        } catch {
            /* on ignore une erreur logout */
        }
        setUser(null);
        navigate("/login");
    };

    // Rafraîchir l'utilisateur
    const refreshUser = async () => {
        try {
            const me = await authService.me();
            setUser(me);
        } catch {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook pratique
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth doit être utilisé dans un AuthProvider");
    return context;
};
