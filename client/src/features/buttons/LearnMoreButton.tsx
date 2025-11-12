import React from "react";

interface LearnMoreButtonProps {
    label: string;       
    onClick?: () => void; 
}

const LearnMoreButton: React.FC<LearnMoreButtonProps> = ({ label, onClick }) => {
    return (
        <button role="button" onClick={onClick} className="learn-more-btn italic">
            {label}
        </button>
    );
};

export default LearnMoreButton;