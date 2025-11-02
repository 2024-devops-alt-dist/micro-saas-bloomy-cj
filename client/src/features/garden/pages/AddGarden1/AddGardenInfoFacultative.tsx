import React, { useEffect, useState } from "react";
import "../../../../assets/styles/global.css";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//  Schéma de validation
const gardenFacSchema = z.object({
    description: z.string().max(500, "Maximum 500 caractères").optional(),
    localisation: z.string().optional(),
    pets: z.boolean().optional(),
});

type GardenFacValues = z.infer<typeof gardenFacSchema>;

const AddGardenInfoFacultative : React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const gardenDraft = location.state?.gardenDraft;
    const [errorMessage, setErrorMessage] = useState("");

    const { register, handleSubmit, watch, formState: { errors }, setValue, getValues } = useForm<GardenFacValues>({
        resolver: zodResolver(gardenFacSchema),
        defaultValues: {
            description: gardenDraft?.description || "",
            localisation: gardenDraft?.localisation || "",
            pets: gardenDraft?.pets ?? false,
        },
    });

    const watchedFields = watch();

    const hasChanges =
        (watchedFields.description?.trim() || "") !== "" ||
        (watchedFields.localisation?.trim() || "") !== "" ||
        watchedFields.pets === true;

    useEffect(() => {
        // Supprime le message général dès qu'un champ change
        if (errorMessage && hasChanges) {
            setErrorMessage("");
        }
    }, [watchedFields, errorMessage, hasChanges]);

    const onSubmit = (data: GardenFacValues) => {
        if (!data.description?.trim() && !data.localisation?.trim() && data.pets === false) {
            setErrorMessage("Veuillez renseigner au moins une information avant de continuer. Ou passez l'étape.");
            return;
        }

        const updatedGardenDraft = {
            ...gardenDraft,
            ...data,
        };

        navigate("/gardenSelectPlants", { state: { gardenDraft: updatedGardenDraft } });
    };

    // Passer = garde draft tel qu'il est, sans modif champs facultatifs
    const handleSkipStep = () => {
        navigate("/gardenSelectPlants", { state: { gardenDraft } });
    };

    return (
        <div>
            {/* Header */}
            <header className="hearder-container">
                <button className="hover:text-green-600 text-2xl" onClick={() => navigate(-1)}>←</button>
                <p className="text-md">Création d’un jardin</p>
                <button className="hover:text-red-500 text-2xl">×</button>
            </header>

            <main className="main-footer">
                <form className="w-full max-w-xs text-left space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block mb-1">Description :</label>
                        <textarea
                            placeholder="Décrivez votre jardin ..."
                            className="input-text"
                            {...register("description")}
                            rows={5} 
                        ></textarea>
                        {errors.description && (
                            <p className="error-alerte mt-1">⚠️ {errors.description.message}</p>
                        )}
                        
                        <label className="block mb-1 mt-4">Localisation :</label>
                        <input
                            type="text"
                            placeholder="ex: Sud-Est, Nord, etc ..."
                            className="input-text"
                            {...register("localisation")}
                        />

                        <span className="block mb-1 mt-5">Avez-vous des animaux ?</span>
                        <label className="mr-4">
                            <input type="radio" defaultChecked={getValues("pets") === true} onChange={() => setValue("pets", true)}/>
                            Oui
                        </label>

                        <label>
                            <input type="radio" defaultChecked={getValues("pets") === false} onChange={() => setValue("pets", false)}/>
                            Non
                        </label>
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

// partie animaux : 
{/* <div>
    <label className="block mb-1 mt-5 font-medium text-gray-700">
        Quels animaux avez-vous ?
    </label>

    <select
        multiple
        value={pets}
        onChange={(e) =>
        setPets(Array.from(e.target.selectedOptions, (option) => option.value))
        }
        className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-[#55a32b] focus:ring-2 focus:ring-[#55a32b]/30"
    >
        <option value="chien">🐶 Chien</option>
        <option value="chat">🐱 Chat</option>
        <option value="rongeur">🐭 Rongeur (hamster, lapin, etc.)</option>
        <option value="oiseau">🦜 Oiseau</option>
        <option value="reptile">🦎 Reptile / tortue</option>
        <option value="poisson">🐠 Poisson</option>
        <option value="autre">🌿 Autre</option>
        <option value="aucun">🚫 Aucun</option>
    </select>
</div> */}