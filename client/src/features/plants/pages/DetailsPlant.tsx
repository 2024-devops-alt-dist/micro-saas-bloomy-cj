import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { plantService } from "../services/plantService";
import type { Plant } from "../services/plantService";
import CustomButton from "../../buttons/CustomButton";

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
            <header className="flex justify-between items-center px-4 py-3 border-b border-green-100">
                <button
                    type="button"
                    role="button"
                    className="text-gray-600 hover:text-green-600 text-2xl"
                    onClick={() => navigate(-1)}
                >
                ←
                </button>
                <p className="text-gray-800 text-md">Création d’un jardin</p>
                <button type="button" role="button" className="text-gray-600 hover:text-red-500 text-2xl">×</button>
            </header>

        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{plant.name}</h1>
            <CustomButton label="Ajouter au jardin" onClick={handleAddToGarden}/>
            <img
                src={plant.main_picture}
                alt={plant.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p>{plant.description}</p>
            <div className="mt-4 text-sm text-gray-700">
                <p><strong>Catégorie :</strong> {plant.category}</p>
                <p><strong>Espacement :</strong> {plant.space_between} cm</p>
                <p><strong>Arrosage :</strong> {plant.watering}</p>
                <p><strong>Température :</strong> {plant.temperature}</p>
                <p><strong>Difficulté :</strong> {plant.difficulty}</p>
                <p><strong>Exposition :</strong> {plant.exposition}</p>
                <p><strong>Toxique pour animaux :</strong> {plant.toxic_for_pets ? "Oui" : "Non"}</p>
            </div>
        </div>
        </div>
    );
};

export default DetailsPlant;
