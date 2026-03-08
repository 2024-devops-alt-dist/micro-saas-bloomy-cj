import { FiHome, FiCalendar, FiSun, FiUser, FiList } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // <- important

const NavBarMobile: React.FC = () => {
    const navigate = useNavigate();

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 flex justify-around items-center z-50 pb-[env(safe-area-inset-bottom)]" aria-label="Navigation principale">
            {/* Home */}
            <button
                className="hover:text-green-600 transition-colors"
                aria-label="Accueil"
                onClick={() => navigate("/accueil")}
            >
                <FiHome size={24} />
            </button>

            {/* Calendar */}
            <button
                className="hover:text-green-600 transition-colors"
                aria-label="Agenda"
                onClick={() => navigate("/calendar")}
            >
                <FiCalendar size={24} />
            </button>

            {/* Jardin (bouton central) */}
            <button
                className="bg-green-500 text-white p-4 rounded-full shadow-lg -translate-y-5 transition-transform hover:scale-110"
                aria-label="Créer un jardin"
                onClick={() => navigate("/addGarden")}
            >
                <FiSun size={28} />
            </button>

            {/* Bibliothèque Plantes */}
            <button
                className="hover:text-green-600 transition-colors"
                aria-label="Bibliothèque Plantes"
                onClick={() => navigate("/bibliotheque-plantes")}
            >
                <FiList size={24} />
            </button>

            {/* Profil */}
            <button
                className="hover:text-green-600 transition-colors"
                aria-label="Profil"
                onClick={() => navigate("/mes-jardins")}
            >
                <FiUser size={24} />
            </button>

        </nav>
    );
};

export default NavBarMobile;