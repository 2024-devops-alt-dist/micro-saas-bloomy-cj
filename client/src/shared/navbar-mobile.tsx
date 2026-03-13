import { FiHome, FiCalendar, FiUser, FiList } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const NavBarMobile: React.FC = () => {
    const navigate = useNavigate();

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 flex justify-around items-center z-50 pb-[env(safe-area-inset-bottom)] px-3" aria-label="Navigation principale">
            <button
                className="hover:text-green-600 transition-colors"
                aria-label="Accueil"
                onClick={() => navigate("/accueil")}
            >
                <FiHome size={24} />
            </button>

            <button
                className="hover:text-green-600 transition-colors -mr-2"
                aria-label="Agenda"
                // onClick={() => navigate("/calendar")}
            >
                <FiCalendar size={24} />
            </button>

            {/*(bouton central) */}
            <button
                className="bg-green-500 text-white p-4 rounded-full shadow-lg -translate-y-5 transition-transform hover:scale-110"
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
                className="hover:text-green-600 transition-colors -ml-2"
                aria-label="Bibliothèque Plantes"
                onClick={() => navigate("/bibliotheque-plantes")}
            >
                <FiList size={24} />
            </button>

            <button
                className="hover:text-green-600 transition-colors"
                aria-label="Profil"
                onClick={() => navigate("/profil-user")}
            >
                <FiUser size={24} />
            </button>

        </nav>
    );
};

export default NavBarMobile;