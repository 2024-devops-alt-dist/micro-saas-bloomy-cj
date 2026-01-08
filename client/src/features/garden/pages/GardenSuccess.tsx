import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../buttons/CustomButton";
import { gardenService, type Garden } from "../services/gardenService";

const GardenSuccess: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [garden, setGarden] = useState<Garden | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        const fetchGarden = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const data = await gardenService.getById(Number(id));
                if (!mounted) return;
                setGarden(data);
            } catch (e) {
                console.error("Erreur fetch garden:", e);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchGarden();
        return () => { mounted = false; };
    }, [id]);

    if (loading) return <p>Chargement...</p>;

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
            {garden ? (
                <p className="text-gray-600 mb-8">Votre jardin <strong>"{garden.name}"</strong> est maintenant enregistré.</p>
            ) : (
                <p className="text-gray-600 mb-8">Impossible de charger les informations du jardin.</p>
            )}
            <CustomButton
                label="Voir mes jardins"
                onClick={() => navigate("/mes-jardins")}
            />
        </div>
    );
};

export default GardenSuccess;
