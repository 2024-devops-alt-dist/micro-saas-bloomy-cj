import { useLocation, useNavigate } from "react-router-dom";
import GardenButton from "../../buttons/GardenButton";
import GardenPlantCard from "../components/GardenPlantCard";
import CustomButton from "../../buttons/CustomButton";
import { gardenService, type Garden } from "../services/gardenService";
import { useState } from "react";


const PanierGarden : React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialGardenDraft  = location.state?.gardenDraft as Garden | undefined;
    const [gardenDraft, setGardenDraft] = useState(initialGardenDraft);

    console.log("Draft reçu dans PanierGarden :", gardenDraft);

    const handleRemovePlant = (plantId: number) => {
        if (!gardenDraft) return;

        const updatedDraft = {
            ...gardenDraft,
            plants: gardenDraft.plants?.filter((p) => p.id !== plantId),
        };

        setGardenDraft(updatedDraft);
    };

    const handleValidateGarden = async () => {
        if (!gardenDraft) return;
        try {
            // On crée le jardin et on le stocke
            const createdGarden = await gardenService.create(gardenDraft);

            // On passe le jardin créé à GardenSuccess si besoin
            navigate("/garden-success", { state: { garden: createdGarden } });
        } catch (error) {
            console.error("Erreur lors de la création du jardin :", error);
        }
    };
    
    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <header className="flex justify-between items-center px-4 py-3 border-b border-green-100">
                <button className="text-gray-600 hover:text-green-600 text-2xl" onClick={() => navigate(-1)}>←</button>
                <p className="text-gray-800 text-md">Création d’un jardin</p>
                <button className="text-gray-600 hover:text-red-500 text-2xl">×</button>
            </header>
            <main className="flex flex-col items-center text-center p-6">
                <h1 className="text-3xl font-bold">Votre sélection pour le jardin</h1>
                <h2>{gardenDraft?.name}</h2>

                <hr className="border-t border-gray-200 w-full max-w-xs mb-8" />

                <div className="mb-6 w-full max-w-md">
                    <GardenButton 
                        label="+ Ajouter une plante" 
                        onClick={() => navigate("/gardenSelectPlants", { state: { gardenDraft } })}
                    />
                </div>

                {gardenDraft?.plants && gardenDraft.plants.length > 0 ? (
                    gardenDraft.plants.map((plant) => (
                        <GardenPlantCard
                            key={plant.id}
                            plant={plant}
                            onRemove={() => handleRemovePlant(plant.id)}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 italic">
                        Aucune plante ajoutée pour le moment 🌱
                    </p>
                )}

                <div className="mt-6 w-full max-w-md">
                    <CustomButton label="Valider ma sélection" onClick={handleValidateGarden}/>
                </div>
            </main>
        </div>
    );
};

export default PanierGarden;