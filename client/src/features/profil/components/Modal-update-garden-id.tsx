import React, { useState, useEffect } from "react";
import type { Garden } from "../../../models/garden/IGarden";
import { commonService } from "../../garden/services/commonService";
import { gardenService, type GardenDraft } from "../../garden/services/gardenService";
import "../../../assets/styles/global.css";
import "./Modal-update-garden-id.css";

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
    const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation locale
        const newErrors: typeof errors = {};
        if (!editForm.name || editForm.name.trim().length < 1) {
            newErrors.name = "Le nom doit contenir au moins 1 caractère";
        } else if (editForm.name.length > 25) {
            newErrors.name = "Le nom doit contenir au maximum 25 caractères";
        }

        if (editForm.description && editForm.description.length > 272) {
            newErrors.description = "La description doit faire au maximum 272 caractères";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

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

    // Bloque le scroll quand la modale est ouverte
    useEffect(() => {
        document.body.classList.add("modal-open");
        return () => {
            document.body.classList.remove("modal-open");
        };
    }, []);

    return (
        <div className="modal-overlay">
            <form onSubmit={handleSubmit} className="modal-content">
                <h2 className="text-xl font-bold mb-6">Modifier le jardin</h2>

                <div className="name-field relative">
                    <label htmlFor="garden-name" className="text-sm font-medium mb-1 block">Nom du jardin</label>
                    <input
                        id="garden-name"
                        type="text"
                        value={editForm.name}
                        placeholder="Nom du jardin..."
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        maxLength={25}
                        className={`input-text ${errors.name ? "border-red-500" : ""}`}
                    />
                    <span className="char-counter">{editForm.name.length}/25</span>
                </div>
                {errors.name && <p className="error-alerte">⚠️ {errors.name}</p>}

                {/* Description */}
                <div className="relative mt-4">
                    <label htmlFor="garden-description" className="text-sm font-medium mb-1 block">Description</label>
                    <textarea
                        id="garden-description"
                        value={editForm.description}
                        placeholder="Description..."
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        maxLength={272}
                        rows={4}
                        className={`input-text ${errors.description ? "border-red-500" : ""}`}
                    />
                    <span className="char-counter mb-2">
                        {editForm.description.length}/272
                    </span>
                </div>
                {errors.description && <p className="error-alerte">⚠️ {errors.description}</p>}

                {/* Selects */}
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <div className="flex-1 min-w-[140px]">
                        <label htmlFor="garden-localisation" className="text-sm font-medium mb-1 block">Localisation</label>
                        <select
                            id="garden-localisation"
                            value={editForm.id_localisation ?? ""}
                            onChange={(e) =>
                                setEditForm({ ...editForm, id_localisation: e.target.value ? Number(e.target.value) : null })
                            }
                            className="input-text w-full"
                        >
                            <option value="">Non renseignée</option>
                            {localisations.map(loc => (
                                <option key={loc.id} value={loc.id}>{loc.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Exposition */}
                    <div className="flex-1 min-w-[140px]">
                        <label htmlFor="garden-exposition" className="text-sm font-medium mb-1 block">Exposition</label>
                        <select
                            id="garden-exposition"
                            value={editForm.id_exposition ?? ""}
                            onChange={(e) =>
                                setEditForm({ ...editForm, id_exposition: e.target.value ? Number(e.target.value) : null })
                            }
                            className="input-text w-full"
                        >
                            <option value="">Non renseignée</option>
                            {expositions.map(expo => (
                                <option key={expo.id} value={expo.id}>{expo.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Difficulté */}
                <div>
                    <label htmlFor="garden-difficulty" className="text-sm font-medium mb-1 block mt-4">Difficulté</label>
                    <select
                        id="garden-difficulty"
                        value={editForm.id_difficulty ?? ""}
                        onChange={(e) =>
                        setEditForm({ ...editForm, id_difficulty: e.target.value ? Number(e.target.value) : null })
                        }
                        className="input-text"
                    >
                        <option value="">Non renseignée</option>
                        {difficulties.map(diff => (
                        <option key={diff.id} value={diff.id}>{diff.name}</option>
                        ))}
                    </select>
                </div>

                {/* Pets */}
                <div>
                    <label className="text-sm font-medium mb-2 block mt-4">Avez-vous des animaux ?</label>
                    <div className="pets-container">
                        {allPets.map(pet => {
                            const checked = editForm.pets.includes(pet.id);

                            return (
                                <label
                                    key={pet.id}
                                    className={`pet-chip ${checked ? "selected" : ""}`}
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
                                    />
                                    {pet.name}
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap justify-between gap-2 mt-6">
                    <button type="button" onClick={onClose} className="btn-desable px-4 py-2 w-full sm:w-auto">
                        Annuler
                    </button>
                    <button type="submit" className="btn-global px-4 py-2 w-full sm:w-auto">
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModalUpdateGardenId;