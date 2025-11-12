import React from "react";
import type { Plant } from "../services/plantService";

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
                <img src={v.main_picture} alt={v.name} />
                <p>{v.name}</p>
            </div>
            ))
        )}
        </div>
    );
};

export default VarietiesList;
