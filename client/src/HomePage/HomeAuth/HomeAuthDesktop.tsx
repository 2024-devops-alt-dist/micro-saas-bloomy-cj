import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomeAuthDesktop.css";
import NavBarDesktop from "../../shared/navbar-desktop";
import type { Garden } from "../../models/garden/IGarden";
import type { User } from "../../models/IUser";
import Footer from "../FooterHome";

interface Props {
  user: User | null;
  gardens: Garden[];
}

const HomeAuthDesktop: React.FC<Props> = ({ user, gardens }) => {
  const navigate = useNavigate();

  return (
    <div className="home-desktop">
      <NavBarDesktop />

      <div className="desktop-content">
        {/* Colonne gauche */}
        <div className="column left-column">
          <section className="desktop-header">
            <img src="/assets/icons/logo-vert.png" alt="logo" />
            <h1>Bonjour {user?.firstname || "👋"} !</h1>
          </section>

          <div className="desktop-gardens">
  <h2>Mes Jardins</h2>
  {gardens.length > 0 ? (
    <div className="desktop-garden-scrollable">
      {gardens.map((garden) => (
        <div
          key={garden.id}
          className="garden-card"
          onClick={() => navigate(`/garden/${garden.id}`)}
        >
          <img
            src={
              garden.pictureGarden
                ? `/assets/pictures/${garden.pictureGarden.name}`
                : "/assets/pictures/plants_legume.jpg"
            }
            alt={`Photo du jardin ${garden.name}`}
            className="garden-img"
          />
          <div className="garden-img-overlay"></div>
          <h3 className="garden-name">{garden.name}</h3>
        </div>
      ))}
    </div>
  ) : (
    <div className="empty-garden">
      <p>Vous n'avez pas encore de jardin.</p>
      <button className="btn-global" onClick={() => navigate("/addGarden")}>
        Ajouter un jardin
      </button>
    </div>
  )}
</div>

          <section className="desktop-catalogue">
            <h2>Notre Catalogue</h2>
            <p>
              Fiches plantes, tutoriels et conseils : tout pour mieux connaître
              et entretenir vos plantes.
            </p>
            <button
              className="btn-global"
              onClick={() => navigate("/bibliotheque-plantes")}
            >
              Découvrir
            </button>
          </section>
        </div>

        {/* Colonne droite */}
        <div className="column right-column">
          <section className="desktop-advice">
            <div className="desktop-advice-card">
              <div className="advice-badge">🌱 Conseil du moment</div>
              <p className="advice-text">Démarrez les semis de tomates, de poivrons et d'aubergines en intérieur !</p>
            </div>
          </section>

          <section className="desktop-news">
            <div className="desktop-news-header">
              <h2>Les news</h2>
              <div className="news-count">3</div>
            </div>
            <div className="desktop-news-list">
              <div className="desktop-news-card">
                <h3>Nouvelle fonctionnalité</h3>
                <p>
                  Retrouvez des tutoriels dans nos fiches catalogue pour apprendre
                  à entretenir vos plantes.
                </p>
              </div>

              <div className="desktop-news-card">
                <h3>Nouveautés Plantes</h3>
                <p>
                  De nouvelles plantes ont été ajoutées au catalogue pour enrichir
                  votre collection et vos connaissances.
                </p>
              </div>

              <div className="desktop-news-card">
                <h3>Amélioration du catalogue</h3>
                <p>
                  La navigation dans les fiches plantes a été améliorée pour
                  trouver plus facilement les informations utiles.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomeAuthDesktop;