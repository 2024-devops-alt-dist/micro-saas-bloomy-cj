import React, { useState } from "react";
import "../../../../assets/styles/global.css";
import mascotRelax from "../../../../assets/pictures/mascot-relax.png";
import { useNavigate } from "react-router-dom";

const AddGardenInfo : React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const handleNextStep = () => {
        // création "draft/brouillon" de jardin avec ce qu'on a rempli
        const gardenDraft = { name, image, description: "", localisation: "", pets: false, plants: [] };
        console.log("Draft créé dans AddGardenInfo :", gardenDraft);
        navigate("/addGardenInfoFa", { state: { gardenDraft } });
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <header className="flex justify-between items-center px-4 py-3 border-b border-green-100">
                <button className="text-gray-600 hover:text-green-600 text-2xl" onClick={() => navigate(-1)}>←</button>
                <p className="text-gray-800 text-md">Création d’un jardin</p>
                <button className="text-gray-600 hover:text-red-500 text-2xl">×</button>
            </header>

        {/* Main content */}
        <main className="flex flex-col items-center text-center p-6">
            <h2 className="font-semibold text-green-800 mb-2">C’est parti !</h2>
            <p className="font-bebas text-lg text-gray-600 mb-4">Étape 1</p>

            <img src={mascotRelax} alt="Mascotte Bloomy" className="w-55 mb-6"/>

            <hr className="border-t border-gray-200 w-full max-w-xs mb-8" />

            {/* Form */}
            <form className="w-full max-w-xs text-left space-y-6">
                <div>
                    <label className="block text-gray-700 mb-2">Nom de votre jardin :</label>
                    <input
                        type="text"
                        placeholder="Écrire ..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-1 focus:ring-green-400"
                    />
                </div>

                {/* Image facultative */}
                <div>
                    <label className="block text-gray-700 mb-2">Ajouter une image (facultatif) :</label>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder={image ? "Image sélectionnée" : "Télécharger"}
                            className="w-full border border-gray-300 rounded-l-lg px-3 py-1 text-gray-500"
                        />
                        <label className="bg-green-100 px-3 py-1 rounded-r-lg cursor-pointer hover:bg-green-200 transition-all">
                            <input
                                type="file"
                                accept="image/*"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="hidden"
                            />
                            📁
                        </label>
                    </div>
                </div>
            </form>

            {/* Bouton */}
            <button
                //onClick={handleNextStep}
                className="mt-10 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all"
                onClick={handleNextStep}
            >
                Go étape 2
            </button>
        </main>
    </div>
    );
};

export default AddGardenInfo;