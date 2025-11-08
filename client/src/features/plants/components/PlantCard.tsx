// src/components/PlantCard.tsx
import React from "react";
import type { Plant } from "../services/plantService";
import "../../../assets/styles/PlantCard.css";
import { useNavigate } from "react-router-dom";

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
                {isSelected && <div className="selected-check">✔</div>}
                <img src={plant.main_picture} alt={plant.name} />
            </div>
            <h3 className="plant-card-name">{plant.name}</h3>
        </div>
    );
};

export default PlantCard;
