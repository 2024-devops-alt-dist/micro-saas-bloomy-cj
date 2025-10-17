import { FiHome, FiCalendar, FiSun, FiBell, FiUser } from "react-icons/fi";

const NavBar: React.FC = () => {
    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-3 shadow-md z-50">
            {/* Home */}
            <button className="text-gray-500 hover:text-green-600 transition-colors">
                <FiHome size={24} />
            </button>

            {/* Calendar */}
            <button className="text-gray-500 hover:text-green-600 transition-colors">
                <FiCalendar size={24} />
            </button>

            {/* Jardin (bouton central) */}
            <button className="bg-green-500 text-white p-4 rounded-full shadow-lg -translate-y-3 transition-transform hover:scale-110">
                <FiSun size={28} />
            </button>

            {/* Notifications */}
            <button className="text-gray-500 hover:text-green-600 transition-colors">
                <FiBell size={24} />
            </button>

            {/* Profil */}
            <button className="text-gray-500 hover:text-green-600 transition-colors">
                <FiUser size={24} />
            </button>
        </nav>
    );
};

export default NavBar;
