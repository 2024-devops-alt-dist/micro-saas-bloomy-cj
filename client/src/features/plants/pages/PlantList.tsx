import React, { useEffect, useState, useMemo } from "react";
import { plantService } from "../services/plantService";
import PlantCard from "../components/PlantCard/PlantCard";
import type { Plant } from "../../../models/plant/IPlant";
import { /* useLocation */ } from "react-router-dom";
import { getDraft } from "../../garden/services/gardenLocalStorage";

interface PlantListProps {
    searchTerm?: string;
}

const PlantList: React.FC<PlantListProps> = ({ searchTerm = "" }) => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(true);
    
    const gardenDraft = getDraft();

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

    // Filtrer les plantes en fonction du terme de recherche
    // "useMemo" : Mémorise la liste filtrée pour éviter de recalculer le filter à chaque re-render. 
    // Le filtrage ne se relance que si `plants`ou `searchTerm` changent
    const filteredPlants = useMemo(() => {
        if (!searchTerm.trim()) return plants;
        return plants.filter((plant) =>
            plant.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
    }, [plants, searchTerm]);

    if (loading) return <p>Chargement des plantes...</p>;

    // Afficher un message si aucune plante ne correspond
    if (filteredPlants.length === 0 && searchTerm.trim()) {
        return <p className="text-center text-gray-500 py-8">Pas de plante correspondante.</p>;
    }

    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 justify-items-center mt-5 plant-list-space">
            {filteredPlants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} gardenDraft={gardenDraft}/>
            ))}
        </div>
    );
};

export default PlantList;
