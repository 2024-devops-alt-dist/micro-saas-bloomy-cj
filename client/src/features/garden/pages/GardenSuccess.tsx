import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../../buttons/CustomButton";
import type { Garden } from "../services/gardenService";

const GardenSuccess: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const garden = location.state?.garden as Garden | undefined;

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-center px-6">
            <img 
                src="/assets//mascot/success-mascot.png" 
                alt="Mascotte réussite" 
                className="w-48 h-48 mb-2" 
            />
            <h1 className="text-3xl font-bold text-green-700 mb-4">
                Bravo, vous avez créé votre jardin ! 🎉 
            </h1>
            {garden && <p className="text-gray-600 mb-8">Votre jardin <strong>"{garden.name}"</strong> est maintenant enregistré.</p>}
            <CustomButton
                label="Voir mes jardins"
                onClick={() => navigate("/mes-jardins")}
            />
        </div>
    );
};

export default GardenSuccess;
