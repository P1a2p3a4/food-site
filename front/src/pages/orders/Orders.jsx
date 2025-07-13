
import React, { useContext, useState } from 'react';
import './orders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Orders = () => {
  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItems,
    url,
  } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const paymentFunction = async (e) => {
    e.preventDefault();

    if (!food_list?.length) {
      console.error('❌ Food list is empty.');
      return;
    }

    const orderItems = [];

    food_list.forEach((item) => {
      const quantity = cartItems?.[String(item._id)];
      if (quantity > 0) {
        orderItems.push({ ...item, quantity });
      }
    });

    if (orderItems.length === 0) {
      console.warn("❌ No items to order!");
      return;
    }

    const subtotal = getTotalCartAmount() || 0;
    const deliveryFee = 2;
    const totalAmount = subtotal + deliveryFee;

    const orderData = {
      userId: 2, // Replace with real user ID if you have auth
      address: data,
      items: orderItems,
      amount: totalAmount,
      email: data.email, // ✅ Needed for Stripe customer_email
    };

    try {
      const response = await axios.post(
        `${url}/api/order/placeOrder`,
        orderData,
        { headers: { token } }
      );

      console.log("✅ Full Response:", response);
      console.log("✅ Response Data:", response.data);

      // 🔑 Expect your backend to return { url: ... }
      const redirectUrl =
        response.data?.url || response.data?.session_url;

      if (redirectUrl) {
        console.log("✅ Redirecting to:", redirectUrl);
        window.location.href = redirectUrl;
      } else {
        console.error('❌ No payment URL returned by backend:', response.data);
      }

    } catch (error) {
      console.error('❌ Error placing order:', error);
    }
  };

  const subtotal = getTotalCartAmount() || 0;
  const deliveryFee = 2;
  const total = subtotal + deliveryFee;

  return (
    <div>
      <form className="place-order" onSubmit={paymentFunction}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={onChangeHandler}
              value={data.firstName}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={onChangeHandler}
              value={data.lastName}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={onChangeHandler}
            value={data.email}
            required
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            onChange={onChangeHandler}
            value={data.street}
            required
          />
          <div className="multi-fields">
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={onChangeHandler}
              value={data.city}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={onChangeHandler}
              value={data.state}
              required
            />
          </div>
          <div className="multi-fields">
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              onChange={onChangeHandler}
              value={data.zipCode}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              onChange={onChangeHandler}
              value={data.country}
              required
            />
          </div>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={onChangeHandler}
            value={data.phoneNumber}
            required
          />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <hr />
            <h2>Cart Totals</h2>
          </div>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${Number(subtotal).toFixed(2)}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${Number(deliveryFee).toFixed(2)}</p>
          </div>
          <div className="cart-total-details">
            <p><b>Total</b></p>
            <b>${Number(total).toFixed(2)}</b>
          </div>
        </div>

        <div className="place-order-btn">
          <button
            type="submit"
            disabled={!food_list?.length}
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default Orders;
