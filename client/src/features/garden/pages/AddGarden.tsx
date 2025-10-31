import React from "react";
import mascotWelcome from "../../../assets/pictures/mascot-welcome.png";
import "../../../assets/styles/global.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../shared/navbar";
import "../../../assets/styles/addGarden.css";

const AddGarden: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <header className="hearder-container">
                <button className="hover:text-green-600 text-2xl">←</button>
                <p className="text-md">Création d’un jardin</p>
                <button className="hover:text-red-500 text-2xl">×</button>
            </header>

            <main className="main-navbar add-garden-layout">
                <img src={mascotWelcome} alt="Mascotte Bloomy" className="w-48 h-48 mb-2" />

                <h1 className="mb-4">Créez votre jardin</h1>
                <p className="mb-6">Choisissez votre méthode préférée pour commencer votre aventure jardinage :</p>

                <div className="add-garden-buttons flex flex-col gap-4 w-full max-w-sm">
                    {/* Bouton 1 */}
                    <button className="flex justify-between items-center py-4 px-5 btn-garden-bloomy">
                        <div className="text-left">
                            <h3 className="font-semibold">Avec l’aide de Bloomy</h3>
                            <p>Répondez à quelques questions pour des recommandations personnalisées</p>
                        </div>
                        <span className="text-white text-2xl">›</span>
                    </button>

                    {/* Bouton 2 */}
                    <button className="flex justify-between items-center py-4 px-5 btn-select-manual"  onClick={() => navigate("/addGardenInfo")}>
                        <div className="text-left">
                            <h3 className="font-semibold">Sélection manuelle</h3>
                            <p>Choisissez vous-même les plantes que vous souhaitez cultiver</p>
                        </div>
                        <span className="btn-arrow text-2xl">›</span>
                    </button>
                </div>

                <p className="mt-6">Vous pouvez en créer autant que vous voulez.</p>
            </main>

            {/* Navigation bar */}
            <NavBar />
        </div>
    );
};

export default AddGarden;
