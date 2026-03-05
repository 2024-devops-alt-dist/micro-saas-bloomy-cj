import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Garden } from "../../../../models/garden/IGarden";
import NavBarMobile from "../../../../shared/navbar-mobile";
import "../../../../assets/styles/global.css";
import "./Garden_id.css";
import { gardenService } from "../../../garden/services/gardenService";
import { FiArrowLeft, FiEdit, FiTrash2 } from "react-icons/fi";
import GardenIdSummary from "./Garden_id_summary";
import GardenIdMyPlants from "./Garden_id_my-plants";
import ModalUpdateGardenId from "../../components/Modal-update-garden-id";

const GardenId: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [garden, setGarden] = useState<Garden | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"resume" | "plantes">("resume");
    
    const menuRef = useRef<HTMLDivElement>(null);

    const [showModal, setShowModal] = useState(false);
    // Fonction pour mettre à jour le jardin après modification
    const handleUpdateGarden = (updatedGarden: Garden) => setGarden(updatedGarden);

    // Fetch Garden
    useEffect(() => {
        if (!id) return;

        const numericId = Number(id);
        if (isNaN(numericId)) return;

        const fetchGarden = async () => {
            try {
                const data = await gardenService.getMineById(numericId);
                setGarden(data);
            } catch (error) {
                console.error("Jardin introuvable ou non autorisé", error);
            }
        };

        fetchGarden();
    }, [id]);

     // Fermer le menu si clic en dehors
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDelete = async () => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce jardin ? Cette action est irréversible.")) {
            return;
        }

        try {
            if (!garden) return;
            await gardenService.delete(garden.id);
            alert("Jardin supprimé avec succès.");
            // Redirection vers la liste des jardins
            navigate("/mes-jardins");
        } catch (error: any) {
            console.error("Erreur lors de la suppression :", error);
            alert(error.response?.data?.message || "Erreur lors de la suppression du jardin.");
        }
    };

    if (!garden) {  return <div>Chargement...</div>; }

    // Choisir l'image du jardin ou fallback
    const bannerImage = garden.pictureGarden?.name
        ? `/assets/pictures/${garden.pictureGarden.name}`
        : `/assets/pictures/default-garden-picture.png`;

    return (
        <>
            <div className="w-full h-45 relative flex items-center justify-center">
                <img
                    src={bannerImage}
                    alt={garden.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-45 z-10"></div>

                <button
                    onClick={() => window.history.back()}
                    className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white rounded-full p-2 transition"
                >
                    <FiArrowLeft size={20} />
                    <span className="hidden sm:inline text-white font-medium">Retour</span>
                </button>
            </div>

            <main className="gardenid-container">
                <div className="gardenid-header flex justify-between items-center relative">
                    <h2 className="text-2xl font-bold">{garden.name}</h2>
                    
                    {/* settings + menu */}
                    <div className="relative" ref={menuRef}>
                        <img
                            src="/assets/icons/setting.png"
                            alt="Settings"
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => setMenuOpen(!menuOpen)}
                        />

                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                                <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100" onClick={() => setShowModal(true)}>
                                    <FiEdit /><p>Modifier le jardin</p>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100" onClick={handleDelete}>
                                    <FiTrash2 /><p>Supprimer le jardin</p>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <hr className="separator-gardenid" />

                <div>
                    <p className="gardenid-description">{garden.description || "Aucune description fournie."}</p>
                </div>

                <div className="bg-garden-id-info rounded-xl p-4 mt-4 grid grid-cols-2 gap-4 justify-items-center">
                    {/* Colonne gauche */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <img
                                src={garden.localisation?.icon 
                                    ? `/assets/icons/${garden.localisation.icon}` 
                                    : "/assets/icons/localisation-default.png"}
                                alt={garden.localisation?.name || "Localisation"}
                                className="w-6 h-6 object-contain"
                            />
                            <p>{garden.localisation?.name || "Aucune Localisation"}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <img
                                src="/assets/icons/experience.png"
                                alt={garden.difficulty?.name || "Difficulté"}
                                className="w-6 h-6 object-contain"
                            />
                            <p>{garden.difficulty?.name || "Non renseignée"}</p>
                        </div>
                    </div>

                    {/* Colonne droite */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <img
                                src={garden.exposition?.icon 
                                    ? `/assets/icons/${garden.exposition.icon}` 
                                    : "/assets/icons/exposition-default.png"}
                                alt={garden.exposition?.name || "Exposition"}
                                className="w-6 h-6 object-contain"
                            />
                            <p>{garden.exposition?.name || "Aucune Exposition"}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <img
                                src="/assets/icons/pattes.png"
                                alt="Animaux"
                                className="w-6 h-6 object-contain"
                            />
                            <p>
                                {garden.pets && garden.pets.length > 0
                                ? garden.pets.map(gp => gp.pet?.name).join(", ")
                                : "Aucun Animal"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="garden-tabs">
                    <button
                        className={`garden-tab ${activeTab === "resume" ? "active" : ""}`}
                        onClick={() => setActiveTab("resume")}
                    >
                        Résumé
                    </button>

                    <button
                        className={`garden-tab ${activeTab === "plantes" ? "active" : ""}`}
                        onClick={() => setActiveTab("plantes")}
                    >
                        Mes plantes
                    </button>

                    <div className={`tab-indicator ${activeTab}`} />
                </div>

                {/* Contenu onglets */}
                <div className="garden-tab-content">
                    {activeTab === "resume" && (
                        <GardenIdSummary garden={garden} />
                    )}

                    {activeTab === "plantes" && (
                        <GardenIdMyPlants garden={garden} />
                    )}
                </div>
            </main>;

            {showModal && garden && (
                <ModalUpdateGardenId
                    garden={garden}
                    onClose={() => setShowModal(false)}
                    onUpdate={handleUpdateGarden}
                />
            )}

            <NavBarMobile />
        </>
    );
};

export default GardenId;