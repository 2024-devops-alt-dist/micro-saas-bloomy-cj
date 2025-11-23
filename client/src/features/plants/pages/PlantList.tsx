import React, { useEffect, useState } from "react";
import { plantService } from "../services/plantService";
import PlantCard from "../components/PlantCard";
import { useLocation } from "react-router-dom";
import type { Plant } from "../../../models/plant/IPlant";

const PlantList: React.FC = () => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const gardenDraft = location.state?.gardenDraft;
    console.log("Draft reçu dans PlantList :", gardenDraft);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const data: Plant[] = await plantService.getAll();
                setPlants(data);
            } catch (error) {
                console.error("Erreur lors du chargement des plantes :", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlants();
    }, []);

    if (loading) return <p>Chargement des plantes...</p>;

    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 justify-items-center">
            {plants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} gardenDraft={gardenDraft}/>
            ))}
        </div>
    );
};

export default PlantList;
