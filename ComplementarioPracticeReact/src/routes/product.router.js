import { Router } from "express";
import {
  getAllProducts,
  getOneProductById,
  addOneProduct,
  updateOneProductById,
  deleteOneProductById
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getAllProducts);

router.get("/:idProduct", getOneProductById);

router.post("/add-product", addOneProduct);

router.put("/:idProduct", updateOneProductById);

router.delete("/:idProduct", deleteOneProductById);

export default router;
