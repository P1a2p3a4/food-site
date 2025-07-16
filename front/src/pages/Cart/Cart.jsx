import React, { useContext } from 'react'
import './cart.css'
import { StoreContext } from '../../../src/context/StoreContext'

import { Link, useNavigate } from 'react-router-dom'


const Cart = () => {

  const navigate = useNavigate();

  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)


  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>

        </div>
        <br />
        <hr />

        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {

            return (
              <div className='cart-items-title' key={item._id}>

                <img src={url + "/images/" + item.image} alt="" />

                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>{item.price * cartItems[item._id]}</p>

                <p className='cross'
                  onClick={() => removeFromCart(item._id)} >x</p>

              </div>
            )
          }
          return null;

        })
        }
      </div>

      <div className='cart-bottom'>
        <div className='cart-total'>
          <hr />
          <h2>Cart Totlas</h2>
        </div>
        <div className='cart-total-details'>
          <p>Sub total</p>
          <p>{getTotalCartAmount()}</p>
        </div>
        <div className='cart-total-detials'>
          <p>Delivery Free</p>
          <p>{2}</p>
        </div>
        <div className='cart-total-details'>
          <p><b>Total</b></p>
          <b>{getTotalCartAmount() + 2}</b>


        </div>

                 
        <Link to="/orders" className='cart-link'>
          <button className='button-proceed' onClick={() => navigate('/order')} >proceed to Checkout</button>
        </Link> 

  
  

      </div>


      <div className='cart-promocode'>
        <p>If you have a   promo code, place Enter it here</p>
        <div className='cart-promocart-input'>
          <input type="text"
            placeholder="Enter your promocode" />
          <button>Submit</button>
        </div>
      </div>
    </div>

  )
}

export default Cart










 