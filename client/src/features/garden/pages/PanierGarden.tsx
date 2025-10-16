import { useNavigate } from "react-router-dom";
import GardenButton from "../../buttons/GardenButton";
import GardenPlantCard from "../components/GardenPlantCard";
import CustomButton from "../../buttons/CustomButton";


const PanierGarden : React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <header className="flex justify-between items-center px-4 py-3 border-b border-green-100">
                <button className="text-gray-600 hover:text-green-600 text-2xl" onClick={() => navigate(-1)}>←</button>
                <p className="text-gray-800 text-md">Création d’un jardin</p>
                <button className="text-gray-600 hover:text-red-500 text-2xl">×</button>
            </header>
            <main className="flex flex-col items-center text-center p-6">
                <h1 className="text-3xl font-bold">Votre sélection pour le jardin</h1>
                <h2>Balcon-est</h2>

                <hr className="border-t border-gray-200 w-full max-w-xs mb-8" />

                <div className="mb-6 w-full max-w-md">
                    <GardenButton label="+ Ajouter une plante" />
                </div>

                <GardenPlantCard />

                <div className="mt-6 w-full max-w-md">
                    <CustomButton label="Valider ma sélection" />
                </div>
                    </main>
        </div>
    );
};

export default PanierGarden;