//Link to redirect without a route
import { Link, useNavigate } from 'react-router-dom';
import Carrito from '../../utils/images/carrito.png'
import { useCustomContext } from '../../utils/context/ContextTasks';

export default function CartWidget() {

  const { quantity, login, setLogin } = useCustomContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/api/user/logout')
    .then(response => {
      setLogin(false)
      navigate('/')
    })
    .catch(err => console.log(err))
  } 

  return (
    <>
      { login &&
      <div className='dropdown position-fixed bottom-0 end-0 bd-mode-toggle' style={{ zIndex: 900}}>
        <button className='btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center' id='bd-theme' type='button' aria-expanded='false' data-bs-toggle='dropdown' aria-label='Toggle theme (dark)'>
          <img src={Carrito} alt='Guille Market logo' height='48px' />
          <h4 style={{ color: 'black', fontSize: '2rem' }} className='position-absolute ps-4 pb-5 ms-2'>{quantity}</h4>
          <span className='visually-hidden' id='bd-theme-text'>Toggle theme</span>
        </button>
        <ul className='dropdown-menu dropdown-menu-end shadow' aria-labelledby='bd-theme-text'>
          <li>
            <Link to={'/cart'} className='text-decoration-none'>
              <button type='button' className='dropdown-item d-flex align-items-center' data-bs-theme-value='light'>
                Go to Cart
              </button>
            </Link>
          </li>
          <li onClick={()=>handleLogout()}>
            <button type='button' className='dropdown-item d-flex align-items-center' data-bs-theme-value='dark'>
              Log out
            </button>
          </li>
          {/* <li>
            <button type='button' className='dropdown-item d-flex align-items-center' data-bs-theme-value='auto'>
              Mode Light
            </button>
          </li> */}
        </ul>
      </div>
      }
    </>
  )
}