import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/global.css";
import gardenLocalStorage from "../features/garden/services/gardenLocalStorage";

interface HeaderAddGardenProps {
    showBack?: boolean;
    showClose?: boolean; 
}

const HeaderAddGarden: React.FC<HeaderAddGardenProps> = ({ showBack = true, showClose = true }) => {
    const navigate = useNavigate();

    const handleClose = () => {
    // Supprime le draft du jardin
    gardenLocalStorage.clearDraft();

    // Redirige vers la page principale de création de jardin
    navigate("/addGarden");
};

    
    return (
        <header className="hearder-container flex justify-between items-center">
            {showBack ? (
                <button className="hover:text-green-600 text-2xl" onClick={() => navigate(-1)}>←</button>
            ) : (
                <span style={{ width: "24px" }}></span>
            )}

            <p className="text-md absolute left-1/2 transform -translate-x-1/2">Création d’un jardin</p>

            {showClose ? (
                <button className="hover:text-red-500 text-2xl" onClick={handleClose}>×</button>
            ) : (
                <span style={{ width: "24px", display: "inline-block" }}></span>
            )}
        </header>
    );
};

export default HeaderAddGarden;