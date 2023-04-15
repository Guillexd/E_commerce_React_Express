import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomContext } from '../../utils/context/ContextTasks';
import useVerifyLogin from '../../utils/customHooks/useVerifyLogin';

const initialState = {
  name: '',
  cellphone: '',
  comments: '',
  conditions: false
};

const actions = {
  updateName: 'updateName',
  updateCellphone: 'updateCellphone',
  updateComments: 'updateComments',
  updateConditions: 'updateConditions'
}

function reducer(state, action) {
  switch (action.type) {
    case actions.updateName:
      return { ...state, name: action.payload };
    case actions.updateCellphone:
      return { ...state, cellphone: action.payload };
    case actions.updateComments:
      return { ...state, comments: action.payload };
    case actions.updateConditions:
      return { ...state, conditions: action.payload };
    default:
      throw new Error();
  }
}

export default function Form() {

  //this is to very if you're login
  useVerifyLogin();

  //This is antoher way to get data from form
  // const [form, setForm] = useState({});

  // const handleChange = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]:e.target.value
  //   })
  // }

  // const handleChecked = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]:e.target.checked
  //   })
  // }

  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/cart');
  }

  //Se hace uso del contexto y se importa las funciones addOrders; además de las variables cantidad y precioFinal
  const { addOrder, quantity, finalPrice, cart } = useCustomContext();

  return (
    <>
      <div className='container mt-5'>
        <h1 style={{ fontSize: '4rem' }} className='text-center'>Make the order</h1>
        <form className='row g-3 d-flex flex-column align-items-center'>

          <div className='col-11'>
            <label htmlFor='validationCustom01' className='form-label'>Names</label>
            <div className='input-group has-validation'>
              <span className='input-group-text' id='inputGroupPrepend'>A</span>
              <input
                type='text'
                className='form-control'
                id='validationCustom01'
                name='nombre'
                value={state.name}
                onChange={(e) =>
                  dispatch({
                    type: actions.updateName,
                    payload: e.target.value
                  })}
                autoComplete='off'
                required />
            </div>
          </div>

          <div className='col-11'>
            <label htmlFor='validationCustom02' className='form-label'>Cellphone</label>
            <div className='input-group has-validation'>
              <span className='input-group-text' id='inputGroupPrepend'>#</span>
              <input
                type='number'
                className='form-control'
                id='validationCustom02'
                name='text'
                value={state.cellphone}
                onChange={(e) =>
                  dispatch({
                    type: actions.updateCellphone,
                    payload: e.target.value
                  })}
                autoComplete='off'
                required />
            </div>
          </div>

          <div className='form-floating col-11'>
            <textarea
              className='form-control'
              placeholder='Leave a comment here'
              id='textArea'
              style={{ height: '100px' }}
              value={state.comments}
              onChange={(e) =>
                dispatch({
                  type: actions.updateComments,
                  payload: e.target.value
                })}
              autoComplete='off'
              required />
            <label htmlFor='textArea'>Comments</label>
          </div>

          <div className='alert alert-info d-flex flex-column flex-lg-row col-11 justify-content-between align-items-center m-auto text-center mt-3' role='alert'>
            <h3 className='alert-heading'>Cart details</h3>
            <h4><strong>Quantity of products: {quantity}</strong></h4>
            <h4><strong>Final Price: {finalPrice}</strong></h4>
          </div>

          <div className='col-12 d-flex justify-content-center'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                name='verificado'
                checked={state.conditions}
                onChange={(e) =>
                  dispatch({
                    type: actions.updateConditions,
                    payload: e.target.checked
                  })}
                id='invalidCheck'
                required />
              <label className='form-check-label' htmlFor='invalidCheck'>
                Agree to the terms and conditions.
              </label>
            </div>
          </div>

          <div className="d-grid gap-2 col-6 mx-auto">
            <button disabled={cart.length === 0} type='submit' className='btn btn-primary' onClick={(e) => addOrder(e, state)}>Accept</button>
            <button disabled={cart.length === 0} type='button' className='btn btn-danger' onClick={handleRedirect}>Reject</button>
          </div>
        </form>
      </div>
    </>
  )
}