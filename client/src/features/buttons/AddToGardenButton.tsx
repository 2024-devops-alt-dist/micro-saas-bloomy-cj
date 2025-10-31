import React from "react";

interface AddToGardenButtonProps {
    label: string;
    onClick: () => void;
}

const AddToGardenButton: React.FC<AddToGardenButtonProps> = ({ label, onClick }) => {
    return (
        <button className="add-to-garden-btn" onClick={onClick}>
            <span className="btn-icon">+</span> {label}
        </button>
    );
};

export default AddToGardenButton;
