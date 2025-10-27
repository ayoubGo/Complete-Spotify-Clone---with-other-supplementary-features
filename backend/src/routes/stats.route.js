import express from  "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getStats } from "../controllers/stats.controller.js";


const route = express.Router();

route.get("/",protectRoute, requireAdmin, getStats);

export default route;