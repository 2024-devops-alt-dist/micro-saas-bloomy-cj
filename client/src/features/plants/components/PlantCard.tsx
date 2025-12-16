import React from "react";
import "../../../assets/styles/PlantCard.css";
import { useNavigate } from "react-router-dom";
import { saveDraft } from "../../garden/services/gardenLocalStorage";
import type { Plant } from "../../../models/plant/IPlant";
import type { GardenDraft } from "../../garden/services/gardenService";

interface PlantCardProps {
    plant: Plant;
    gardenDraft?: GardenDraft;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, gardenDraft }) => {
    const navigate = useNavigate();
    const isSelected = gardenDraft?.plants?.some((p: Plant) => p.id === plant.id);

    const handleClick = () => {
        saveDraft(gardenDraft);
        navigate(`/plants/${plant.id}`);
    };

    return (
        <div className="plant-card-container" onClick={handleClick}>
            <div className="plant-card-image">
                {isSelected && (
                    <img src="/assets/icons/check.png" alt="check" className="selected-check" />
                )}
                <img src={`/assets/pictures/${plant.picturePlant?.name}`} alt={plant.name} />
            </div>
            <h3 className="plant-card-name">{plant.name}</h3>
        </div>
    );
};

export default PlantCard;
