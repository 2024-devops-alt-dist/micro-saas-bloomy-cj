import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/global.css";

interface HeaderAddGardenProps {
    showBack?: boolean; // ← option
}

const HeaderAddGarden: React.FC<HeaderAddGardenProps> = ({ showBack = true }) => {
    const navigate = useNavigate();

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

            <button className="hover:text-red-500 text-2xl">×</button>
        </header>
    );
};

export default HeaderAddGarden;
