import React, { useState } from "react";
import "../../../../assets/styles/global.css";
import "./GardenSelectPlants.css";
import PlantList from "../../../plants/pages/PlantList";
import { useNavigate } from "react-router-dom";
import CategoryTabs from "../../components/CategoryTab/CategoryTab";
import SearchFilterBar from "../../components/SearchFilterBar/SearchFilterBar";
import CustomButton from "../../../buttons/CustomButton";
import HeaderAddGarden from "../../../../shared/headerAddGarden";

const GardenSelectPlants : React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div>
            <HeaderAddGarden showBack={true} />

            <main className="mt-15 mb-22">
                <div className="banner w-full">
                    <h1 className="custom-title">Choisissez vos plantes</h1>
                </div>

                <SearchFilterBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                <CategoryTabs />

                <PlantList searchTerm={searchTerm} />

                <div className="fixed-button-container">
                    <CustomButton 
                        label="Voir ma sélection" 
                        onClick={() => { 
                            navigate("/panierGarden"); 
                        }}
                    />
                </div>
            </main>
        </div>
    );
};

export default GardenSelectPlants;