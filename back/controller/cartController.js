import userModel from "../models/userModel.js"







const addToCart = async (req, res) => {

  try {
    const userData = await userModel.findOne({ _id: req.body.userId });
    // Ensure cartData is an object

    // const cartData = { ...(userData.cartData || {}) };

    const cartData = await userData.cartData

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;

    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });

  } catch (error) {
    console.log("Error in addToCart", error);
    return res.status(500).res.json({ success: false, message: "Error" });
  }
}



const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId)
    const cartData = await userData.cartData


    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData })

    res.json({ success: true, message: "Removed From Cart" })
    
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "Error" })


  }

}

const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId)
    const cartData = await userData.cartData

    res.json({ success: true, cartData })
  }
  catch (e) {
    console.log(e);
    res.json({ success: false, message: "Error" })

  }
}


export { addToCart, removeFromCart, getCart }














// import userModel from "../models/userModel.js";


// // Add to cart
// const addToCart = async (req, res) => {
//   try {
//     const userData = await userModel.findById(req.body.userId);
//     const cartData = { ...(userData.cartData || {}) };

//     if (!cartData[req.body.itemId]) {
//       cartData[req.body.itemId] = 1;
//     } else {
//       cartData[req.body.itemId] += 1;
//     }

//     await userModel.findByIdAndUpdate(req.body.userId, { cartData });
//     return res.json({ success: true, message: "Added to cart" });
//   } catch (error) {
//     console.error("Error in addToCart:", error);
//     return res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// // Remove from cart
// const removeFromCart = async (req, res) => {
//   try {
//     const userData = await userModel.findById(req.body.userId);
//     const cartData = { ...(userData.cartData || {}) };

//     if (!cartData[req.body.itemId]) {
//       return res.status(400).json({ success: false, message: "Item not in cart" });
//     }

//     if (cartData[req.body.itemId] <= 1) {
//       delete cartData[req.body.itemId];
//     } else {
//       cartData[req.body.itemId] -= 1;
//     }

//     await userModel.findByIdAndUpdate(req.body.userId, { cartData });
//     return res.json({ success: true, message: "Removed from cart" });
//   } catch (error) {
//     console.error("Error in removeFromCart:", error);
//     return res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// // Get cart data
// const getCart = async (req, res) => {
//   try {
//     const userData = await userModel.findById(req.body.userId);
//     const cartData = userData?.cartData || {};
//     return res.json({ success: true, cartData });
//   } catch (error) {
//     console.error("Error in getCart:", error);
//     return res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// export { addToCart, removeFromCart, getCart };
