import React, { useEffect, useState } from "react";
import "../../../../assets/styles/global.css";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HeaderAddGarden from "../../../../shared/headerAddGarden";
import { commonService } from "../../services/commonService";
import "../../../../assets/styles/AddGardenInfoFacultative.css";
import type { Pet } from "../../../../models/common/IPet";
import type { GardenDraft } from "../../services/gardenService";
import { getDraft, saveDraft } from "../../services/gardenLocalStorage";

//  Schéma de validation
const gardenFacSchema = z.object({
    description: z.string().max(500, "Maximum 500 caractères").optional(),
    id_localisation: z.number().optional(),
    pets: z.array(z.number()).optional(),
});

type GardenFacValues = z.infer<typeof gardenFacSchema>;

const AddGardenInfoFacultative : React.FC = () => {
    const navigate = useNavigate();
    const gardenDraft: GardenDraft | undefined = getDraft();

    const [petsList, setPetsList] = useState<Pet[]>([]);
    const [localisations, setLocalisations] = useState<{ id: number; name: string; icon?: string }[]>([]);
    const [loadingPets, setLoadingPets] = useState(false);
    const [loadingLoc, setLoadingLoc] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { register, handleSubmit, watch, formState: { errors }, setValue, getValues } = useForm<GardenFacValues>({
        resolver: zodResolver(gardenFacSchema),
        defaultValues: {
            description: gardenDraft?.description || "",
            id_localisation: gardenDraft?.id_localisation,
            pets: gardenDraft?.pets || [],
        },
    });

    const hasAtLeastOneValue = (data: any) => {
        const desc = typeof data?.description === "string" ? data.description.trim() : "";
        const loc = data?.id_localisation;
        const locHas = typeof loc === "number" && !Number.isNaN(loc);
        const petsLen = (data?.pets?.length ?? 0) > 0;
        return !!desc || locHas || petsLen;
    };

    const watchedFields = watch();
    const hasChanges = hasAtLeastOneValue(watchedFields);

    useEffect(() => {
        // Supprime le message général dès qu'un champ change
        if (errorMessage && hasChanges) {
            setErrorMessage("");
        }
    }, [errorMessage, hasChanges]);

    // Fetch localisations
    useEffect(() => {
        let mounted = true;
        const fetchLocalisations = async () => {
            setLoadingLoc(true);
            try {
                const data = await commonService.getLocalisations();
                if (!mounted) return;
                setLocalisations(data || []);
            } finally { if (mounted) setLoadingLoc(false); }
        };
        fetchLocalisations();
        return () => { mounted = false; };
    }, []);

    // Fetch  animaux 
    useEffect(() => {
        let mounted = true;
        const fetchPets = async () => {
            setLoadingPets(true);
            try {
                const data = await commonService.getPets();
                if (!mounted) return;
                setPetsList(data || []);
            } finally { if (mounted) setLoadingPets(false); }
        };
        fetchPets();
        return () => { mounted = false; };
    }, []);

    // Gestion sélection multiple animaux
    const selectedPets = watch("pets") || [];
    const togglePet = (petId: number) => {
    const current = getValues("pets") || [];
        setValue("pets", current.includes(petId) ? current.filter(id => id !== petId) : [...current, petId]);
    };

    const onSubmit = (data: GardenFacValues) => {
        if (!hasAtLeastOneValue(data)) {
            setErrorMessage("Veuillez renseigner au moins une information avant de continuer. Ou passez l'étape.");
            return;
        }

        const updatedDraft: GardenDraft = {
            name: gardenDraft?.name ?? "",
            garden_img: gardenDraft?.garden_img ?? "",
            description: data.description,
            id_localisation: data.id_localisation,
            pets: data.pets || gardenDraft?.pets || [],
            plants: gardenDraft?.plants || [],
            user: gardenDraft?.user,
        };

        saveDraft(updatedDraft);
        navigate("/gardenSelectPlants");
    };

    // Passer = garde draft tel qu'il est, sans modif champs facultatifs
    const handleSkipStep = () => {
        if (gardenDraft) saveDraft(gardenDraft);
        navigate("/gardenSelectPlants");
    };

    return (
        <div>
            <HeaderAddGarden showBack={true} />

            <main className="main-footer">
                <form
                    className="w-full text-left space-y-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const vals = getValues();
                        if (!hasAtLeastOneValue(vals)) {
                            setErrorMessage("Veuillez renseigner au moins une information avant de continuer. Ou passez l'étape.");
                            return;
                        }
                        // Delegate to react-hook-form validation/submit
                        handleSubmit(onSubmit)(e);
                    }}
                >
                    <div>
                        <label htmlFor="description" className="block mb-2">Description :</label>
                        <textarea
                            id="description"
                            placeholder="Décrivez votre jardin ..."
                            className="input-text"
                            {...register("description")}
                            rows={5} 
                        ></textarea>
                        {errors.description && (
                            <p className="error-alerte mt-1">⚠️ {errors.description.message}</p>
                        )}
                        
                        <label htmlFor="localisation" className="block mb-2 mt-3">Où se situe votre jardin ?</label>
                        {loadingLoc ? (
                            <div className="input-text">Chargement...</div>
                        ) : (
                            <select
                                id="id_localisation"
                                className="input-text"
                                {...register("id_localisation", { setValueAs: v => v === "" ? undefined : Number(v) })}
                            >
                                <option className="placeholder-option" value="">Choisir une localisation</option>
                                {localisations.map((loc) => (
                                    <option key={loc.id} value={loc.id}> {loc.name} </option>
                                ))}
                            </select>
                        )}

                        <span className="block mb-1 mt-5">Avez-vous des animaux ?</span>
                        {loadingPets ? (
                            <p className="input-text">Chargement des animaux...</p>
                        ) : (
                            <div className="pets-grid">
                                {petsList.map((pet) => {
                                    const isSelected = selectedPets.includes(pet.id);

                                    return (
                                        <button
                                            key={pet.id}
                                            type="button"
                                            className={`pet-card ${isSelected ? "selected" : ""}`}
                                            onClick={() => togglePet(pet.id)}
                                        >
                                            {pet.icon && (
                                                <div className="pet-icon-wrapper">
                                                    <img
                                                    src={`/assets/icons/${pet.icon}`}
                                                    alt={pet.name}
                                                    className="pet-icon"
                                                    />
                                                </div>
                                            )}
                                            <span className="pet-name">{pet.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {errorMessage && <p className="error-alerte mt-8 text-center">⚠️ {errorMessage}</p>}

                    <div className="flex flex-col items-center space-y-4 mt-8">
                        <button className="btn-global w-full" type="submit">
                            Suivant
                        </button>

                        {!hasChanges && (
                            <button className="btn-desable w-full" onClick={handleSkipStep} type="button">
                                Passer
                            </button>
                        )}
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AddGardenInfoFacultative;