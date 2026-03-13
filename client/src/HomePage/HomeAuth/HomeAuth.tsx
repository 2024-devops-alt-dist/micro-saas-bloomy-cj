import React, { useEffect, useState } from "react";
import NavBarMobile from "../../shared/navbar-mobile";
import "./HomeAuth.css";
import type { User } from "../../models/IUser";
import authService from "../../features/auth/services/authService";
import type { Garden } from "../../models/garden/IGarden";
import { useNavigate } from "react-router-dom";
import { gardenService } from "../../features/garden/services/gardenService";
import HomeAuthDesktop from "./HomeAuthDesktop";
import GardenUserList from "../../features/profil/components/GardenUserList";

const HomeAuth: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [gardens, setGardens] = useState<Garden[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await authService.me();
                setUser(data);
            } catch (error) {
                console.error("Utilisateur non récupéré", error);
            }
        };

        // A garder pour la version Desktop
        const fetchGardens = async () => {
            try {
                const data = await gardenService.getMine();
                const sortedGardens = data.sort((a, b) => a.id - b.id);
                setGardens(sortedGardens);
            } catch (error) {
                console.error("Erreur lors du chargement des jardins :", error);
            }
        };

        fetchUser();
        fetchGardens();
    }, []);
    
    return (
        <>
            {/* VERSION MOBILE */}
            <div className="mobile-only">
                <div className="home-container">
                    <NavBarMobile />

                    <section className="home-header">
                        <img src="/assets/icons/logo-vert.png" alt="logo" className="home-logo"/>
                        <h1>Bonjour {user?.firstname || "👋"} !</h1>
                    </section>

                    {/* News */}
                    <section className="section news-section">
                        <h2>Les news</h2>

                        <div className="news-row">
                            <div className="card-news">
                                <h3>Nouvelle fonctionnalité</h3>
                                <p>Retrouvez des tutoriels dans nos fiches catalogue pour apprendre à entretenir vos plantes.</p>
                            </div>

                            <div className="card-news">
                                <h3>Nouveautés Plantes</h3>
                                <p>De nouvelles plantes ont été ajoutées au catalogue pour enrichir votre collection et vos connaissances.</p>
                            </div>

                            <div className="card-news">
                                <h3>Amélioration du catalogue</h3>
                                <p>La navigation dans les fiches plantes a été améliorée pour trouver plus facilement les informations utiles.</p>
                            </div>

                            <div className="card-news">
                                <h3>Mise à jour de l'application</h3>
                                <p>Nous avons amélioré les performances et corrigé plusieurs problèmes pour une meilleure expérience.</p>
                            </div>
                        </div>
                    </section>

                    {/* Jardins */}
                    <section className="section section-gardens">
                        <h2>Mes jardins</h2>
                        <GardenUserList />
                    </section>

                    {/* Conseil */}
                    <section className="section advice">
                        <div className="advice-card">
                            <div className="advice-badge">
                                🌱 Conseil du moment
                            </div>
                            <p className="advice-text">
                                Démarrez les semis de tomates, de poivrons et d'aubergines en intérieur !
                            </p>
                        </div>
                    </section>

                    {/* Catalogue */}
                    <section className="section catalogue">
                        <h2>Notre Catalogue</h2>
                        <p>Fiches plantes, tutoriels et conseils : tout pour mieux connaître et entretenir vos plantes.</p>

                        <button className="btn-global mt-5" onClick={() => navigate("/bibliotheque-plantes")}>
                            Découvrir
                        </button>
                    </section>
                </div>
            </div>

            {/* VERSION DESKTOP */}
            <div className="desktop-only">
                <HomeAuthDesktop user={user} gardens={gardens} />
            </div>
        </>
    );
};

export default HomeAuth;