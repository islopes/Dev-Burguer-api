import { Router } from "express";
import multer from "multer";
import CategoryController from "./app/controllers/CategoryController.js";
import OrderController from "./app/controllers/OrderController.js";
import ProductController from "./app/controllers/ProductController.js";
import SessionController from "./app/controllers/SessionController.js";
import adminMiddleware from "./app/middlewares/admin.js";
import UserController from "./app/controllers/UserController.js";
import authMiddleware from "./app/middlewares/auth.js";
import multerConfig from "./config/multer.cjs";

const routes = new Router();

const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddleware); // Todas as rotas abaixo vão precisar de autenticação
routes.post(
  "/products",
  adminMiddleware,
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
