import { Router } from "express";
import { commonController } from "../controllers/commonController";

export const router = Router();


router.get("/localisations", commonController.getAllLocalisation);

router.get("/expositions", commonController.getAllExpositions);

router.get("/pets", commonController.getAllPets);
