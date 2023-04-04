import { productModel } from "../models/product.model.js";

export default class ProductManager {
  async getProducts(queryFilter, options) {
    try {
      const products = await productModel.paginate(queryFilter, options);
      //this default data is from paginate-mongooose
      const objProducts = {
        status: products.totalDocs ? 1 : 0,
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : null,
        nextLink: products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : null,
      }
      return objProducts;
    } catch (err) {
      return err;
    }
  }

  async getProductById(idProduct) {
    try {
      const product = await productModel.findById(idProduct);
      return product;
    } catch (err) {
      return err;
    }
  }

  async addProduct(propsNewProduct) {
    try {
      const newProduct = await productModel.create(propsNewProduct);
      return newProduct;
    } catch (err) {
      return err;
    }
  }

  async updateProductById(idProduct, propsProduct) {
    try {
      const productChanged = await productModel.findByIdAndUpdate(idProduct, propsProduct, {new: true});
      return productChanged;
    } catch (err) {
      return err;
    }
  }

  async deleteProductById(idProduct) {
    try {
      const productDeleted = await productModel.findByIdAndDelete(idProduct);
      return productDeleted;
    } catch (err) {
      return err;
    }
  }
}
