import React, { useEffect, useState } from "react";
import NavBarMobile from "../../../../shared/navbar-mobile";
import NavBarDesktop from "../../../../shared/navbar-desktop";
import Footer from "../../../../HomePage/FooterHome";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../auth/context/AuthContext";
import { userService, type UserUpdatePayload } from "../../services/userService";
import authService from "../../../auth/services/authService";
import "./Profil-Info.css";
import { FaEdit, FaTrash } from "react-icons/fa";

// Schema Zod
const profileSchema = z.object({
    firstName: z.string().nonempty("Le prénom est obligatoire.").min(2, "Le prénom doit contenir au moins 2 caractères."),
    lastName: z.string().nonempty("Le nom est obligatoire.").min(2, "Le nom doit contenir au moins 2 caractères."),
    email: z.string().nonempty("L'email est obligatoire.").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Format Email invalide - ex : jean.marc@gmail.com"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères.").optional().or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
});

type ProfileSchema = z.infer<typeof profileSchema>;

const ProfilUserInfo: React.FC = () => {
    const { user: contextUser, refreshUser, logout } = useAuth();
    const [user, setUser] = useState<typeof contextUser | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),
    });

    // Fetch user pour pré-remplir form
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!contextUser) return;
                const fullUser = await authService.me(); 
                setUser(fullUser);
                reset({
                    firstName: fullUser.firstname,
                    lastName: fullUser.lastname,
                    email: fullUser.email,
                    password: "",
                    confirmPassword: "",
                });
            } catch (err) {
                console.error("Erreur lors du chargement de l'utilisateur :", err);
            }
        };
        fetchUser();
    }, [contextUser, reset]);

    const onSubmit = async (data: ProfileSchema) => {
        if (!user) return;

        try {
            const payload: UserUpdatePayload = {
                firstname: data.firstName,
                lastname: data.lastName,
                email: data.email,
            };
            if (data.password) payload.password = data.password;

            await userService.update(user.id, payload);

            // Re-fetch user complet et update contexte
            const updatedUser = await authService.me();
            setUser(updatedUser);
            await refreshUser();

            setIsEditing(false);
            alert("Profil mis à jour avec succès !");
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || "Erreur lors de la mise à jour du profil");
        }
    };

    const handleCancel = () => {
        if (user) {
            reset({
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email,
                password: "",
                confirmPassword: "",
            });
        }
        setIsEditing(false);
    };

    const handleDelete = async () => {
        if (!user) return;
        try {
            await userService.delete(user.id);
            alert("Profil supprimé !");
            logout();
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || "Erreur lors de la suppression du profil");
        }
    };

    if (!user) return <p>Chargement...</p>;

    return (
        <>
        <div className="height-100-update">
            <NavBarMobile />
            <NavBarDesktop />

            <div className="profil-container">
                <div className="profil-inner max-w-3xl mx-auto w-full p-4">
                    <div className="flex justify-center mb-6">
                        <img
                            src={user.picture_profil ? `/assets/pictures/profils/${user.picture_profil}` : "/assets/pictures/profils/default.jpg"}
                            alt="profil"
                            className="w-32 h-32 rounded-full object-cover border"
                        />
                    </div>

                    <hr className="separator" />

                    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 flex flex-col gap-1">
                                <label>Prénom</label>
                                <input type="text" {...register("firstName")} disabled={!isEditing} className="input-text" />
                                {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
                            </div>

                            <div className="flex-1 flex flex-col gap-1 mb-4">
                                <label>Nom</label>
                                <input type="text" {...register("lastName")} disabled={!isEditing} className="input-text" />
                                {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 mb-4">
                            <label>Email</label>
                            <input type="email" {...register("email")} disabled={!isEditing} className="input-text" />
                            {errors.email && <p className="error-text">{errors.email.message}</p>}
                        </div>

                        <div className="flex flex-col gap-1 mb-4">
                            <label>Mot de passe</label>
                            <input
                                type="password"
                                {...register("password")}
                                disabled={!isEditing}
                                className="input-text"
                                placeholder={isEditing ? "" : "********"}
                            />
                            {errors.password && <p className="error-text">{errors.password.message}</p>}
                        </div>

                        {isEditing && (
                            <div className="flex flex-col gap-1 mb-4">
                                <label>Confirmation du mot de passe</label>
                                <input type="password" {...register("confirmPassword")} className="input-text" placeholder="Confirmez votre mot de passe" />
                                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
                            </div>
                        )}

                        {/* Btn "Update" */}
                        {!isEditing && (
                            <div className="flex justify-center mt-4">
                                <button type="button" className="btn-update-user"
                                    onClick={() => {
                                        setConfirmDelete(false);
                                        setIsEditing(true);
                                    }}
                                >
                                    <FaEdit className="icon-btn" />
                                    Modifier mon profil
                                </button>
                            </div>
                        )}

                        {isEditing && (
                            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
                                <button type="submit" className="btn-global w-full sm:w-auto">Enregistrer</button>
                                <button type="button" className="btn-desable w-full sm:w-auto" onClick={handleCancel}>Annuler</button>
                            </div>
                        )}
                    </form>

                    {/* Btn "Delete" */}
                    {!isEditing && (
                        <div className="flex flex-col items-center mt-2">
                            {!confirmDelete && (
                                <button className="btn-delete-user" onClick={() => setConfirmDelete(true)}>
                                    <FaTrash className="icon-btn" />
                                    Supprimer mon profil
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {confirmDelete && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Supprimer votre profil</h3>
                        <p>Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible.</p>

                        <div className="modal-buttons">
                            <button className="btn-delete-user" onClick={handleDelete}>
                                <FaTrash className="icon-btn" />
                                Oui, supprimer
                            </button>

                            <button
                                className="btn-desable"
                                onClick={() => setConfirmDelete(false)}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
        </>
    );
};

export default ProfilUserInfo;