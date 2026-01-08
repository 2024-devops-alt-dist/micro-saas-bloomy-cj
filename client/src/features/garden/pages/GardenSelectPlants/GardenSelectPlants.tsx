import React from "react";
import "../../../../assets/styles/global.css";
import "./GardenSelectPlants.css";
import PlantList from "../../../plants/pages/PlantList";
import { useNavigate } from "react-router-dom";
import CategoryTabs from "../../components/CategoryTab/CategoryTab";
import SearchFilterBar from "../../components/SearchFilterBar/SearchFilterBar";
import CustomButton from "../../../buttons/CustomButton";
import HeaderAddGarden from "../../../../shared/headerAddGarden";
import type { GardenDraft } from "../../services/gardenService";
import { getDraft, saveDraft } from "../../services/gardenLocalStorage";

const GardenSelectPlants : React.FC = () => {
    const navigate = useNavigate();
    const gardenDraft: GardenDraft | undefined = getDraft();

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
                    {/* <PlantList selectedPlantIds={selectedPlantIds} gardenDraft={gardenDraft} /> */}
                    <PlantList />
                </div>

                <div className="fixed-button-container">
                    <CustomButton label="Voir ma sélection" onClick={() => { saveDraft(gardenDraft); navigate("/panierGarden"); }}/>
                </div>
            </main>


        </div>
    );
};

export default GardenSelectPlants;