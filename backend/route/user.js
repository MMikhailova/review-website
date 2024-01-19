import express  from "express";
import userControllers from "../controllers/userControllers.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();
router.put('/user/add-favorites',verifyToken, userControllers.addToFavorites)
router.put("/user/remove-favorites",verifyToken, userControllers.deleteFromFavorites);
export default router;