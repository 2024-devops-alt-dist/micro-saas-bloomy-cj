import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import type { User } from "../../../models/IUser";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // vérifie la session 
    // Au montage de l’application :
    // - appelle /me : vérifier si user est déjà authent'
    // - permet de restaurer la session après un refresh de page
    useEffect(() => {
        const loadUser = async () => {
            try {
                // récupérer user courant
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
            const response = await authService.login(email, password);
            setUser(response);
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
        } catch (error) {
            console.error(error);
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

// Hook personnalisé pour accéder au contexte d’authentification
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth doit être utilisé dans un AuthProvider");
    return context;
};
