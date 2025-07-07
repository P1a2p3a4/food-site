import React, { useState } from 'react'
import './SigninPopup.css'
const SigninPopup = ({ setShowlogin }) => {

  const [currState, setCurrstate] = useState('sign Up')
  return (
    <div className='signipopup'>
      <form action="">
        <div className='login-title'>

          <img onClick={() => setShowlogin(false)} src="/src/assets/food-list/cras.png" alt="cras" />
          <h1>{currState}</h1>


          <div className='login-popup-inputs'>


            {currState === 'SignUp' ?
              <input type="text" name='name' placeholder='your name' required /> : <></>}


            <input type="email" name='email' id='email' placeholder='your Email' required />
            <input type="password" name='password' id='password' placeholder='password' required />

            <button className='login-btn' >{currState === 'Sign Up' ? 'Create Account' : "Log in"}</button>

            {currState === "Login" ?
              <p className='click-text'>Create a new account <span onClick={() => setCurrstate('Sign Up')}>Click Here</span></p> :

              <p className='login-text'>Already Have an account? <samp onClick={() => setCurrstate('Login')}>Login Here</samp></p>}
          </div>
        </div>
      </form>
    </div>
  )
}

export default SigninPopup
