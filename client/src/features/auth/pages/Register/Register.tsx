import React, { useState } from "react";
import "../../../../assets/styles/global.css";
import "./Register.css";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

// Schéma validation Zod
const registerSchema = z.object({
    firstName: z
        .string()
        .nonempty({ message: "Le prénom est obligatoire." })
        .min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
    lastName: z
        .string()
        .nonempty({ message: "Le nom est obligatoire." })
        .min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
    email: z
        .string()
        .nonempty({ message: "L'email est obligatoire." })
        .regex(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            { message: "Format Email invalide - ex : jean.marc@gmail.com" }
        ),
    password: z
        .string()
        .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." }),
    confirmPassword: z
        .string()
        .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
});

type RegisterSchema = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterSchema) => {
        setServerError(null);
        try {
            await authService.register(
                data.firstName,
                data.lastName,
                data.email,
                data.password
            );
            navigate("/login");
        } catch (err: any) {
            setServerError(err.message || 'Erreur lors de l\'inscription.');
        }
    };

    return (
        <>
            <div className="register-container min-h-screen flex items-center justify-center">
                <div className="register-card">
                    <h1 className="register-title">
                        Créer un compte
                    </h1>

                    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 flex flex-col gap-1">
                                <label>Prénom</label>
                                <input
                                    type="text"
                                    {...register("firstName")}
                                    className="input-text"
                                    placeholder="Votre prénom"
                                />
                                {errors.firstName && (
                                    <p className="error-text">{errors.firstName.message}</p>
                                )}
                            </div>

                            <div className="flex-1 flex flex-col gap-1">
                                <label>Nom</label>
                                <input
                                    type="text"
                                    {...register("lastName")}
                                    className="input-text"
                                    placeholder="Votre nom"
                                />
                                {errors.lastName && (
                                    <p className="error-text">{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 mt-4">
                            <label>Email</label>
                            <input
                                type="email"
                                {...register("email")}
                                className="input-text"
                                placeholder="Votre email"
                            />
                            {errors.email && (
                                <p className="error-text">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 mt-4">
                            <div className="flex-1 flex flex-col gap-1">
                                <label>Mot de passe</label>
                                <input
                                    type="password"
                                    {...register("password")}
                                    className="input-text"
                                    placeholder="Votre mot de passe"
                                />
                                {errors.password && (
                                    <p className="error-text">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="flex-1 flex flex-col gap-1">
                                <label>Confirmer le mot de passe</label>
                                <input
                                    type="password"
                                    {...register("confirmPassword")}
                                    className="input-text"
                                    placeholder="Confirmez votre mot de passe"
                                />
                                {errors.confirmPassword && (
                                    <p className="error-text">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="btn-global cust-register-btn">
                            S'inscrire
                        </button>
                    </form>

                    {serverError && (<p className="error-text center">{serverError}</p>)}

                    <p className="login-link">
                        Vous avez déjà un compte ?{" "}
                        <a href="/login">Se connecter</a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
