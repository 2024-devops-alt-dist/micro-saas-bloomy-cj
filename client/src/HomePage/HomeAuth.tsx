import React from "react";
import NavBarMobile from "../shared/navbar-mobile";
import "./HomeAuth.css";
import { useAuth } from "../features/auth/context/AuthContext";


const Home: React.FC = () => {
     const { logout } = useAuth();
     
    return (
        <div className="min-h-screen bg-gray-50">
            <NavBarMobile />
            <p>ACCUEIL</p>

            <button
                className="hover:text-red-500 text-sm font-medium px-3 py-1 rounded"
                onClick={logout}
            >
                Déconnexion
            </button>
        </div>
    );
};

export default Home;