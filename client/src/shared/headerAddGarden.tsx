import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/global.css";
import { useAuth } from "../features/auth/context/AuthContext";

interface HeaderAddGardenProps {
    showBack?: boolean; 
    showLogout?: boolean;
}

const HeaderAddGarden: React.FC<HeaderAddGardenProps> = ({ showBack = true, showLogout = false }) => {
    const navigate = useNavigate();
    const { logout } = useAuth(); 
    
    return (
        <header className="hearder-container">
            {showBack ? (
                <button className="hover:text-green-600 text-2xl" onClick={() => navigate(-1)}>
                    ←
                </button>
            ) : (
                <span style={{ width: "24px" }}></span>
            )}

            <p className="text-md">Création d’un jardin</p>

            {showLogout ? (
                <button className="hover:text-red-500 text-sm font-medium px-3 py-1 rounded" onClick={logout} >
                    Déconnexion
                </button>
            ) : (
                <span style={{ width: "78px" }}></span>
            )}
        </header>
    );
};

export default HeaderAddGarden;
