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

    const handleClick = () => {
        navigate(`/plants/${plant.id}`, { state: { gardenDraft } });
    };

    return (
        <div className="plant-card-container m-3" onClick={handleClick}>
            <div className="plant-card-image">
                <img src={plant.main_picture} alt={plant.name} />
            </div>
            <h3 className="plant-card-name">{plant.name}</h3>
        </div>
    );
};

export default PlantCard;
