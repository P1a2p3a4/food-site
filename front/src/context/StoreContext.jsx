

import React, { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";


export const StoreContext = createContext(null)


const StoreProvider = (props) => {

    const [token, setToken] = useState("your-token"); // or retrieve from login
    const url = "http://localhost:5000";


    const [cartItems, setCartItems] = useState({})


    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }


    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
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






    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        url
    }
    return (
        <div>
            <StoreContext.Provider value={contextValue}>
                {props.children}

            </StoreContext.Provider>
        </div>
    )

}

export default StoreProvider
