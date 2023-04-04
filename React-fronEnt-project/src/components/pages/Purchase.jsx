import { Link } from "react-router-dom";

export default function Purchase({props}) {

  return (
    <div className='col'>
      <div className='card shadow-sm'>
        <img src={props._id.thumbnail} alt={props._id.title} />
        <div className='card-body text-center'>
          <h2>{props._id.title}</h2>
          <p className='card-text text-center'>{props._id.des}.</p>
          <h4 className='card-text'>Price: ${props.totalPrice}</h4>
          <h4 className='card-text'>Quantity: {props.quantity}</h4>
          <p className='card-text text-center'>{props._id.category}.</p>
          <Link to={`/product/${props._id._id}`}><button type='button' className='btn btn-sm btn-outline-secondary'>View</button></Link> 
        </div>
      </div>
    </div>
  )
}