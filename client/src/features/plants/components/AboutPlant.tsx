import React from "react";
import CalendarPlant from "./CalendarPlant/CalendarPlant";
import type { Plant } from "../../../models/plant/IPlant";

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
                <p>{plant.watering?.name}</p>
            </div>
            <div className="plant-info-item">
                <img src="/assets/icons/sun.png" alt="Exposition" className="info-icon" />
                <p>{plant.exposition?.name}</p>
            </div>
        </div>

        <div className="mt-4 text-sm text-gray-700">
            <p>Température : {plant.temperature}</p>
            {plant.toxicPets && plant.toxicPets.length > 0 ? (
        <div>
            <p>Toxique pour les animaux :</p>
            <ul className="ml-4 list-disc">
                {plant.toxicPets.map((tox) => (
                    <li key={tox.petId}>
                        {tox.pet?.name} : {tox.niveauToxicite}
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <p>Toxique pour les animaux : Non</p>
    )}
        </div>

        <CalendarPlant plant={plant} />
        </>
    );
};

export default AboutPlant;
