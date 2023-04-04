import { useCustomContext } from '../../utils/context/ContextTasks';

function Cart({props}){
  
  //Se usa el contexto y se importa la función removeItem
  const { removeProduct } = useCustomContext();

  return(
    <section className='d-flex flex-column flex-md-row align-items-center justify-content-around w-75 my-1 border border-3 rounded-end'>
        <img src={props.thumbnail} alt={props.title} style={{ filter: 'brightness(1.1)', mixBlendMode: 'multiply', objectFit: 'cover' }} width='150' height='150'/>
        <div className='d-flex flex-column text-center'>
          <h3>Title: <strong>{props.title}</strong></h3>
          <h4>Quantity: <strong>{props.quantity}</strong></h4>
          <h4>Price: <strong>${(props.price * props.quantity).toFixed(2)}</strong></h4>
        </div>
        <button style={{fontSize: '1.2rem'}} type='button' className='btn btn-danger' onClick={()=>removeProduct(props.id)}>Remove</button>
      </section>
  )
}

export default Cart;