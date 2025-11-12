import React from "react";
import "../../../assets/styles/global.css";
import "../../../assets/styles/GardenSelectPlants.css";
import PlantList from "../../plants/pages/PlantList";
import { useLocation, useNavigate } from "react-router-dom";
import CategoryTabs from "../components/CategoryTab";
import SearchFilterBar from "../components/SearchFilterBar";
import CustomButton from "../../buttons/CustomButton";
import HeaderAddGarden from "../../../shared/headerAddGarden";

const GardenSelectPlants : React.FC = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const gardenDraft = location.state?.gardenDraft;

    console.log("Draft reçu sur GardenSelectPlants :", gardenDraft);

    return (
        <div>
            <HeaderAddGarden showBack={true} />

            <main className="mt-15 mb-22">
                <div className="banner w-full">
                    <h1 className="custom-title">Choisissez vos plantes</h1>
                </div>

                <SearchFilterBar />

                <CategoryTabs />

                <div style={{ padding: "20px" }}>
                    <PlantList />
                </div>

                <div className="fixed-button-container">
                    <CustomButton label="Voir ma sélection" onClick={() => navigate("/panierGarden", { state: { gardenDraft } })}/>
                </div>
            </main>


        </div>
    );
};

export default GardenSelectPlants;