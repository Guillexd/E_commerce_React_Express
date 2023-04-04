import { useCustomContext } from '../../utils/context/ContextTasks';
import ItemCount from './ItemCount';

export default function ItemDetail({ product, id }) {

  //Se hace uso del contexto y se importa la función setCarrito; además de la variable carrito
  const { cart, setCart } = useCustomContext();

  //Función que agrega el producto (objeto) a la variable 'carrito' (array)
  const onAdd = (counter) => {
    if (cart.some(product => product.id == id)) {
      const prod = cart.findIndex(prod => {
        return prod.id === product._id
      });
      cart[prod].quantity = counter;
      setCart([...cart]);
    } else {
      const newProduct = {
        id: id,
        title: product.title,
        price: product.price,
        stock: product.stock,
        thumbnail: product.thumbnail,
        quantity: counter
      }
      setCart([...cart, newProduct])
    }
  }

  return (
    <div className='d-flex flex-column align-items-center mt-5'>
      <section className='text-center'>
        <p style={{ fontSize: '3rem' }}>Product: {product.title}</p>
      </section>
      <section className='container d-flex flex-column flex-lg-row justify-content-center align-items-center py-5 mt-1'>
        <img src={product.thumbnail} alt={product.title} width='320' />
        <div className='d-flex flex-column align-items-center p-2'>
          <h2><strong>{product.title}</strong></h2>
          <p style={{ fontSize: '1.2rem' }}>{product.des}</p>
          <h4><strong>${product.price}</strong></h4>
          <ItemCount stock={product.stock} onAdd={onAdd} status={product.status}></ItemCount>
        </div>
      </section>
    </div>
  )
}