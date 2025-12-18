import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../../assets/styles/global.css";
import "./DetailsPlant.css";
import { plantService } from "../../services/plantService";
import AddToGardenButton from "../../../buttons/AddToGardenButton";
import NavBarDetailPlant from "../../components/NavBarDetailPlant/NavBarDetailPlant";
import HeaderAddGarden from "../../../../shared/headerAddGarden";
import VarietiesList from "../../components/VarietiesList";
import AboutPlant from "../../components/AboutPlant";
import type { Plant } from "../../../../models/plant/IPlant";
import type { GardenDraft } from "../../../garden/services/gardenService";
import { getDraft, saveDraft } from "../../../garden/services/gardenLocalStorage";

const DetailsPlant: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const gardenDraft: GardenDraft | undefined = getDraft();
    
    const [plant, setPlant] = useState<Plant | null>(null);
    const [activeTab, setActiveTab] = useState("À propos");
    const [varieties, setVarieties] = useState<Plant[]>([]);


    useEffect(() => {
        const fetchPlant = async () => {
            if (!id) return;
            const data = await plantService.getById(Number(id));
            setPlant(data);

            // Si plante n'a pas de slug → pas de variétés 
            if (!data?.slug) { 
                setVarieties([]); 
                return; 
            }

            const allPlants = await plantService.getAll();
            let related: Plant[] = [];

            // CAS 1 : PLANTE MÈRE
            if (!data?.parent_slug) {
                related = allPlants.filter(p => p.parent_slug === data?.slug);
            }
            // CAS 2 : VARIÉTÉ
            else {
                // Trouver plante mère
                const parentPlant = allPlants.find(p => p.slug === data?.parent_slug);
                // Trouver toutes les variétés de la même plante mère
                const siblingVarieties = allPlants.filter(
                    p => p.parent_slug === data?.parent_slug && p.id !== data?.id // sauf variété actuelle
                );
                // plante mère + variétés sœurs
                related = parentPlant ? [parentPlant, ...siblingVarieties] : siblingVarieties;
            }
            setVarieties(related);
        };

        fetchPlant();
    }, [id]);

    useEffect(() => {
        setActiveTab("À propos");
    }, [id]);

    if (!plant) return <p>Chargement...</p>;

    const handleAddToGarden = () => {
        if (!plant) return;

        // Vérifie si la plante est déjà dans le panier
        const alreadyExists = gardenDraft?.plants?.some((p: Plant) => p.id === plant.id);

        if (alreadyExists) {
            alert(`${plant.name} est déjà dans votre jardin 🌱`);
            return;
        }

        const updatedDraft: GardenDraft = {
            name: gardenDraft?.name ?? "",
            garden_img: gardenDraft?.garden_img ?? "",
            description: gardenDraft?.description,
            id_localisation: gardenDraft?.id_localisation,
            pets: gardenDraft?.pets || [],
            plants: [...(gardenDraft?.plants || []), plant],
            user: gardenDraft?.user,
        };

        saveDraft(updatedDraft);
        navigate("/panierGarden");
    };

    const handleGoToPlant = (id: number) => {
        saveDraft(gardenDraft);
        navigate(`/plants/${id}`);
    };

    return (
        <>
        <HeaderAddGarden showBack={true} />
        <main className="flex flex-col h-screen bg-white mt-15">
            <div className="plant-image-container">
                <div className="plant-image-wrapper">
                    <img src={`/assets/pictures/${plant.picturePlant?.name}`} alt={plant.name} />
                </div>

                <AddToGardenButton label="Ajouter au jardin" onClick={handleAddToGarden}/>
            </div>
            <div  className="p-6">
                <div className="plant-header-info">
                    <h1 className="plant-name custom-title">{plant.name}</h1>
                    
                    <div className="plant-meta gap-6">
                        <div className="plant-category flex items-center gap-2">
                            <img src="/assets/icons/comestible.png" alt="" className="w-5 h-5 object-contain" />
                            <p>{plant.categories?.[0]?.name}</p>
                        </div>
                        <div className="plant-level flex items-center gap-2 ml-auto">
                            <p>{plant.difficulty?.name}</p>
                            <img src="/assets/icons/level.png" alt="" className="w-5 h-5 object-contain" />
                        </div>
                    </div>
                </div>
                
                <NavBarDetailPlant activeTab={activeTab} onTabChange={setActiveTab} />

                <div>
                    {activeTab === "À propos" && (
                    <>
                        <AboutPlant plant={plant} />
                    </>
                    )}
                </div>

                <div>
                    {activeTab === "Variété" && (
                        <VarietiesList varieties={varieties} onSelect={handleGoToPlant} />
                    )}
                </div>
            </div>
        </main>
        </>
    );
};

export default DetailsPlant;
