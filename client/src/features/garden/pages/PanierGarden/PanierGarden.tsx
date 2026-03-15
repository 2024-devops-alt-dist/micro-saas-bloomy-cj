import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GardenPlantCard from "../../components/GardenPlantCard";
import CustomButton from "../../../buttons/CustomButton";
import { gardenService, type GardenDraft } from "../../services/gardenService";
import { getDraft, saveDraft, clearDraft } from "../../services/gardenLocalStorage";
import type { Plant } from "../../../../models/plant/IPlant";
import "../../../../assets/styles/global.css";
import "./PanierGarden.css";
import HeaderAddGarden from "../../../../shared/headerAddGarden";
import { plantService } from "../../../plants/services/plantService";
import NavBarDesktop from "../../../../shared/navbar-desktop";

const PanierGarden: React.FC = () => {
    const navigate = useNavigate();

    const initialGardenDraft = getDraft() as GardenDraft | undefined;

    const [error, setError] = useState("");
    const [gardenDraft, setGardenDraft] = useState<GardenDraft>(
        initialGardenDraft ?? {
            name: "",
            garden_img: "",
            description: "",
            id_localisation: undefined,
            pets: [],
            plants: []
        }
    );

    // Contiendra objets Plant complets pour affichage
    const [plantsDetails, setPlantsDetails] = useState<Plant[]>([]);

    // Re-fetch des plantes à partir des IDs
    useEffect(() => {
        const fetchPlants = async () => {
            if (!gardenDraft.plants || gardenDraft.plants.length === 0) {
                setPlantsDetails([]);
                return;
            }

            try {
                const allPlants = await plantService.getAll();

                const selectedPlants = allPlants.filter((p) =>
                    gardenDraft.plants?.includes(p.id)
                );

                setPlantsDetails(selectedPlants);
            } catch (error) {
                console.error("Erreur chargement plantes :", error);
            }
        };

        fetchPlants();
    }, [gardenDraft.plants]);

    const handleRemovePlant = (plantId: number) => {
        const updatedDraft: GardenDraft = {
            ...gardenDraft,
            plants: gardenDraft.plants?.filter((id) => id !== plantId) ?? []
        };

        setGardenDraft(updatedDraft);
        saveDraft(updatedDraft);
    };

    const handleValidateGarden = async () => {
        if (!gardenDraft.plants || gardenDraft.plants.length === 0) {
            setError("Votre jardin doit contenir au moins une plante");
            return;
        }
        setError("");

        try {
            // UPDATE
            if (gardenDraft.id) {
                const updatedGarden = await gardenService.update(gardenDraft.id, gardenDraft);
                clearDraft();
                navigate(`/garden/${updatedGarden.id}`);
            } 
            // CREATE
            else {
                const createdGarden = await gardenService.create(gardenDraft);
                clearDraft();
                navigate(`/garden-success/${createdGarden.id}`);

            }
        } catch (error) {
            console.error("Erreur lors de la création du jardin :", error);
        }
    };

    return (
        <>
        <NavBarDesktop />
        <HeaderAddGarden showBack={true} />
        <main className="flex flex-col panier-main">
            <div className="panier-container">
                {/* Colonne gauche */}
                <div className="panier-left">
                    <h1 className="text-center title-custom-panier mb-3">Votre sélection pour le jardin</h1>
                    <h2 className="text-center-custom mb-4">{gardenDraft.name}</h2>

                    <hr className="separator" />
                    
                    <div className="mb-6">
                        <button
                            onClick={() => {
                                saveDraft(gardenDraft);
                                navigate("/gardenSelectPlants");
                            }}
                            className="add-plant-btn"
                        >
                            + Ajouter une plante
                        </button>
                    </div>

                    <div className="fixed-button-container">
                        {error && (
                            <p className="error-alerte mb-3 text-center">
                                ⚠️ {error}
                            </p>
                        )}

                        <CustomButton
                            label={gardenDraft.id ? "Mettre à jour mon jardin" : "Créer mon jardin"}
                            onClick={handleValidateGarden}
                        />
                    </div>
                </div>

                {/* Colonne droite */}
                <div className="panier-right">
                    {plantsDetails.length > 0 ? (
                        plantsDetails.map((plant) => (
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
                </div>
            </div>
        </main>
        </>
    );
};

export default PanierGarden;