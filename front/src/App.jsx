
import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Orders from './pages/orders/Orders'
import Menu from './pages/menu/Menu'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import myorders from "./pages/Myorders/myorders"
//import Sidebar from './components/sidebar/sidebar'
//import SigninPopup from './components/SigninPopup/SigninPopup'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>

      {/* {showLogin ? <LoginPopup setShowlogin={setShowLogin} /> : <></>} */}

      {showLogin && <LoginPopup setshowlogin={setShowLogin} />}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} showLogin={showLogin} />
        <hr />
        <div>
          {/* <Sidebar /> */}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={<Orders />} />
          <Route path="/myorders" element={<myorders />} />


        </Routes>
        <Footer />
         </div>
      </div>
    </>
  )
}

export default App
