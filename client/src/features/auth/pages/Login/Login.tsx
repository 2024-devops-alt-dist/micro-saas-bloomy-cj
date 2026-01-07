import React, { useState } from "react";
import "../../../../assets/styles/global.css";
import "./Login.css";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";

// Schéma validation Zod
const loginSchema = z.object({
    email: z.string().min(1, "L'email est obligatoire.").email("Format Email invalide - ex : jean.marc@gmail.com"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const { login } = useAuth();
    const [serverError, setServerError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        setServerError(null);
        try {
            await login(data.email, data.password);
        } catch (err: any) {
            setServerError(err.message || 'Erreur lors de la connexion.');
        }
    };

    return (
        <>
        <div className="login-container min-h-screen flex items-center justify-center">
            <div className="login-card">
                <h1 className="login-title">
                    Connexion
                </h1>

                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <div>
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

                    <div>
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            {...register("password")}
                            className="input-text"
                            placeholder="Votre mot de passe"
                        />
                        {errors.password && (
                        <p className="error-text">
                            {errors.password.message}
                        </p>
                        )}
                    </div>

                    <button type="submit" className="btn-global cust-login-btn">
                        Se connecter
                    </button>
                </form>

                {serverError && (
                    <p className="error-text center">{serverError}</p>
                )}

                <p className="register-link">
                    Pas de compte ?{" "}
                    <a href="/register">Créer un compte</a>
                </p>
            </div>
        </div>
        </>
    );
};

export default Login;
