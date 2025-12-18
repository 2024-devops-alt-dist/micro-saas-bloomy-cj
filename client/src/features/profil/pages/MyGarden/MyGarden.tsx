import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { gardenService, type Garden } from "../../../garden/services/gardenService";
import NavBarMobile from "../../../../shared/navbar-mobile";
import "../../../../assets/styles/global.css";
import "./MyGarden.css";

const MyGarden: React.FC = () => {
    const navigate = useNavigate();
    const [gardens, setGardens] = useState<Garden[]>([]);

    useEffect(() => {
        const fetchGardens = async () => {
            try {
                // Récupère directement les jardins du user connecté depuis l'API
                const data = await gardenService.getMine();
                setGardens(data);
            } catch (error) {
                console.error("Erreur lors du chargement des jardins :", error);
            }
        };
        fetchGardens();
    }, []);

    return (
        <div className="flex flex-col">
            <header className="mygarden-header flex justify-between items-center">
                <h1>Mes Jardins</h1>
                <button onClick={() => navigate("/addGarden")} className="flex items-center gap-2">
                    <FiPlus />
                </button>
            </header>

            <main className="mygarden-main flex flex-col items-center justify-center">
            {gardens.length > 0 ? (
                <>
                    {/* Liste des jardins alignée à gauche */}
                    <div className="garden-list">
                        {gardens.map((garden) => (
                            <div key={garden.id} className="garden-card">
                                <div 
                                    className="garden-img-bg" 
                                    style={{ backgroundImage: `url(/assets/pictures/plants_legume.jpg)` }}
                                ></div>

                                <div className="garden-img-overlay"></div>

                                <h2 className="garden-name">{garden.name}</h2>
                            </div>
                        ))}
                    </div>

                    {/* Section Statistiques */}
                    <div className="garden-stats flex flex-col items-center">
                        <h2>Vos statistiques</h2>

                        <div className="stats-card">
                            <p>Vous retrouverez ici vos statistiques après avoir réalisé vos premiers pas</p>
                        </div>

                        <img src="/assets/icons/Group_71.png" alt="Statistiques à venir"/>
                    </div>
                </>
            ) : (
                <div className="empty-garden flex flex-col items-center">
                    <img 
                        src="/assets/mascot/mascot-question.png"
                        alt="Aucun jardin"
                        className="w-50 h-50 mb-4"
                    />
                    <p>C’est un peu vide ici !</p>
                    <button onClick={() => navigate("/addGarden")} className="btn-global mt-6">
                        Ajouter un jardin
                    </button>
                </div>
            )}
        </main>

            <NavBarMobile />
        </div>
    );
};

export default MyGarden;
