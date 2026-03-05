import React from "react";
import type { Garden } from "../../../../models/garden/IGarden";

interface Props {
  garden: Garden;
}

const GardenIdSummary: React.FC<Props> = ({ garden }) => {
  const totalPlants = garden.plants?.length || 0;
//   console.log("Données du jardin :", garden);

//   // Comptage par catégorie
//   const plantsByCategory =
//     garden.plants?.reduce((acc: Record<string, number>, plant) => {
//       if (plant.categories && plant.categories.length > 0) {
//         plant.categories.forEach((cat) => {
//           const categoryName = cat.name || "Autres";
//           acc[categoryName] = (acc[categoryName] || 0) + 1;
//         });
//       } else {
//         acc["Autres"] = (acc["Autres"] || 0) + 1;
//       }
//       return acc;
//     }, {}) || {};

  return (
    <div className="mt-4 space-y-4">
      <div className="bg-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
        <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center">
        </div>

        <div>
          <p className="text-4xl font-bold">{totalPlants}</p>
          <p className="text-gray-600 text-sm">
            Plantes enregistrées dans votre jardin
          </p>
        </div>
      </div>

      {/* Blocs catégories */}
      {/* <div className="flex gap-3 flex-wrap">
        {Object.entries(plantsByCategory).map(([category, count]) => (
          <div
            key={category}
            className="bg-gray-100 px-4 py-2 rounded-xl shadow-sm"
          >
            <span className="font-semibold">{count}</span>{" "}
            <span className="text-gray-600 text-sm">{category}</span>
          </div>
        ))} */}

        {/* {totalPlants === 0 && (
          <div className="bg-gray-100 px-4 py-2 rounded-xl shadow-sm">
            <span className="text-gray-500 text-sm">
              Aucune plante enregistrée
            </span>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default GardenIdSummary;