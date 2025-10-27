import { Router } from "express";
import { createAlbum, createSong, deleteAlbum, deleteSong} from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";


const router = Router();

// slightly optimize code now protectRoute and ... will be applied to all routes    
router.use(protectRoute, requireAdmin);

router.post("/songs", createSong);
router.delete("/song/:id" ,deleteSong);

router.post("/albums", createAlbum);
router.delete("/album/:id", deleteAlbum);

export default router;