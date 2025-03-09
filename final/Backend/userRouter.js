import express from "express";
import { 
    loginControllers, 
    registerControllers, 
    setAvatarController 
} from "../controllers/userController.js";

const router = express.Router();

// User registration
router.post("/user/signup", registerControllers);

// User login
router.post("/user/signin", loginControllers);

// Set or update user avatar (Changed from POST to PUT)
router.put("/user/avatar/:id", setAvatarController);

export default router;
