import { useEffect, useRef } from 'react'
import { fetchBody } from '../../utils/customHooks/helpers';
import { useCustomContext } from '../../utils/context/ContextTasks';
import { useNavigate} from 'react-router-dom';

export default function Login() {

  const { login, setLogin } = useCustomContext();
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await fetchBody('/user/login', 'POST',{ email: refEmail.current.value, password: refPassword.current.value });
    if(data.user.email === refEmail.current.value){
      setLogin(true);
      navigate('/products')
    }
  }

  useEffect(()=>{
    if(login) navigate('/products');
  }, [])

  return (
    <main className='mt-5 d-flex flex-column align-items-center'>
      <h1 className='text-center'>Login</h1>
      <form className='border border-primary border-2 rounded-4 p-5' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>Email address</label>
          <input type='email' className='form-control' id='email' name='email' aria-describedby='emailHelp' ref={refEmail} />
          <div id='emailHelp' className='form-text'>We'll never share your email with anyone else.</div>
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>Password</label>
          <input type='password' className='form-control' id='password' name='password' ref={refPassword} autoComplete=''/>
        </div>
        <div className='mb-3 form-check'>
          <input type='checkbox' className='form-check-input' id='exampleCheck1' />
          <label className='form-check-label' htmlFor='exampleCheck1'>Check me out</label>
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
        <br />
        <a href='/view/register'>Register</a> <br />
        <a href='/view/change-password'>Did you forgot password?</a>

      </form>
    </main>
  )
}