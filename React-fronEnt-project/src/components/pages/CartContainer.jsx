import { useCustomContext } from '../../utils/context/ContextTasks';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';
import useVerifyLogin from '../../utils/customHooks/useVerifyLogin';

export default function CartContainer(){

  //this is to very if you're login
  useVerifyLogin();

  //Se usa el contexto y se importa la función clear; además de las variables carrito, cantidad y precioFinal 
  const { cart, quantity, finalPrice, clear } = useCustomContext();
  
  //Hook para navegar a otra ruta
  const navigate = useNavigate();

  //Función que redirige a la ruta /form si la variable 'carrito' está con productos
  const formulario = () => {
    cart.length>=1 && navigate('/form');
  }

  return(
    <>
      <div className='container d-flex flex-column align-items-center'>
        {cart.map((props, index) => <Cart props={props} key={index}/>)}
      </div>
  
      <div className='alert alert-success d-flex flex-column flex-lg-row w-75 justify-content-between align-items-center m-auto text-center mt-3' role='alert'>
        <h3 className='alert-heading'>Cart details</h3>
        <h4><strong>Quantity of products: { quantity } </strong></h4>
        <h4><strong>Precio final: { finalPrice }</strong></h4>
        <button disabled={cart.length===0} style={{fontSize: '1.2rem'}} type='button' className='btn btn-danger' onClick={formulario}>Finish the purchase</button>
      </div>
      <div className='container d-flex flex-column align-items-center mt-3'>
        <button disabled={cart.length===0} style={{fontSize: '1.2rem'}} type='button' className='btn btn-danger' onClick={(e)=>clear(e)}>Empty the cart</button>
      </div>
    </>
  )
}