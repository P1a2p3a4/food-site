
import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'



const LoginPopup = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext)

  const [currState, setCurrstate] = useState('Login')
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const onLogin = async (e) => {
    e.preventDefault()
    const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register"
    const postData = currState === "Login"
      ? { email: data.email, password: data.password }
      : data

    try {
      const resp = await axios.post(url + endpoint, postData)
      if (resp.data.success) {
        setToken(resp.data.token)
        localStorage.setItem("token", resp.data.token)
        // setshowlogin(false)
        setShowLogin(false);
      } else {
        alert(resp.data.message)
      }
    } catch (error) {
      console.error("Login/Register error:", error)
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setshowlogin(false)} src="./src/assets/food-list/cross.png" alt="X" />
        </div>

        <div className='login-popup-inputs'>
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              onChange={onChangeHandler}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Your email"
            onChange={onChangeHandler}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChangeHandler}
            required
          />

          <button type='submit'>
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>

          <p className='login-popup-forget'>Forget Password?</p>

          <div className='login-popup-condition'>
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>

          {currState === "Login" ? (
            <p>Create a new account? <span onClick={() => setCurrstate("Sign Up")}>Click here</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setCurrstate("Login")}>Login here</span></p>
          )}
        </div>
      </form>
    </div>
  )
}

export default LoginPopup
