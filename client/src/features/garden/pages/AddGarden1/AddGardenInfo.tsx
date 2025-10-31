import React, { useState } from "react";
import "../../../../assets/styles/global.css";
import mascotRelax from "../../../../assets/pictures/mascot-relax.png";
import { useNavigate } from "react-router-dom";

const AddGardenInfo : React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");

    const handleNextStep = () => {
        if (name.trim().length === 0) {  
            setError("Le nom du jardin est obligatoire.");
            return;
        }
        setError("");

        // création "draft/brouillon" de jardin avec ce qu'on a rempli
        const gardenDraft = { name, image, description: "", localisation: "", pets: false, plants: [] };
        console.log("Draft créé dans AddGardenInfo :", gardenDraft);
        navigate("/addGardenInfoFa", { state: { gardenDraft } });
    };

    return (
        <div>
            {/* Header */}
            <header className="hearder-container">
                <button className="hover:text-green-600 text-2xl" onClick={() => navigate(-1)}>←</button>
                <p className="text-md">Création d’un jardin</p>
                <button className="hover:text-red-500 text-2xl">×</button>
            </header>

            {/* Main content */}
            <main className="main-footer">
                <h1 className="mb-2">C’est parti !</h1>
                <p className="mb-4">Renseignez les informations de votre jardin.</p>

                <img src={mascotRelax} alt="Mascotte Bloomy" className="w-55 mb-6"/>

                <hr className="border-t border-gray-200 w-full max-w-xs mb-8" />

                {/* Form */}
                <form className="w-full max-w-xs text-left space-y-6">
                    <div>
                        <label className="block mb-1">Nom de votre jardin :</label>
                        <input
                            type="text"
                            placeholder="Écrire ..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-text"
                        />

                        {error && (
                            <p className="error-alerte mt-2">⚠️ {error}</p>
                        )}
                    </div>

                    {/* Image facultative */}
                    <div>
                        <label className="block mb-1">Ajouter une image (facultatif) :</label>
                        <div className="flex">
                            <input
                                type="text"
                                placeholder={image ? "Image sélectionnée" : "Télécharger"}
                                className="input-upload"
                                // value={image ? image.name : ""}
                                // readOnly
                            />
                            <label htmlFor="file-upload" className="upload-label">
                                📁
                            </label>

                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="input-file"
                            />
                        </div>
                    </div>
                </form>

                <button className="btn-global mt-6" onClick={handleNextStep}>
                    Suivant
                </button>
            </main>
        </div>
    );
};

export default AddGardenInfo;