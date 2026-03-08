import React, { useState, useEffect } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import ModalSearchPlant from "./ModalSearchPlant";
import ActiveFilters from "./ActiveFilters";
import { commonService } from "../../services/commonService";
import type { Plant } from "../../../../models/plant/IPlant";
import "./SearchFilterBar.css";

export interface PlantFilters {
    categories: number[];
    expositions: number[];
    difficulties: number[];
    localisations: number[];
    waterings: number[];
    toxicPets: number[];
}

interface FilterItem {
    id: number;
    name: string;
    icon?: string;
}

interface Props {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    filters: PlantFilters;
    setFilters: React.Dispatch<React.SetStateAction<PlantFilters>>;
    plants?: Plant[];
}

const SearchFilterBar: React.FC<Props> = ({
    searchTerm,
    onSearchChange,
    filters,
    setFilters,
    plants = []
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState<FilterItem[]>([]);
    const [expositions, setExpositions] = useState<FilterItem[]>([]);
    const [difficulties, setDifficulties] = useState<FilterItem[]>([]);
    const [localisations, setLocalisations] = useState<FilterItem[]>([]);
    const [pets, setPets] = useState<FilterItem[]>([]);

    // Extraire catégories depuis les plantes
    useEffect(() => {
        const catsMap = new Map<number, string>();
        plants.forEach((p) =>
            p.categories?.forEach((c) => { if (!catsMap.has(c.id)) catsMap.set(c.id, c.name); })
        );
        setCategories(Array.from(catsMap.entries()).map(([id, name]) => ({ id, name })));
    }, [plants]);

    // Récupérer autres filtres pour modal
    useEffect(() => {
        const fetchFilters = async () => {
            const [expo, diff, loc, pet] = await Promise.all([
                commonService.getExpositions(),
                commonService.getDifficulties(),
                commonService.getLocalisations(),
                commonService.getPets(),
            ]);
            setExpositions(expo);
            setDifficulties(diff);
            setLocalisations(loc);
            setPets(pet);
        };
        fetchFilters();
    }, []);

    return (
        <div>
            {/* Barre de recherche + bouton filtre */}
            <div className="flex justify-center items-center pt-3">
                <div className="flex items-center w-full max-w-md relative">
                    <FiSearch className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <form className="w-full">
                        <input
                            type="text"
                            placeholder="Rechercher une plante"
                            className="input-text-search"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </form>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="ml-4 p-2 border border-gray-200 rounded-lg hover:border-gray-300"
                    >
                    <FiFilter className="text-gray-400" size={20} />
                </button>
            </div>

            {/* Tags actifs */}
            <ActiveFilters
                filters={filters}
                setFilters={setFilters}
                categoriesList={categories}
                expositionsList={expositions}
                difficultiesList={difficulties}
                localisationsList={localisations}
                petsList={pets}
            />

            {/* Modal */}
            <ModalSearchPlant
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                filters={filters}
                setFilters={setFilters}
                categoriesList={categories}
                expositionsList={expositions}
                difficultiesList={difficulties}
                localisationsList={localisations}
                petsList={pets}
            />
        </div>
    );
};

export default SearchFilterBar;