import React from "react";

interface CustomButtonProps {
    label: string;       
    onClick?: () => void; 
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick }) => {
    return (
        <button
            role="button"
            onClick={onClick}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2"
        >
            {label}
        </button>
    );
};

export default CustomButton;
