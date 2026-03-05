import React, { useState, useEffect } from "react";
import type { Garden } from "../../../models/garden/IGarden";
import { commonService } from "../../garden/services/commonService";
import { gardenService, type GardenDraft } from "../../garden/services/gardenService";


interface Props {
    garden: Garden;
    onClose: () => void;
    onUpdate: (updatedGarden: Garden) => void;
}

const ModalUpdateGardenId: React.FC<Props> = ({ garden, onClose, onUpdate }) => {
    const [editForm, setEditForm] = useState({
        name: garden.name,
        description: garden.description || "",
        id_localisation: garden.localisation?.id ?? null,
        id_difficulty: garden.difficulty?.id ?? null,
        id_exposition: garden.exposition?.id ?? null,
        pets: garden.pets?.map(p => p.pet?.id).filter(Boolean) as number[] || [],
        plants: garden.plants?.map(p => p.plant?.id).filter(Boolean) || [],
    });

    const [localisations, setLocalisations] = useState<any[]>([]);
    const [difficulties, setDifficulties] = useState<any[]>([]);
    const [expositions, setExpositions] = useState<any[]>([]);
    const [allPets, setAllPets] = useState<any[]>([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [loc, diff, expo, pets] = await Promise.all([
                    commonService.getLocalisations(),
                    commonService.getDifficulties(),
                    commonService.getExpositions(),
                    commonService.getPets(),
                ]);
                setLocalisations(loc);
                setDifficulties(diff);
                setExpositions(expo);
                setAllPets(pets);
            } catch (error) {
                console.error("Erreur chargement options", error);
            }
        };
        fetchOptions();
    }, []);

    const handleSubmit = async () => {
        try {
            const payload = {
                name: editForm.name,
                description: editForm.description,
                id_localisation: editForm.id_localisation,
                id_difficulty: editForm.id_difficulty,
                id_exposition: editForm.id_exposition,
                pets: editForm.pets,
                plants: editForm.plants,
            };

            const updatedGarden = await gardenService.update(garden.id, payload as Partial<GardenDraft>);
            onUpdate(updatedGarden); 
            onClose();
            alert("Jardin mis à jour avec succès !");
        } catch (error: any) {
            console.error("Erreur lors de la modification :", error);
            alert(error.response?.data?.message || "Erreur lors de la modification du jardin.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">

                <h2 className="text-xl font-bold mb-4">Modifier le jardin</h2>

                <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full border rounded px-2 py-1 mb-2"
                />

                <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full border rounded px-2 py-1 mb-2"
                />

                <select
                    value={editForm.id_localisation ?? ""}
                    onChange={(e) =>
                        setEditForm({ ...editForm, id_localisation: e.target.value ? Number(e.target.value) : null })
                    }
                    className="w-full border rounded px-2 py-1 mb-2"
                >
                    <option value="">Non renseignée</option>
                    {localisations.map(loc => (
                        <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                </select>

                <select
                    value={editForm.id_exposition ?? ""}
                    onChange={(e) =>
                        setEditForm({ ...editForm, id_exposition: e.target.value ? Number(e.target.value) : null })
                    }
                    className="w-full border rounded px-2 py-1 mb-2"
                >
                    <option value="">Non renseignée</option>
                    {expositions.map(expo => (
                        <option key={expo.id} value={expo.id}>{expo.name}</option>
                    ))}
                </select>

                <select
                    value={editForm.id_difficulty ?? ""}
                    onChange={(e) =>
                        setEditForm({ ...editForm, id_difficulty: e.target.value ? Number(e.target.value) : null })
                    }
                    className="w-full border rounded px-2 py-1 mb-2"
                >
                    <option value="">Non renseignée</option>
                    {difficulties.map(diff => (
                        <option key={diff.id} value={diff.id}>{diff.name}</option>
                    ))}
                </select>

                <div className="flex flex-wrap gap-2 mb-3">
                    {allPets.map(pet => {
                        const checked = editForm.pets.includes(pet.id);
                        return (
                            <label
                                key={pet.id}
                                className={`px-3 py-1 border rounded-full cursor-pointer ${checked ? "bg-green-500 text-white" : "bg-gray-100"}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => {
                                        setEditForm({
                                            ...editForm,
                                            pets: checked
                                                ? editForm.pets.filter(id => id !== pet.id)
                                                : [...editForm.pets, pet.id],
                                        });
                                    }}
                                    className="hidden"
                                />
                                {pet.name}
                            </label>
                        );
                    })}
                </div>

                {/* Plants */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {garden.plants?.map(p => {
                        if (!p.plant) return null;
                        const checked = editForm.plants.includes(p.plant.id);
                        return (
                            <label
                                key={p.plant.id}
                                className={`px-3 py-1 border rounded-full cursor-pointer ${checked ? "bg-green-500 text-white" : "bg-gray-100"}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => {
                                        setEditForm({
                                            ...editForm,
                                            plants: checked
                                                ? editForm.plants.filter(id => id !== p.plant.id)
                                                : [...editForm.plants, p.plant.id],
                                        });
                                    }}
                                    className="hidden"
                                />
                                {p.plant.name}
                            </label>
                        );
                    })}
                </div>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Annuler</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded">Enregistrer</button>
                </div>
            </div>
        </div>
    );
};

export default ModalUpdateGardenId;