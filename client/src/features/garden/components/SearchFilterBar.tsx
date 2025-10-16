import React from "react";
import { FiFilter, FiSearch } from "react-icons/fi";

const SearchFilterBar: React.FC = () => {

    return (
        <div className="flex justify-between items-center px-4 py-3 border-b border-green-100">
            {/* Champ de recherche */}
            <div className="flex items-center w-full max-w-md relative">
                <FiSearch className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                type="text"
                placeholder="Rechercher une plante"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
            </div>

            {/* Bouton filtre */}
            <button className="ml-4 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <FiFilter size={20} />
            </button>
        </div>
    );
};

export default SearchFilterBar;