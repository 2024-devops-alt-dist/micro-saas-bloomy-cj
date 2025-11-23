// src/components/PlantCard.tsx
import React from "react";
import "../../../assets/styles/PlantCard.css";
import { useNavigate } from "react-router-dom";
import type { Plant } from "../../../models/plant/IPlant";

interface PlantCardProps {
    plant: Plant;
    gardenDraft: any;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, gardenDraft }) => {
    const navigate = useNavigate();
    const isSelected = gardenDraft?.plants?.some((p: Plant) => p.id === plant.id);

    const handleClick = () => {
        navigate(`/plants/${plant.id}`, { state: { gardenDraft } });
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
