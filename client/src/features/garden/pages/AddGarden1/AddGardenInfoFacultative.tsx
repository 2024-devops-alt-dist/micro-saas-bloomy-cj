import React, { useState } from "react";
import "../../../../assets/styles/global.css";
import { useLocation, useNavigate } from "react-router-dom";

const AddGardenInfoFacultative : React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const gardenDraft = location.state?.gardenDraft;

    // États pour les infos facultatives
    const [description, setDescription] = useState(gardenDraft?.description || "");
    const [localisation, setLocalisation] = useState(gardenDraft?.localisation || "");
    const [pets, setPets] = useState<boolean | null>(gardenDraft?.pets ?? null);

    const [errorMessage, setErrorMessage] = useState("");

    const hasChanges =
        description.trim() !== "" ||
        localisation.trim() !== "" ||
        pets === true;

    const handleNextStep = () => {
        if (!hasChanges) {
            setErrorMessage("Veuillez renseigner au moins une information avant de continuer");
            return;
        }

        const updatedGardenDraft = {
            ...gardenDraft,
            description,
            localisation,
            pets: pets ?? false,
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
                <form className="w-full max-w-xs text-left space-y-6">
                    <div>
                        <label className="block mb-1">Description :</label>
                        <textarea
                            placeholder="Décrivez votre jardin ..."
                            className="input-text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5} 
                        ></textarea>
                        
                        <label className="block mb-1 mt-4">Localisation :</label>
                        <input
                            type="text"
                            placeholder="ex: Sud-Est, Nord, etc ..."
                            className="input-text"
                            value={localisation} 
                            onChange={(e) => setLocalisation(e.target.value)}
                        />

                        <span className="block mb-1 mt-5">Avez-vous des animaux ?</span>
                        <label className="mr-4">
                            <input type="radio" name="animaux" value="true" checked={pets === true} onChange={() => setPets(true)}/>
                            Oui
                        </label>
                        <label>
                            <input type="radio" name="animaux" value="false" checked={pets === false} onChange={() => setPets(false)}/>
                            Non
                        </label>
                    </div>
                </form>

                {errorMessage && <p className="error-alerte mt-8">⚠️ {errorMessage}</p>}

                <button className="btn-global mt-8" onClick={handleNextStep}>
                    Suivant
                </button>

                {!hasChanges && (
                <button className="btn-desable mt-2" onClick={handleSkipStep}>
                    Passer
                </button>
            )}
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