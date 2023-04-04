import { useState, useRef } from 'react';

function ItemCount({ stock, onAdd, status }) {

  //Hook para controlar el estado de la cantidad de un producto
  const [counter, setCounter] = useState(1);
  const isActive = useRef(null);

  //Función para aumentar la variable contador
  const increaseProduct = () => {
    isActive.current.disabled = false;
    setCounter(!(counter >= stock) ? counter + 1 : stock);
  }

  //Función para disminuir la variable contador
  const decreaseProduct = () => {
    isActive.current.disabled = false;
    setCounter(counter > 1 ? counter - 1 : 1);
  }

  const sentProduct = () => {
    isActive.current.disabled = true;
    isActive.current.textContent = "Added";
    onAdd(counter)
  }

  return (
    <div className='w-100'>
      <div className='d-flex justify-content-center'>
        <button style={{ fontSize: '1.3rem' }} onClick={decreaseProduct} type='button' className='btn btn-secondary rounded-circle px-3'>-</button>
        <span style={{ fontSize: '1.5rem' }}> {counter} </span>
        <button style={{ fontSize: '1.3rem' }} onClick={increaseProduct} type='button' className='btn btn-secondary rounded-circle px-3'>+</button>
      </div>
      <div className='mt-3'>
        <button disabled={(!status || stock<1) && true} ref={isActive} id='onAdd' style={{ fontSize: '1.3rem' }} onClick={(e) => sentProduct()} type='button' className='btn btn-success w-100 mx-1'>Add</button>
      </div>
    </div>
  )
}

export default ItemCount;
