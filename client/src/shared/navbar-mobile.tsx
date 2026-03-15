import { FiHome, FiCalendar, FiUser, FiList } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const NavBarMobile: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 flex justify-around items-center z-50 pb-[env(safe-area-inset-bottom)] px-3" aria-label="Navigation principale">
            <button 
                className={`transition-colors ${isActive("/accueil") ? "text-[#266616]" : "text-gray-400 hover:text-[#266616]"}`}
                aria-label="Accueil"
                onClick={() => navigate("/accueil")}
            >
                <FiHome size={24} />
            </button>

            <button
                className="text-gray-300 cursor-not-allowed"
                aria-label="Agenda (bientôt disponible)"
                disabled
            >
                <FiCalendar size={24} />
            </button>

            <button
                className="bg-[#266616] text-white p-4 rounded-full shadow-lg -translate-y-5 transition-transform hover:scale-110"
                aria-label="Créer un jardin"
                onClick={() => navigate("/mes-jardins")}
            >
                <img
                    src="/assets/icons/iconGarden.png"
                    alt="Créer un jardin"
                    className="w-8 h-8"
                    style={{ filter: "brightness(0) invert(1)" }}
                />
            </button>

            <button
                className={`transition-colors ${
                isActive("/bibliotheque-plantes")
                    ? "text-[#266616]"
                    : "text-gray-400 hover:text-[#266616]"
                }`}
                aria-label="Bibliothèque Plantes"
                onClick={() => navigate("/bibliotheque-plantes")}
            >
                <FiList size={24} />
            </button>

            <button
                className={`transition-colors ${
                isActive("/profil-user") ? "text-[#266616]" : "text-gray-400 hover:text-[#266616]"
                }`}
                aria-label="Profil"
                onClick={() => navigate("/profil-user")}
            >
                <FiUser size={24} />
            </button>
        </nav>
    );
};

export default NavBarMobile;