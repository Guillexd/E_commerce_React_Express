import { Link } from 'react-router-dom';
import Guille from '../../utils/images/guille.png'
import { useCustomContext } from '../../utils/context/ContextTasks';

export default function NavBar() {

  const { login } = useCustomContext();

  return (
    <>
      { login &&
      <header className='bg-secondary bg-opacity-75 w-100'>
        <nav className='navbar navbar-expand-lg w-100'>
          <div className='container-fluid justify-content-between w-100'>
            <div className='me-lg-5'>
              <Link to={'/products'}>
                <img src={Guille} alt='Guille Market' width='150' />
              </Link>
            </div>

            <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse text-center ms-lg-5' id='navbarNav' style={{ fontSize: '1.7rem', fontWeight: 'bold' }}>
              <ul className='navbar-nav ms-5'>
                <li className='nav-item ms-lg-5'>
                  <Link to={'/categories/Hardware'} className='nav-link'>Hardware</Link>
                </li>
                <li className='nav-item ms-lg-5'>
                  <Link to={'/categories/Accessory'} className='nav-link'>Accesory</Link>
                </li>
                {/* <li className='nav-item ms-lg-5'>
                  <Link to={'/categories/bebidas'} className='nav-link'>Bebidas</Link>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      }

      {/* <div className='d-flex flex-column flex-shrink-0 p-3 text-bg-dark position-fixed' style={{width: '280px'}}>
        <a href='/' className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none'>
          <svg className='bi pe-none me-2' width='40' height='32'></svg>
          <span className='fs-4'>Sidebar</span>
        </a>
     
          <ul className='nav nav-pills flex-column mb-auto'>
            <li className='nav-item'>
              <a href='#' className='nav-link active' aria-current='page'>
                <svg className='bi pe-none me-2' width='16' height='16'></svg>
                Home
              </a>
            </li>
            <li>
              <a href='#' className='nav-link text-white'>
                <svg className='bi pe-none me-2' width='16' height='16'></svg>
                Dashboard
              </a>
            </li>
            <li>
              <a href='#' className='nav-link text-white'>
                <svg className='bi pe-none me-2' width='16' height='16'></svg>
                Orders
              </a>
            </li>
            <li>
              <a href='#' className='nav-link text-white'>
                <svg className='bi pe-none me-2' width='16' height='16'></svg>
                Products
              </a>
            </li>
            <li>
              <a href='#' className='nav-link text-white'>
                <svg className='bi pe-none me-2' width='16' height='16'></svg>
                Customers
              </a>
            </li>
          </ul>
            <div className='dropdown'>
              <a href='#' className='d-flex align-items-center text-white text-decoration-none dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>
                <img src='https://github.com/mdo.png' alt='' width='32' height='32' className='rounded-circle me-2' />
                <strong>mdo</strong>
              </a>
              <ul className='dropdown-menu dropdown-menu-dark text-small shadow'>
                <li><a className='dropdown-item' href='#'>New project...</a></li>
                <li><a className='dropdown-item' href='#'>Settings</a></li>
                <li><a className='dropdown-item' href='#'>Profile</a></li>
                <li><hr className='dropdown-divider' /></li>
                <li><a className='dropdown-item' href='#'>Sign out</a></li>
              </ul>
            </div>
      </div> */}
    </>
  )
}