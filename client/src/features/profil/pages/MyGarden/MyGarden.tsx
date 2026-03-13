import React from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import NavBarMobile from "../../../../shared/navbar-mobile";
import "../../../../assets/styles/global.css";
import "./MyGarden.css";
import NavBarDesktop from "../../../../shared/navbar-desktop";
import GardenUserList from "../../components/GardenUserList";

const MyGarden: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
        <NavBarDesktop />
        <div className="flex flex-col">
            <header className="mygarden-header flex justify-between items-center">
                <h1>Mes Jardins</h1>
                <button onClick={() => navigate("/addGarden")} className="">
                    <FiPlus />
                </button>
            </header>

            <main className="mygarden-main flex flex-col items-center justify-center">
                <GardenUserList variant="myGarden" />
                {/* Section Statistiques */}
                <div className="garden-stats flex flex-col items-center">
                    <h2>Vos statistiques</h2>
                    <p className="stats-card">Vous retrouverez ici vos statistiques après avoir réalisé vos premiers pas</p>
                
                    <img src="/assets/icons/Group_71.png" alt="Statistiques à venir"/>
                </div>
            </main>

            <NavBarMobile />
        </div>
        </>
    );
};

export default MyGarden;
