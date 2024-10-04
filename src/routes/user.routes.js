import express from "express";
import { CorsMiddlewares } from "../middlewares/cors.middlewares.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { UserController } from "../controllers/user.controller.js";

const routes = express.Router();

routes.get("/products", CorsMiddlewares.corsPermission, verifyToken.verify, UserController.getProducts);

routes.post("/users/register", CorsMiddlewares.corsPermission, verifyToken.verify, UserController.registerUser);
routes.post("/users/login", CorsMiddlewares.corsPermission, verifyToken.verify, UserController.loginUser);

export default routes;