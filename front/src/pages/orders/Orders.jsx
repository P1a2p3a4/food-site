import React, { useContext, useState } from 'react'
import './orders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
//import assets from '../../assets/assets'



const Orders = () => {

  const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",

    state: "",
    zipCode: "",
    country: "",
    phoneNumber: ""
  })

  const onChangeHandler = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const paymentFunction = async (e) => {
    try {
      e.preventDefault()

      // console.log('paymentFunction called');

      const orderItem = []


      // food_list.forEach((item) => {
      //   if (cartItem[item._id] > 0) {
      //     const itemInfo = item;
      //     itemInfo["quantity"] = cartItem[item._id];
      //     orderItem.push(itemInfo)
      //   }
      // })

      food_list.forEach((item) => {
        const quantity = cartItem?.[item._id];
        if (quantity > 0) {
          const itemInfo = { ...item, quantity };
          orderItem.push(itemInfo);
        }
      });


      const orderData = {
        userId: 2,
        address: data,
        items: orderItem,
        amount: getTotalCartAmount() + 2
      }


      const response = await axios.post("http://localhost:5000/api/order/placeOrder", orderData, { headers: { token } })
      if (response && response.status === 200) {
        window.location.href = response.data.url
        console.log(response.data);

      }
      else {
        console.log('Error');

      }
    } catch (error) {
      console.error("Error placing order:", error);

    }
  }


  return (
    <div>
      <form action="" className='place-order' onSubmit={paymentFunction}>
        <div className='place-order-left'>
          <p className='title'>Delivery Information</p>
          <div className='multi-fields'>
            <input type="text" name='firstName' placeholder='First Name' onChange={onChangeHandler} value={data.firstName} required />
            <input type="text" name='lastName' placeholder='Last Name' onChange={onChangeHandler} value={data.lastName} required />

          </div>
          <input type="email" name='email' placeholder='Email address' onChange={onChangeHandler} value={data.email} required />
          <input type="text" name='street' placeholder='Street' onChange={onChangeHandler} value={data.street} required />
          <div className='multi-fields '>
            <input type="text" name='city' placeholder='City' onChange={onChangeHandler} value={data.city} required />

            <input type="text" name='state' placeholder='State' onChange={onChangeHandler} value={data.state} required />
          </div>
          <div className='multi-fields'>
            <input type="text" name='zipCode' placeholder='Zip Code' onChange={onChangeHandler} value={data.zipCode} required />
            <input type="text" name='country' placeholder='Country' onChange={onChangeHandler} value={data.country} required />
          </div>
          <input type="text" name='phoneNumber' placeholder='Phone Number' onChange={onChangeHandler} value={data.phoneNumber} required />
        </div>
        <div className='place-order-right'>
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

        </div>
        <div className='place-order-btn'>
          <button type='submit'>Proceed to payment</button>
        </div>
      </form>
    </div>
  )
}

export default Orders







