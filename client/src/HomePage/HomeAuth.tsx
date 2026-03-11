import React from "react";
import NavBarMobile from "../shared/navbar-mobile";
import "./HomeAuth.css";
import NavBarDesktop from "../shared/navbar-desktop";


const HomeAuth: React.FC = () => {

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBarMobile />
            <NavBarDesktop />
            <p>ACCUEIL</p>
        </div>
    );
};

export default HomeAuth;