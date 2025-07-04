import React, { useState } from 'react'
import './LoginPopup.css'
import { useSearchParams } from 'react-router-dom'


const LoginPopup = ({ setshowlogin }) => {
  const [currState, setCurrstate] = useState('Sign Up')


  return (
    <div className='login-popup'>
      <form action="" className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setshowlogin(false)} src="assets/food-list/cross.png" alt="" />
        </div>
        <div className='login-popup-inputs'>
          <input type="text" placeholder='Your name' required />
          <input type="email" name='email' id='email' placeholder='your Email' required />
          <input type="password" name='password' placeholder='password' required />


          <button>{currState === "sign Up" ? "Create Account" : "Login"}</button>
          
          <p className='login-popup-forget'>Forget Password?</p>

          <div className='login-popup-condition'>
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy</p>
          </div>

          {/* {currState === "Login" ? <p>Create a new account? <span onClick={() => setCurrstate('Sign Up')} >Click here</span> </p> : <p>Already have an account? <span onClick={() => setCurrstate('Login')}>Login here</span> </p>} */}

          {currState === "Login" ? (
            <p>Create a new account? <span onClick={() => setCurrstate("Sign Up")} >Click here</span> </p>
          ) : (
            <p>Already have an account? <span onClick={() => setCurrstate("Login")}>Login here</span> </p>
          )}
        </div>

      </form>
    </div>
  )
}


export default LoginPopup



