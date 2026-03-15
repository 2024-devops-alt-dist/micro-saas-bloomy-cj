import React from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import NavBarMobile from "../../../../shared/navbar-mobile";
import "../../../../assets/styles/global.css";
import "./MyGarden.css";
import NavBarDesktop from "../../../../shared/navbar-desktop";
import GardenUserList from "../../components/GardenUserList";
import Footer from "../../../../HomePage/FooterHome";

const MyGarden: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
        <div className="flex flex-col height-100-update">
            <NavBarDesktop />
            <div className="mygarden-main flex flex-col lg:flex-row lg:justify-between lg:items-start ">
                <div className="mygarden-left w-full lg:w-2/3">
                    <div className="mygarden-header flex justify-between items-center">
                        <h1>Mes Jardins</h1>
                        <button onClick={() => navigate("/addGarden")}>
                            <FiPlus />
                        </button>
                    </div>
                    <GardenUserList variant="myGarden" />
                </div>

                <div className="garden-stats w-full lg:w-1/3 mt-6 lg:ml-6 flex flex-col items-center lg:items-start">
                    <h2>Mes statistiques</h2>
                    <p className="stats-card">
                        Vous retrouverez ici vos statistiques après avoir réalisé vos premiers pas
                    </p>
                    <img src="/assets/icons/Group_71.png" alt="Statistiques à venir"/>
                </div>
            </div>

            <NavBarMobile />
            <Footer />
        </div>
        
        </>
    );
};

export default MyGarden;
