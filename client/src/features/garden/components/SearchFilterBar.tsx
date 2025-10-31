import React from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import "../../../assets/styles/SearchFilterBar.css";

const SearchFilterBar: React.FC = () => {

    return (
        <div className="flex justify-between items-center px-4 py-3 border-b border-green-100">
            <div className="flex items-center w-full max-w-md relative">
                <FiSearch className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <form className="w-full">
                    <input
                        type="text"
                        placeholder="Rechercher une plante"
                        className="input-text-search"
                    />
                </form>
            </div>

            <button className="ml-4 p-2 border border-gray-200 rounded-lg hover:border-gray-300">
                <FiFilter className="text-gray-400" size={20} />
            </button>
        </div>

    );
};

export default SearchFilterBar;