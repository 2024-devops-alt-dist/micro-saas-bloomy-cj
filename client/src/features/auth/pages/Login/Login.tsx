import React, { useState } from "react";
import "../../../../assets/styles/global.css";
import "./Login.css";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import HeaderHome from "../../../../HomePage/HeaderHome";

// Schéma validation Zod
const loginSchema = z.object({
    email: z
        .string()
        .nonempty({ message: "L'email est obligatoire." })
        .regex(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            { message: "Format Email invalide - ex : jean.marc@gmail.com" }
        ),
    password: z
        .string()
        .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." }),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const { login } = useAuth();
    const [serverError, setServerError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        setServerError(null);
        try {
            await login(data.email, data.password);
        } catch (err: any) {
            setServerError('Erreur lors de la connexion. Votre mot de passe et/ou votre email sont incorrects.');
        }
    };

    return (
        <>
        <HeaderHome />
        <div className="login-container min-h-screen flex items-center justify-center">
            <div className="login-card">
                <h1 className="login-title">
                    Connexion
                </h1>

                <form className="flex flex-col gap-[var(--space-md1)]" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            className="input-text mt-1"
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
                            className="input-text mt-1"
                            placeholder="Votre mot de passe"
                        />

                        {errors.password && (<p className="error-text">{errors.password.message}</p>)}

                    </div>

                    <button type="submit" className="btn-global cust-login-btn">
                        Se connecter
                    </button>
                </form>

                {serverError && (<p className="error-text center">{serverError}</p>)}

                <p className="register-link">
                    Vous n'avez pas encore de compte ?{" "}
                    <Link to="/register">Inscrivez-vous</Link>
                </p>
            </div>
        </div>
        </>
    );
};
export default Login;
