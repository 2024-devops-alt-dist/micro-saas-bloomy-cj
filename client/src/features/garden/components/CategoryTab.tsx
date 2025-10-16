import React, { useState } from "react";
import "../../../assets/styles/CategoryTab.css";

const CategoryTabs: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState("populaire");
    const categories = ["populaire", "potagère", "aromatique", "fleurs"];

    return (
        <div className="category-tabs-container">
            <p className="category-label">Trier par :</p>

            <div className="category-scroll">
                {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`category-button ${
                    activeCategory === cat ? "active" : ""
                    }`}
                >
                    {cat}
                </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryTabs;
