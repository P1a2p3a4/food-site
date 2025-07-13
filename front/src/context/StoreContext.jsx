
import React, { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const API_URL = "http://localhost:5000"; // ✅ Safer constant

const StoreProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [cartItems, setCartItems] = useState({});

  // ✅ Add item to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));

    if (token) {
      try {
        await axios.post(
          `${API_URL}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      console.warn("No token found — item not saved to backend.");
    }
  };

  // ✅ Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId]) {
        updated[itemId] -= 1;
        if (updated[itemId] <= 0) {
          delete updated[itemId];
        }
      }
      return updated;
    });

    if (token) {
      try {
        await axios.post(
          `${API_URL}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    } else {
      console.warn("No token found — item removal not saved to backend.");
    }
  };

  // ✅ Calculate total cart amount safely
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        const item = food_list.find(
          (product) => String(product._id) === String(itemId)
        );
        if (item) {
          const price = Number(item.price) || 0;
          totalAmount += price * quantity;
        } else {
          console.warn(`Item ID ${itemId} not found in food_list.`);
        }
      }
    }

    return isNaN(totalAmount) ? 0 : totalAmount;
  };

  // ✅ Load cart data from backend
  const loadCartData = async (storedToken) => {
    if (!storedToken) return; // Nothing to do if no token
    try {
      const response = await axios.post(
        `${API_URL}/api/cart/get`,
        {},
        { headers: { token: storedToken } }
      );
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  // ✅ On mount: sync token & load cart if logged in
  useEffect(() => {
    if (token) {
      loadCartData(token);
    }
  }, [token]);

  // ✅ Update localStorage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    url: API_URL,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
