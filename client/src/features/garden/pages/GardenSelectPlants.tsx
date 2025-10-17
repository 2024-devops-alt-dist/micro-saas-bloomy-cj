import React from "react";
import "../../../assets/styles/global.css";
import PlantList from "../../plants/pages/PlantList";
import { useLocation, useNavigate } from "react-router-dom";
import CategoryTabs from "../components/CategoryTab";
import SearchFilterBar from "../components/SearchFilterBar";

const GardenSelectPlants : React.FC = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const gardenDraft = location.state?.gardenDraft;

    console.log("Draft reçu sur GardenSelectPlants :", gardenDraft);

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <header className="flex justify-between items-center px-4 py-3 border-b border-green-100">
                <button className="text-gray-600 hover:text-green-600 text-2xl" onClick={() => navigate(-1)}>←</button>
                <p className="text-gray-800 text-md">Création d’un jardin</p>
                <button className="text-gray-600 hover:text-red-500 text-2xl">×</button>
            </header>

            {/* Banner */}
            <div className="w-full bg-green-600 text-white py-12 flex justify-center items-center relative">
                <h1 data-testid="draft-name" className="text-3xl font-bold">{gardenDraft?.name}</h1>
            </div>

            {/* Barre de recherche et filtre */}
            <SearchFilterBar />

            {/* Category Tabs */}
            <CategoryTabs />

            <div style={{ padding: "20px" }}>
                <h1>Choisissez vos plantes</h1>
                <PlantList />
            </div>
        </div>
    );
};

export default GardenSelectPlants;