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












 