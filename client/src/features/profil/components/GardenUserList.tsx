// src/components/garden/GardenUserList.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Garden } from "../../../models/garden/IGarden";
import { gardenService } from "../../garden/services/gardenService";
import "./GardenUserList.css";

interface GardenUserListProps {
    variant?: "default" | "myGarden";
}

const GardenUserList: React.FC<GardenUserListProps> = ({ variant = "default" }) => {
    const [gardens, setGardens] = useState<Garden[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGardens = async () => {
            try {
                const data = await gardenService.getMine();
                setGardens(data.sort((a, b) => a.id - b.id));
            } catch (error) {
                console.error("Erreur lors du chargement des jardins :", error);
            }
        };

        fetchGardens();
    }, []);

    if (gardens.length > 0) {
        return (
            <div className="garden-list">
                {gardens.map((garden) => (
                    <div key={garden.id} className="garden-card" onClick={() => navigate(`/garden/${garden.id}`)}>
                        <img
                            src={
                                garden.pictureGarden
                                    ? `/assets/pictures/${garden.pictureGarden.name}`
                                    : "/assets/pictures/plants_legume.jpg"
                            }
                            alt={`Photo du jardin ${garden.name}`}
                            className="garden-img"
                        />
                        <div className="garden-img-overlay"></div>
                        <h3 className="garden-name">{garden.name}</h3>
                    </div>
                ))}
            </div>
        );
    }

    /* EMPTY STATE */
    if (variant === "myGarden") {
        return (
            <div className="empty-garden flex flex-col items-center">
                <img
                    src="/assets/mascot/mascot-question.png"
                    alt="Aucun jardin"
                    className="w-50 h-50 mb-4"
                />
                <p>C’est un peu vide ici !</p>
                <button onClick={() => navigate("/addGarden")} className="btn-global mt-6">
                    Ajouter un jardin
                </button>
            </div>
        );
    }

    return (
        <div className="empty-garden">
            <p>Vous n'avez pas encore de jardin.</p>
            <button
                onClick={() => navigate("/addGarden")}
                className="btn-global mt-6"
            >
                Ajouter un jardin
            </button>
        </div>
    );
};

export default GardenUserList;