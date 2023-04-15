import obj from "../config.js";
import jwt from "jsonwebtoken";
import { getCarts, getCartById, addCart, addProductToCart, emptyCartById, deleteProductById } from "../services/cart.services.js";

export async function getAllCarts(req, res) {
  try {
    const carts = await getCarts();
    res.json({state: 1, carts})
  } catch (err) {
    res.status(500).json({state: 0, err})
  }
}

export async function getOneCartById(req, res){
  const { idCart } = req.params;
  try {
    const cart = await getCartById(idCart);
    if (cart.message) res.json({ state: 0, err: cart.message });
    else res.json({state: 1, cart})
  } catch (err) {
    res.status(500).json({state: 0, err})
  }
}
//this is for ReactJsApp
export async function addOneCart(req, res) {
  const { name, cellphone, products, comments, conditions, finalPrice } = req.body;
  const user = jwt.verify(req.cookies.tokenJwt, obj.secret_key_jwt);
  const newCartObj = {
    user: user.user.email,
    name,
    cellphone,
    products,
    comments, 
    conditions,
    finalPrice
  }
  try {
    const newCart = await addCart(newCartObj);
    if (newCart.message) res.status(400).json({ state: 0, err: newCart.message });
    else res.json({state: 1, cart: newCart})
  } catch (err) {
    res.status(500).json({state: 0, err})
  }
}

export async function addOneProductToCart(req, res) {
  const { idCart } = req.params;
  const { idProduct, quantity } = req.body;
  if(!parseInt(quantity)) return res.json({state: 0, err: "Quantity is incorrect" });
  try {
    const cart = await addProductToCart(idCart, idProduct, quantity);
    if (cart.message) res.json({ state: 0, err: cart.message });
    else res.json({state: 1, cart })
  } catch (err) {
    res.status(500).json({state: 0, err})
  }
}

export async function addQuantityToProduct(req, res) {
  const { idCart, idProduct } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await addProductToCart(idCart, idProduct, quantity);
    if (cart.message) res.json({ state: 0, err: cart.message });
    else res.json({state: 1, cart });
  } catch (err) {
    res.status(500).json({state: 0, err})
  }
}

export async function emptyOneCartById(req, res) {
  const { idCart } = req.params;
  try {
    const emptyCart = await emptyCartById(idCart);
    if (emptyCart.message) res.json({ state: 0, err: emptyCart.message });
    else res.json({state: 1, cart: emptyCart })
  } catch (err) {
    res.status(500).json({state: 0, err})
  }
}

export async function deleteOneProductById(req, res) {
  const { idCart, idProduct } = req.params;
  try {
    const cart = await deleteProductById(idCart, idProduct);
    if (cart.message) res.json({ state: 0, err: cart.message });
    else res.json({state: 1, cart })
  } catch (err) {
    res.status(500).json({state: 0, err})
  }
}