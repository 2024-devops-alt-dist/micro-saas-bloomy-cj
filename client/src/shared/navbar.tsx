import { FiHome, FiCalendar, FiSun, FiBell, FiUser } from "react-icons/fi";

const NavBar: React.FC = () => {
    return (
        <nav className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 flex justify-around items-center z-50 pb-[env(safe-area-inset-bottom)]" aria-label="Navigation principale">
            {/* Home */}
            <button className="hover:text-green-600 transition-colors" aria-label="Accueil">
                <FiHome size={24} />
            </button>

            {/* Calendar */}
            <button className="hover:text-green-600 transition-colors" aria-label="Agenda">
                <FiCalendar size={24} />
            </button>

            {/* Jardin (bouton central) */}
            <button className="bg-green-500 text-white p-4 rounded-full shadow-lg -translate-y-5 transition-transform hover:scale-110" aria-label="Créer un jardin">
                <FiSun size={28} />
            </button>

            {/* Notifications */}
            <button className="hover:text-green-600 transition-colors" aria-label="Notifications">
                <FiBell size={24} />
            </button>

            {/* Profil */}
            <button className="hover:text-green-600 transition-colors" aria-label="Profil">
                <FiUser size={24} />
            </button>
        </nav>
    );
};

export default NavBar;
