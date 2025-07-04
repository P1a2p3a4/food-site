import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {

  const [Menubar, setMenu] = useState('Home');
  const { getTotalCartAmount } = useContext(StoreContext);

  return (

    <div className='Navbarmenu'>
      <Link to="/">

        <img id='logo' src="public/food-img/1.jpg" alt="logo image" />

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
            <img className='basket-icon' src="public/food-img/basket.png" alt="basket icon" />
          </Link>

          <div className={getTotalCartAmount() === 0 ? '' : "dot"}>

          </div>

        </div>
      </div>

      <div className='Navbarmenu-btn'>
        <button onClick={() => setShowLogin(true)} >Sigh in</button>
      </div>
    </div>
  )
}

export default Navbar
