import CartManager from "../persistencia/daos/cart.manager.js";

const cartManager = new CartManager();

export async function getCarts() {
  try {
    const carts = await cartManager.getCarts();
    return carts;
  } catch (err) {
    return err;
  }
}

export async function getCartById(idCart) {
  try {
    const cart = await cartManager.getCartById(idCart);
    return cart;
  } catch (err) {
    return err;
  }
}

export async function addCart(propsNewCart) {
  try {
    // const now = dayjs().format('MMMM D, YYYY - dddd, H:mm a');
    const now = new Date().toISOString();
    const newCart = await cartManager.addCart({...propsNewCart, time: now});
    return newCart;
  } catch (err) {
    return err;
  }
}

export async function addProductToCart(idCart, idProduct, quantity) {
  try {
    const cart = await cartManager.addProductToCart(
      idCart,
      idProduct,
      quantity
    );
    return cart;
  } catch (err) {
    return err;
  }
}

export async function emptyCartById(idCart) {
  try {
    const cart = await cartManager.emptyCartById(idCart);
    return cart;
  } catch (err) {
    return err;
  }
}

export async function deleteProductById(idCart, idProduct) {
  try {
    const cart = await cartManager.deleteProductById(idCart, idProduct);
    return cart;
  } catch (err) {
    return err;
  }
}
