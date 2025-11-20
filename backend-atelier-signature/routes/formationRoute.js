import express from "express";
import {getAllFormations, getFormationById, createFormation, deleteFormation} from "../controllers/formationController.js";

const router = express.Router();

router.get("/", getAllFormations);
router.get("/:id", getFormationById);
router.post("/", createFormation);
router.delete("/:id", deleteFormation);


export default router;
