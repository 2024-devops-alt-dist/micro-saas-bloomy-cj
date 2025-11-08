import React from "react";
import type { Plant } from "../services/plantService";
import CalendarPlant from "./CalendarPlant";

interface AboutPlantProps {
    plant: Plant;
}

const AboutPlant: React.FC<AboutPlantProps> = ({ plant }) => {
    return (
        <>
        <div className="plant-description">
            <h3>Description :</h3>
            <p>{plant.description}</p>
        </div>

        <div className="plant-info-block">
            <div className="plant-info-item">
                <img src="/assets/icons/space-between.png" alt="Espacement" className="info-icon" />
                <p>{plant.space_between} cm</p>
            </div>
            <div className="plant-info-item">
                <img src="/assets/icons/water.png" alt="Arrosage" className="info-icon" />
                <p>{plant.watering}</p>
            </div>
            <div className="plant-info-item">
                <img src="/assets/icons/sun.png" alt="Exposition" className="info-icon" />
                <p>{plant.exposition}</p>
            </div>
        </div>

        <div className="mt-4 text-sm text-gray-700">
            <p>Température : {plant.temperature}</p>
            <p>Toxique pour animaux : {plant.toxic_for_pets ? "Oui" : "Non"}</p>
        </div>

        <CalendarPlant plant={plant} />
        </>
    );
};

export default AboutPlant;
