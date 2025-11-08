import React from "react";
import { type Plant } from "../../plants/services/plantService";
import { FiTrash2 } from "react-icons/fi";
import { FaSeedling, FaTag } from "react-icons/fa";
import LearnMoreButton from "../../buttons/LearnMoreButton";

interface GardenPlantCardProps {
    plant: Plant;
    onRemove?: () => void;
}

const GardenPlantCard: React.FC<GardenPlantCardProps> = ({ plant, onRemove }) => {
    // const [plant, setPlant] = useState<Plant | null>(null);

    // useEffect(() => {
    //     const fetchPlant = async () => {
    //         const data = await plantService.getById(plant );
    //         setPlant(data);
    //     };
    //     fetchPlant();
    // }, [plantId]);

    // if (!plant) return <p>Chargement...</p>;
    
    return (
        <div className="garden-plant-card">
            
            <div className="plant-image-desc">
                <img src={plant.main_picture} alt={plant.name} className="plant-image" />
                <div className="plant-image-overlay"></div>
            </div>

            <div className="card-left">
                <h3 className="plant-name-card ">{plant.name}</h3>

                <div className="plant-meta-container">
                    <div className="meta-item">
                        <FaSeedling className="meta-icon" />
                        <span>{plant.main_goal}</span>
                    </div>

                    <div className="meta-item">
                        <FaTag className="meta-icon" />
                        <span>{plant.category}</span>
                    </div>
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
