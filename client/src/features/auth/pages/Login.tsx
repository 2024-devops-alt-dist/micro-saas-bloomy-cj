import React, { useState } from "react";
import "../../../assets/styles/global.css";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";

// Schéma validation Zod
const loginSchema = z.object({
    email: z.email("Format Email invalide - ex : jean.marc@gmail.com").min(1, "L'email est obligatoire."),
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Connexion
                </h1>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full border rounded-md p-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Votre email"
                        />
                        {errors.email && (
                        <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Mot de passe</label>
                        <input
                            type="password"
                            {...register("password")}
                            className="w-full border rounded-md p-2.5 outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Votre mot de passe"
                        />
                        {errors.password && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.password.message}
                        </p>
                        )}
                    </div>

                    <button type="submit" className="w-full bg-green-600 text-white py-2.5 rounded-md font-semibold hover:bg-green-700 transition">
                        connexion
                    </button>
                </form>

                {serverError && (
                    <p className="text-center text-red-600 mt-3">{serverError}</p>
                )}

                <p className="text-center text-sm mt-4 text-gray-700">
                    Pas de compte ?{" "}
                    <a href="/register" className="text-green-600 font-semibold hover:underline">
                        Créer un compte
                    </a>
                </p>
            </div>
            </div>
        </>
    );
};

export default Login;
