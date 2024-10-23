import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import Home from './layouts/page/Home/Home.jsx'
import Todo from './layouts/page/Todo/Todo.jsx'
import Component from './layouts/page/Component/Component.jsx'
import Cart from './layouts/page/Cart/Cart.jsx'
import Product from './layouts/page/Product/Product.jsx'
import Animation from './layouts/page/Animation/Animation.jsx'

import './App.css'
import Layout from './layouts/Layout/Layout.jsx'
import Calculator from './layouts/page/Calculator/Calculator.jsx'
import { fetchProducts } from './data/Products.jsx'
import Login from './layouts/page/login/Login.jsx'


const intTab = 'home'
function App() {
  const [token, setToken] = useState('')
  const [products, setProducts] = useState([])
  const [carts, setCarts] = useState([])
  const [tab, setTab] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => setProducts(fetchProducts()), [])
  useEffect(() =>setTab(intTab), []) //first load
  if (token === ''){
    return (
      <Login setToken={setToken} setRole={setRole}/>
    )
  }
  else{
    return (
      <div className='app-container'>
        <HashRouter>
          <Routes>
            <Route element={<Layout tab={tab} setTab={setTab}  products={products} carts={carts} setToken={setToken}/>}>
              <Route path={'/'} element={<Home />}></Route>
              <Route path={'/home'} element={<Home />}></Route>
              <Route path={'/Animation'} element={<Animation/>}></Route>
              <Route path={'/todo'} element={<Todo />}></Route>
              <Route path={'/component'} element={<Component />}></Route>
              <Route path={'/calculator'} element={<Calculator />}></Route>
              <Route path={'/Product'} element={
              <Product 
  
              products={products} 
              carts={carts} 
              setCarts={setCarts}/>}>
  
              </Route>
              <Route path={'/Cart'} element={<Cart carts ={carts} setCarts={setCarts}/>}></Route>
  
            </Route>
          </Routes>
        </HashRouter>
      </div>
    )
  }
  }

export default App
