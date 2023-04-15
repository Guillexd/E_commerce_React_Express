import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBody } from '../customHooks/helpers';

//Custom hook 
const Context = createContext();
export const useCustomContext = () => useContext(Context);

function ContextTasks({ children }) {

  //Hook to navigate ot another route 
  const navigate = useNavigate();

  //Hook to store products in cart
  const [cart, setCart] = useState([]);

  //Hook to store quantity of any single product
  const [quantity, setQuantity] = useState(0);

  //Hook to store the final price of all products
  const [finalPrice, setFinalPrice] = useState(0);

  //Hook to control changes in cart
  useEffect(() => {
    setQuantity(getTotalQuantity);
    setFinalPrice(getFinalPrice);
  }, [cart]);

  const getTotalQuantity = () => {
    const quantity = cart.reduce(
      (acum, product) => acum + product.quantity,
      0
    )
    return quantity;
  }

  const getFinalPrice = () => {
    const price = cart.reduce(
      (acum, product) => acum + (product.quantity * product.price),
      0
    )
    return price.toFixed(2);
  }

  //Function to remove a product from cart
  const removeProduct = (id) => {
    const newCart = cart.filter(product => product.id !== id);
    setCart(newCart);
  }

  //function to empty the cart
  const clear = (e) => {
    if (cart.length) {
      setCart([]);
    }
  }

  //Function to add an order in DB
  const addOrder = async (e, state) => {

    e.preventDefault();
    if (cart.length < 1) return;

    const products = cart.map(product => {

      const newStock = product.stock - product.quantity;

      fetchBody(`/api/products/${product.id}`, 'PUT', { stock: newStock });

      return {
        _id: product.id,
        quantity: product.quantity,
        totalPrice: (product.price * product.quantity)
      }
    })

    const purchase = {
      name: state.name,
      cellphone: state.cellphone,
      products,
      finalPrice,
      comments: state.comments,
      conditions: state.conditions
    }

    const newCart = await fetchBody(`/api/carts/add-cart`, 'POST', purchase);

    if (newCart?.state === 0) navigate(`/error`);
    else navigate(`/purchase/${newCart.cart._id}`);

  }

  //hook to control login
  const [login, setLogin] = useState(false);
  useEffect(()=>{
    fetch('/api/user/validate', {
      method: 'POST'
    })
    .then(response => response.json())
    .then(response => setLogin(response.status === 1))
    console.log(login);
    // if(!login) navigate('/');
  },[login])

  return (
    <Context.Provider value={{ cart, setCart, quantity, finalPrice, removeProduct, clear, addOrder, login, setLogin }}>
      {children}
    </Context.Provider>
  )
}

export default ContextTasks;
