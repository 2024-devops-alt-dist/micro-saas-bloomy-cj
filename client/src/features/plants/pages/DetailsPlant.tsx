import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../../assets/styles/global.css";
import "../../../assets/styles/DetailsPlant.css";
import { plantService } from "../services/plantService";
import type { Plant } from "../services/plantService";
import AddToGardenButton from "../../buttons/AddToGardenButton";
import NavBarDetailPlant from "../components/NavBarDetailPlant";

const DetailsPlant: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const gardenDraft = location.state?.gardenDraft;
    console.log("Draft reçu sur DetailsPlant :", gardenDraft);
    
    const [plant, setPlant] = useState<Plant | null>(null);

    useEffect(() => {
        const fetchPlant = async () => {
        if (id) {
            const data = await plantService.getById(Number(id));
            setPlant(data);
        }
        };
        fetchPlant();
    }, [id]);

    if (!plant) return <p>Chargement...</p>;

    const handleAddToGarden = () => {
        if (!plant) return;

        const updatedDraft = {
            ...gardenDraft,
            plants: [...(gardenDraft?.plants || []), plant],
        };

        console.log("Draft après ajout de la plante :", updatedDraft);
        navigate("/panierGarden", { state: { gardenDraft: updatedDraft } });
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <header className="hearder-container">
                <button className="hover:text-green-600 text-2xl" onClick={() => navigate(-1)}>←</button>
                <p className="text-md">Création d’un jardin</p>
                <button className="hover:text-red-500 text-2xl">×</button>
            </header>

            <main>
                <div className="plant-image-container">
                    <div className="plant-image-wrapper">
                        <img src={plant.main_picture} alt={plant.name} />
                    </div>

                    <AddToGardenButton label="Ajouter au jardin" onClick={handleAddToGarden}/>
                </div>
                <div  className="p-6">
                    <div className="plant-header-info">
                        <h1 className="plant-name custom-title">{plant.name}</h1>
                        
                        <div className="plant-meta gap-6">
                            <div className="plant-category flex items-center gap-2">
                                <img src="/assets/icons/comestible.png" alt="" className="w-5 h-5 object-contain" />
                                <p>{plant.category}</p>
                            </div>
                            <div className="plant-level flex items-center gap-2 ml-auto">
                                <p>{plant.difficulty}</p>
                                <img src="/assets/icons/level.png" alt="" className="w-5 h-5 object-contain" />
                            </div>
                        </div>
                    </div>
                    
                    <NavBarDetailPlant onTabChange={(tab) => console.log("Onglet sélectionné :", tab)} />

                    <div>
                        <div className="plant-description">
                            <h3>Description</h3>
                            <p>{plant.description}</p>
                        </div>

                        <div className="plant-info-block">
                            <div className="plant-info-item">
                                <img src="/assets/icons/space-between.png" alt="Espacement" className="info-icon" />
                                <p>{plant.space_between} cm</p>
                            </div>
                            <div className="plant-info-item">
                                <img src="/assets/icons/water.png" alt="Arrosage" className="info-icon" />
                                <p>{plant.watering}</p>
                            </div>
                            <div className="plant-info-item">
                                <img src="/assets/icons/sun.png" alt="Exposition" className="info-icon" />
                                <p>{plant.exposition}</p>
                            </div>
                        </div>

                        
                        <div className="mt-4 text-sm text-gray-700">
                            <p>Température : {plant.temperature}</p>
                            <p>Toxique pour animaux : {plant.toxic_for_pets ? "Oui" : "Non"}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DetailsPlant;
