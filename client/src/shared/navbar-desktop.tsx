import React from "react";
import { FiHome, FiCalendar, FiSun, FiBell, FiUser } from "react-icons/fi";

const NavBarDesktop: React.FC = () => {
    return (
        <nav className="hidden md:flex w-full h-16 bg-white border-b border-gray-200 justify-around items-center fixed top-0 left-0 z-50">
        <button className="hover:text-green-600 transition-colors"><FiHome size={22} /></button>
        <button className="hover:text-green-600 transition-colors"><FiCalendar size={22} /></button>
        <button className="hover:text-green-600 transition-colors"><FiSun size={22} /></button>
        <button className="hover:text-green-600 transition-colors"><FiBell size={22} /></button>
        <button className="hover:text-green-600 transition-colors"><FiUser size={22} /></button>
        </nav>
    );
};

export default NavBarDesktop;
