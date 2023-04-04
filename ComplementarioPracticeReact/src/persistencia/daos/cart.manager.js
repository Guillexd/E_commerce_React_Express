import { cartModel } from "../models/Cart.model.js";

export default class CartManager {
  async getCarts() {
    try {
      //method populate must have 3 parameters (path in DB(like an object), an element(optional), reference of another model or collection's name in DB)
      const carts = await cartModel.find().populate('products._id', '-__v', 'Products');
      //this commented code below is another way to do populate method 
      // const carts = await cartModel.find().populate({
      //   path: 'products._id', 
      //   model: 'Products'
      // });
      return carts;
    } catch (err) {
      return err;
    }
  }

  async getCartById(idCart) {
    try {
      //method populate must have 3 parameters (path in DB(like an object), an element(optional), reference of another model or collection's name in DB)
      const cart = await cartModel.findById(idCart).populate('products._id', '-__v', 'Products');
      //this commented code below is another way to do populate method 
      // const cart = await cartModel.findById(idCart).populate({
      //   path: 'products._id', 
      //   model: 'Products'
      // });
      return cart;
    } catch (err) {
      return err;
    }
  }

  async addCart(propsNewCart) {
    try {
      const newCart = await cartModel.create(propsNewCart);
      return newCart;
    } catch (err) {
      return err;
    }
  }

  async addProductToCart(idCart, idProduct, quantity) {
    try {
      const cart = await cartModel.findById(idCart);
      //this for, try to find an id equals to idProduct, is it's true throw an error, if not, we will try to add a quantity
      //just with for 'return' works, 
      for (let index = 0; index < cart.products.length; index++) {
        // console.log(cart.products[index]);
        //this '==' is for a right comparison since a new IdObjetc isn't strictly equal to a stringId
        if(cart.products[index]._id == idProduct) {
          if(!quantity) return false;
          else {
            cart.products[index].quantity = quantity;
            cart.save();
            return cart;
          }
        }
      }

      //this if is to prove that quantity isn't alone in req.body
      if(idCart && idProduct){
        cart.products.push(idProduct);
        if(quantity) cart.products.quantity = quantity;
        cart.save();
      }
      return cart;
    } catch (err) {
      return err;
    }
  }

  async emptyCartById(idCart) {
    try {
      const cart = await cartModel.findByIdAndUpdate(idCart, {products: []}, {new: true});
      return cart;
    } catch (err) {
      return err;
    }
  }

  async deleteProductById(idCart, idProduct) {
    try {
      //the second parametes of findByIdAndUpdate could be an operator from mongo ($pull: this  operator removes from an existing array all instances of a value or values that match a specified condition)
      const cart = await cartModel.findByIdAndUpdate(
        idCart,
        { $pull: { products: { _id: idProduct } } },
        { new: true });
      return cart;
    } catch (err) {
      return err;
    }
  }
}
