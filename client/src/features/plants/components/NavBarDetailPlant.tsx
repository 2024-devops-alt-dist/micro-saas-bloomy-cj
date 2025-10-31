import React, { useState } from "react";
import "../../../assets/styles/NavBarDetailPlant.css";

interface PlantNavbarProps {
    onTabChange?: (tab: string) => void;
}

const tabs = ["À propos", "Variété", "Conseils", "Santé"];

const NavBarDetailPlant: React.FC<PlantNavbarProps> = ({ onTabChange }) => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleClick = (tab: string) => {
        setActiveTab(tab);
        if (onTabChange) onTabChange(tab);
    };

    return (
        <nav className="navbar">
            {tabs.map((tab) => (
                <button key={tab} onClick={() => handleClick(tab)} className={`navbar-tab ${activeTab === tab ? "active" : ""}`}>
                    {tab}
                </button>
            ))}
        </nav>
    );
};

export default NavBarDetailPlant;
