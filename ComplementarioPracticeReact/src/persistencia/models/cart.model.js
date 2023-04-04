import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  time: {
    type: Date,
    required: true
  },
  user:{
    type: String,
    default: "usuario@gmail.com"
  },
  name:{
    type: String,
    required: true
  },
  cellphone:{
    type: Number,
    required: true
  },
  products: [
    {
      product: {
        //It's a bit weird that product doesn't appear in mongo atlas by its name, instead of that it's _id, and just with this works
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
      },
      quantity: {
        type: Number,
        required: true
      },
      totalPrice: {
        type: Number,
        required: true
      }
    }
  ],
  comments:{
    type: String,
    default: ''
  },
  conditions:{
    type: Boolean,
    required: true
  },
  finalPrice: {
    type: Number,
    required: true
  }
})

export const cartModel = mongoose.model('Carts', cartSchema);
