import React from "react";
import "../../../assets/styles/global.css";
import "../../../assets/styles/GardenSelectPlants.css";
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
        <div>
            {/* Header */}
            <header className="hearder-container">
                <button className="hover:text-green-600 text-2xl" onClick={() => navigate(-1)}>←</button>
                <p className="text-md">Création d’un jardin</p>
                <button className="hover:text-red-500 text-2xl">×</button>
            </header>

            <main className="">
                {/* Banner */}
                <div className="banner w-full">
                    <h1 className="custom-title">Choisissez vos plantes</h1>
                    {/* <h1 data-testid="draft-name">{gardenDraft?.name}</h1> */}
                </div>

                {/* Barre de recherche et filtre */}
                <SearchFilterBar />

                {/* Category Tabs */}
                <CategoryTabs />

                <div style={{ padding: "20px" }}>
                    {/* <h1 className="custom-title">Choisissez vos plantes</h1> */}
                    <PlantList />
                </div>
            </main>
        </div>
    );
};

export default GardenSelectPlants;