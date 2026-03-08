import React from "react";
import { FiX } from "react-icons/fi";
import type { PlantFilters } from "./SearchFilterBar";
import "../SearchFilterBar/SearchFilterBar.css";

interface FilterItem { id: number; name: string; icon?: string; }

interface Props {
    filters: PlantFilters;
    setFilters: React.Dispatch<React.SetStateAction<PlantFilters>>;
    categoriesList?: FilterItem[];
    expositionsList?: FilterItem[];
    difficultiesList?: FilterItem[];
    localisationsList?: FilterItem[];
    wateringsList?: FilterItem[];
    petsList?: FilterItem[];
}

const ActiveFilters: React.FC<Props> = ({ filters, setFilters, categoriesList, expositionsList, difficultiesList, localisationsList, wateringsList, petsList }) => {
    const removeFilter = (type: keyof PlantFilters, id: number) => {
        setFilters((prev) => ({
            ...prev,
            [type]: prev[type].filter((v) => v !== id),
        }));
    };

    const getLabel = (type: keyof PlantFilters, id: number) => {
        switch (type) {
            case "categories": return categoriesList?.find(c => c.id === id);
            case "expositions": return expositionsList?.find(e => e.id === id);
            case "difficulties": return difficultiesList?.find(d => d.id === id);
            case "localisations": return localisationsList?.find(l => l.id === id);
            case "waterings": return wateringsList?.find(w => w.id === id);
            case "toxicPets": return petsList?.find(p => p.id === id);
            default: return undefined;
        }
    };

    const renderTags = (type: keyof PlantFilters, values: number[]) =>
        values.map(id => {
            const item = getLabel(type, id);
            if (!item) return null;

            const icon = type === "difficulties" ? "experience.png" : item.icon;

            return (
                <span key={`${type}-${id}`} className="flex bg-custom-search items-center gap-1 text-green-800 px-3 py-2 rounded-full text-sm">
                    {icon && <img src={`/assets/icons/${icon}`} alt={item.name} className="w-4 h-4" />}
                    {item.name}
                    <FiX className="cursor-pointer" onClick={() => removeFilter(type, id)} />
                </span>
            );
        });

    return (
        <div className="flex flex-wrap gap-2 py-3">
            {renderTags("categories", filters.categories)}
            {renderTags("expositions", filters.expositions)}
            {renderTags("difficulties", filters.difficulties)}
            {renderTags("localisations", filters.localisations)}
            {renderTags("waterings", filters.waterings)}
            {renderTags("toxicPets", filters.toxicPets)}
        </div>
    );
};

export default ActiveFilters;