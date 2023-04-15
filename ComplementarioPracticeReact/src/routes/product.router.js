import { Router } from "express";
import {
  getAllProducts,
  getOneProductById,
  addOneProduct,
  updateOneProductById,
  deleteOneProductById
} from "../controllers/product.controller.js";
import { jwtValid } from "../middleware/jwt.middleware.js";

const router = Router();

router.get("/", jwtValid, getAllProducts);

router.get("/:idProduct", jwtValid , getOneProductById);

router.post("/add-product", addOneProduct);

router.put("/:idProduct", updateOneProductById);

router.delete("/:idProduct", deleteOneProductById);

export default router;
