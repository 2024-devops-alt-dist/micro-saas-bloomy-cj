import React from "react";
import "../../../../assets/styles/global.css";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HeaderAddGarden from "../../../../shared/headerAddGarden";

//  Schéma de validation
const gardenSchema = z.object({
    name: z.string().min(1, "Le nom du jardin est obligatoire.").max(25, "Le nom doit faire 25 caractères maximum."),
    garden_img: z.any().optional(), 
});

type GardenFormValues = z.infer<typeof gardenSchema>;

const AddGardenInfo : React.FC = () => {
    const navigate = useNavigate();
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    
    const { register, handleSubmit, setValue, watch, formState: { errors },} = useForm<GardenFormValues>({
        resolver: zodResolver(gardenSchema),
    });

    // Pour afficher le nom du fichier sélectionné
    const selectedFile = watch("garden_img");

    const nameValue = watch("name") ?? "";

    const onSubmit = (data: GardenFormValues) => {
        const imageName = data.garden_img ? data.garden_img.name : "";

        const gardenDraft = {
            name: data.name,
            garden_img: imageName,
            description: "",
            localisation: "",
            pets: false,
            plants: []
        };

        console.log("Draft créé :", gardenDraft);
        navigate("/addGardenInfoFa", { state: { gardenDraft } });
    };

    return (
        <>
        <HeaderAddGarden showBack={true} />

        <main className="main-footer">
            <h1 className="mb-3">C’est parti !</h1>
            <p className="mb-7">Renseignez les informations de votre jardin.</p>
            <img src="assets/mascot/mascot-relax.png" alt="Mascotte Bloomy" className="w-55 mb-6"/>
            
            <hr className="border-t border-gray-200 w-full max-w-xs mb-8" />

            <form className="w-full max-w-xs text-left space-y-6 cust-padding-form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block mb-1">Nom de votre jardin :</label>
                    <div className={`relative name-field ${nameValue.length === 25 ? 'is-full' : ''}`}>
                        <input
                            type="text"
                            placeholder="Écrire ..."
                            {...register("name")}
                            maxLength={25}
                            className="input-text pr-12"
                        />

                        <p className="name-count">
                            {nameValue.length}/25
                        </p>
                    </div>

                    {errors.name && (
                        <p className="error-alerte mt-2">⚠️ {errors.name.message}</p>
                    )}
                </div>


                <div>
                    <label className="block mb-1">Ajouter une image (facultatif) :</label>
                    <div className="flex items-center">
                        <input
                            type="text"
                            readOnly
                            className="input-upload"
                            value={selectedFile ? selectedFile.name : ""}
                            placeholder="Télécharger"
                        />

                        <label htmlFor="file-upload" className="upload-label">📁</label>

                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            className="input-file"
                            ref={fileInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                setValue("garden_img", file);
                                }
                            }}
                        />

                        {selectedFile && (
                        <button
                            type="button"
                            className="ml-2 text-black hover:text-red-500 transition-colors duration-150"
                            onClick={() => {
                                setValue("garden_img", undefined);
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                }
                            }}
                        >
                            ✖
                        </button>
                        )}
                    </div>
                </div>

                <button type="submit" className="btn-global mt-12 mx-auto block">
                    Suivant
                </button>
            </form>
        </main>
        </>
    );
};

export default AddGardenInfo;