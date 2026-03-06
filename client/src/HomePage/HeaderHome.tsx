import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./HeaderHome.css";

const HeaderHome: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleRedirect = (path: string) => {
        navigate(path);
    };

    useEffect(() => {
        const checkbox = document.getElementById("burger") as HTMLInputElement | null;
        if (!checkbox) return;

        const handleScrollLock = () => {
            document.body.style.overflow = checkbox.checked ? "hidden" : "auto";
        };

        checkbox.addEventListener("change", handleScrollLock);

        // Ferme le menu et réactive le scroll quand la route change
        document.body.style.overflow = "auto";
        if (checkbox.checked) {
            checkbox.checked = false;
        }

        return () => checkbox.removeEventListener("change", handleScrollLock);
    }, [location]);

    return (
        <header className="header-home">
            <h1 className="logo"></h1>

            <input type="checkbox" id="burger" />
            <label htmlFor="burger" className="burger-label">
                <div></div>
                <div></div>
                <div></div>
            </label>

            <nav className="burger-nav">
                <ul>
                    <li>
                        <button
                            className={`menu-btn ${location.pathname === "/" ? "active" : ""}`}
                            onClick={() => handleRedirect("/")}
                        >
                            Accueil
                        </button>
                    </li>
                    <li>
                        <button
                            className={`menu-btn ${location.pathname === "/login" ? "active" : ""}`}
                            onClick={() => handleRedirect("/login")}
                        >
                            Connexion
                        </button>
                    </li>
                    <li>
                        <button
                            className={`menu-btn ${location.pathname === "/register" ? "active" : ""}`}
                            onClick={() => handleRedirect("/register")}
                        >
                            Inscription
                        </button>
                    </li>
                    <li>
                        <button className="menu-btn disabled" disabled>
                            Fiche Plantes (à venir)
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderHome;