import React from "react";
import type { Plant } from "../../../models/plant/IPlant";

interface VarietiesListProps {
    varieties: Plant[];
    onSelect: (id: number) => void;
}

const VarietiesList: React.FC<VarietiesListProps> = ({ varieties, onSelect }) => {
    return (
        <div className="varieties-list">
        {varieties.length === 0 ? (
            <p>Aucune variété disponible.</p>
        ) : (
            varieties.map((v) => (
            <div 
                key={v.id} 
                className="variety-item" 
                onClick={() => onSelect(v.id)}
            >
                <img src={`/assets/pictures/${v.picturePlant?.name || "default.png"}`} />
                <p>{v.name}</p>
            </div>
            ))
        )}
        </div>
    );
};

export default VarietiesList;
