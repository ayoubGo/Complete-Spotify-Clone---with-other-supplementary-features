import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";


const router = express.Router();

router.get("/", protectRoute, getAllUsers);
// todo : getMessage route to get live messages 

export default router;
