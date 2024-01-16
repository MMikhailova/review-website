import express  from "express";
import userControllers from "../controllers/userControllers.js";

const router = express.Router();
router.put('/user/add-favorites', userControllers.addToFavorites)
router.put("/user/remove-favorites", userControllers.deleteFromFavorites);
export default router;