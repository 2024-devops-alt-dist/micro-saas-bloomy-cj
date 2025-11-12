import { useLocation, useNavigate } from "react-router-dom";
import GardenPlantCard from "../components/GardenPlantCard";
import CustomButton from "../../buttons/CustomButton";
import { gardenService, type GardenDraft } from "../services/gardenService";
import { useState } from "react";
import "../../../assets/styles/global.css";
import "../../../assets/styles/PanierGarden.css";
import HeaderAddGarden from "../../../shared/headerAddGarden";


const PanierGarden : React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialGardenDraft  = location.state?.gardenDraft as GardenDraft  | undefined;
    const [error, setError] = useState("");
    const [gardenDraft, setGardenDraft] = useState<GardenDraft>(
    initialGardenDraft ?? {
        name: "",
        garden_img: "",
        description: "",
        localisation: "",
        pets: false,
        plants: []
    }
);

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

        if (!gardenDraft.plants || gardenDraft.plants.length === 0) {
            setError("Votre jardin doit contenir au moins une plante");
            return;
        }

        setError("");

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
        <>
            <HeaderAddGarden showBack={true} />
            
            <main className="flex flex-col panier-main">
                <h1 className="text-center title-custom-panier mb-3 ">Votre sélection pour le jardin</h1>
                <h2 className="text-center mb-4">{gardenDraft?.name}</h2>

                <hr className="border-t border-gray-200 w-full max-w-xs mb-5" />

                <div className="mb-6">
                    <button onClick={() => navigate("/gardenSelectPlants", { state: { gardenDraft } })} className="add-plant-btn">
                        + Ajouter une plante
                    </button>
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
                
                <div className="fixed-button-container">
                    {error && (
                        <p className="error-alerte mb-3 text-center">⚠️ {error}</p>
                    )}

                    <CustomButton label="Valider ma sélection" onClick={handleValidateGarden}/>
                </div>
            </main>
        </>
    );
};

export default PanierGarden;