import React from 'react'
import "./footer.css"


const Footer = () => {
  return (

    <div className='footer' id='footer'>

      <div className='footer-content-left'>
        <img className='logo' src="./src/assets/food-img/1.jpg" alt="logo" />
        <h2><span>FoodFetch</span></h2>
      </div>

      <div className='footer-content-center'>
        <h2><span>COMPANY</span></h2>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Delivery</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      <div className='footer-content-right'>
        <h2>Get IN TOUCH</h2>
        <ul>
          <li>+91-964-015-9889</li>
          <li>personannoymoue1817@mail.com</li>
        </ul>
      </div>

      <div className='footer-social-icons'>
        <h2>Social Links</h2>
        <img className='icons' src="/src/assets/food-list/facebook.png" alt="facebook" />
        <img className='icons' src="/src/assets/food-list/twitter.png" alt="twitter" />
        <img className='icons' src="/src/assets/food-list/linkedin.png" alt="linkedin" />
      </div>

      <div className='footer-bottom'>
        <hr className='hrline' />
        <p className='footer-copyright'>
          Copyright 2025 @Craving.com || All Right Reserved
        </p>
      </div>

    </div>




  )
}

export default Footer
