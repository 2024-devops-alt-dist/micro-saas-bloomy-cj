import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaSeedling, FaTag } from "react-icons/fa";
import LearnMoreButton from "../../buttons/LearnMoreButton";
import type { Plant } from "../../../models/plant/IPlant";

interface GardenPlantCardProps {
    plant: Plant;
    onRemove?: () => void;
}

const GardenPlantCard: React.FC<GardenPlantCardProps> = ({ plant, onRemove }) => {
    return (
        <div className="garden-plant-card">
            <div className="plant-image-desc">
                <img
                    src={`/assets/pictures/${plant.picturePlant?.name}`}
                    alt={plant.name}
                    className="plant-image"
                />
                <div className="plant-image-overlay"></div>
            </div>

            <div className="card-left">
                <h3 className="plant-name-card">{plant.name}</h3>

                <div className="plant-meta-container">
                    {plant.categories?.[0] && (
                        <div className="meta-item">
                            <FaSeedling className="meta-icon" />
                            <span>{plant.categories[0].name}</span>
                        </div>
                    )}

                    {plant.toxicPets?.[0]?.pet && (
                        <div className="meta-item">
                            <FaTag className="meta-icon" />
                            <span>{plant.toxicPets[0].pet.name}</span>
                            {plant.toxicPets[0].pet.icon && (
                                <img
                                    src={`/assets/icons/${plant.toxicPets[0].pet.icon}`}
                                    alt={plant.toxicPets[0].pet.name}
                                    className="pet-icon"
                                />
                            )}
                        </div>
                    )}
                </div>

                <div className="card-actions">
                    <LearnMoreButton label="> En savoir plus" />
                    {onRemove && (
                        <button onClick={onRemove} className="remove-btn" title="Retirer du jardin">
                            <FiTrash2 size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GardenPlantCard;
