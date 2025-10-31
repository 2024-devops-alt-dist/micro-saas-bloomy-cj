import React, { useRef, useState } from "react";
import "../../../assets/styles/CategoryTab.css";

const CategoryTabs: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState("populaire");
    const scrollRef = useRef<HTMLDivElement>(null);
    const categories = ["populaire", "potagère", "aromatique", "fleurs", "débutant", "expert"];

    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging = true;
        startX = e.pageX;
        scrollStart = scrollRef.current!.scrollLeft;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        scrollRef.current!.scrollLeft = scrollStart - (e.pageX - startX);
    };

    const stopDrag = () => (isDragging = false);

    return (
        <div className="category-tabs-container">
            <p className="category-label">Trier par :</p>

            <div ref={scrollRef} className="category-scroll" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={stopDrag} onMouseLeave={stopDrag}>
                {categories.map((cat) => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} className={`category-button ${activeCategory === cat ? "active" : ""}`}>
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryTabs;
