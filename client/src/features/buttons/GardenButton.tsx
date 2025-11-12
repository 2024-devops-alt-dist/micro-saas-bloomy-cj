import React from "react";
import "../../assets/styles/Buttons.css";

interface GardenButtonProps {
    label: string;
    onClick?: () => void;
}

const GardenButton: React.FC<GardenButtonProps> = ({ label, onClick }) => {
    return (
        <button onClick={onClick} className="flex items-center justify-center garden-button">
            {label}
        </button>
    );
};

export default GardenButton;
