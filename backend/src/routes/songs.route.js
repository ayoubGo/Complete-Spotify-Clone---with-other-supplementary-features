import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTreandingSongs } from "../controllers/songs.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();


router.get("/" ,protectRoute, requireAdmin,  getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made_for_you", getMadeForYouSongs);
router.get("/treanding", getTreandingSongs);


export default router;