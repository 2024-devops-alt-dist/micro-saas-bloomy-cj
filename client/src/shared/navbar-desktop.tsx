import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar-desktop.css";
import { useAuth } from "../features/auth/context/AuthContext";

const NavBarDesktop: React.FC = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { logout } = useAuth();

    useEffect(() => {
        const checkbox = document.getElementById("burger") as HTMLInputElement | null;
        if (!checkbox) return;

        const handleScrollLock = () => (document.body.style.overflow = checkbox.checked ? "hidden" : "auto");
        checkbox.addEventListener("change", handleScrollLock);

        checkbox.checked = false;
        document.body.style.overflow = "auto";

        return () => checkbox.removeEventListener("change", handleScrollLock);
    }, [pathname]);

    const menuItems = [
        { label: "Accueil", path: "/accueil" },
        { label: "Mes jardin", path: "/mes-jardins" },
        { label: "Catalogue de plante", path: "/bibliotheque-plantes" },
        { label: "Profil", path: "/profil-user" },
    ];

    return (
        <header className="header-home-pc hidden lg:flex justify-between items-center">
            <h1 className="logo-pc"></h1>

            <input type="checkbox" id="burger" />
            <label htmlFor="burger" className="burger-label-pc">
                <div></div>
                <div></div>
                <div></div>
            </label>

            <nav className="burger-nav-pc">
                <ul>
                    {menuItems.map(({ label, path }) => (
                        <li key={path}>
                            <button
                                className={`menu-btn-pc ${pathname === path ? "active" : ""}`}
                                onClick={() => navigate(path)}
                            >
                                {label}
                            </button>
                        </li>
                    ))}
                    <hr className="separator" />
                    <li>
                        <button className="menu-btn-pc logout-btn-pc" onClick={logout}>Déconnexion</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBarDesktop;