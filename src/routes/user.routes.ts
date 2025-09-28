import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const userRoutes = Router();

userRoutes.post("/register", UserController.register);
userRoutes.post("/login", UserController.login);
userRoutes.get("/", authenticateToken, UserController.list);

export default userRoutes;
