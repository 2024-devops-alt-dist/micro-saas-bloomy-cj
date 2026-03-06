import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/home.css";
import "../assets/styles/global.css";
import HeaderHome from "./HeaderHome";
import Footer from "./FooterHome";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/register");
  };

  return (
    <div>
      <HeaderHome />

      {/* HERO */}
      <section className="hero min-h-screen flex items-center justify-center text-center relative pt-20">
        <img
          src="/assets/pictures/1.jpg"
          alt="Plantes Bloomy"
          className="hero-image"
          // width="1400"
          // height="800"
        />
        <div className="hero-overlay"></div>
        <div className="p-4 flex flex-col items-center justify-center h-full">
          <img
            src="/assets/icons/logo-blanc.png"
            alt="Logo Bloomy"
            className="logo-hero"
            // width="547"
            // height="522"
          />
        </div>
        <div className="arrow-container">
          <div className="arrow-down"></div>
        </div>
      </section>

      {/* À PROPOS */}
      <section className="py-12 px-6">
        {/* VERSION MOBILE / TABLETTE */}
        <div className="flex flex-col items-center text-center gap-6 lg:hidden">
          <h2 className="text-2xl font-semibold">Découvrez Bloomy</h2>

          <p className="text-gray-600">
            Marre de rater vos plantations ou de ne jamais savoir par où commencer ? Avec l’assistant Bloomy, jardiner devient simple et ludique, même en ville et avec un petit espace. Répondez à quelques questions et Bloomy vous guide pour choisir les plantes idéales, les associer intelligemment et savoir exactement quand les planter ou les arroser.
          </p>

          <img
            src="/assets/pictures/5.jpeg"
            alt="Plantes Bloomy"
            className="rounded-lg shadow-md mt-4 w-full sm:w-3/4"
          />

          <p className="text-gray-600">
            Grâce à Bloomy, vous profitez d’un accompagnement sur-mesure et de notifications pratiques pour ne jamais oublier vos plantes. Transformez votre balcon, votre rebord de fenêtre ou votre jardin en un véritable espace vert, gagnez en autonomie et prenez plaisir à voir vos plantes grandir, tout en améliorant votre bien-être et votre alimentation.
          </p>

          <button className="btn-global mt-4" onClick={handleLoginRedirect}>
            S'inscrire
          </button>
        </div>

        {/* VERSION PC */}
        <div className="hidden lg:flex lg:flex-row lg:gap-12 py-15 px-20">
          {/* Texte + bouton à gauche */}
          <div className="lg:w-1/2 flex flex-col  text-left gap-4">
            <h2 className="text-3xl font-semibold">Découvrez Bloomy</h2>

            <p className="text-gray-600">
              Marre de rater vos plantations ou de ne jamais savoir par où commencer ? Avec l’assistant Bloomy, jardiner devient simple et ludique, même en ville et avec un petit espace. Répondez à quelques questions et Bloomy vous guide pour choisir les plantes idéales, les associer intelligemment et savoir exactement quand les planter ou les arroser.
            </p>

            <p className="text-gray-600">
              Grâce à Bloomy, vous profitez d’un accompagnement sur-mesure et de notifications pratiques pour ne jamais oublier vos plantes. Transformez votre balcon, votre rebord de fenêtre ou votre jardin en un véritable espace vert, gagnez en autonomie et prenez plaisir à voir vos plantes grandir, tout en améliorant votre bien-être et votre alimentation.
            </p>

            {/* Bouton non full width */}
            <button
              className="btn-global mt-4 px-6 py-2"
              onClick={handleLoginRedirect}
            >
              S'inscrire
            </button>
          </div>

          {/* Image à droite */}
          <div className="lg:w-1/2 flex justify-center items-center">
            <img
              src="/assets/pictures/5.jpeg"
              alt="Plantes Bloomy"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* COMMENT CA MARCHE */}
      <section className="px-6 py-12 flex flex-col items-center text-center gap-12 bg-custom-home rounded-lg shadow-md lg:px-20 lg:py-15">
        <div className="flex flex-col lg:flex-row lg:justify-center md:gap-12 gap-10 w-full">
          <div className="flex flex-col items-center">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Rejoignez l'aventure Bloomy en un clic</h3>
            <p className="text-gray-700">
              Inscrivez-vous et plongez dans un univers où chaque plante a sa place. Découvrez des conseils personnalisés et explorez toutes les possibilités pour créer un espace vert qui vous ressemble.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-5xl mb-4">🌿</div>
            <h3 className="text-xl font-semibold mb-2">Votre jardin sur-mesure</h3>
            <p className="text-gray-700">
              Laissez l’assistant Bloomy sélectionner les plantes idéales pour votre espace et vos envies, ou composez votre jardin vous-même. Chaque plante est accompagnée de conseils pratiques pour planter, arroser et entretenir facilement.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-xl font-semibold mb-2">Profitez et grandissez avec vos plantes</h3>
            <p className="text-gray-700">
              Recevez des notifications pratiques, suivez la croissance de vos plantes et découvrez des astuces pour un jardin sain et harmonieux. Avec Bloomy, jardiner devient un plaisir quotidien.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;