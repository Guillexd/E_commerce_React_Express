import { Link } from 'react-router-dom';

function Item({ data }) {

  return (
    <section style={{ width: '500px' }} className='border border-info rounded-3 p-2 d-flex flex-column align-items-center text-center m-3'>
      <div className=''>
        <h3>{data.title}</h3>
        <Link to={`/product/${data._id}`}>
          <img style={{ filter: 'brightness(1.1)', mixBlendMode: 'multiply', objectFit: 'cover' }} src={data.thumbnail} alt={data.title} width='300px' height='200px' /><br></br>
        </Link>
        <h4>
          <strong>${data.price}</strong>
        </h4>
        <Link to={`/product/${data._id}`}>
          <button style={{ fontSize: '1.3rem' }} type='button' className='btn btn-info'>Mirar detalles</button>
        </Link>
      </div>
    </section>
  )
}

export default Item;