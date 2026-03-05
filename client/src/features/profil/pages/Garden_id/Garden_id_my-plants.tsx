import React from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Garden } from "../../../../models/garden/IGarden";
import { saveDraft } from "../../../garden/services/gardenLocalStorage";

interface GardenIdMyPlantsProps {
    garden: Garden;
}

const GardenIdMyPlants: React.FC<GardenIdMyPlantsProps> = ({ garden }) => {
    const navigate = useNavigate();
    
    if (!garden.plants || garden.plants.length === 0) {
        return <p className="text-gray-500 mt-4">Aucune plante ajoutée à ce jardin pour le moment 🌱</p>;
    }

    return (
        <>
        <button
            className="add-plant-btn mt-4"
            onClick={() => {
                const draft = {
                    id: garden.id,
                    name: garden.name,
                    garden_img: garden.pictureGarden?.name ?? "",
                    description: garden.description ?? "",
                    id_localisation: garden.localisation?.id,
                    pets: garden.pets
                        ?.map(p => p.pet?.id)
                        .filter((id): id is number => id !== undefined) ?? [],
                    plants: garden.plants
                        ?.map(p => p.plant?.id)
                        .filter((id): id is number => id !== undefined) ?? []
                };

                saveDraft(draft);
                navigate("/panierGarden");
            }}
        >
            Modifier mes plantes
        </button>

        <div className="garden-plants-grid mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {garden.plants.map((gp) => {
                const plant = gp.plant;
                if (!plant) return null;

                return (
                    <Link
                        to={`/plants/${plant.id}`}
                        key={plant.id}
                        className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                    >
                        <img
                            src={
                                plant.picturePlant
                                    ? `/assets/pictures/${plant.picturePlant.name}`
                                    : "/assets/pictures/default-plant.png"
                            }
                            alt={plant.name}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3 flex justify-center">
                            <span className="text-white font-semibold text-lg text-center">{plant.name}</span>
                        </div>
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </Link>
                );
            })}
        </div>
        </>
        
    );
};

export default GardenIdMyPlants;