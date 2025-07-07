import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'

const Navbar = ({ setShowLogin }) => {

  const [Menubar, setMenu] = useState('Home');
  const { getTotalCartAmount } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    Navigate('/')
  }
  return (

    <div className='Navbarmenu'>
      <Link to="/">

        <img id='logo' src={assets.salad} alt="logo image" />

      </Link>


      <ul className='navbarmenu'>
        <Link to='/' className={Menubar === 'Home' ? 'active' : " "} onClick={() => setMenu('Home')}>Home</Link>
        < a href='#explore-menu' className={Menubar === 'menu' ? 'active' : " "} onClick={() => setMenu('menu')}>Menu</a>
        <a href='#footer' className={Menubar === 'Contact' ? 'active' : " "} onClick={() => setMenu('Contact')}>Contact</a>
        <a href='#app-download' className={Menubar === 'MobileApp' ? 'active' : ""} onClick={() => setMenu("MobileApp")}>MobileApp</a>
        <Link to='/orders' className={Menubar === 'Orders' ? 'active' : " "} onClick={() => setMenu('Orders')}>Orders</Link>


        <Link to='/Cart' className={Menubar === 'Cart' ? 'active' : " "} onClick={() => setMenu('Cart')}>Cart</Link>

      </ul>

      <div className='navbar-right'>

        <img className='navbar-search' src="./Src/assets/food-list/search.png" alt="search icon" />

        <div className='navbar-search-icon'>

          <Link to='/cart'  >
            <img className='basket-icon' src={assets.basket} alt="basket icon" />
          </Link>

          <div className={getTotalCartAmount() === 0 ? '' : "dot"}>

          </div>


        </div>


      </div>


      <button className='searchbtn' onClick={() => setShowLogin(true)} >Sigh in</button>

      <div className='navbar-profile'>
        <img src={assets.login_profile} alt="" />
        <ul className='nav-profile-dropdown'>
          <li><img src={assets.orders_bag} alt="" />
            <p>Orders</p></li>
          <hr />
          <li onClick={logout}><img src={assets.logout_icon} alt="" />
            <p>Logout</p></li>
        </ul>
      </div>

    </div>

  )
}

export default Navbar
