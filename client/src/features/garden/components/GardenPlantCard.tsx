import React from "react";
import GardenButton from "../../buttons/GardenButton";

const GardenPlantCard: React.FC = () => {
    return (
        <div className="flex bg-white rounded-2xl shadow-md overflow-hidden mb-4 w-full max-w-md">
            <div className="flex flex-col justify-between p-4 flex-1 text-left">
                <div>
                    <h3 className="text-lg font-bold uppercase">COEUR DE BOEUF</h3>
                    <p className="text-sm text-gray-600">🌿 Légumineuse • Tomate</p>
                </div>
                <div className="mt-4">
                    <GardenButton label="En savoir plus" />
                    <p className="text-xs text-gray-500 mt-2">✔ Retirer de mon jardin</p>
                </div>
            </div>
            <img
                src="/assets/images/example-plant.jpg"
                alt="plante"
                className="w-32 h-32 object-cover"
            />
        </div>
    );
};

export default GardenPlantCard;
