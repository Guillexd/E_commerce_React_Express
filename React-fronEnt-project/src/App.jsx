
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/presentation/NavBar'
import Login from './components/pages/Login'
import ItemListContainer from './components/pages/ItemListContainer'
import NotFound from './components/pages/NotFound'
import ContextTasks from './utils/context/ContextTasks'
import ItemDetailContainer from './components/pages/ItemDetailContainer'
import CartContainer from './components/pages/CartContainer'
import Form from './components/pages/Form'
import PurchaseContainer from './components/pages/PurchaseContainer'
import CartWidget from './components/presentation/CartWidget'

function App() {
  return (
    //Controller to navigation
    <Router>
      {/* Alcance del contexto provider*/}
      <ContextTasks>
        {/* presentational component*/}
        <NavBar/>
        <CartWidget/>
        <Routes> 
          {/* Routes */}
          <Route exact path='/' element={<Login/>} />
          <Route exact path='/products' element={<ItemListContainer/>} />
          <Route exact path='/categories/:category' element={<ItemListContainer/>} />
          <Route exact path='/product/:id' element={<ItemDetailContainer/>} />
          <Route exact path='/cart' element={<CartContainer/>} />
          <Route exact path='/form' element={<Form/>} />
          <Route exact path='/purchase/:id' element={<PurchaseContainer/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </ContextTasks>
    </Router>
  )
}

export default App
