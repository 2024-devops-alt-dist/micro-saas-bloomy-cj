import React, { useEffect, useState } from "react";
import "../../../../assets/styles/global.css";
import "./ListPlant.css";
import NavBarMobile from "../../../../shared/navbar-mobile";
import SearchFilterBar from "../../../garden/components/SearchFilterBar/SearchFilterBar";
import { plantService } from "../../services/plantService";
import type { Plant } from "../../../../models/plant/IPlant";
import { usePlantSearch } from "../../../Hooks/usePlantSearch";
import PlantCard from "../../components/PlantCard/PlantCard";
import { getDraft } from "../../../garden/services/gardenLocalStorage";
import NavBarDesktop from "../../../../shared/navbar-desktop";

const ListPlant: React.FC = () => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(true);

    const gardenDraft = getDraft();

    useEffect(() => {
        plantService.getAll().then((data) => { setPlants(data); setLoading(false); });
    }, []);

    const { searchTerm, setSearchTerm, filters, setFilters, filteredPlants } = usePlantSearch(plants);

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBarMobile />
            <NavBarDesktop />

            <section className="pt-12 lg:pt-8 px-6 home-search-section">
                <div className="home-search-titles">
                    <h1 className="home-h1">Catalogue de plantes</h1>
                    <h2 className="custom-h2">Explorez, filtrez et choisissez vos plantes préférées</h2>
                </div>
                <SearchFilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    filters={filters}
                    setFilters={setFilters}
                    plants={plants}
                />
            </section>

            <hr className="separator" />

            <section className="">
                {filteredPlants.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Pas de plante correspondante.</p>
                ) : (
                    <div className="plant-list-wrapper">
                        <div className="plant-list">
                            {filteredPlants.map((plant) => (
                            <PlantCard
                                key={plant.id}
                                plant={plant}
                                gardenDraft={gardenDraft}
                                mode="catalog"
                            />
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ListPlant;