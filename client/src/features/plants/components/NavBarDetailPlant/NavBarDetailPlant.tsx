import React from "react";
import "./NavBarDetailPlant.css";

interface PlantNavbarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const tabs = ["À propos", "Variété", "Conseils", "Santé"];

const NavBarDetailPlant: React.FC<PlantNavbarProps> = ({ activeTab, onTabChange }) => {
    return (
        <nav className="navbar">
            {tabs.map((tab) => (
                <button key={tab}  onClick={() => onTabChange(tab)} className={`navbar-tab ${activeTab === tab ? "active" : ""}`}>
                    {tab}
                </button>
            ))}
        </nav>
    );
};

export default NavBarDetailPlant;
