import React from "react";
import "../../assets/styles/CustomButton.css";

interface CustomButtonProps {
    label: string;       
    onClick?: () => void; 
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick }) => {
    return (
        <button role="button" onClick={onClick} className="test w-full flex items-center justify-center gap-2">
            {label}
        </button>
    );
};

export default CustomButton;
