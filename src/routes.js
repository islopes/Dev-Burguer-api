import { Router } from "express";
import UserController from "./app/controllers/UserController.js";
import SessionController from "./app/controllers/SessionController.js";
import ProductController from "./app/controllers/ProductController.js";
import multerConfig from "./config/multer.cjs";
import multer from "multer";
import authMiddleware from "./middlewares/auth.js";

const routes = new Router();

const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);
routes.use(authMiddleware); // Todas as rotas abaixo vão precisar de autenticação
routes.post("/products", upload.single("file"), ProductController.store);
routes.get("/products", authMiddleware, ProductController.index);
export default routes;
