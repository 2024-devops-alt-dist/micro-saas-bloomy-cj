import React from "react";
import "./PlantCard.css";
import { useNavigate } from "react-router-dom";
import { saveDraft } from "../../../garden/services/gardenLocalStorage";
import type { Plant } from "../../../../models/plant/IPlant";
import type { GardenDraft } from "../../../garden/services/gardenService";

interface PlantCardProps {
    plant: Plant;
    gardenDraft?: GardenDraft;
    mode?: "select" | "catalog";
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, gardenDraft, mode = "catalog" }) => {
    const navigate = useNavigate();
    const isSelected = gardenDraft?.plants?.includes(plant.id);

    const handleClick = () => {
        if (gardenDraft) { saveDraft(gardenDraft); }

        navigate(`/plants/${plant.id}`, {
            state: {fromGarden: mode === "select"}
        });
    };

    return (
        <div className="plant-card" onClick={handleClick}>
            {mode === "select" && isSelected && (
                <img
                    src="/assets/icons/check.png"
                    alt="selected"
                    className="selected-check"
                />
            )}

            <img
                src={
                    plant.picturePlant
                        ? `/assets/pictures/${plant.picturePlant.name}`
                        : "/assets/pictures/plants_legume.jpg"
                }
                alt={plant.name}
                className="plant-img"
            />

            <div className="plant-img-overlay"></div>

            <h2 className="plant-title">{plant.name}</h2>
        </div>
    );
};

export default PlantCard;