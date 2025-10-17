import React from "react";
import mascotWelcome from "../../../assets/pictures/mascot-welcome.png";
import "../../../assets/styles/global.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../shared/header";
import "../../../assets/styles/addGarden.css"

const AddGarden : React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <header className="flex justify-between items-center px-4 py-3 border-b border-green-100">
                <button className="text-gray-600 hover:text-green-600 text-2xl">←</button>
                <p className="text-gray-800 text-md">Création d’un jardin</p>
                <button className="text-gray-600 hover:text-red-500 text-2xl">×</button>
            </header>

            {/* Main content */}
            <main className="flex flex-col items-center text-center p-6">
                <img src={mascotWelcome} alt="Mascotte Bloomy" className="w-45 h-45 mb-2"/>

                <h1 className="mb-4">Créez votre jardin</h1>
                <p className="text-gray-600 mb-6">
                    Choisissez votre méthode préférée pour commencer votre aventure jardinage :
                </p>

                <div className="flex flex-col gap-4 w-full max-w-sm">
                    {/* Bouton 1 */}
                    <button className="flex justify-between items-center py-4 px-5 btn-garden-bloomy">
                        <div className="text-left">
                            <h3 className="font-semibold">Avec l’aide de Bloomy</h3>
                            <p className="text-green-50">
                                Répondez à quelques questions pour des recommandations personnalisées
                            </p>
                        </div>
                        <span className="text-white text-2xl">›</span>
                    </button>

                    {/* Bouton 2 */}
                    <button className="flex justify-between items-center border-2 border-green-400 text-green-600 py-4 px-5 rounded-xl hover:bg-green-50 transition-all" onClick={() => navigate("/addGardenInfo")}>
                        <div className="text-left">
                            <h3 className="font-semibold">Sélection manuelle</h3>
                            <p className="text-green-500">
                                Choisissez vous-même les plantes que vous souhaitez cultiver
                            </p>
                        </div>
                        <span className="text-green-500 text-2xl">›</span>
                    </button>
                </div>

                <p className="text-gray-500 mt-6">
                    Vous pouvez en créer autant que vous voulez.
                </p>
            </main>

            {/* Navigation bar */}
            <NavBar />
        </div>
    );
};

export default AddGarden;