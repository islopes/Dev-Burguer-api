import { Router } from "express";
import UserController from "./app/controllers/UserController.js";
import SessionController from "./app/controllers/SessionController.js";
import ProductController from "./app/controllers/ProductController.js";
import multerConfig from "./config/multer.cjs";
import multer from "multer";
import authMiddleware from "./middlewares/auth.js";
import CategoryController from "./app/controllers/CategoryController.js";
import OrderController from "./app/controllers/OrderController.js";

const routes = new Router();

const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

routes.use(authMiddleware); // Todas as rotas abaixo vão precisar de autenticação
routes.post(
  "/products",
  authMiddleware,
  upload.single("file"),
  ProductController.store,
);
routes.put(
  // atualização de produto
  "/products:id",
  authMiddleware,
  upload.single("file"),
  ProductController.update,
);
routes.get("/products", authMiddleware, ProductController.index);

routes.post(
  "/categories",
  authMiddleware,
  upload.single("file"),
  CategoryController.store,
);
routes.put(
  "/categories/:id",
  authMiddleware,
  upload.single("file"),
  CategoryController.update,
);
routes.get("/categories", CategoryController.index);
routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);

routes.put("/orders:id", authMiddleware, OrderController.update);

export default routes;
