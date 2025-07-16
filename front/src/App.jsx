 

  
import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Orders from './pages/orders/Orders'
import Menu from './pages/menu/Menu'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Add from './pages/Add/Add'
import List from "./pages/List/List"
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Myorders from './pages/Myorders/myorders'
import Layout from './pages/layout/Layout'

const App = () => {
  const url = "http://localhost:5000"
  const [showLogin, setShowLogin] = useState(false)
  const location = useLocation()

  // Define which routes should show the sidebar
  const showSidebarRoutes = ['/add', '/list', '/orders']

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className='app'>
        <ToastContainer />

        <Navbar setShowLogin={setShowLogin} showLogin={showLogin} />
        <hr />
        
        {/* Conditionally render Layout based on route */}
        {showSidebarRoutes.includes(location.pathname) ? (
          <Layout>
            <Routes>
              <Route path='/add' element={<Add urlprop={url} />} />
              <Route path='/list' element={<List urlprop={url} />} />
              <Route path='/orders' element={<Orders />} />
            </Routes>
          </Layout>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="/myorders" element={<Myorders />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        )}
        
        <Footer />
      </div>
    </>
  )
}

export default App