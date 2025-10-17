import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { gardenService, type Garden } from "../../garden/services/gardenService";
import NavBar from "../../../shared/header";

const MyGarden: React.FC = () => {
    const navigate = useNavigate();
    const [gardens, setGardens] = useState<Garden[]>([]);

    useEffect(() => {
        const fetchGardens = async () => {
            try {
                const data = await gardenService.getAll();
                setGardens(data);
            } catch (error) {
                console.error("Erreur lors du chargement des jardins :", error);
            }
        };
        fetchGardens();
    }, []);

    return (
        <div className="flex flex-col h-screen bg-white">
            <header className="flex justify-between items-center px-6 py-4 border-b border-green-100">
                <h1 className="text-2xl font-bold text-gray-800">Mes Jardins</h1>
                <button
                    onClick={() => navigate("/addGarden")}
                    className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                >
                    <FiPlus className="text-2xl" />
                </button>
            </header>

            <main className="flex-1 p-6">
                {gardens.length > 0 ? (
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide py-4">
                        {gardens.map((garden) => (
                            <div
                                key={garden.id}
                                className="min-w-[200px] h-[200px] bg-green-100 flex flex-col justify-center items-center rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
                                onClick={() => console.log("Ouvrir le jardin :", garden.name)}
                            >
                                <h2 className="text-lg font-semibold text-green-700">{garden.name}</h2>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic text-center mt-10">
                        Aucun jardin pour le moment 🌱
                    </p>
                )}
            </main>


            <NavBar />
        </div>
    );
};

export default MyGarden;
