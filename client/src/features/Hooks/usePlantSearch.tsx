import { useState, useMemo } from "react";
import type { Plant } from "../../models/plant/IPlant";
import type { PlantFilters } from "../garden/components/SearchFilterBar/SearchFilterBar";

/**
 * Hook personnalisé permettant de gérer la recherche et le filtrage des plantes.
 * 
 * Responsabilités :
 * - gérer le texte de recherche
 * - gérer les filtres sélectionnés
 * - retourner la liste des plantes filtrées
 */
export const usePlantSearch = (plants: Plant[]) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState<PlantFilters>({categories: [],  expositions: [], difficulties: [], localisations: [], waterings: [], toxicPets: [],});

    /**
     * Liste des plantes filtrées.
     * useMemo évite de recalculer la liste si plants, searchTerm ou filters n'ont pas changé.
     */
    const filteredPlants = useMemo(() => {
        // Normalisation du texte recherché
        const searchLower = searchTerm.toLowerCase().trim();

        return plants.filter((p) => {
            // Filtrer par difficulté, expo, localisation, toxicité pour les animaux, catégories
            if (searchLower && !p.name.toLowerCase().startsWith(searchLower)) return false;

            if (filters.difficulties.length) {
                const maxSelectedId = Math.max(...filters.difficulties);
                if ((p.id_difficulty ?? -1) > maxSelectedId) return false;
            }
            
            if (filters.expositions.length && !filters.expositions.includes(p.id_exposition ?? -1)) return false;
            if (filters.localisations.length && !filters.localisations.includes(p.id_localisation ?? -1)) return false;

            if (filters.toxicPets.length) {
                const toxicPetIds = p.toxicPets?.map((t) => t.pet?.id).filter(Boolean) ?? [];
                // Si la plante est toxique pour un animal sélectionné, on l'exclut
                if (filters.toxicPets.some((id) => toxicPetIds.includes(id))) return false;
            }

            if (filters.categories.length) {
                const catIds = p.categories?.map((c) => c.id) ?? [];
                if (!filters.categories.some((id) => catIds.includes(id))) return false;
            }

            return true;
        });
    }, [plants, searchTerm, filters]);

    return { searchTerm, setSearchTerm, filters, setFilters, filteredPlants };
};