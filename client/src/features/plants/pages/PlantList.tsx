import React, { useEffect, useState } from "react";
import { plantService } from "../services/plantService";
import type { Plant } from "../services/plantService";
import PlantCard from "../components/PlantCard";

const PlantList: React.FC = () => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(true);

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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-items-center">
            {plants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
            ))}
        </div>
    );
};

export default PlantList;
