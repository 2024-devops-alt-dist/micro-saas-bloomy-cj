import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

interface FilterItem { id: number; name: string; icon?: string; }

export interface PlantFilters {
    categories: number[];
    expositions: number[];
    difficulties: number[];
    localisations: number[];
    waterings: number[];
    toxicPets: number[];
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    filters: PlantFilters;
    setFilters: React.Dispatch<React.SetStateAction<PlantFilters>>;

    categoriesList?: FilterItem[];
    expositionsList?: FilterItem[];
    difficultiesList?: FilterItem[];
    localisationsList?: FilterItem[];
    petsList?: FilterItem[];
}

const ModalSearchPlant: React.FC<Props> = ({ isOpen, onClose, filters, setFilters, expositionsList = [], difficultiesList = [], localisationsList = [], petsList = []}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const toggleFilter = (type: keyof PlantFilters, id: number) => {
        const current = filters[type];
        setFilters({
            ...filters,
            [type]: current.includes(id)
                ? current.filter((i) => i !== id)
                : [...current, id],
        });
    };

    const chip = (key: string | number, label: string, active: boolean, onClick: () => void, icon?: string) => (
        <button
            key={key}
            onClick={onClick}
            className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm transition
                ${
                    active
                        ? "bg-custom-search border-custom-search text-green-800"
                        : "border-gray-300 border-custom-search"
                }`}
        >
            {icon && <img src={`/assets/icons/${icon}`} alt={label} className="w-4 h-4" />}
            {label}
        </button>
    );

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999 p-[15px]">
            <div className="bg-white w-full max-w-xl max-h-full rounded-xl overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Filtrez votre sélection</h2>
                    <FiX className="cursor-pointer" onClick={onClose} />
                </div>

                {/* Difficultés */}
                <section className="mb-4">
                    <h3 className="font-medium mb-2">Difficulté</h3>
                    <select
                        value={filters.difficulties[0] ?? ""}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                difficulties: e.target.value ? [Number(e.target.value)] : [],
                            })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="">Sélectionner un niveau</option>
                        {difficultiesList.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </section>

                {/* Exposition */}
                <section className="mb-4">
                    <h3 className="font-medium mb-2">Exposition</h3>
                    <div className="flex flex-wrap gap-2">
                        {expositionsList.map((e) =>
                            chip(
                                e.id,
                                e.name,
                                filters.expositions.includes(e.id),
                                () => toggleFilter("expositions", e.id),
                                e.icon
                            )
                        )}
                    </div>
                </section>

                {/* Localisation */}
                <section className="mb-4">
                    <h3 className="font-medium mb-2">Localisation</h3>
                    <div className="flex flex-wrap gap-2">
                        {localisationsList.map((l) =>
                            chip(
                                l.id,
                                l.name,
                                filters.localisations.includes(l.id),
                                () => toggleFilter("localisations", l.id),
                                l.icon
                            )
                        )}
                    </div>
                </section>

                {/* Toxicité animaux */}
                <section className="mb-4">
                    <h3 className="font-medium mb-2">Exclure les plantes toxicité pour </h3>
                    <div className="flex flex-wrap gap-2">
                        {petsList
                            .filter((p) => p.name.toLowerCase() !== "aucun") // <-- on enlève "Aucun"
                            .map((p) =>
                                chip(
                                    p.id,
                                    p.name,
                                    filters.toxicPets.includes(p.id),
                                    () => toggleFilter("toxicPets", p.id),
                                    p.icon
                                )
                            )}
                    </div>
                </section>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={() =>
                            setFilters({
                                categories: [],
                                expositions: [],
                                difficulties: [],
                                localisations: [],
                                waterings: [],
                                toxicPets: [],
                            })
                        }
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Réinitialiser
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalSearchPlant;