import React, { useEffect, useRef, useState } from "react";
import NavBarMobile from "../../../../shared/navbar-mobile";
import NavBarDesktop from "../../../../shared/navbar-desktop";
import Footer from "../../../../HomePage/FooterHome";
import authService from "../../../auth/services/authService";
import { gardenService } from "../../../garden/services/gardenService";
import type { User } from "../../../../models/IUser";
import type { Garden } from "../../../../models/garden/IGarden";
import { useNavigate } from "react-router-dom";
import "./ProfilUser.css";
import "../../../../assets/styles/global.css";
import { formatDate } from "../../../../utils/dateUtils";
import GardenUserList from "../../components/GardenUserList";
import { useAuth } from "../../../auth/context/AuthContext";

const ProfilUser: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [gardens, setGardens] = useState<Garden[]>([]);
    const [totalPlants, setTotalPlants] = useState(0);
    const navigate = useNavigate();

    const [profile, setProfile] = useState("à venir"); 
    const [percentage, setPercentage] = useState(0);
    const [icon, setIcon] = useState("/assets/icons/legumiste.png");
    const [categoryLabel, setCategoryLabel] = useState("potagères");

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { logout } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await authService.me();
                setUser(userData);

                const gardensData = await gardenService.getMine();
                const sortedGardens = gardensData.sort((a, b) => a.id - b.id);
                setGardens(sortedGardens);

                computeProfile(sortedGardens);

            } catch (error) {
                console.error("Erreur lors du chargement :", error);
            }
        };

        fetchData();
    }, []);

    const computeProfile = (gardensData: Garden[]) => {
    const counts = { potagere: 0, ornement: 0, aromatique: 0, fruitiere: 0 };
    let totalPlants = 0;

    gardensData.forEach(garden => {
        garden.plants?.forEach(gardenPlant => {
            const plant = gardenPlant.plant;
            if (!plant) return;
            totalPlants++;

            plant.categories?.forEach((pc: any) => {
                const name = pc?.category?.name?.toLowerCase();
                if (!name) return;

                if (name.includes("potag")) counts.potagere++;
                else if (name.includes("ornement")) counts.ornement++;
                else if (name.includes("aromatique")) counts.aromatique++;
                else if (name.includes("fruit")) counts.fruitiere++;
            });
        });
    });

    setTotalPlants(totalPlants);
    if (totalPlants === 0) return;

    // Calculer le pourcentage de chaque catégorie
    const percentages = {
        potagere: Math.round((counts.potagere / totalPlants) * 100),
        ornement: Math.round((counts.ornement / totalPlants) * 100),
        aromatique: Math.round((counts.aromatique / totalPlants) * 100),
        fruitiere: Math.round((counts.fruitiere / totalPlants) * 100)
    };

    // Trouver la catégorie majoritaire
    const [maxCategory, maxValue] = Object.entries(percentages)
        .sort((a, b) => b[1] - a[1])[0];

    // Définir le profil en fonction de la catégorie majoritaire
    switch (maxCategory) {
        case "potagere":
            setProfile("Légumiste");
            setIcon("/assets/icons/legumiste.png");
            setCategoryLabel("potagères");
            break;
        case "ornement":
            setProfile("Ami des fleurs");
            setIcon("/assets/icons/fleuriste.png");
            setCategoryLabel("ornementales");
            break;
        case "aromatique":
            setProfile("Herboriste en herbe");
            setIcon("/assets/icons/herboriste.png");
            setCategoryLabel("aromatiques");
            break;
        case "fruitiere":
            setProfile("Apprenti arboriculteur");
            setIcon("/assets/icons/fruitier.png");
            setCategoryLabel("fruitières");
            break;
        default:
            setProfile("À venir");
            setIcon("/assets/icons/legumiste.png");
            setCategoryLabel("potagères");
    }

    setPercentage(maxValue);
};

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <NavBarMobile />
            <NavBarDesktop />

            <div className="profil-container">

                {/* Bloc utilisateur */}
                <div className="user-left mb-6" ref={menuRef} onClick={() => setMenuOpen(!menuOpen)}>
                    <img
                        src={user?.picture_profil ? `/assets/pictures/profils/${user.picture_profil}` : "/assets/pictures/profils/picture-default.png"}
                        alt="photo profil"
                        className="picture-profil"
                    />

                    <div className="user-text">
                        <h2>{user ? `${user.firstname} ${user.lastname}` : "Votre compte"}</h2>
                        <p>Voir mon compte</p>
                    </div>

                    <img src="/assets/icons/next.png" alt="next" className="arrow"/>

                    {menuOpen && (
                        <div className="user-menu">
                            <div className="menu-item" onClick={() => navigate("/profil-user-info")}>
                                Mes infos
                            </div>

                            <div className="menu-item logout" onClick={logout}>
                                Déconnexion
                            </div>
                        </div>
                    )}
                </div>

                <hr className="separator" />

                {/* Profil jardinier */}
                <div>
                    <h2 className="custom-h2-profil mb-2">Votre profil de jardinier</h2>

                    <div className="member-info mb-5">
                        <img src="/assets/icons/calendrier.png" alt="icon-member" className="icon-member"/>
                        <p>Membre depuis le {formatDate(user?.registration_date)}</p>
                    </div>

                    <div className="garden-type">
                        <img src={icon} alt="profil jardinier" className="icon-profil-type"/>

                        <div className="garden-text">
                            <p>Votre profil de jardinier :</p>
                            <p className="custom-profile">{profile}</p>
                            <p className="custom-percentage">{percentage}% de vos plantes sont {categoryLabel}</p>
                        </div>
                    </div>
                </div>
                
                {/* Stats Jardin */}
                <div>
                    <h2 className="custom-h2-profil my-6">Mes stats jardin</h2>
                    <p className="text-center stat-content">Vous retrouverez ici vos statistiques après avoir réalisé vos premiers pas</p>

                    <img src="/assets/icons/Group_73.png" alt="photo stat temporaire" className="picture-stat"/>

                    <div className="stats-container">
                        <div className="stat-card">
                            <p className="stat-number">{totalPlants}</p>
                            <p className="stats-p">Plantes au total</p>
                        </div>

                        <div className="stat-card">
                            <p className="stat-number">{gardens.length}</p>
                            <p className="stats-p">Jardin(s) enregistré(s)</p>
                        </div>
                    </div>
                </div>

                {/* Mes jardins */}
                <div className="mes-jardins">
                    <h2 className="custom-h2-profil mt-8 mb-4">Mes jardins</h2>
                    <GardenUserList />
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ProfilUser;