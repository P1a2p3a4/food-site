
import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'

const Navbar = ({ setShowLogin }) => {
  const [Menubar, setMenu] = useState('Home')
  const { getTotalCartAmount } = useContext(StoreContext)

  const navigate = useNavigate() 
  const logout = () => {
    localStorage.removeItem("token")
     
    navigate('/')  
  }

  return (
    <div className='Navbarmenu'>
      <Link to="/">
        <img id='logo' src="./src/assets/food-img/1.jpg" alt="logo image" />
      </Link>

      <ul className='navbarmenu'>
        <Link to='/' className={Menubar === 'Home' ? 'active' : ""} onClick={() => setMenu('Home')}>Home</Link>
        <a href='#explore-menu' className={Menubar === 'menu' ? 'active' : ""} onClick={() => setMenu('menu')}>Menu</a>
        <a href='#footer' className={Menubar === 'Contact' ? 'active' : ""} onClick={() => setMenu('Contact')}>Contact</a>
        <a href='#app-download' className={Menubar === 'MobileApp' ? 'active' : ""} onClick={() => setMenu("MobileApp")}>MobileApp</a>
        <Link to='/orders' className={Menubar === 'Orders' ? 'active' : ""} onClick={() => setMenu('Orders')}>Orders</Link>
        <Link to='/Cart' className={Menubar === 'Cart' ? 'active' : ""} onClick={() => setMenu('Cart')}>Cart</Link>
      </ul>

      <div className='navbar-right'>
        <img className='navbar-search' src="./Src/assets/food-list/search.png" alt="search icon" />

        <div className='navbar-search-icon'>
          <Link to='/Cart'>
            <img className='basket-icon' src="./src/assets/food-img/basket.png" alt="basket icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? '' : "dot"}></div>
        </div>
      </div>

      <button className='searchbtn' onClick={() => setShowLogin(true)}>Sign in</button>

      <div className='navbar-profile'>
        <img src={assets.login_profile} alt="" />
        <ul className='nav-profile-dropdown'>
          <li onClick={() => navigate("/myorders")}>
            <img src={assets.orders_bag} alt="" />
            <p>Orders</p>
          </li>

          <hr />

          <li onClick={logout}>
            <img src={assets.logout_icon} alt="" />
            <p>Logout</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
