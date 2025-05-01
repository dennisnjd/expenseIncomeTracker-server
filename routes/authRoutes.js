import { Router } from "express";
import { registerUser, loginUser, listUsers,logoutUser } from "../controllers/authController.js";
import tokenValidationMiddleware from "../middlewares/tokenValidationMiddleware.js";


const authRouter = Router();

authRouter.get("/", listUsers);
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout",tokenValidationMiddleware, logoutUser   ); // List users route

export default authRouter;