import { Router } from "express";
import {
  getAllCarts,
  getOneCartById,
  addOneCart,
  addOneProductToCart,
  addQuantityToProduct,
  emptyOneCartById,
  deleteOneProductById
} from "../controllers/cart.controller.js";
import { jwtValid } from "../middleware/jwt.middleware.js";

const router = Router();

router.get("/", getAllCarts);

router.get("/:idCart", jwtValid, getOneCartById);

router.post("/add-cart", addOneCart);

router.put("/:idCart", addOneProductToCart);

router.put("/:idCart/products/:idProduct", addQuantityToProduct);

router.delete("/:idCart", emptyOneCartById);

router.delete("/:idCart/products/:idProduct", deleteOneProductById);

export default router;
