import express from "express";
import { CorsMiddlewares } from "../middlewares/cors.middlewares.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { AdmControllers } from "../controllers/adm.controllers.js";

const routes = express.Router()

routes.get("/products", CorsMiddlewares.corsPermission, verifyToken.verify, AdmControllers.getProducts);
routes.post("/products", CorsMiddlewares.corsPermission, verifyToken.verify, AdmControllers.postProducts);
routes.put("/products/:id", CorsMiddlewares.corsPermission, verifyToken.verify, AdmControllers.putProduct);
routes.delete("/products/:id", CorsMiddlewares.corsPermission, verifyToken.verify, AdmControllers.deleteProduct);

routes.post("/adms/register", CorsMiddlewares.corsPermission, verifyToken.verify, AdmControllers.registerAdm);
routes.post("/adms/login", CorsMiddlewares.corsPermission, verifyToken.verify, AdmControllers.loginAdm);

export default routes;