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

    const handleNextStep = () => {
        const updatedGardenDraft = {
            ...gardenDraft,
            description,
            localisation,
            pets: pets ?? false,
        };
        console.log("Draft mis à jour (Suivant) :", updatedGardenDraft);
        navigate("/gardenSelectPlants", { state: { gardenDraft: updatedGardenDraft } });
    };

    // Passer = garde draft tel qu'il est, sans modif champs facultatifs
    const handleSkipStep = () => {
        console.log("Draft conservé (Passer) :", gardenDraft);
        navigate("/gardenSelectPlants", { state: { gardenDraft } });
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <header className="flex justify-between items-center px-4 py-3 border-b border-green-100">
                <button className="text-gray-600 hover:text-green-600 text-2xl" onClick={() => navigate(-1)}>←</button>
                <p className="text-gray-800 text-md">Création d’un jardin</p>
                <button className="text-gray-600 hover:text-red-500 text-2xl">×</button>
            </header>

            <main className="flex flex-col items-center text-center p-6">
                <form className="w-full max-w-xs text-left space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-2">Description :</label>
                        <input
                            type="text"
                            placeholder="Décrivez votre jardin ..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-1 focus:ring-green-400"
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <div>
                            <label className="block text-gray-700 mb-2">Localisation :</label>
                            <input
                                type="text"
                                placeholder="ex: Sud-Est, Nord, etc ..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-1 focus:ring-green-400"
                                value={localisation} 
                                onChange={(e) => setLocalisation(e.target.value)}
                            />
                        </div>

                        <div>
                            <span className="block text-gray-700 mb-2">Avez-vous des animaux ?</span>
                            <label className="mr-4">
                                <input type="radio" name="animaux" value="true" checked={pets === true} onChange={() => setPets(true)}/>
                                Oui
                            </label>
                            <label>
                                <input type="radio" name="animaux" value="false" checked={pets === false} onChange={() => setPets(false)}/>
                                Non
                            </label>
                        </div>
                    </div>
                </form>
            
                <button
                    className="mt-10 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all"
                    onClick={handleNextStep}
                >
                    Suivant
                </button>

                <button
                    className="mt-10 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all"
                    onClick={handleSkipStep}
                >
                    Passer
                </button>
            </main>
        </div>
    );
};

export default AddGardenInfoFacultative;