import { useParams } from 'react-router-dom';
import { useFetch } from '../../utils/customHooks/useFetch'
import { Link } from 'react-router-dom';
import Purchase from './Purchase';
import Spinner from '../presentation/Spinner';

export default function PurchaseContainer() {

  const { id } = useParams();
  const { data, loading } = useFetch(`/api/carts/${id}`);

  return (
    <>
    { 
      (data?.state === 0 || !data) ? <Spinner/> :
      <>
        <section id='sectionStarted' className='py-5 text-center container'>
          <div className='row py-lg-5'>
            <div className='col-lg-6 col-md-8 mx-auto'>
              <h1 className='display-4 fst-italic fw-light'>Bill of sale</h1>
              <p className='lead text-body-secondary'>Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
              
              <div className='text-start border border-black p-3 ps-5 rounded'>
                <p className='lead'>Name: {data.cart.name}</p>
                <p className='lead'>User: {data.cart.user}</p>
                <p className='lead'>Time: {data.cart.time}</p>
                <p className='lead'>Total Price: ${data.cart.finalPrice}</p>
                <p className='lead'>Comments: {data.cart.comments}</p>
              </div>

              <a href='#' className='btn btn-primary my-2'>Go to homepage</a>
              <a href='#footer' className='btn btn-secondary my-2'>Credits</a>
              <h2 className='text-body-secondary fw-bold mt-3'>Here's the details</h2>
            </div>
          </div>
        </section>

        <div>
          <div className='album py-5 bg-body-tertiary'>
            <div className='container'>
              <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 d-flex justify-content-center'>
                { loading || data?.state===0 ? data.state===0 ? <h2>There isn't any product</h2> : <Spinner/>  : data.cart.products.map((product, index) => <Purchase props={product} key={index}/>) }
              </div>
            </div>
          </div>
        </div>

        <footer id='footer' className='text-body-secondary py-5'>
          <div className='container'>
            <p className='float-end mb-1'>
              <a href='#sectionStarted'>Back to top</a>
            </p>
            <p className='mb-1'>This is my last project of ReactJs :c</p>
            <p className='mb-0'>Do you still want to buy products? <a href='/'>Visit the homepage</a>.</p>
            <p>Guille@Github</p>
          </div>
        </footer>
      </>
    }
  </>
  )
}