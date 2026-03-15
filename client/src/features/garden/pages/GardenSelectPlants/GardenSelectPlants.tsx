import React, { useEffect, useState } from "react";
import "../../../../assets/styles/global.css";
import "./GardenSelectPlants.css";
import PlantList from "../../../plants/pages/PlantList";
import { useNavigate } from "react-router-dom";
import SearchFilterBar from "../../components/SearchFilterBar/SearchFilterBar";
import CustomButton from "../../../buttons/CustomButton";
import HeaderAddGarden from "../../../../shared/headerAddGarden";
import { plantService } from "../../../plants/services/plantService";
import { usePlantSearch } from "../../../Hooks/usePlantSearch";
import type { Plant } from "../../../../models/plant/IPlant";
import NavBarDesktop from "../../../../shared/navbar-desktop";

const GardenSelectPlants : React.FC = () => {
    const navigate = useNavigate();
    const [plants, setPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(true);

    // Charger les plantes
    useEffect(() => {
        plantService.getAll().then((data) => { setPlants(data); setLoading(false); });
    }, []);

    const { searchTerm, setSearchTerm, filters, setFilters, filteredPlants } = usePlantSearch(plants);

    if (loading) return <p>Chargement...</p>;

    return (
        <div>
            <NavBarDesktop />
            <HeaderAddGarden showBack={true} />

            <main className="main-content-padding">
                <div className="banner w-full">
                    <h1 className="custom-title">Choisissez vos plantes</h1>
                </div>
                <div className="px-6">
                    <SearchFilterBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        filters={filters}
                        setFilters={setFilters}
                        plants={plants}
                    />
                </div>
                <PlantList plants={filteredPlants} />

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