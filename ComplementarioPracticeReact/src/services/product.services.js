import ProductManager from "../persistencia/daos/product.manager.js";

const productManager = new ProductManager();

//Here you can modify, change an others ways in data except validation at least

export async function getProducts(queryFilter, options) {
  try {
    const products = await productManager.getProducts(queryFilter, options);
    return products;
  } catch (err) {
    return err;
  }
}
export async function getProductById(idProduct) {
  try {
    const product = await productManager.getProductById(idProduct);
    return product;
  } catch (err) {
    return err;
  }
}

export async function addProduct(propsNewProduct) {
  try {
    const product = await productManager.addProduct(propsNewProduct);
    return product;
  } catch (err) {
    return err;
  }
}

export async function updateProductById(idProduct, propsProduct) {
  try {
    const productChanged = await productManager.updateProductById(
      idProduct,
      propsProduct
    );
    return productChanged;
  } catch (err) {
    return err;
  }
}

export async function deleteProductById(idProduct) {
  try {
    const productDeleted = await productManager.deleteProductById(idProduct);
    return productDeleted;
  } catch (err) {
    return err;
  }
}
