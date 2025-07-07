
import React, { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
//import axios from 'axios'

export const StoreContext = createContext(null)





const StoreProvider = (props) => {

  // const [food_list, setFoodList] = useState([])

  const [token, setToken] = useState("your-token"); // or retrieve from login


  const [cartItems, setCartItems] = useState({})

  
  const url = "http://localhost:5000";


  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    }
    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }

    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, {
          headers: { token }
        })
      } catch (error) {
        console.log("Failed to add to cart");
      }

    }
  }

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
    }
  }


  // const getTotalCartAmount = () => {
  //     let totalAmount = 0;

  //     for (const item in cartItems) {
  //         if (cartItems[item] > 0) {
  //             const itemInfo = food_list.find((product) => product._id === item);
  //             totalAmount += itemInfo.price*cartItems[item]

  //         }  
  //     }
  //     return totalAmount;
  // }


  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find(product => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };


  // const fetchFoodList = async () => {
  //     const response = await axios.get(url + "/api/food/list")
  //     fetchFoodList(response.data.data)
  // }


  

  // const loadCartData = async (token) => {

  //   const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
  //   setCartItems(response.data.cartItems)

  // }



  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    url
  }



  useEffect(() => {

    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"))
    }




    async function loadData() {

      //await fetchFoodList()

      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))

        //await loadCartData(localStorage.getItem("token"))
      }
    }

    loadData()
  }, [])





  return (
    <div>
      <StoreContext.Provider value={contextValue}>
        {props.children}

      </StoreContext.Provider>
    </div>
  )

}

export default StoreProvider



