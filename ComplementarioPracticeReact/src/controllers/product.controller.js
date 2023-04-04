import {
  getProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
} from "../services/product.services.js";

//Here you must validate data because you can use req and res instead of router itself

export async function getAllProducts(req, res) {
  const { page = 1, limit = 5, category = null, filter = null, inputFilter = null, sort } = req.query;
  // console.log(req.query);
  //options to paginate
  let queryFilter = {};

  if(category) queryFilter.category = category;
  //SELECT * FROM inventory WHERE category = category AND item LIKE "inputFilter")
  if(filter && inputFilter) queryFilter[filter] = { $regex: inputFilter, $options: "i" };  

  const options = { limit, page };
  if (sort == 1 || sort == -1) {
    options.sort = { price: sort };
  }
  // console.log(queryFilter);
  // console.log(req.cookies);
  try {
    const products = await getProducts(queryFilter , options);

    if (products.length !== 1) {
      res.json({ state: 1, products });
    } else {
      res.status(200).json({ state: 0 });
    }
  } catch (err) {
    res.status(500).json({ state: 0, err });
  }
}

export async function getOneProductById(req, res) {
  const { idProduct } = req.params;
  if (!idProduct)
    res.status(400).json({ state: 0, err: "Data is missing or incorrect" });
  try {
    const product = await getProductById(idProduct);
    //This validate an error, return an error in product, so it has a prop called message, message is from an error
    if (product.message) res.json({ state: 0, err: product.message });
    else res.json({ state: 1, product });
  } catch (err) {
    res.status(500).json({ state: 0, err });
  }
}

export async function addOneProduct(req, res) {
  const { title, des, price, thumbnail, stock, category, status } = req.body;
  if (!title || !des || !price || !stock || !category) {
    return res
      .status(400)
      .json({ state: 0, err: "Data is missing or incorrect" });
  }
  try {
    const newProduct = await addProduct({
      title,
      des,
      price,
      thumbnail,
      stock,
      category,
      status,
    });
    if (newProduct.message) res.json({ state: 0, err: newProduct.message });
    else res.json({ state: 1, product: newProduct });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ state: 0, err });
  }
}

export async function updateOneProductById(req, res) {
  const { idProduct } = req.params;
  const { stock } = req.body;

  try {
    const productEdited = await updateProductById(idProduct, { stock });
    if (productEdited.message)
      res.json({ state: 0, err: productEdited.message });
    else res.json({ state: 1, product: productEdited });
  } catch (err) {
    res.status(500).json({ state: 0, err });
  }
}

export async function deleteOneProductById(req, res) {
  const { idProduct } = req.params;
  try {
    const productDeleted = await deleteProductById(idProduct);
    if (productDeleted) {
      res.json({ state: 1, productDeleted });
    } else {
      res.json({ state: 0 });
    }
  } catch (err) {
    res.status(500).json({ state: 0, err });
  }
}
