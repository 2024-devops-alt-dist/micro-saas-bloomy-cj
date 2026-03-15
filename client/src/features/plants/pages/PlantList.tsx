import React from "react";
import PlantCard from "../components/PlantCard/PlantCard";
import type { Plant } from "../../../models/plant/IPlant";
import { getDraft } from "../../garden/services/gardenLocalStorage";

interface PlantListProps {
    plants: Plant[];
}

const PlantList: React.FC<PlantListProps> = ({ plants }) => {
    const gardenDraft = getDraft();

    if (plants.length === 0) {
        return <p className="text-center text-gray-500 py-8">Pas de plante correspondante.</p>;
    }

    return (
        <div className="plant-list plant-list-space px-6">
            {plants.map((plant) => (
                <PlantCard
                    key={plant.id}
                    plant={plant}
                    gardenDraft={gardenDraft}
                    mode="select"
                />
            ))}
        </div>
    );
};

export default PlantList;