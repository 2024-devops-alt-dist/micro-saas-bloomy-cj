import React from "react";
import GardenButton from "../../buttons/GardenButton";
import { type Plant } from "../../plants/services/plantService";
import { FiTrash2 } from "react-icons/fi";

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
        <div className="flex bg-white rounded-2xl shadow-md overflow-hidden mb-4 w-full max-w-md garden-plant-card">
            <div className="flex flex-col justify-between p-4 flex-1 text-left">
                <div>
                    <h3 className="text-lg font-bold uppercase">{plant.name}</h3>
                    <p className="text-sm text-gray-600">🌿{plant.main_goal} • {plant.category}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <GardenButton label="En savoir plus" />
                    {onRemove && (
                        <button
                            onClick={onRemove}
                            className="text-gray-500 hover:text-red-500 transition"
                            title="Retirer du jardin"
                        >
                            <FiTrash2 size={20} />
                        </button>
                    )}
                </div>
            </div>
            <img
                src={plant.main_picture}
                alt={plant.name}
                className="w-32 h-32 object-cover"
            />
        </div>
    );
};

export default GardenPlantCard;
